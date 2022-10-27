<template>
	<div class="settings-container">
		<h1 class="setting-title">Settings</h1>
		<el-tabs
			v-model="activeName"
			class="setting-tabs"
			@tab-click="handleClick"
			style="font-family: Trebuchet MS"
		>
			<el-tab-pane label="Settings" name="settings">
				<div class="tab-settings">
					<div class="tab-settings-content">
						<div class="basic-info">
							<div class="basic-info-title-container">
								<h1 class="basic-info-title">BASIC INFO</h1>
							</div>

							<el-form
								ref="ruleFormRef"
								:model="ruleForm"
								:rules="rules"
								label-width="120px"
								label-position="left"
								class="demo-ruleForm"
								:size="formSize"
							>
								<el-form-item
									label="First Name"
									prop="firstName"
								>
									<el-input v-model="ruleForm.firstName" />
								</el-form-item>
								<el-form-item label="Last Name" prop="lastName">
									<el-input v-model="ruleForm.lastName" />
								</el-form-item>
								<!-- <el-form-item label="Password" prop="password">
                                    <el-input v-model="ruleForm.password" />
                                </el-form-item> -->
								<el-form-item label="Phone" prop="phone">
									<el-input v-model.number="ruleForm.phone" />
								</el-form-item>
								<!-- <el-form-item label="Email" prop="email">
                                    <el-input v-model="ruleForm.email" />
                                </el-form-item> -->
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
								<el-form-item
									label="Pet Sitter Status"
									prop="petSitterStatus"
								>
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
										type="primary"
										@click="submitForm(ruleFormRef)"
										>SAVE</el-button
									>
									<el-button @click="resetForm(ruleFormRef)"
										>RESET</el-button
									>
								</el-form-item>
							</el-form>
						</div>
					</div>
				</div>
			</el-tab-pane>

			<!-- below is notification settings -->

			<el-tab-pane
				label="Notification"
				name="notification"
				class="notificationsPane"
			>
				<h1 class="notifications-title">Email Notifications</h1>

				<div class="notification-settings-container">
					<div class="setting-title-container">
						<p>Allow email notifications</p>
						<p style="margin-top: 12px">Task notifications</p>
						<p style="margin-top: 12px">Event notifications</p>
					</div>

					<div class="switch-container">
						<el-switch
							v-model="emailNotifications"
							style="display: block"
							@change="handleEmailNtf"
						/>
						<el-switch
							v-model="taskNotifications"
							style="display: block"
							:disabled="taskDisabled"
							@change="handleTimeSelect"
						/>
						<el-switch
							v-model="eventNotifications"
							style="display: block"
							:disabled="eventDisabled"
							@change="handleEventNtf"
						/>
					</div>

					<div class="time-select-container">
						<span>Notify me at </span>
						<el-time-select
							v-model="taskNtfTime"
							start="00:00"
							step="00:15"
							end="23:45"
							placeholder="Select time"
							style="width: 10vw"
							:disabled="timeSelectDisabled"
							@change="handleTaskNtf"
						/>
						<span> the day before a task</span>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="Privacy" name="privacy"> Privacy </el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import httpServices from '@services';
import router from '@/router';
import axios from 'axios';

let userAvatarURL = '';
const userID = ref(localStorage.getItem('uid'));
const emailNotifications = ref(true);
const taskNotifications = ref(true);
const taskNtfTime = ref('18:00');
const eventNotifications = ref(true);
const taskDisabled = ref(false);
const eventDisabled = ref(false);
const timeSelectDisabled = ref(false);

// const desktopNotifications = ref(false)
const formSize = ref('default');
const ruleFormRef = ref();
const ruleForm = reactive({
	firstName: '',
	lastName: '',
	password: '',
	phone: '',
	// email: '',
	location: '',
	petSitterStatus: ''
});

const locationList = ref([]);

const emit = defineEmits(['changeUserInfo']);

const rules = reactive({
	//   firstName: [
	//     { required: true, message: 'Please input first name', trigger: 'blur' },
	//   ],
	//   lastName: [
	//     { required: true, message: 'Please input last name', trigger: 'blur' },
	//   ],
	password: [
		{ required: true, message: 'Please input password', trigger: 'blur' },
		{
			min: 8,
			message: 'Password should be at least 8 digit',
			trigger: 'blur'
		}
	],
	phone: [
		// { required: true, message: 'Please input phone number', trigger: 'blur' },
		{ type: 'number', message: 'Please input correct phone number' }
	],
	// email: [
	//     { required: true, message: 'Please input email address', trigger: 'blur' },
	//     { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
	// ],
	petSitterStatus: [
		//   { required: true, message: 'Please select your pet sitter status', trigger: 'change' }
	]
});

