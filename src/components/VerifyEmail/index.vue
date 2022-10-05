<template>
    <div class="container">
        <div class="white-box">
            <div class="logo-container">
                <img src="@assets/EmailVerification/mail.png" alt="icon of an email">
            </div>
            <p>To activate your account, please verify your email.</p>
            <el-button class="button" type="primary" @click="verifyEmail">Verify your email</el-button>
        </div>
    </div>

</template>

<script setup>
import httpServices from '@services';
import router from '../../router';
import { inject } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const verifyEmail = () => {
    httpServices.emailVerification.sendVerifyEmail({email: route.params.email}).then(response => {
        if (response.data.status === 200) {
            ElMessage({
                message: 'An email has been sent to you, please click the link inside to verify your email address.',
                duration: 6000,
                type: 'success',
            })
            // display a message about email verification
            // ElMessage({
            //     message: 'We have sent an message to ' + emailTemp + ', please click the link included to verify your email address',
            //     duration: 5000,
            //     offset: 60,
            //     showClose: true,
            //     customClass: 'email-varification-message',
            // })
        }
    }).catch(error => {
        console.log(error);
    });
}

</script>


<style lang="scss" scoped>
    .container {
        max-width: 5000px;
        width: 100vw;
        height: 100vh;
        background-color: #F1EEEC;
        .white-box {
            width: 70vw;
            height: 40vw;
            position: absolute;
            left: 15%;
            top: 5vw;
            border-radius: 1vw;
            background-color: white;
            
            img {
                width: 10vw;
                margin: 8vw auto 3vw;
            }
            p {
                font-size: 1.5vw;
                margin: 3vw auto;
                text-align: center;
            }
            .button {
                width: 20vw;
                height: 2.5vw;
                margin: 3vw auto;
                display: block;
                font-size: 1.5vw;
            }
        }
    }

</style>
