<template>
	<div class="list-container">
		<el-skeleton
			style="width: 100%"
			direction="vertical"
			alignment="flex-start"
			:loading="loading"
			animated
			:rows="12"
		>
			<el-table
				row-key="recordId"
				ref="filterTable"
				:data="events"
				class="folder-list"
			>
				<!-- Document title -->
				<el-table-column
					align="left"
					label="Event"
					width="270"
					column-key="eventId"
				>
					<template #default="scope">
						<div class="flex items-center">
							{{ scope.row.eventTitle }}
							&nbsp;

							<el-tooltip
								class="box-item"
								effect="dark"
								:content="scope.row.description"
								placement="right"
							>
								<el-icon v-if="scope.row.description"
									><InfoFilled
								/></el-icon>
							</el-tooltip>
						</div>
					</template>
				</el-table-column>

				<el-table-column
					prop="eventType"
					align="left"
					label="Type"
					width="100"
					column-key="eventId"
				/>

				<el-table-column
					align="left"
					label="Pets"
					column-key="eventId"
					width="80"
				>
					<template #default="scope">
						<el-tooltip
							class="box-item"
							effect="dark"
							:content="`with ${scope.row.petAbList
								.map(pet => pet.petName)
								.join(', ')}`"
							placement="right"
						>
							<el-scrollbar>
								<div class="flex items-center">
									<img
										v-for="pet in scope.row.petAbList"
										:src="pet.petAvatar"
										style="
											width: 30px;
											border-radius: 50%;
											margin-right: 2px;
										"
									/>
								</div>
							</el-scrollbar>
						</el-tooltip>
					</template>
				</el-table-column>

				<el-table-column
					prop="startDateTime"
					align="center"
					label="Start Date and Time"
					column-key="eventId"
					width="180"
					sortable
				/>

				<el-table-column
					prop="endDateTime"
					align="center"
					label="End Date and Time"
					column-key="eventId"
					width="180"
					sortable
				/>

				<!-- Operations -->
				<el-table-column label="Operations" align="center" width="150">
					<template #default="scope">
						<el-button
							size="small"
							@click="handleEdit(scope.row.eventId)"
							style="background: #f1eeec"
							>Edit
						</el-button>

						<el-popconfirm
							confirm-button-text="Yes"
							cancel-button-text="No, thanks"
							:icon="InfoFilled"
							icon-color="#f56c6c"
							title="Are you sure to delete this event?"
							@confirm="confirmDeleteEvent(scope.row.eventId)"
							@cancel="cancelDeleteEvent"
						>
							<template #reference>
								<el-button size="small" type="danger"
									>Delete</el-button
								>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
		</el-skeleton>
		<template v-if="editEventDialogVisible">
			<EventDialog
				:eventId="eventIdToEdit"
				:dialogVisible="editEventDialogVisible"
				@setVisible="setEditEventDialogVisible"
			/>
		</template>

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

				<div class="filter_add">
					<el-button
						class="right_button"
						style="margin-top: 1vw"
						type="primary"
						plain
						@click="resetRecordList"
						>Reset Filters</el-button
					>
					<!-- add new document pop up window -->
					<el-button
						class="right_button"
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
</template>
<script setup>
import { defineProps, reactive, inject, ref, defineAsyncComponent } from 'vue';
import services from '../../../services';
import { InfoFilled } from '@element-plus/icons-vue';

const EventDialog = defineAsyncComponent(() =>
	import('../../../common/components/EventDialog/index.vue')
);
const reload = inject('reload');
const props = defineProps({
	currUid: {
		type: String,
		required: true
	}
});

const { currUid } = props;

const events = reactive([]);
const loading = ref(true);
const editEventDialogVisible = ref(false);
const getAllEventsAsync = async () => {
	const { data: res } = await services.events.getAllEvents({
		uid: props.currUid
	});
	if (res.data) {
		loading.value = false;
		events.push(...res.data);
	}
};
getAllEventsAsync();

const confirmDeleteEvent = async eventId => {
	const { data: res } = await services.events.deleteEvent({
		uid: currUid,
		eventId
	});
	if (res.status === 200) {
		ElMessage({
			message: 'Event successfully deleted',
			type: 'success'
		});
		reload();
	}
};
const eventIdToEdit = ref('');
const handleEdit = eventId => {
	eventIdToEdit.value = eventId;
	editEventDialogVisible.value = true;
};
const setEditEventDialogVisible = () => {
	editEventDialogVisible.value = !editEventDialogVisible.value;
};
</script>

<script>
// export default {
// 	props: ['petList', 'petOptions', 'initial_recordType', 'curr_uid'],

// 	data() {
// 		return {
// 			editloading: false,
// 			addloading: false,
// 			uid: this.curr_uid,
// 			recordList: [],
// 			recordType: this.initial_recordType,
// 			//filter related
// 			dateRange: '',
// 			petSelected: '',
// 			displayedRecordList: [],
// 			//add diaglog related
// 			AdddialogFormVisible: false,
// 			documentForm: {
// 				recordTitle: '',
// 				petId: '',
// 				date: '',
// 				fileDir: '',
// 				fileFormat: ''
// 			},

// 			//delete dialog related
// 			deletedialogVisible: false,
// 			delete_recordId: '',
// 			delete_fileDir: '',

// 			//view pdf dialog related
// 			dialogPDFVisible: false,
// 			view_fileDir: '',
// 			view_fileFormat: '',
// 			view_recordTitle: '',

// 			//edit dialog related
// 			EditdialogFormVisible: false,
// 			EditdocumentForm: {
// 				recordId: '',
// 				recordTitle: '',
// 				petId: '',
// 				date: '',
// 				fileDir: '',
// 				fileFormat: ''
// 			}
// 		};
// 	},

// 	created: function () {
// 		//get record list
// 		httpServices.invoicemed
// 			.getAllRecords({
// 				uid: this.$data.uid,
// 				recordType: this.$data.recordType
// 			})
// 			.then(response => {
// 				this.$data.recordList = response.data.data;
// 				console.log('111', response.data.data);
// 				this.$data.displayedRecordList = this.$data.recordList;
// 			})
// 			.catch(error => {
// 				console.log(error);
// 			});
// 	},

// 	methods: {
// 		applyFilter() {
// 			this.$data.displayedRecordList = this.$data.recordList.slice();

// 			if (this.$data.dateRange !== '' && this.$data.petSelected === '') {
// 				let startDate = new Date(
// 					this.$data.dateRange[0].toISOString().split('T')[0]
// 				);
// 				let endDate = new Date(
// 					this.$data.dateRange[1].toISOString().split('T')[0]
// 				);

// 				for (let record of this.$data.recordList) {
// 					let recordDate = new Date(record.date);
// 					if (
// 						recordDate.getTime() < startDate.getTime() ||
// 						recordDate.getTime() > endDate.getTime()
// 					) {
// 						var index =
// 							this.$data.displayedRecordList.indexOf(record);
// 						if (index !== -1) {
// 							this.$data.displayedRecordList.splice(index, 1);
// 						}
// 					}
// 				}
// 			}

// 			if (this.$data.petSelected !== '' && this.$data.dateRange === '') {
// 				for (let record of this.$data.recordList) {
// 					if (record.petName != this.$data.petSelected) {
// 						var index =
// 							this.$data.displayedRecordList.indexOf(record);
// 						if (index !== -1) {
// 							this.$data.displayedRecordList.splice(index, 1);
// 						}
// 					}
// 				}
// 			}

// 			if (this.$data.dateRange !== '' && this.$data.petSelected !== '') {
// 				let startDate = new Date(
// 					this.$data.dateRange[0].toISOString().split('T')[0]
// 				);
// 				let endDate = new Date(
// 					this.$data.dateRange[1].toISOString().split('T')[0]
// 				);

// 				for (let record of this.$data.recordList) {
// 					let recordDate = new Date(record.date);
// 					console.log(record);
// 					if (
// 						recordDate.getTime() < startDate.getTime() ||
// 						recordDate.getTime() > endDate.getTime() ||
// 						record.petName !== this.$data.petSelected
// 					) {
// 						var index =
// 							this.$data.displayedRecordList.indexOf(record);
// 						if (index !== -1) {
// 							this.$data.displayedRecordList.splice(index, 1);
// 						}
// 					}
// 				}
// 			}
// 		},
// 		resetRecordList() {
// 			this.$data.displayedRecordList = this.$data.recordList;
// 			this.$data.dateRange = '';
// 			this.$data.petSelected = '';
// 		},
// 		Upload() {},
// 		handleClose(done) {
// 			done();
// 		}
// 	}
// };
</script>

<style lang="scss" scoped>
.list-container {
	display: flex;
	justify-content: space-between;
}

.folder-list {
	text-align: center;
	display: flex;
	justify-content: space-around;
}

.right-filter {
	margin: 0 1vw;
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

	.right_button {
		margin-left: 0;
		margin-right: 0;
		width: 100px;
		height: 40px;
	}
}
</style>
