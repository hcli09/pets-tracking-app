<template>
	<div class="register-container">
		<div class="rc-left"></div>
		<div class="rc-right">
			<div class="rc-box">
				<span class="create-an-account">Create an account</span>
				<el-form
					ref="formRef"
					:model="registerForm"
					label-width="200px"
					label-position="top"
					class="demo-dynamic"
					size="large"
				>
					<el-form-item
						prop="email"
						label="Email"
						:rules="[
							{
								required: true,
								message: 'Please input your email address',
								trigger: 'blur'
							},
							{
								type: 'email',
								message: 'Please input correct email address',
								trigger: ['blur']
							}
						]"
					>
						<el-input
							v-model="registerForm.email"
							:clearable="true"
							placeholder="Your email address"
						/>
					</el-form-item>

					<el-row
						type="flex"
						class="row-bg"
						justify="space-between"
						:gutter="20"
					>
						<el-col :span="12">
							<el-form-item
								label="First Name"
								prop="firstName"
								:rules="[
									{
										required: true,
										message: 'Please input your first name',
										trigger: 'blur'
									}
								]"
							>
								<el-input
									style="width: 16em"
									v-model="registerForm.firstName"
									:clearable="true"
									placeholder="Your First Name"
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item
								label="Last Name"
								prop="lastName"
								:rules="[
									{
										required: true,
										message: 'Please input your last name',
										trigger: 'blur'
									}
								]"
							>
								<el-input
									style="width: 16em"
									v-model="registerForm.lastName"
									:clearable="true"
									placeholder="Your Last Name"
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<el-form-item
						label="Password"
						prop="password"
						:rules="[
							{
								required: true,
								message: 'Please input your password',
								trigger: 'blur'
							}
						]"
					>
						<el-input
							v-model="registerForm.password"
							type="password"
							autocomplete="off"
							:clearable="true"
							placeholder="Your password"
						/>
					</el-form-item>

					<el-form-item
						label="Confirm your password"
						prop="checkPass"
						:rules="[
							{
								required: true,
								trigger: 'blur',
								validator: validatePass
							}
						]"
					>
						<el-input
							v-model="registerForm.checkPass"
							type="password"
							autocomplete="off"
							:clearable="true"
							placeholder="Confirm your password"
						/>
					</el-form-item>

					<el-form-item label-width="0" class="register-btn-item">
						<el-button
							type="primary"
							@click="submitForm(formRef)"
							class="login-btn"
							>Register Now</el-button
						>
					</el-form-item>
				</el-form>

				<el-button link @click="goLogin"
					>Login<el-icon class="el-icon--right"
						><user-filled /></el-icon
				></el-button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { UserFilled } from '@element-plus/icons-vue';
import { ElMessage, ElNotification } from 'element-plus';
import httpServices from '@services';
import { useRoute, useRouter } from 'vue-router';

const formRef = ref(null);
const registerForm = reactive({});
const route = useRoute();
const router = useRouter();

const submitForm = formEl => {
	if (!formEl) return;

	formEl.validate(async valid => {
		const emailTemp = registerForm.email;
		if (valid) {
			try {
				const { data } = await httpServices.registerLogin.register(
					registerForm
				);
				if (data.status === 200) {
					ElNotification({
						title: 'Verification',
						message: 'Please verify your email',
						type: 'info'
					});
					// go to email verification page
					router.push({
						name: 'SendVerifyEmail',
						params: { email: emailTemp }
					});
				}
			} catch (error) {
				if (error.response.data.message.startsWith('Duplicate email')) {
					ElNotification({
						title: 'Register',
						message: 'This email has been registered',
						type: 'error'
					});
				}
			}

			formRef.value.resetFields();
		} else {
			console.log('error submit!');
			return false;
		}
	});
};

const validatePass = (rule, value, callback) => {
	if (value === '') {
		callback(new Error('Please re-type your password'));
	} else if (value !== registerForm.password) {
		callback(new Error('Not same as the previous password you entered'));
	} else {
		callback();
	}
};

const goLogin = () => {
	router.push({
		name: 'Login'
	});
};
</script>

<style lang="scss" scoped>
$rc-left-width: 50vw;

.register-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100vw;
	height: 100vh;

	.rc-left {
		width: $rc-left-width;
		height: 100%;
		background-image: url('src/assets/login/dog-background/dog-bgd.png');
		background-position: center center;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.rc-right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: calc(100vw - $rc-left-width);
		height: 100%;
		background-color: #fbfaf5;
		.rc-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: left;
			width: 450px;

			span {
				margin: 10px 0;
				&.create-an-account {
					font-size: 2vw;
					color: $--color-primary;
					font-weight: bold;
				}
			}
			.el-form {
				:deep(.el-form-item__label) {
					font-size: 16px;
				}
			}
			.register-btn-item {
				:deep(.el-form-item__content) {
					justify-content: center;
				}
			}
		}
	}
}
</style>
<style lang="scss">
.email-varification-message {
	background-color: #f1eeec !important;
	width: 25vw !important;
	// height: 4.5vw !important;
	left: 75% !important;

	p {
		font-size: 0.85vw;
		color: #c17754 !important;
		line-height: 1.3vw;
	}
	i {
		color: #c17754 !important;
	}
}
</style>
