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
					column-key="booking_id"
				/>

				<el-table-column
					align="left"
					label="Pets"
					column-key="booking_id"
					width="60"
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
					sortable
				/>

				<el-table-column
					prop="end_time"
					align="center"
					label="End Date and Time"
					column-key="booking_id"
					sortable
				/>

				<el-table-column
					prop="status"
					align="center"
					label="Status"
					column-key="booking_id"
					sortable
				/>

				<!-- Operations -->
				<el-table-column label="Operations" align="center">
					<template #default="scope">
						<!-- if the booking is pending, the cancel button should be disabled -->

						<el-popconfirm
							v-if="scope.row.status === 'pending'"
							confirm-button-text="Yes"
							cancel-button-text="No, thanks"
							:icon="InfoFilled"
							icon-color="#f56c6c"
							title="Are you sure to cancel this booking?"
							@confirm="confirmDeleteEvent(scope.row.booking_id)"
							@cancel="cancelDeleteEvent"
						>
							<template #reference>
								<el-tooltip
									class="box-item"
									effect="dark"
									content="Can't cancel a pending booking"
									placement="top"
								>
									<div>
										<el-button
											size="small"
											type="danger"
											disabled
										>
											Cancel
										</el-button>
									</div>
								</el-tooltip>
							</template>
						</el-popconfirm>

						<el-popconfirm
							v-else
							confirm-button-text="Yes"
							cancel-button-text="No, thanks"
							:icon="InfoFilled"
							icon-color="#f56c6c"
							title="Are you sure to cancel this booking?"
							@confirm="
								confirmCancelBooking(scope.row.booking_id)
							"
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
							:value="pet.petId"
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
						@click="resetFilters"
						>Reset Filters</el-button
					>
				</div>
			</el-form>
		</div>
	</div>
</template>
<script setup>
import { defineProps, reactive, inject, ref, toRaw } from 'vue';
import services from '../../../services';
import { InfoFilled } from '@element-plus/icons-vue';
import moment from 'moment';

const reload = inject('reload');
const props = defineProps({
	currUid: {
		type: String,
		required: true
	}
});

const { currUid } = props;
const petList = reactive([...JSON.parse(localStorage.getItem('user')).petList]);
const bookings = ref([]);
const loading = ref(true);
const editEventDialogVisible = ref(false);
const baseData = ref([]);

const getAllBookingsAsync = async () => {
	const { data: res } = await services.bookingTable.getBookingList({
		uid: props.currUid
	});
	if (res.data) {
		loading.value = false;
		bookings.value = res.data;
		baseData.value = res.data;
	}
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
		console.log('cancel fail: ', res.message);
		ElMessage.error('error');
	}
};

const petSelected = ref('');
const dateRange = ref('');
const MOMENT_FORMAT = 'YYYY-MM-DD HH:mm';
const applyFilter = () => {
	bookings.value = baseData.value;

	const range = dateRange.value
		? toRaw(dateRange.value).map(item => moment(item).format(MOMENT_FORMAT))
		: [];
	if (dateRange.value && petSelected.value) {
		bookings.value = bookings.value
			.filter(booking =>
				moment(booking.start_time).isBetween(range[0], range[1])
			)
			.filter(booking => booking.pet_id_list.includes(petSelected.value));
	} else if (dateRange.value) {
		bookings.value = bookings.value.filter(booking =>
			moment(booking.start_time).isBetween(range[0], range[1])
		);
	} else if (petSelected.value) {
		bookings.value = bookings.value.filter(booking =>
			booking.pet_id_list.includes(petSelected.value)
		);
	}
};

const resetFilters = () => {
	dateRange.value = '';
	petSelected.value = '';
	bookings.value = baseData.value;
};
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
