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
                                trigger: 'blur',
                            },
                            {
                                type: 'email',
                                message: 'Please input correct email address',
                                trigger: ['blur'],
                            },
                        ]"
                    >
                        <el-input
                            v-model="registerForm.email"
                            clearable="true"
                            placeholder="Your email address"
                        />
                    </el-form-item>

                    <el-form-item
                        prop="username"
                        label="Username"
                        :rules="[
                            {
                                required: true,
                                message: 'Please input your user name',
                                trigger: 'blur',
                            },
                        ]"
                    >
                        <el-input
                            v-model="registerForm.username"
                            clearable="true"
                            placeholder="Your user name"
                        />
                    </el-form-item>

                    <el-form-item
                        label="Password"
                        prop="password"
                        :rules="[
                            {
                                required: true,
                                message: 'Please input your password',
                                trigger: 'blur',
                            },
                        ]"
                    >
                        <el-input
                            v-model="registerForm.password"
                            type="password"
                            autocomplete="off"
                            clearable="true"
                            placeholder="Your password"
                        />
                    </el-form-item>

                    <el-form-item
                        label="Confirm your password"
                        prop="confirmPwd"
                        :rules="[
                            {
                                required: true,
                                message: 'Please re-type your password',
                                trigger: 'blur',
                            },
                        ]"
                    >
                        <el-input
                            v-model="registerForm.confirmPwd"
                            type="password"
                            autocomplete="off"
                            clearable="true"
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
                <el-link :underline="false" href="/login"
                    >Login<el-icon class="el-icon--right"
                        ><user-filled /></el-icon
                ></el-link>

                <!-- <el-icon><user /></el-icon> -->
                <!-- <el-link>
                    Check<el-icon class="el-icon--right"><icon-view /></el-icon>
                </el-link> -->
            </div>
        </div>
    </div>
</template>

<script setup>
// import { ElButton } from 'element-plus';
import { ref, reactive } from 'vue';
import { UserFilled } from '@element-plus/icons-vue';

const formRef = ref();
const registerForm = reactive({
    email: '',
    username: '',
    password: '',
    confirmPwd: '',
});

const submitForm = formEl => {
    if (!formEl) return;
    formEl.validate(valid => {
        if (valid) {
            console.log('submit!');
        } else {
            console.log('error submit!');
            return false;
        }
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
