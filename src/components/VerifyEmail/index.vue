<template>
    <div class="container">
        <p>To activate your account, please verify your email.</p>
        <el-button type="primary" @click="verifyEmail">Verify your email</el-button>
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


</style>
