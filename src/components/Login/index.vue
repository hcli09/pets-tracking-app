<template>
	<div class="login-container">
		<div class="lc-left"></div>
		<div class="lc-right">
			<div class="lc-box">
				<span class="welcome">Welcome to Pet Pocket</span>
				<el-form
					ref="formRef"
					:model="loginForm"
					label-width="90px"
					label-position="left"
					class="demo-dynamic"
					size="large"
					v-loading="loading"
					element-loading-text="Loading..."
				>
					<el-form-item
						prop="username"
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
							v-model="loginForm.username"
							:clearable="true"
							placeholder="Your email"
						/>
					</el-form-item>

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
							v-model="loginForm.password"
							type="password"
							autocomplete="off"
							:clearable="true"
							placeholder="Your password"
						/>
					</el-form-item>

					<el-form-item label-width="0" class="login-btn-item">
						<el-button
							type="primary"
							@click="submitForm(formRef)"
							class="login-btn"
							>Login</el-button
						>
					</el-form-item>

					<div
						style="
							width: 100%;
							display: flex;
							justify-content: center;
						"
					>
						<el-button @click="goRegister"
							>Create an account<el-icon class="el-icon--right"
								><User /></el-icon
						></el-button>
						<el-button @click="loginAsGuest"
							>Sign in as a guest user<el-icon
								style="margin-left: 5px"
								><Avatar /></el-icon
						></el-button>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	beforeRouteEnter: function (to, from, next) {
		const token = localStorage.getItem('token');

		if (token) {
			next('/home');
		} else {
			next();
		}
	}
};
</script>

<script setup>
// import { ElButton } from 'element-plus';
import { ref, reactive, onMounted } from 'vue';
import { User } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
import httpServices from '@services';
import { useRoute, useRouter } from 'vue-router';

const formRef = ref(null);
const loading = ref(false);
const loginForm = reactive({});
const router = useRouter();

// the login business logic inside
const submitForm = formEl => {
	if (!formEl) return;

	formEl.validate(async valid => {
		if (valid) {
			loading.value = true;
			// save the email temperory for email verification, when a user registered but not verified, clicking the login button will jump to email verification page
			const emailTemp = loginForm.username;
			try {
				const { data: res } = await httpServices.registerLogin.login(
					loginForm
				);
				// formRef.value.resetFields();
				if (res.status === 200) {
					ElNotification({
						title: 'Login',
						message: 'Login Successfully',
						type: 'success'
					});
					console.log('res', res);
					const token = res.data.token;
					const uid = res.data.uid;
					localStorage.setItem('token', token);
					localStorage.setItem('uid', uid);

					httpServices.dashboard
						.user_dashboard({
							uid: uid
						})
						.then(response => {
							let userObject = response.data.data;
							localStorage.setItem(
								'user',
								JSON.stringify(userObject)
							);
						})
						.catch(error => {
							console.log(error);
						});

					router.push({
						path: '/home'
					});
				}
			} catch (error) {
				// console.log("error:", error)
				if (error.response.data.message === 'Bad credentials') {
					ElNotification({
						title: 'Login',
						message: error.response.data.message,
						type: 'error'
					});
				} else if (
					error.response.data.message === 'Email not verified'
				) {
					// ElNotification({
					// 	title: 'Login',
					// 	message: error.response.data.message,
					// 	type: 'error'
					// });

					// go to email verification page
					router.push({
						name: 'SendVerifyEmail',
						params: { email: emailTemp }
					});
				}

				console.log('error', error);
			} finally {
				loading.value = false;
			}
		} else {
			console.log('error submit!');
			return false;
		}
	});
};

const goRegister = () => {
	router.push({
		name: 'Register'
	});
};

const loginAsGuest = async () => {
	loading.value = true;
	try {
		const { data: res } = await httpServices.registerLogin.login({
			username: 'xinyukang22@gmail.com',
			password: 123456
		});
		if (res.status === 200) {
			ElNotification({
				title: 'Login',
				message: 'Login Successfully',
				type: 'success'
			});
			const token = res.data.token;
			const uid = res.data.uid;
			localStorage.setItem('token', token);
			localStorage.setItem('uid', uid);

			httpServices.dashboard
				.user_dashboard({
					uid: uid
				})
				.then(response => {
					let userObject = response.data.data;
					localStorage.setItem('user', JSON.stringify(userObject));
				})
				.catch(error => {
					console.log(error);
				});

			router.push({
				path: '/home'
			});
		}
	} catch (error) {
		ElNotification({
			title: 'Login',
			message: 'Wrong email or password. Please check',
			type: 'error'
		});
		console.log('error', error);
	} finally {
		loading.value = false;
	}
};
</script>

<style lang="scss" scoped>
$lc-left-width: 50vw;
.login-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100vw;
	height: 100vh;

	.lc-left {
		width: $lc-left-width;
		height: 100%;
		background-image: url('https://raw.githubusercontent.com/hcli09/pets-tracking-app/main/src/assets/login/dog-background/dog-bgd.png');
		background-position: center center;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.lc-right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: calc(100vw - $lc-left-width);
		height: 100%;
		background-color: #fbfaf5;
		.lc-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: left;
			width: 390px;
			span {
				font-weight: bold;
				color: $--color-primary;
				font-size: 2vw;
				margin-bottom: 2vw;
			}
			.el-form {
				:deep(.el-form-item__label) {
					font-size: 16px;
				}
			}
			.login-btn-item {
				:deep(.el-form-item__content) {
					justify-content: center;
				}
			}
		}
	}
}
</style>
