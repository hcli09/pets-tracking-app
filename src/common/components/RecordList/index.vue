<template>
	<div class="recordlist">
		<div class="record-box">
			<el-table
				row-key="recordId"
				ref="filterTable"
				:data="displayedRecordList"
				class="folder-list"
			>
				<!-- Document title -->
				<el-table-column
					width="180"
					prop="recordTitle"
					align="center"
					label="Title"
					sortable
					column-key="recordTitle"
				>
				</el-table-column>

				<el-table-column
					prop="petName"
					label="Pet"
					align="center"
					sortable
					column-key="petId"
				>
				</el-table-column>

				<!-- Date -->
				<el-table-column
					width="100"
					prop="date"
					label="Date"
					sortable
					align="center"
					column-key="date"
				>
				</el-table-column>

				<!-- Operations -->
				<el-table-column label="Operations" align="center">
					<template #default="scope">
						<el-button v-if="recordType != 'Vaccination'" 
							size="small"
							@click="handleView(scope.$index, scope.row)"
							style="background: #f1eeec"
							>View</el-button
						>
						<el-button
							size="small"
							@click="handleEdit(scope.$index, scope.row)"
							style="background: #f1eeec"
							>Edit</el-button
						>
						<el-button
							size="small"
							@click="handleDelete(scope.$index, scope.row)"
							style="background: #f1eeec"
							>Delete</el-button
						>
					</template>
				</el-table-column>
			</el-table>

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

					<template v-if="$route.query.id === undefined">
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
					</template>

					<div class="filter_add">
						<el-button
							class="rihgt_buttons"
							style="margin-top: 1vw"
							type="primary"
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
							style="margin-top: 1vw"
							><el-icon><Plus /></el-icon> Add New</el-button
						>
					</div>
				</el-form>
			</div>
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

	<!-- view pdf related -->
	<el-dialog :title="view_recordTitle" v-model="dialogPDFVisible">
		<el-image
			v-if="view_fileFormat == 'Image'"
			:src="view_fileDir"
		></el-image>
		<vue-pdf-embed v-else :source="view_fileDir" />
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
				<el-button v-if="recordType != 'Vaccination'" size="medium" type="primary"
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
</template>
<script setup>
import VuePdfEmbed from 'vue-pdf-embed';
import httpServices from '@services';
import { FireBaseStorage as storage } from '@services/firebase.js';
import {
	ref as ref_upload,
	uploadBytes,
	getDownloadURL
} from 'firebase/storage';
import { getStorage, ref as ref_delete, deleteObject } from 'firebase/storage';
import { throttleFilter } from '@vueuse/shared';
</script>

<script>
export default {
	props: [
		'petList',
		'petOptions',
		'initial_recordType',
		'curr_uid',
		'record_List'
	],

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
		//edit document related
		handleEdit(index, row) {
			this.$data.EditdialogFormVisible = true;
			this.$data.EditdocumentForm.recordTitle = row.recordTitle;
			this.$data.EditdocumentForm.petId = row.petId;
			this.$data.EditdocumentForm.date = row.date;
			this.$data.EditdocumentForm.fileDir = row.fileDir;
			this.$data.EditdocumentForm.recordId = row.recordId;
			this.$data.EditdocumentForm.fileFormat = row.fileFormat;
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
		//delete document related
		handleDelete(index, row) {
			this.$data.deletedialogVisible = true;
			this.$data.delete_recordId = row.recordId;
			this.$data.delete_fileDir = row.fileDir;
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
		//preview document
		handleView(index, row) {
			this.$data.view_recordTitle = row.recordTitle;
			this.$data.view_fileFormat = row.fileFormat;
			this.$data.view_fileDir = row.fileDir;
			this.$data.dialogPDFVisible = true;
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

		//Edit upload document
		EditbeforeAvatarUpload(file) {
			//can click the save button when loading finished
			this.$data.editloading = true;
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
			//upload to firebase bucket
			uploadBytes(storageRef, file).then(() => {
				getDownloadURL(storageRef).then(url => {
					this.$data.EditdocumentForm.fileDir = url;
					this.$data.editloading = false;
				});
			});
		},
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
			this.$data.displayedRecordList = this.$data.recordList;
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
.record-box {
	display: flex;
	justify-content: space-between;
}

.folder-list {
	margin: 0 2vw 1vw 3vw;
	text-align: center;
	display: flex;
	justify-content: space-around;
}

.right-filter {
	.datepicker {
		width: 210px;
		margin-top: 8px;
		p {
			color: #76553f;
			margin: 0 2px;
			font-family: 'Trebuchet MS';
			font-size: 14px;
			font-weight: bold;
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

.document-dialog-datepet {
	display: flex;
	justify-content: space-between;
	align-items: left;
}
.document-dialog-upload {
	text-align: center;
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
