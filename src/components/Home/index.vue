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

		<el-container>
			<!-- side bar -->
			<el-aside style="width: 65px">
				<!-- <PetsSideBar :petList="userObject.petList" :uid="userObject.uid" /> -->
				<SideMenu
					:petList="userObject.petList"
					:uid="userObject.uid"
				></SideMenu>
			</el-aside>

			<!-- Main part -->
			<el-scrollbar height="92vh" class="main-scroll">
				<el-main style="background-color: #f2f4f7">
					<!-- Dashboard, Calender and folders -->
					<!-- folders -->

					<router-view
						@changeUserAvater="getUserInfo"
						@changeUserInfo="getUserInfo"
					></router-view>
				</el-main>
			</el-scrollbar>
			<!-- end of main part for dashboard -->
		</el-container>
	</el-container>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { onMounted } from 'vue';
import httpServices from '@services';
import PetsTopBar from '@common/components/TopBar/index.vue';
import { Setting } from '@element-plus/icons-vue';
import { Plus } from '@element-plus/icons-vue';
import { CirclePlusFilled } from '@element-plus/icons-vue';
import SideMenu from '../../common/components/SideMenu/index.vue';
import { Carousel, Pagination, Slide } from 'vue3-carousel';
import { FireBaseStorage as storage } from '@services/firebase.js';

import {
	ref as ref_upload,
	ref as ref_user,
	uploadBytes,
	getDownloadURL
} from 'firebase/storage';

import 'vue3-carousel/dist/carousel.css';

const remarks = ref({ '2021-1-13': 'some tings' });
const value = ref(new Date());

onMounted(() => {
	// getUserProfile();
});

// const getUserProfile = async() => {
//     const res = await httpServices.userProfile.getUserProfile({
//         uid: '4EL4hp_qRUYMzzal_G29f',
//     });
//     userObject.image = res.data.data.image;
//     userObject.firstName = res.data.data.firstName;
//     userObject.lastName = res.data.data.lastName;
//     userObject.petList = res.data.data.petList;
//     console.log('res', res);
//     console.log('firstName:', userObject.firstName);
// }
</script>

<script>
export default {
	data() {
		return {
			uid: '4EL4hp_qRUYMzzal_G29f',
			userObject: {
				firstName: '',
				lastName: '',
				image: '',
				petList: []
			}
		};
	},

	created: function () {
		httpServices.dashboard
			.user_dashboard({ uid: this.$data.uid })
			.then(response => {
				let userObject = response.data.data;
				localStorage.setItem('user', JSON.stringify(userObject));
				//edit page, assign pet object to pet form
				this.$data.userObject.firstName = userObject.firstName;
				this.$data.userObject.lastName = userObject.lastName;
				this.$data.userObject.petList = userObject.petList;
				this.$data.userObject.image = userObject.image;
			})
			.catch(error => {
				console.log(error);
			});
	},
	methods: {
		// these two functions are used for temporary needs,
		// once the real upload image function is updated, they should be replaced
		changeAvatar(url) {
			this.userObject.image = url;
			console.log("url of the topbar's avatar changed", url);
		},
		changeInfo(firstName, lastName) {
			this.userObject.firstName = firstName;
			this.userObject.lastName = lastName;
		}
		// this function send a request and get the most up-to-date user infomation (when user infomation is changed)
		// getUserInfo() {
		// 	httpServices.dashboard
		// 		.user_dashboard({ uid: this.$data.uid })
		// 		.then(response => {
		// 			let userObject = response.data.data;
		// 			//edit page, assign pet object to pet form
		// 			this.$data.userObject.firstName = userObject.firstName;
		// 			this.$data.userObject.lastName = userObject.lastName;
		// 			// update user avatar
		// 		});
		// }
	}
};
</script>

<style lang="scss" scoped>
// .main-scroll :deep(.el-scrollbar__view:nth-of-type(1)) {
// 	width: calc(100vw - 75px);
// }
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
		// margin-bottom: 30px;
		// &:last-child {
		//     margin-bottom: 0;
		// }
	}
}
</style>
