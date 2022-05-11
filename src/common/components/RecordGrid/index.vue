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
				<!-- add new document pop up window -->
				<el-button
					@click="AdddialogFormVisible = true"
					label="Add"
					type="primary"
					plain
					style="margin-top: 1vw; margin-right: 0"
					>Add New
				</el-button>
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

				<div class="pet-filter">
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

				<el-button
					style="margin-top: 1vw"
					type="primary"
					size="mini"
					plain
					@click="resetRecordList"
					>Reset Filter</el-button
				>
			</el-form>
		</div>
	</div>
	<!-- add dialog -->
	<el-dialog
		width="600px"
		title="Add Document"
		v-model="AdddialogFormVisible"
	>
		<el-form :model="documentForm">
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
					>Confirm</el-button
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
		<el-form :model="EditdocumentForm">
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
					>Create</el-button
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
	props: ['petList', 'petOptions'],
	components: {
		VuePdfEmbed
	},
	data() {
		return {
			uid: '_FENN-aEN9PIjjAMy83Hb',
			recordList: [],
			recordType: 'Invoice',
			//filter related
			dateRange: '',
			petSelected: '',
			displayedRecordList: [],

			//add diaglog related
			AdddialogFormVisible: false,
			documentForm: {
				recordTitle: '',
				petId: '',
				date: '',
				fileDir: '',
				fileFormat: ''
			},

			//delete dialog related
			deletedialogVisible: false,
			delete_recordId: '',

			//edit dialog related
			EditdialogFormVisible: false,
			EditdocumentForm: {
				recordId: '',
				recordTitle: '',
				petId: '',
				date: '',
				fileDir: '',
				fileFormat: ''
			},

			//view pdf dialog related
			dialogPDFVisible: false,
			view_fileDir: '',
			view_fileFormat: '',
			view_recordTitle: ''
		};
	},
	created: function () {
		//get record list
		httpServices.invoicemed
			.getAllRecords({ uid: this.$data.uid, recordType: 'Invoice' })
			.then(response => {
				this.$data.recordList = response.data.data;
				this.$data.displayedRecordList = this.$data.recordList;
				console.log('haha', this.$data.recordList);
			})
			.catch(error => {
				console.log(error);
			});
	},
	methods: {
		//preview document
		handleView(record) {
			this.$data.view_recordTitle = record.recordTitle;
			this.$data.view_fileFormat = record.fileFormat;
			this.$data.view_fileDir = record.fileDir;
			this.$data.dialogPDFVisible = true;
			console.log(record, this.$data.view_recordTitle);
		},

		//add new invoice
		adddocument() {
			this.$data.AdddialogFormVisible = false;
			console.log(this.$data.documentForm);
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
					console.log(response);
					location.reload();
				})
				.catch(error => {
					console.log(error);
				});
		},

		//Add upload document
		AddbeforeAvatarUpload(file) {
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

			console.log(this.$data.EditdocumentForm);
		},

		editdocument() {
			httpServices.invoicemed
				.editRecord({
					uid: this.$data.uid,
					newRecord: {
						recordId: this.$data.EditdocumentForm.recordId,
						recordType: this.$data.EditdocumentForm.recordType,
						recordTitle: this.$data.EditdocumentForm.recordTitle,
						date: this.$data.EditdocumentForm.date,
						fileDir: this.$data.EditdocumentForm.fileDir,
						petId: this.$data.EditdocumentForm.petId,
						fileFormat: this.$data.EditdocumentForm.fileFormat
					}
				})
				.then(response => {
					console.log(response);
					location.reload();
				})
				.catch(error => {
					console.log(error);
				});
		},
		handleDelete(record) {
			this.$data.deletedialogVisible = true;
			this.$data.delete_recordId = record.recordId;
			console.log(this.$data.delete_recordId);
			console.log(record);
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
					console.log(response);
					location.reload();
				})
				.catch(error => {
					console.log(error);
				});
		},

		//Edit upload document
		EditbeforeAvatarUpload(file) {
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
				});
			});
		},
		//filter date
		applyFilter() {
			this.$data.displayedRecordList = this.$data.recordList.slice();
			console.log(this.$data.dateRange);
			console.log(this.$data.petSelected);

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
					console.log(record);
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
	.el-tabs__content {
		height: 65vh;
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

.right-filter {
	.datepicker {
		margin-top: 8px;
		p {
			color: #76553f;
			margin: 0 2px;
			font-family: 'Trebuchet MS';
			font-size: 14px;
			font-weight: bold;
		}
		.el-range-editor {
			width: 200px;
			margin-top: 5px;
			padding-right: 1px;

			.el-range-input {
				font-size: small;
			}
		}
		.el-range-separator {
			color: #76553f;
		}
	}

	.pet-filter {
		margin-top: 15px;
		p {
			color: #76553f;
			margin: 0 2px;
			font-family: 'Trebuchet MS';
			font-size: 14px;
			font-weight: bold;
		}
		.el-input__inner {
			margin-top: 5px;
			width: 200px;
			font-size: small;
		}
	}
}
</style>
