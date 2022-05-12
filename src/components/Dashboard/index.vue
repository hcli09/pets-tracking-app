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

	<!-- Events and tasks -->
	<div class="outer-folder-box">
		<span class="main-title-text">Events and Tasks</span>
		<div class="outer-events-tasks-box">
			<el-row class="inner-events-tasks-box" :gutter="30">
				<!-- calender -->
				<el-col :span="6">
					<el-row style="position: relative">
						<v-date-picker v-model="value" locale="eng" />
						<div
							style="z-index: 9999"
							class="absolute bottom-2 left-1/2 transform -translate-x-1/2"
						>
							<router-link to="/calendar">
								<el-button
									class="add-button"
									color="#76553f"
									style="border: #fd6540"
									type="primary"
									:icon="Calendar"
									plain
								>
									Calendar
								</el-button>
							</router-link>
						</div>
					</el-row>
				</el-col>
				<el-col :span="7" class="summary-events-tasks-box">
					<EventSummary />
				</el-col>
				<!-- events and tasks for today -->
				<el-col :span="7" class="summary-events-tasks-box">
					<TaskSummary />
				</el-col>

				<!-- add button for events and tasks -->
				<el-col :span="3" class="add-events-tasks-box">
					<el-row>
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

						<EventDialog
							:dialogVisible="eventDialogVisible"
							@setVisible="setEventDialogVisible"
						/>
					</el-row>
					<el-row>
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
							:dialogVisible="taskDialogVisible"
							@setVisible="setTaskDialogVisible"
						/>
					</el-row>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Carousel, Pagination, Slide } from 'vue3-carousel';
import { Flag, CircleCheck, Calendar } from '@element-plus/icons-vue';

import EventDialog from '@common/components/EventDialog/index.vue';
import TaskDialog from '@common/components/TaskDialog/index.vue';

import EventSummary from '@common/components/EventSummary/index.vue';
import TaskSummary from '../../common/components/TaskSummary/index.vue';

import httpServices from '@services';
import router from '../../router';

// import 'vue3-carousel/dist/carousel.css';

const remarks = ref({ '2021-1-13': 'some tings' });
const value = ref(new Date());
const month = new Date().getMonth();
const year = new Date().getFullYear();
const masks = { weekdays: 'WWW' };

const eventDialogVisible = ref(false);
const taskDialogVisible = ref(false);

const setEventDialogVisible = () => {
	eventDialogVisible.value = !eventDialogVisible.value;
};

const setTaskDialogVisible = () => {
	taskDialogVisible.value = !taskDialogVisible.value;
};

const toInvoice = () => {
	router.push('/invoice');
};
const toVaccination = () => {
	router.push('/vaccinationhistory');
};
const toMedication = () => {
	router.push('/medication');
};
</script>

<script>
export default {
	data() {
		return {
			uid: '4EL4hp_qRUYMzzal_G29f',
			userObject: {
				firstName: '',
				lastName: '',
				image: 'https://cdn-icons-png.flaticon.com/512/1320/1320933.png',
				petList: [],
				taskList: [],
				eventList: [],
				folderList: [
					{ folderid: 1, folderName: 'Invoice' },
					{ folderid: 2, folderName: 'Medication Report' },
					{ folderid: 3, folderName: 'Vaccination History' }
				]
			},
			album: [
				{
					id: 1,
					picURL: 'https://www.rd.com/wp-content/uploads/2020/07/animalmemes-12.jpg?w=1414'
				},
				{
					id: 2,
					picURL: 'https://www.rd.com/wp-content/uploads/2020/12/When-you-have-three-zoom-calls-back-to-back-1297963220.jpg?w=1200'
				},
				{
					id: 3,
					picURL: 'https://www.rd.com/wp-content/uploads/2020/07/animalmemes-21.jpg?w=1414'
				},
				{
					id: 4,
					picURL: 'https://www.rd.com/wp-content/uploads/2020/07/animalmemes-20.jpg?w=1414'
				}
			]
		};
	},
	created: function () {
		httpServices.dashboard
			.user_dashboard({ uid: this.$data.uid })
			.then(response => {
				let userObject = response.data.data;

				//edit page, assign pet object to pet form
				this.$data.userObject.firstName = userObject.firstName;
				this.$data.userObject.lastName = userObject.lastName;
				this.$data.userObject.petList = userObject.petList;
			})
			.catch(error => {
				console.log(error);
			});
	}
};
</script>

<style lang="scss" scoped>
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
	align-items: center;
	background-color: white;
	box-sizing: border-box;
	width: 99%;
	height: 50vh;
	border-radius: 10px;
	padding: 20px;
	padding-left: 50px; // control calendar's padding to the left
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

	.el-row {
		padding-top: 2vh;
	}
}

//this box including all the events and tasks for this day
.summary-events-tasks-box {
	display: flex;
	justify-content: space-evenly;
	flex-direction: column;
	align-items: center;
	height: 270px;

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