const submitForm = async formEl => {
	if (!formEl) return;
	await formEl.validate((valid, fields) => {
		if (valid) {
			console.log('form submitted!');
			editSettings();
		} else {
			console.log('error submit!', fields);
		}
	});
};

const resetForm = formEl => {
	if (!formEl) return;
	formEl.resetFields();
};

const editSettings = async () => {
	console.log('upload settings', ruleForm.firstName);
	let status = false;
	if (ruleForm.petSitterStatus.value) {
		status = true;
	} else {
		status = false;
	}

	const res = await httpServices.userProfileEdit.editUserProfile({
		//jys uid
		uid: userID.value,
		firstName: ruleForm.firstName,
		lastName: ruleForm.lastName,
		phone: ruleForm.phone.toString(),
		address: ruleForm.location,
		isPetSitter: status
	});

	if (res.data.status == 200) {
		emit('changeUserInfo', ruleForm.firstName, ruleForm.lastName);
		ElMessage({
			message: 'Settings updated.',
			type: 'success'
		});
		linkToDashboard();
	}

	console.log('res', res);
};

const getNotificationSettings = async () => {
	const res = await httpServices.notification.getNotificationSettings({
		//jys uid
		uid: userID.value
	});
	console.log('notifi settings', res);
	if (
		res.data.data.taskNtfOn === false &&
		res.data.data.eventNtfOn === false
	) {
		emailNotifications.value = false;
		taskNotifications.value = false;
		taskDisabled.value = true;
		eventNotifications.value = false;
		eventDisabled.value = true;
		timeSelectDisabled.value = true;
	}
	taskNotifications.value = res.data.data.taskNtfOn;
	eventNotifications.value = res.data.data.eventNtfOn;
	taskNtfTime.value = res.data.data.taskNtfTime;
};

const editNotificationSettings = async (taskNtf, taskNtfTime, eventNtf) => {
	const res = await httpServices.notification.editNotificationSettings({
		//jys uid
		uid: userID.value,
		eventNtfOn: eventNtf,
		taskNtfOn: taskNtf,
		taskNtfTime: taskNtfTime
	});
	if (res.data.status == 200) {
		ElMessage({
			message: 'Updated',
			type: 'success'
		});
	}
};

const handleEmailNtf = () => {
	if (emailNotifications.value == false) {
		console.log('off');
		taskNotifications.value = false;
		taskDisabled.value = true;
		eventNotifications.value = false;
		eventDisabled.value = true;
		timeSelectDisabled.value = true;
	} else {
		taskNotifications.value = true;
		taskDisabled.value = false;
		eventNotifications.value = true;
		eventDisabled.value = false;
		timeSelectDisabled.value = false;
	}
	editNotificationSettings(
		taskNotifications.value,
		taskNtfTime.value,
		eventNotifications.value
	);
};

const handleTimeSelect = () => {
	if (taskNotifications.value === false) {
		timeSelectDisabled.value = true;
	} else {
		timeSelectDisabled.value = false;
	}
	editNotificationSettings(
		taskNotifications.value,
		taskNtfTime.value,
		eventNotifications.value
	);
};

const handleTaskNtf = () => {
	editNotificationSettings(
		taskNotifications.value,
		taskNtfTime.value,
		eventNotifications.value
	);
};

const handleEventNtf = () => {
	editNotificationSettings(
		taskNotifications.value,
		taskNtfTime.value,
		eventNotifications.value
	);
};

const linkToDashboard = () => {
	router.push('/home');
};

let activeName = 'settings';
// let email = 'john.doe@gmail.com'
// let phone = '1234567890'
// let petSitterStatus = 'No'
// let petList = [
//     {
//         petName: 'Oliver',
//         avatar: new URL('/src/assets/Settings/cat1.png', import.meta.url).href
//     },
//     {
//         petName: 'Bella',
//         avatar: new URL('/src/assets/Settings/dog1.png', import.meta.url).href
//     },
//     {
//         petName: 'Lucy',
//         avatar: new URL('/src/assets/Settings/dog2.png', import.meta.url).href
//     },
// ]

// change tabs
function handleClick(tab, event) {
	console.log(tab, event);
}

