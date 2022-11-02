<template>
	<div class="folder-content">
		<div class="folder-grid">
			<el-scrollbar height="60vh">
				<el-col
					:gutter="24"
					v-for="(record, index) in displayedRecordList"
					:key="index"
				>
					<!-- one document -->
					<el-card
						style="
							width: 220px;
							height: 250px;
							margin-right: 15px;
							margin-top: 15px;
							position: relative;
						"
					>
						<div style="position: absolute; top: 10px; right: 10px">
							<!-- drop down list -->
							<el-dropdown trigger="click">
								<span class="el-dropdown-link">
									<el-button size="small" type="primary" plain
										><el-icon><More /></el-icon
									></el-button>
								</span>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item
											@click="handleView(record)"
											>View</el-dropdown-item
										>
										<el-dropdown-item
											@click="handleEdit(record)"
											>Edit</el-dropdown-item
										>
										<el-dropdown-item
											@click="handleDelete(record)"
											>Delete</el-dropdown-item
										>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
							<!-- end of dropdown list -->
						</div>

						<!-- pdf image -->
						<div class="pdf">
							<el-image
								style="width: 100px; height: 100px"
								v-if="record.fileFormat == 'Image'"
								:src="record.fileDir"
								@click="handleView(record)"
							></el-image>
							<vue-pdf-embed
								v-else
								height="10"
								width="110"
								:page="1"
								:source="record.fileDir"
								@click="handleView(record)"
							/>
						</div>

						<div class="card-bottom">
							<div class="bottom_text" style="margin-bottom: 0">
								<b>{{ record.recordTitle }}</b>
								<p>{{ record.date }}</p>
							</div>

							<!-- pet avatar -->
							<div class="pet_name_avatar">
								<img :src="record.petAvatar" class="avatar" />
								<p>{{ record.petName }}</p>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-scrollbar>
		</div>
		<div class="right-filter">
			<el-form>
				<el-form-item class="datepicker">
					<p>Date Filter</p>
					<el-date-picker
						v-model="dateRange"
						type="daterange"
						range-separator="to"
						start-placeholder="Start"
						end-placeholder="End"
						align="center"
						size="mini"
						@change="applyFilter"
					>
					</el-date-picker>
				</el-form-item>

				<div class="pet-filter" v-if="$route.query.id === undefined">
					<p>Pet Filter</p>
					<el-select
						v-model="petSelected"
						placeholder="Select Pet"
						@change="applyFilter"
					>
						<el-option
							v-for="pet in petList"
							:key="pet.petId"
							:label="pet.petName"
							:value="pet.petName"
						>
						</el-option>
					</el-select>
				</div>
				<div class="filter_add">
					<el-button
						class="rihgt_buttons"
						style="margin-top: 1vw"
						type="primary"
						size="mini"
						plain
						@click="resetRecordList"
						>Reset Filters</el-button
					>
					<!-- add new document pop up window -->
					<el-button
						class="rihgt_buttons"
						@click="AdddialogFormVisible = true"
						label="Add"
						type="primary"
						plain
						style="margin-top: 1vw; margin-right: 0"
						><el-icon><Plus /></el-icon>Add New
					</el-button>
				</div>
			</el-form>
		</div>
	</div>
	<!-- add dialog -->
	<el-dialog
		width="600px"
		title="Add Document"
		v-model="AdddialogFormVisible"
	>
		<el-form :model="documentForm" v-loading="addloading">
			<el-form-item label="Document Title">
				<el-input
					v-model="documentForm.recordTitle"
					placeholder="Enter document title"
					autocomplete="off"
				></el-input>
			</el-form-item>

			<div class="document-dialog-datepet">
				<el-form-item label="Pet" width="10vw">
					<el-select
						v-model="documentForm.petId"
						placeholder="Select a pet"
					>
						<el-option
							v-for="item in petOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="Date">
					<el-date-picker
						type="date"
						v-model="documentForm.date"
						format="YYYY-MM-DD"
						value-format="YYYY-MM-DD"
					>
					</el-date-picker>
				</el-form-item>
			</div>

			<el-upload
				v-model="documentForm.fileDir"
				class="document-dialog-upload"
				action=""
				:show-file-list="true"
				:before-upload="AddbeforeAvatarUpload"
				:http-request="Upload"
			>
				<el-button size="medium" type="primary"
					>Upload Document</el-button
				>
			</el-upload>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button
					@click="AdddialogFormVisible = false"
					type="primary"
					plain
					>Cancel</el-button
				>
				<el-button @click="adddocument" type="primary" plain
					>Create</el-button
				>
			</span>
		</template>
	</el-dialog>

	<!-- delete dialog -->
	<el-dialog
		v-model="deletedialogVisible"
		title=""
		width="30%"
		:before-close="handleClose"
	>
		<span>Are you sure to delete this {{ recordType }} ?</span>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="deletedialogVisible = false"
					>Cancel</el-button
				>
				<el-button type="primary" @click="documentDelete()"
					>Delete</el-button
				>
			</span>
		</template>
	</el-dialog>

	<!-- edit dialog related -->
	<el-dialog
		width="600px"
		title="Edit Document"
		v-model="EditdialogFormVisible"
	>
		<el-form :model="EditdocumentForm" v-loading="editloading">
			<el-form-item label="Document Title">
				<el-input
					v-model="EditdocumentForm.recordTitle"
					placeholder="Enter document title"
					autocomplete="off"
				></el-input>
			</el-form-item>

			<div class="document-dialog-datepet">
				<el-form-item label="Pet" width="10vw">
					<el-select
						v-model="EditdocumentForm.petId"
						placeholder="Select a pet"
					>
						<el-option
							v-for="item in petOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="Date">
					<el-date-picker
						type="date"
						v-model="EditdocumentForm.date"
						format="YYYY-MM-DD"
						value-format="YYYY-MM-DD"
					>
					</el-date-picker>
				</el-form-item>
			</div>

			<el-upload
				v-model="EditdocumentForm.fileDir"
				class="document-dialog-upload"
				action=""
				:show-file-list="true"
				:before-upload="EditbeforeAvatarUpload"
				:http-request="Upload"
			>
				<el-button size="medium" type="primary"
					>Replace Document</el-button
				>
			</el-upload>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button
					@click="EditdialogFormVisible = false"
					type="primary"
					plain
					>Cancel</el-button
				>
				<el-button @click="editdocument" type="primary" plain
					>Save</el-button
				>
			</span>
		</template>
	</el-dialog>
	<!-- view pdf related -->
	<el-dialog :title="view_recordTitle" v-model="dialogPDFVisible">
		<el-image
			v-if="view_fileFormat == 'Image'"
			:src="view_fileDir"
		></el-image>
		<vue-pdf-embed v-else :source="view_fileDir" />
	</el-dialog>
