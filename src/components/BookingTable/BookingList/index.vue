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
				:data="bookings"
				class="folder-list"
			>
				<!-- Document title -->
				<el-table-column
					align="left"
					label="Title"
					width="270"
					column-key="booking_id"
				>
					<template #default="scope">
						<div class="flex items-center">
							{{ scope.row.title }}
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
					prop="attendee"
					align="left"
					label="Invitee"
					width="200"
					column-key="booking_id"
				/>

				<el-table-column
					align="left"
					label="Pets"
					column-key="booking_id"
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
										:key="pet.petId"
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
					prop="start_time"
					align="center"
					label="Start Date and Time"
					column-key="booking_id"
					width="180"
					sortable
				/>

				<el-table-column
					prop="end_time"
					align="center"
					label="End Date and Time"
					column-key="booking_id"
					width="180"
					sortable
				/>

				<!-- Operations -->
				<el-table-column label="Operations" align="center" width="150">
					<template #default="scope">
						<!-- <el-button
							size="small"
							@click="handleEdit(scope.row.booking_id)"
							style="background: #f1eeec"
							>Edit
						</el-button> -->

						<el-popconfirm
							confirm-button-text="Yes"
							cancel-button-text="No, thanks"
							:icon="InfoFilled"
							icon-color="#f56c6c"
							title="Are you sure to cancel this booking?"
							@confirm="confirmCancelBooking(scope.row.booking_id)"
							@cancel="cancelDeleteEvent"
						>
							<template #reference>
								<el-button size="small" type="danger"
									>Cancel</el-button
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

// const bookings = reactive([
//     {
//         booking_id: '02',
//         pet_id_list: ["HASGu7OfvhJB0fhhLbIwA","AonE9egnd-QIG7W8J4CtK"],
//         invitee: 'min.du@anu.edu.au',
//         title: 'Health check',
//         start_time: "2022-09-11 17:00",
//         end_time: "2022-09-11 18:00",
//         petAbList: [{petId: 'HASGu7OfvhJB0fhhLbIwA', petName: 'Olive', petAvatar: 'src/assets/booking-table-temp/bernard.jpg'},
//         {petId: 'AonE9egnd-QIG7W8J4CtK', petName: 'Bernard', petAvatar: 'src/assets/booking-table-temp/olive.jpg'}]

//     },
// 	{
//         booking_id: '03',
//         pet_id_list: ["HASGu7OfvhJB0fhhLbIwA"],
//         invitee: 'xinyu.kang@anu.edu.au',
//         title: 'Vaccination Bernard',
//         start_time: "2022-09-23 15:00",
//         end_time: "2022-09-23 16:00",
//         petAbList: [{petId: 'HASGu7OfvhJB0fhhLbIwA', petName: 'Olive', petAvatar: 'src/assets/booking-table-temp/bernard.jpg'},
//         ]

//     },
// 	{
//         booking_id: '04',
//         pet_id_list: ["AonE9egnd-QIG7W8J4CtK"],
//         invitee: 'harry.li@anu.edu.au',
//         title: 'Bernard play date',
//         start_time: "2022-09-29 17:00",
//         end_time: "2022-09-29 18:00",
//         petAbList: [{petId: 'HASGu7OfvhJB0fhhLbIwA', petName: 'Olive', petAvatar: 'src/assets/booking-table-temp/bernard.jpg'},
//         ]

//     },	
// ]);
const bookings = reactive([])
const loading = ref(true);
// const loading = ref(false);
const editEventDialogVisible = ref(false);
const getAllBookingsAsync = async () => {
	const { data: res } = await services.bookingTable.getBookingList({
		uid: props.currUid
	});
	if (res.data) {
		loading.value = false;
		bookings.push(...res.data);
	}
    console.log("uid: ", uid)
};
getAllBookingsAsync();

const confirmCancelBooking = async booking_id => {
	const { data: res } = await services.bookingTable.cancelBooking({
		booking_id: booking_id
	});
	if (res.status === 200) {
		ElMessage({
			message: 'Booking successfully deleted',
			type: 'success'
		});
		reload();
	}
	if (!res) {
		console.log("cancel fail: ", res.message)
		ElMessage.error('error')

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


const test = () => {

    console.log("bookings: ", bookings)
}
test()


</script>

<script>

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
