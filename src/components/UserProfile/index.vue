<template>
	<div>
		<h1 class="profile-heading">Profile</h1>

		<!-- upper white box with avatar -->

		<div class="upper-box">
			<el-row>
				<el-col :span="4">
					<div class="avatar-container">
						<!-- user avater -->
						<img
							v-if="user.image"
							:src="user.image"
							alt="upload"
							class="avatar-image"
						/>
						<img
							v-else
							src="https://pic.onlinewebfonts.com/svg/img_212908.png"
							class="avatar-image"
						/>

						<!-- <img
							class="avatar-image"
							:src="user.image"
							alt="user avatar image"
						/> -->
					</div>
				</el-col>
				<el-col :span="8">
					<div class="name-and-button-container">
						<div class="name">
							{{ user.firstName + ' ' + user.lastName }}
						</div>
						<div class="button-group">
							<el-upload
								class="upload-demo"
								action=""
								:show-file-list="false"
								:before-upload="beforeAvatarUpload"
								:http-request="Upload"
							>
								<el-button
									class=""
									color="#76553f"
									style="border: #737bc1; margin-bottom: 30px"
									type="primary"
									plain
									:icon="CameraFilled"
								>
									Upload new avatar
								</el-button>
							</el-upload>

							<el-button
								class=""
								color="#76553f"
								style="border: #737bc1; margin-bottom: 30px"
								type="primary"
								plain
								:icon="Edit"
								@click="linkToEditProfile"
							>
								Edit profile
							</el-button>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>

		<h1 class="profile-heading">Basic Information</h1>

		<!-- middle white box with basic info -->

		<div class="middle-box">
			<div class="info-box">
				<div class="heading-line">
					<el-icon><message /></el-icon>
					<div class="info-title">Email</div>
				</div>
				<div class="info-line">
					{{ user.email }}
				</div>
			</div>
			<div class="info-box">
				<div class="heading-line">
					<el-icon size="3vh"><PhoneFilled /></el-icon>
					<div class="info-title">Phone</div>
				</div>
				<div class="info-line">
					{{ user.phone }}
				</div>
			</div>
			<div class="info-box">
				<div class="heading-line">
					<el-icon size="3vh"><LocationFilled /></el-icon>
					<div class="info-title">Location</div>
				</div>
				<div class="info-line">
					{{ user.address }}
				</div>
			</div>
		</div>

		<h1 class="profile-heading">Pets</h1>

		<!-- bottom white box with pets list -->

		<div class="bottom-box">
			<div class="pet" v-for="(item, index) in user.petList" :key="index">
				<div class="pet-avatar-wrapper">
					<img
						:src="item.petAvatar"
						alt="an image of the pet's avatar"
					/>
				</div>

				<div class="pet-name">{{ item.petName }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import httpServices from '@services';
import router from '@/router';
import { PhoneFilled } from '@element-plus/icons-vue';
import { LocationFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

import PetsTopBar from '@common/components/TopBar/index.vue';

import { Setting } from '@element-plus/icons-vue';
import { Plus } from '@element-plus/icons-vue';
import { CirclePlusFilled } from '@element-plus/icons-vue';
import { CameraFilled } from '@element-plus/icons-vue';
import { Edit } from '@element-plus/icons-vue';

import SideMenu from '../../common/components/SideMenu/index.vue';
import { Carousel, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

//firebase related
import { FireBaseStorage as storage } from '@services/firebase.js';
import {
	ref as ref_upload,
	ref as ref_pet_upload,
	uploadBytes,
	getDownloadURL
} from 'firebase/storage';
// import { profile } from 'console';

const upload = ref();
const user = reactive({
	//jys uid
	uid: localStorage.getItem('uid'),
	email: '',
	firstName: '',
	lastName: '',
	phone: null,
	address: null,
	image: '',
	petList: []
});

//get user's data
onMounted(() => {
	// getAllUsers();
	getUserProfile();
	emit('changeUserAvater', user.image);
});

const getUserProfile = async () => {
	const res = await httpServices.userProfile.getUserProfile({
		uid: localStorage.getItem('uid')
	});
	user.firstName = res.data.data.firstName;
	user.lastName = res.data.data.lastName;

	user.email = res.data.data.email;
	user.phone = res.data.data.phone;
	user.isPetSitter = res.data.data.isPetSitter;
	user.address = res.data.data.address;
	console.log('res', res);
	console.log('firstName:', user.firstName);

	//get user avatar
	user.image = res.data.data.image;

	//get pet avatar
	user.petList = res.data.data.petList;
};

const getAllUsers = async () => {
	const res = await httpServices.userProfile.getAllUsers();
	console.log('all users', res);
};

const linkToEditProfile = () => {
	router.push('/home/editprofile');
};

const emit = defineEmits(['changeUserAvater']);

/**
 * when upload is sussessful, emit an event to change the avatar in topbar
 * then display a message
 */
// const handleAvatarSuccess = (response, uploadFile) => {
// 	user.image = URL.createObjectURL(uploadFile.raw);
// 	emit('changeUserAvater', URL.createObjectURL(uploadFile.raw));
// 	ElMessage({
// 		message: 'New avatar uploaded.',
// 		type: 'success'
// 	});
// 	console.log('upload', user.image);
// };

/**
 * check if the file uploaded is JGP or PNG, otherwise cannot be uploaded
 */
const beforeAvatarUpload = function (rawFile) {
	//send image to BE

	if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
		ElMessage.error('Avatar picture must be JPG or PNG file!');
		return false;
	} else if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error('Avatar picture size can not exceed 2MB!');
		return false;
	}
	const currentDate = new Date();
	const timestamp = currentDate.getTime();

	const storageRef = ref_upload(
		storage,
		//jys uid
		user.uid + '_userAvatar' + '_' + timestamp
	);

	uploadBytes(storageRef, rawFile).then(() => {
		//get url from firebase
		getDownloadURL(storageRef).then(url => {
			user.image = url;
			console.log('haha', user.image);
			//post user avatar to BE
			httpServices.userProfile
				.postUserImage({
					//jys uid
					uid: user.uid,
					image: user.image
				})
				.then(response => {
					console.log(response);
					location.reload();
				});
		});
	});
};
</script>
<script>
export default {
	methods: {
		Upload() {},
		handleClose(done) {
			done();
		}
	}
};
</script>

<style lang="scss" scoped>
// .profile-container {
//     position: absolute;
//     top: 0px;
//     bottom: 0px;
//     width: 99%;
//     background-color: #f2f4f7;
.profile-heading {
	color: #76553f;
	font-family: Trebuchet MS;
	font-size: 3vh;
	margin-bottom: 1vh;
}
.upper-box {
	height: 17.5vh;
	padding-left: 5vh;
	margin-bottom: 1vh;
	border-radius: 10px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: left;
	// box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

	.avatar-container {
		display: flex;
		justify-content: center;
		margin-top: 3vh;

		.avatar-image {
			width: 10vh;
			height: 10vh;
		}
	}

	.name-and-button-container {
		text-align: left;
		margin-top: 3vh;
		.name {
			color: #76553f;
			font-family: Trebuchet MS;
		}
		.button-group {
			margin-top: 2vh;
			display: flex;

			.upload-demo {
				margin-right: 3vh;
			}
		}
	}
}

.middle-box {
	padding: 3vh 15vh;
	margin-bottom: 1vh;
	height: 30vh;
	border-radius: 10px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: left;
	// box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

	.info-box {
		color: #76553f;
		font-family: Trebuchet MS;
		.heading-line {
			display: flex;
			// .email-icon {
			//     height: 3vh;
			//     width: 3vh;
			// }
			.info-title {
				margin-left: 1vh;
			}
		}
	}
}

.bottom-box {
	padding: 5vh 10vh;
	border-radius: 10px;
	background-color: white;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	display: flex;
	flex-wrap: wrap;

	.pet {
		width: calc(100% / 7);
		min-width: calc(100% / 7);
		max-width: calc(100% / 7);
		margin-bottom: 5vh;

		display: flex;
		justify-content: space-between;
		flex-direction: column;

		.pet-avatar-wrapper {
			display: flex;
			justify-content: center;
			margin-bottom: 2vh;
			img {
				width: 11vh;
				height: 11vh;
				border-radius: 1vh;
				text-align: center;
			}
		}
		.pet-name {
			color: #76553f;
			font-family: Trebuchet MS;
			text-align: center;
		}
	}
}

// }
</style>