</template>

<script setup>
import httpServices from '@services';
import { FireBaseStorage as storage } from '@services/firebase.js';
import {
	ref as ref_upload,
	uploadBytes,
	getDownloadURL
} from 'firebase/storage';
import { getStorage, ref as ref_delete, deleteObject } from 'firebase/storage';
</script>

<script>
import VuePdfEmbed from 'vue-pdf-embed';

export default {
	props: [
		'petList',
		'petOptions',
		'initial_recordType',
		'curr_uid',
		'record_List'
	],
	components: {
		VuePdfEmbed
	},
	data() {
		return {
			uid: this.curr_uid,
			recordList: [],
			recordType: this.initial_recordType
		};
	},

	created() {
		this.$data.editloading = false;
		this.$data.addloading = false;
		//filter related
		this.$data.dateRange = '';
		this.$data.petSelected = '';
		this.$data.displayedRecordList = [];

		//add diaglog related
		this.$data.AdddialogFormVisible = false;
		this.$data.documentForm = {
			recordTitle: '',
			petId: '',
			date: '',
			fileDir: '',
			fileFormat: ''
		};

		//delete dialog related
		this.$data.deletedialogVisible = false;
		this.$data.delete_recordId = '';
		this.$data.delete_fileDir = '';

		//view pdf dialog related
		this.$data.dialogPDFVisible = false;
		this.$data.view_fileDir = '';
		this.$data.view_fileFormat = '';
		this.$data.view_recordTitle = '';

		//edit dialog related
		this.$data.EditdialogFormVisible = false;
		this.$data.EditdocumentForm = {
			recordId: '',
			recordTitle: '',
			petId: '',
			date: '',
			fileDir: '',
			fileFormat: ''
		};
	},

	watch: {
		record_List(newval) {
			this.$data.recordList = newval;
			this.$data.displayedRecordList = this.$data.recordList;
		}
	},
	methods: {
		//preview document
		handleView(record) {
			this.$data.view_recordTitle = record.recordTitle;
			this.$data.view_fileFormat = record.fileFormat;
			this.$data.view_fileDir = record.fileDir;
			this.$data.dialogPDFVisible = true;
		},

		//add new invoice
		adddocument() {
			this.$data.AdddialogFormVisible = false;
			//add new invoice
			httpServices.invoicemed
				.addNewRecord({
					uid: this.$data.uid,
					record: {
						recordType: this.$data.recordType,
						recordTitle: this.$data.documentForm.recordTitle,
						date: this.$data.documentForm.date,
						fileDir: this.$data.documentForm.fileDir,
						petId: this.$data.documentForm.petId,
						fileFormat: this.$data.documentForm.fileFormat
					}
				})
				.then(response => {
					location.reload();
				})
				.catch(error => {
					console.log(error);
				});
		},

		//Add upload document
		AddbeforeAvatarUpload(file) {
			this.$data.addloading = true;
			const isJPG =
				file.type === 'image/png' || file.type === 'image/jpeg';
			const isPDF = file.type === 'application/pdf';

			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG && !isPDF) {
				this.$message.error(
					'Upload document can only be in Image/PDF format!'
				);
				return false;
			}

			if (!isLt2M) {
				this.$message.error('Upload document size cannot exceed 2MB!');
				return false;
			}

			if (isJPG) {
				this.$data.documentForm.fileFormat = 'Image';
			} else {
				this.$data.documentForm.fileFormat = 'PDF';
			}
			//get current timstamp, timestamp will always be unique for each user
			const currentDate = new Date();
			const timestamp = currentDate.getTime();

			const storageRef = ref_upload(
				storage,
				this.$data.uid + '_invocie' + '_' + timestamp
			);
			uploadBytes(storageRef, file).then(() => {
				getDownloadURL(storageRef).then(url => {
					this.$data.documentForm.fileDir = url;
					this.$data.addloading = false;
				});
			});
		},

		popoverPDF(index) {
			this.cur = index;
			this.dialogPDFVisible = true;
		},

		//edit document related
		handleEdit(record) {
			this.$data.EditdialogFormVisible = true;
			this.$data.EditdocumentForm.recordTitle = record.recordTitle;
			this.$data.EditdocumentForm.petId = record.petId;
			this.$data.EditdocumentForm.date = record.date;
			this.$data.EditdocumentForm.fileDir = record.fileDir;
			this.$data.EditdocumentForm.recordId = record.recordId;
			this.$data.EditdocumentForm.fileFormat = record.fileFormat;
		},

		editdocument() {
			httpServices.invoicemed
				.editRecord({
					uid: this.$data.uid,
					newRecord: {
						recordId: this.$data.EditdocumentForm.recordId,
						recordType: this.$data.recordType,
						recordTitle: this.$data.EditdocumentForm.recordTitle,
						date: this.$data.EditdocumentForm.date,
						fileDir: this.$data.EditdocumentForm.fileDir,
						petId: this.$data.EditdocumentForm.petId,
						fileFormat: this.$data.EditdocumentForm.fileFormat
					}
				})
				.then(response => {
					location.reload();
				})
				.catch(error => {
					console.log(error);
				});
		},
		handleDelete(record) {
			this.$data.deletedialogVisible = true;
			this.$data.delete_recordId = record.recordId;
			this.$data.delete_fileDir = record.fileDir;
		},
		documentDelete() {
			this.$data.deletedialogVisible = false;
			//delete record list
			httpServices.invoicemed
				.deleteRecord({
					uid: this.$data.uid,
					recordId: this.$data.delete_recordId
				})
				.then(response => {
					location.reload();
					const storage = getStorage();
					// Create a reference to the file to delete
					const document_ref = decodeURIComponent(
						this.$data.delete_recordId
							.split('/')
							.pop()
							.split('?')[0]
					);
					const desertRef = ref_delete(storage, document_ref);
					// Delete the file
					deleteObject(desertRef).then(() => {
						// File deleted successfully
					});
					location.reload();
				})
				.catch(error => {
					console.log(error);
				});
		},

		//Edit upload document
		EditbeforeAvatarUpload(file) {
			//can click the save button when loading finished
			this.$data.editloading = true;
			//document can only be in the image or pdf format
			const isJPG =
				file.type === 'image/png' || file.type === 'image/jpeg';
			const isPDF = file.type === 'application/pdf';

			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG && !isPDF) {
				this.$message.error(
					'Upload document can only be in Image/PDF format!'
				);
				return false;
			}

			if (!isLt2M) {
				this.$message.error('Upload document size cannot exceed 2MB!');
				return false;
			}

			if (isJPG) {
				this.$data.EditdocumentForm.fileFormat = 'Image';
			} else {
				this.$data.EditdocumentForm.fileFormat = 'PDF';
			}
			//get current timstamp, timestamp will always be unique for each user
			const currentDate = new Date();
			const timestamp = currentDate.getTime();

			const storageRef = ref_upload(
				storage,
				this.$data.uid + '_invocie' + '_' + timestamp
			);
			uploadBytes(storageRef, file).then(() => {
				getDownloadURL(storageRef).then(url => {
					this.$data.EditdocumentForm.fileDir = url;
					this.$data.editloading = false;
				});
			});
		},
		//filter date and pet
		applyFilter() {
			this.$data.displayedRecordList = this.$data.recordList.slice();

			if (this.$data.dateRange !== '' && this.$data.petSelected === '') {
				let startDate = new Date(
					this.$data.dateRange[0].toISOString().split('T')[0]
				);
				let endDate = new Date(
					this.$data.dateRange[1].toISOString().split('T')[0]
				);

				for (let record of this.$data.recordList) {
					let recordDate = new Date(record.date);
					if (
						recordDate.getTime() < startDate.getTime() ||
						recordDate.getTime() > endDate.getTime()
					) {
						var index =
							this.$data.displayedRecordList.indexOf(record);
						if (index !== -1) {
							this.$data.displayedRecordList.splice(index, 1);
						}
					}
				}
			}

			if (this.$data.petSelected !== '' && this.$data.dateRange === '') {
				for (let record of this.$data.recordList) {
					if (record.petName != this.$data.petSelected) {
						var index =
							this.$data.displayedRecordList.indexOf(record);
						if (index !== -1) {
							this.$data.displayedRecordList.splice(index, 1);
						}
					}
				}
			}

			if (this.$data.dateRange !== '' && this.$data.petSelected !== '') {
				let startDate = new Date(
					this.$data.dateRange[0].toISOString().split('T')[0]
				);
				let endDate = new Date(
					this.$data.dateRange[1].toISOString().split('T')[0]
				);

				for (let record of this.$data.recordList) {
					let recordDate = new Date(record.date);
					if (
						recordDate.getTime() < startDate.getTime() ||
						recordDate.getTime() > endDate.getTime() ||
						record.petName !== this.$data.petSelected
					) {
						var index =
							this.$data.displayedRecordList.indexOf(record);
						if (index !== -1) {
							this.$data.displayedRecordList.splice(index, 1);
						}
					}
				}
			}
		},
		resetRecordList() {
			this.$data.displayedRecordList = this.$data.recordList.slice();
			this.$data.dateRange = '';
			this.$data.petSelected = '';
		},
		Upload() {},
		handleClose(done) {
			done();
		}
	}
};
</script>

