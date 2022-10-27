<template>
	<div class="outer-folder-box">
		<span class="main-title-text">Records</span>
		<div class="inner-folder-box">
			<!-- cards showing the folders -->
			<el-row>
				<div class="folder-box">
					<div class="folder" @click="toInvoice">
						<img
							class="folder-image"
							src="https://api.iconify.design/bxs/folder.svg?color=%23e9eaf4"
						/>
						<el-button class="folder-name-button" type="text"
							>Invoice
						</el-button>
					</div>

					<div class="folder" @click="toMedication">
						<img
							class="folder-image"
							src="https://api.iconify.design/bxs/folder.svg?color=%23ffeeea"
						/>
						<el-button class="folder-name-button" type="text"
							>Medication
						</el-button>
					</div>

					<div class="folder" @click="toVaccination">
						<img
							class="folder-image"
							src="https://api.iconify.design/bxs/folder.svg?color=%23fff9ec"
						/>
						<el-button class="folder-name-button" type="text"
							>Vaccination
						</el-button>
					</div>
				</div>

				<!-- add folder -->
				<el-col :span="3">
					<div class="folder-box">
						<img
							class="folder-image"
							src="https://api.iconify.design/bxs/folder-plus.svg?color=%23c0effc"
						/>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>

	<!-- Events, Tasks, and Bookings -->
	<div class="outer-folder-box">
		<span class="main-title-text">Events, Tasks and Bookings</span>
		<div class="outer-events-tasks-box">
			<el-row :gutter="5">
				<!-- calender -->
				<el-col :span="6">
					<v-date-picker v-model="value" locale="eng" />

					<el-button
						class="add-button"
						color="#76553f"
						style="border: #fd6540"
						type="primary"
						:icon="Calendar"
						plain
						@click="goCalendar"
					>
						Calendar
					</el-button>
				</el-col>
				<el-col :span="6" class="summary-events-tasks-box">
					<EventSummary />
					<el-button
						class="add-button"
						color="#76553f"
						style="border: #737bc1"
						type="primary"
						plain
						:icon="Flag"
						@click="setEventDialogVisible"
					>
						Add Event
					</el-button>

					<template v-if="eventDialogVisible">
						<EventDialog
							:dialogVisible="eventDialogVisible"
							@setVisible="setEventDialogVisible"
						/>
					</template>
				</el-col>
				<!-- events and tasks for today -->
				<el-col :span="6" class="summary-events-tasks-box">
					<TaskSummary />
					<el-button
						class="add-button"
						color="#76553f"
						style="border: #fd6540"
						type="primary"
						plain
						:icon="CircleCheck"
						@click="setTaskDialogVisible"
					>
						Add Task
					</el-button>
					<TaskDialog
						v-if="taskDialogVisible"
						:dialogVisible="taskDialogVisible"
						@setVisible="setTaskDialogVisible"
					/>
				</el-col>

				<el-col :span="6" class="summary-events-tasks-box">
					<BookingSummary />
					<el-button
						class="add-button"
						color="#76553f"
						style="border: #fd6540"
						type="primary"
						plain
						:icon="Opportunity"
						@click="setBookingDialogVisible"
					>
						Add Booking
					</el-button>
					<BookingDialog
						v-if="bookingDialogVisible"
						:dialogVisible="bookingDialogVisible"
						@setVisible="setBookingDialogVisible"
					/>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script setup>
import { defineAsyncComponent, ref, watch } from 'vue';
import {
	Flag,
	CircleCheck,
	Calendar,
	Opportunity
} from '@element-plus/icons-vue';

import TaskDialog from '@common/components/TaskDialog/index.vue';
import EventDialog from '@common/components/EventDialog/index.vue';
import EventSummary from '@common/components/EventSummary/index.vue';
import TaskSummary from '../../common/components/TaskSummary/index.vue';

import BookingSummary from '../../common/components/BookingSummary/index.vue';
import BookingDialog from '../../common/components/BookingDialog/index.vue';

import { useRoute, useRouter } from 'vue-router';

const router = useRouter();

const remarks = ref({ '2021-1-13': 'some tings' });
const value = ref(new Date());
const month = new Date().getMonth();
const year = new Date().getFullYear();
const masks = { weekdays: 'WWW' };

const userObject = {
	...JSON.parse(localStorage.getItem('user'))
};

const eventDialogVisible = ref(false);
const setEventDialogVisible = () => {
	console.log('!eventDialogVisible.value', !eventDialogVisible.value);
	eventDialogVisible.value = !eventDialogVisible.value;
};

const taskDialogVisible = ref(false);
const setTaskDialogVisible = () => {
	taskDialogVisible.value = !taskDialogVisible.value;
};

const bookingDialogVisible = ref(false);
const setBookingDialogVisible = () => {
	bookingDialogVisible.value = !bookingDialogVisible.value;
};

const toInvoice = () => {
	router.push('/home/invoice');
};
const toVaccination = () => {
	router.push('/home/vaccinationhistory');
};
const toMedication = () => {
	router.push('/home/medication');
};

const goCalendar = () => {
	router.push('/home/calendar');
};
</script>

<style lang="scss" scoped>
.el-col {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
}
.dashboard-home {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 99%;
	background-color: #f2f4f7;
}

.el-main {
	padding: 20px 25px;
}

// this folder box including the text record and the large white box
.outer-folder-box {
	margin-top: 0%;
	margin-bottom: 30px;
	display: flex;
	justify-content: space-around;
	flex-direction: column;
}

.main-title-text {
	margin-left: 1rem;
	margin-bottom: 10px;
	font-size: 24px;
	color: #76553f;
	font-family: Trebuchet MS;
	font-weight: bold;
}

// the large white box below the text record
.inner-folder-box {
	height: 17.5vh;
	width: 99%;
	border-radius: 10px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: left;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

	//box for each folder, including the folder name and folder icon
	.folder-box {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		padding-left: 2vw;
		margin-top: 0.5vmax;
		margin-bottom: 0.5vmax;

		.folder {
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			align-items: center;
			margin: 0 2vw;
			cursor: pointer;
		}

		.folder-image {
			// height: 10vh;
			width: 12vh;
		}

		.folder-name-button {
			padding-top: 0.1vmax;
			align-items: center;
			width: 1vw;
			font-weight: bold;
		}

		.el-button > span {
			font-weight: 16px;
		}
	}
}

.inner-events-tasks-box {
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;

	.album-pic {
		width: 275px;
		height: 270px;
		border-radius: 10px;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	}
}

//this box is the large white box under title events and tasks
.outer-events-tasks-box {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: white;
	box-sizing: border-box;
	width: 99%;
	height: 50vh;
	border-radius: 10px;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	padding: 0 10px;
	.el-row {
		height: 75%;
	}
}

//this box including all the events and tasks for this day
.summary-events-tasks-box {
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: center;

	:deep(.el-card__body) {
		padding: 2vh;
		text-align: center;
	}
}

.add-events-tasks-box {
	display: flex;
	justify-content: space-evenly;
	flex-direction: column;
	align-items: center;
	padding-left: 1vw;

	.add-button {
		width: 7rem;
		height: 3rem;
		border-radius: 1rem;
		margin-bottom: 20px;
	}
}
</style>
