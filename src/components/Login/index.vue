<template>
    <div class="login-container">
        <div class="lc-left"></div>
        <div class="lc-right">
            <div class="lc-box">
                <span class="welcome">Welcome</span>
                <span class="login-to-your-account">Login to your account</span>
                <el-form
                    ref="formRef"
                    :model="loginForm"
                    label-width="90px"
                    label-position="left"
                    class="demo-dynamic"
                    size="large"
                >
                    <el-form-item
                        prop="email"
                        label="Email"
                        :rules="[
                            {
                                required: true,
                                message: 'Please input email address',
                                trigger: 'blur',
                            },
                            {
                                type: 'email',
                                message: 'Please input correct email address',
                                trigger: ['blur'],
                            },
                        ]"
                    >
                        <el-input v-model="loginForm.email" clearable="true" />
                    </el-form-item>

                    <el-form-item
                        label="Password"
                        prop="password"
                        :rules="[
                            {
                                required: true,
                                message: 'Please input password',
                                trigger: 'blur',
                            },
                        ]"
                    >
                        <el-input
                            v-model="loginForm.password"
                            type="password"
                            autocomplete="off"
                            clearable="true"
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
                </el-form>
                <el-link :underline="false"
                    >Create an account<el-icon class="el-icon--right"
                        ><User /></el-icon
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
import { User } from '@element-plus/icons-vue';

const formRef = ref();
const loginForm = reactive({
    email: '',
    password: '',
});

// console.log(validateForm);

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
        background-image: url('src/assets/login/dog-background/dog-bgd.png');
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
            span {
                margin: 10px 0;
                &.welcome {
                    font-size: 2vw;
                    color: $--color-primary;
                    font-weight: bold;
                }
                &.login-to-your-account {
                    font-size: 2.5vw;
                    color: $--color-primary;
                    font-weight: bold;
                    padding-left: 15px;
                }
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
