<template>
	<div class="edit-profile-container">
		<h1 class="edit-profile-heading">Edit profile</h1>

		<div class="avatar-container">
			<img
				v-if="ruleForm.image"
				:src="ruleForm.image"
				alt="upload"
				class="avatar-image"
			/>
			<img
				v-else
				src="https://pic.onlinewebfonts.com/svg/img_212908.png"
				class="avatar-image"
			/>
			<!-- <img class="avatar-image" :src="imageURL" alt="user avatar image" /> -->
		</div>

		<!-- upload avatar -->
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

		<el-form
			ref="ruleFormRef"
			:model="ruleForm"
			:rules="rules"
			label-width="140px"
			label-position="left"
			class="demo-ruleForm"
			:size="formSize"
		>
			<el-form-item label="First Name" prop="firstName">
				<el-input v-model="ruleForm.firstName" />
			</el-form-item>
			<el-form-item label="Last Name" prop="lastName">
				<el-input v-model="ruleForm.lastName" />
			</el-form-item>
			<el-form-item label="Phone" prop="phone">
				<el-input v-model.number="ruleForm.phone" />
			</el-form-item>
			<el-form-item label="Location" prop="location">
				<el-select
					v-model="ruleForm.location"
					filterable
					placeholder="Select or search your city"
				>
					<el-option
						v-for="item in locationList"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					/>
				</el-select>
			</el-form-item>

			<el-form-item label="Pet Sitter Status" prop="petSitterStatus">
				<el-select
					v-model="ruleForm.petSitterStatus"
					placeholder="Pet Sitter Status"
				>
					<el-option label="Yes" value="true" />
					<el-option label="No" value="false" />
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button
					class="save-button"
					type="primary"
					@click="submitForm(ruleFormRef)"
					>SAVE</el-button
				>
				<el-button @click="resetForm(ruleFormRef)">RESET</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup>
//firebase related
import { FireBaseStorage as storage } from '@services/firebase.js';
import {
	ref as ref_get,
	ref as ref_upload,
	uploadBytes,
	getDownloadURL
} from 'firebase/storage';

import { reactive, ref, onMounted } from 'vue';
import httpServices from '@services';
import router from '@/router';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { CameraFilled } from '@element-plus/icons-vue';

// const user = reactive({
//     uid: localStorage.getItem('uid'),
//     email: '',
//     firstName: '',
//     lastName: '',
//     phone: null,
//     address: null,
//     image: '',
// })

//jys uid
const uid = localStorage.getItem('uid');
const formSize = ref('default');
const ruleFormRef = ref();
const ruleForm = reactive({
	firstName: '',
	lastName: '',
	phone: '',
	location: '',
	petSitterStatus: '',
	image: ''
});

const value = ref('');
// const locationList = reactive({
//     list: []
// })
const locationList = ref([]);

const emit = defineEmits(['changeUserAvater', 'changeUserInfo']);

const rules = reactive({
	firstName: [
		{ required: true, message: 'Please input first name', trigger: 'blur' }
	],
	lastName: [
		{ required: true, message: 'Please input last name', trigger: 'blur' }
	],
	phone: [
		// { required: true, message: 'Please input phone number', trigger: 'blur' },
		{ type: 'number', message: 'Please input correct phone number' }
	],
	petSitterStatus: [
		//   { required: true, message: 'Please select your pet sitter status', trigger: 'change' }
	]
});

const submitForm = async formEl => {
	if (!formEl) return;
	await formEl.validate((valid, fields) => {
		if (valid) {
			console.log('form is valid');
			editUserProfile();
		} else {
			console.log('form is not valid', fields);
		}
	});
};

const resetForm = formEl => {
	if (!formEl) return;
	formEl.resetFields();
};

//get user's data
onMounted(() => {
	getUserProfile();
	getLocationList();
});

const getLocationList = async () => {
	const res = await httpServices.userProfileEdit.getLocationList();
	let tempLocationList = [];
	// console.log("location list: ", res.data.data[0])
	for (let item of res.data.data) {
		// console.log("item", item)
		locationList.value.push({ value: item.cityName, label: item.cityName });
	}
	// locationList.value = tempLocationList
	// console.log("location list: ", res.data.data);
	console.log('locationList: ', locationList);
	// return tempLocationList
};

const getUserProfile = async () => {
	const res = await httpServices.userProfile.getUserProfile({
		//jys uid
		uid: localStorage.getItem('uid')
	});
	ruleForm.firstName = res.data.data.firstName;
	ruleForm.lastName = res.data.data.lastName;
	ruleForm.phone = Number(res.data.data.phone);
	ruleForm.email = res.data.data.email;
	ruleForm.location = res.data.data.address;
	ruleForm.petSitterStatus = res.data.data.isPetSitter ? 'Yes' : 'No';
	//get user avatar URL
	ruleForm.image = res.data.data.image;

	// console.log('res', res);
	// console.log('form', ruleForm.value);
	// console.log('form first name', ruleForm.firstName);
};

const editUserProfile = async () => {
	console.log('upload first name', ruleForm.firstName);
	let status = false;
	if (ruleForm.petSitterStatus.value) {
		status = true;
	} else {
		status = false;
	}

	const res = await httpServices.userProfileEdit.editUserProfile({
		//jys uid
		uid: localStorage.getItem('uid'),
		firstName: ruleForm.firstName,
		lastName: ruleForm.lastName,
		phone: ruleForm.phone.toString(),
		address: ruleForm.location,
		isPetSitter: status
	});

	if (res.data.status == 200) {
		emit('changeUserInfo', ruleForm.firstName, ruleForm.lastName);
		ElMessage({
			message: 'Profile updated.',
			type: 'success'
		});
		linkToProfile();
	}

	console.log('res', res);
};

/**
 * when upload is sussessful, emit an event to change the avatar in topbar
 * then display a message
 */
// const handleAvatarSuccess = (response, uploadFile) => {
// 	imageURL.value = URL.createObjectURL(uploadFile.raw);
// 	emit('changeUserAvater', URL.createObjectURL(uploadFile.raw));
// 	ElMessage({
// 		message: 'New avatar uploaded.',
// 		type: 'success'
// 	});
// };

/**
 * check if the file uploaded is JGP or PNG, otherwise cannot be uploaded
 */
const beforeAvatarUpload = rawFile => {
	if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
		ElMessage.error('Avatar picture must be JPG or PNG file!');
		return false;
	} else if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error('Avatar picture size can not exceed 2MB!');
		return false;
	}

	//save user image and get url of the userimage just uploaded
	const currentDate = new Date();
	const timestamp = currentDate.getTime();

	const storageRef_user = ref_upload(
		storage,
		uid + '_userAvatar' + '_' + timestamp
	);

	//save user image to firebase
	uploadBytes(storageRef_user, rawFile).then(() => {
		//get url from firebase
		getDownloadURL(storageRef_user).then(url => {
			ruleForm.image = url;
			console.log('haha', ruleForm.image);
			//post user avatar to BE
			httpServices.userProfile
				.postUserImage({
					uid: uid,
					image: ruleForm.image
				})
				.then(response => {
					console.log(response);
					location.reload();
				});
		});
	});
};

const linkToProfile = () => {
	router.push('/home/userprofile');
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
.edit-profile-container {
	.edit-profile-heading {
		color: #76553f;
		font-family: Trebuchet MS;
		font-size: 3vh;
		margin-bottom: 2vh;
	}
	.avatar-container {
		.avatar-image {
			width: 22vh;
			margin-bottom: 2vh;
		}
	}
}

.save-button {
	margin-left: 3vh;
}

.avatar-uploader .avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}
</style>
