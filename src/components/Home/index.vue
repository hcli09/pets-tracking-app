<template>
	<el-container class="dashboard-home">
		<!-- Top bar -->
		<el-header style="height: 8vh; padding: 0">
			<PetsTopBar
				:firstName="userObject.firstName"
				:lastName="userObject.lastName"
				:UserAvatar="userObject.image"
			/>
		</el-header>

		<el-container style="position: relative">
			<!-- side bar -->
			<el-aside style="width: 65px">
				<SideMenu :petList="userObject.petList" />
			</el-aside>

			<!-- Main part -->
			<el-scrollbar height="92vh" class="main-scroll">
				<el-main style="background-color: #f2f4f7">
					<!-- Dashboard, Calender and folders -->
					<!-- folders -->

					<router-view
						@changeUserAvater="getUserInfo"
						@changeUserInfo="getUserInfo"
					/>
				</el-main>
			</el-scrollbar>
			<!-- <template v-if="isRenderBackButton"> -->
			<BackButton />
			<!-- </template> -->
		</el-container>
	</el-container>
</template>

<script setup>
import { onBeforeMount, reactive } from 'vue';
import PetsTopBar from '@common/components/TopBar/index.vue';
import SideMenu from '../../common/components/SideMenu/index.vue';

import BackButton from '../../common/components/BackButton/index.vue';
import httpServices from '@services';

let userObject = reactive({});

const getUserInfo = async () => {
	const { data: res } = await httpServices.dashboard.user_dashboard({
		uid: localStorage.getItem('uid')
	});

	Object.assign(userObject, res.data);
	localStorage.setItem('user', JSON.stringify(res.data));
};

onBeforeMount(() => {
	getUserInfo();
});
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
	width: calc(100vw - 75px);
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
	// box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

	//box for each folder, including the folder name and folder icon
	.folder-box {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		align-items: center;
		padding-left: 2vw;
		margin-top: 0.5vmax;
		margin-bottom: 0.5vmax;

		.folder-image {
			// height: 10vh;
			width: 12vh;
		}

		.folder-name-button {
			padding-top: 0.1vmax;
			align-items: center;
			width: 1vh;
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
	// section.carousel {
	//     height: 300px;
	// }

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
	padding: 10px;
	// box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
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
	// background: #fd6540;

	//this box including one event/task box and correponding start time
	.events-tasks-big-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-top: 0;
		margin-bottom: 20px;
	}

	.start-time-event-task {
		margin-right: 1.8vw;
		color: #908f8c;
		font-family: Trebuchet MS;
		font-size: 2vmin;
		width: 2vw;
	}

	.event-card {
		width: 35vh;
		height: 10vh;
		background-color: #e9eaf4;
		border-radius: 1rem;
	}

	.task-card {
		width: 35vh;
		height: 10vh;
		background-color: #ffeeea;
		border-radius: 1rem;
	}

	//including event/task name, time and pet name
	.event-small-box {
		height: 6vh;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;

		//event name and pet name
		b {
			font-family: Trebuchet MS;
			color: #4d56a2;
			font-size: 1.8vmin;
		}

		//event detail time
		p {
			font-family: Trebuchet MS;
			color: #737bc1;
			font-size: 1.5vmin;
		}
	}

	//including event/task name and time
	.event-task-inside {
		padding-right: 2rem;
	}

	:deep(.el-card__body) {
		padding: 2.2vh;
		text-align: center;
	}

	:deep(.el-card__body) {
		padding: 2.2vh;
		text-align: center;
	}

	//including event/task name, time and pet name
	.task-small-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
		margin-top: 1.4vh;

		b {
			font-family: Trebuchet MS;
			color: #fd6540;
			font-size: 1.8vmin;
		}
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
	}
}
</style>