onMounted(() => {
	getUserProfile();
	getLocationList();
	getNotificationSettings();
	// console.log("noti permission: ", window.Notification.permission)
	// sendNotification()
});

const getLocationList = async () => {
	const res = await httpServices.userProfileEdit.getLocationList();
	for (let item of res.data.data) {
		locationList.value.push({ value: item.cityName, label: item.cityName });
	}
};

const getUserProfile = async () => {
	const res = await httpServices.userProfile.getUserProfile({
		//jys uid
		uid: userID.value
	});
	// user.image = res.data.data.image;
	ruleForm.firstName = res.data.data.firstName;
	ruleForm.lastName = res.data.data.lastName;
	// user.petList = res.data.data.petList;
	// ruleForm.email = res.data.data.email;
	ruleForm.phone = Number(res.data.data.phone);
	ruleForm.petSitterStatus = res.data.data.isPetSitter ? 'Yes' : 'No';
	ruleForm.location = res.data.data.address;
	console.log('res', res);
};

// notification title and content
const sendNotification = () => {
	new Notification('Event reminder', {
		body: 'Take Bernard to the vet today',
		icon: 'data:image/jpeg;base64,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'
	});
};
</script>

<style lang="scss" scoped>
.settings-container {
	.setting-title {
		font-size: 1.7vw;
		font-weight: bold;
		color: #76553f;
		margin-bottom: 1vh;
		font-family: 'Trebuchet MS';
	}
}
.notificationsPane {
	padding: 1vw;
	.notifications-title {
		font-size: 1.4vw;
		font-weight: bold;
		color: #76553f;
		margin-bottom: 1vw;
	}
	.notification-settings-container {
		display: flex;

		.setting-title-container {
			p {
				line-height: 1.5vw;
			}
		}
		.switch-container {
			margin-left: 2vw;
		}
		.time-select-container {
			margin-left: 2vw;
			margin-top: 2vw;
		}
	}
	.notifications-example {
		width: 25vw;
		margin-bottom: 1vw;
		box-shadow: rgba(99, 99, 99, 0.2) 3px 3px 5px 0px;
	}
}
.tab-settings-content {
	display: flex;

	.profile {
		border-right: 0.1rem /* 1/10 */ solid #e6e6e6;
		padding: 0 2rem /* 20/10 */;

		.profile-heading {
			text-align: center;
			font-size: 1.3rem /* 13/10 */;
			font-weight: normal;
			color: #6c6c6c;
		}

		.user-avatar-container {
			display: flex;
			justify-content: center;

			.user-avatar {
				height: 7.2rem /* 72/10 */;
				width: 7.2rem /* 72/10 */;
				border-radius: 3.6rem /* 36/10 */;
			}
		}

		.user-name {
			text-align: center;
			font-size: 1.4rem /* 14/10 */;
			font-weight: normal;
			margin-bottom: 2.8rem /* 28/10 */;
		}

		.pet-list {
			display: flex;
			justify-content: space-between;
			margin-bottom: 2rem /* 20/10 */;
			padding: 0 3.7rem /* 37/10 */;

			.pet-container {
				.pet-avatar {
					height: 4.6rem /* 46/10 */;
					width: 4.6rem /* 46/10 */;
					border-radius: 2.3rem /* 23/10 */;
				}

				.pet-name {
					font-size: 1.2rem /* 12/10 */;
					font-weight: normal;
					text-align: center;
				}
			}
		}

		.profile-info-container {
			display: flex;

			.profile-info-title {
				margin-right: 4.8rem /* 48/10 */;
			}

			.profile-info-title > div {
				font-size: 1.2rem /* 12/10 */;
				color: #6c6c6c;
				margin-bottom: 1.2rem /* 12/10 */;
			}

			.profile-info-content > div {
				font-size: 1.2rem /* 12/10 */;
				color: #6c6c6c;
				margin-bottom: 1.2rem /* 12/10 */;
			}
		}
	}

	.basic-info {
		padding-left: 2.5rem /* 25/10 */;
		margin-top: 2vh;

		.basic-info-title-container {
			display: flex;
			padding-bottom: 1.5rem /* 15/10 */;
			border-bottom: 1px solid #e5e5e5;
			margin-bottom: 1.5rem /* 15/10 */;

			.basic-info-title {
				font-size: 1vw;

				font-weight: normal;
				margin-right: 5rem /* 50/10 */;
			}
		}
	}
}
</style>