<style lang="scss" scoped>
.folder-content {
	display: flex;
	justify-content: space-evenly;
	text-align: top;
	.folder-grid {
		width: 80vw;
		margin: 0 0 1vw 3vw;
		text-align: center;

		.pdf {
			width: 6vw;
			height: 8vw;
			margin-left: 1.5vw;
		}
	}
}

.card-bottom {
	height: 60px;
	position: absolute;
	bottom: 10px;
	width: 180px;
	display: flex;
	justify-content: space-between;
	// align-items: center;

	b {
		width: 50px;
		font-size: small;
		font-family: Trebuchet MS;
		color: #76553f;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	p {
		font-size: small;
		font-family: Trebuchet MS;
		color: #76553f;
	}
	.bottom_text {
		text-align: left;
		float: left;
	}
	.pet_name_avatar {
		justify-content: center;
		float: right;

		.avatar {
			width: 40px;
			height: 40px;
			border-radius: 50%;
		}
	}
}
.document-dialog-datepet {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.document-dialog-upload {
	text-align: center;
}
.right-filter {
	.datepicker {
		width: 210px;
		margin-top: 8px;
		p {
			color: #76553f;
			margin: 0 2px;
			font-family: 'Trebuchet MS';
			font-weight: bold;
			font-size: 14px;
		}
	}

	.pet-filter {
		width: 210px;
		margin-top: 15px;
		p {
			color: #76553f;
			margin: 0 2px;
			font-family: 'Trebuchet MS';
			font-size: 14px;
			font-weight: bold;
		}

		:deep(.el-select .el-input__inner) {
			font-size: 14px;
			width: 210px;
		}
	}
}

.filter_add {
	display: flex;
	justify-content: space-evenly;
	flex-direction: column;
	align-items: center;

	.rihgt_buttons {
		margin-left: 0;
		margin-right: 0;
		width: 100px;
		height: 40px;
	}
}
</style>
