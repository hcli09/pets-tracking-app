<template>
    <div class="container">

        
        <div v-if="showSuccess" class="white-box">
            <div class="logo-container">
                <img src="@assets/EmailVerificationSuccess/mail.png" alt="icon of an email">
            </div>
            <p>Your email is successfully verified.</p>
            <el-button class="button" type="primary" @click="toLogIn">Login To Your Account</el-button>
        </div>
        <div v-if="showFail">
            <p>{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script setup>
import httpServices from '@services';
import router from '../../router';


const toLogIn = () => {
    router.push('/login')
}
</script>

<script>
export default {
	data() {
		return {
			loading: true,
            showSuccess: false,
            showFail: false,
            email: this.$route.query.email,
			verifyToken: this.$route.query.token,
            errorMessage: ''
		};
	},
	created: function () {
		console.log(this.$data.verifyToken);
		httpServices.emailVerification
			.verifyEmail({ email: this.$data.email, verify_token: this.$data.verifyToken })
			.then(response => {
				if (response.status == 200) {
                    this.showSuccess = true;
					
					
					this.$data.loading = false;
				}
                else {
                    this.errorMessage = response.message;
                }
			})
			.catch(error => {

			});
	}
};
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
