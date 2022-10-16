<template>
	<div class="top-bar-box">
		<!-- left hand side of dashboard top bar -->
		<div class="top-bar-title" onclick="location.href='/';">
			<!-- temporary add button -->
			<img src="@assets/Dashboard/home-logo.svg" style="width: 35px" />
			Home
		</div>

		<!-- right hand side of the dashboard top bar -->
		<div class="top-bar-right">
			<p class="top-bar-username">{{ firstName }} {{ lastName }}</p>
			<img
				class="top-bar-avatar"
				:src="UserAvatar"
				@click="clickUserAvatar()"
			/>
			<el-button type="text" @click="signOff"> sign off </el-button>
			<el-button
				style="margin-right: 1vw"
				class="top-bar-settings"
				type="primary"
				:icon="Setting"
				plain
				@click="clickSettings()"
				>Settings
			</el-button>
			<el-button
				style="margin-left: 0; margin-right: 1vw"
				class="top-bar-settings"
				type="primary"
				plain
				@click="clickAddPet()"
				>Add Pet
			</el-button>
		</div>
	</div>
</template>

<script setup>
import { Setting } from '@element-plus/icons-vue';
</script>

<script>
export default {
	name: 'PetsTopBar',
	props: ['firstName', 'lastName', 'UserAvatar'],

	//print for now
	methods: {
		clickSettings() {
			this.$router.push({
				path: '/home/settings'
			});
		},

		clickUserAvatar() {
			this.$router.push({
				path: '/home/userprofile'
			});
		},

		//temporary add pet button
		clickAddPet() {
			this.$router.push({
				path: '/home/createpet'
			});
		},

		signOff() {
			this.$router.push({
				name: 'Login'
			});
			localStorage.removeItem('token');
			localStorage.removeItem('user');
		}
	}
};
</script>

<style lang="scss" scoped>
.top-bar-box {
	height: 95%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	opacity: 0.99;
	background-color: white;
	box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
}

//title dashabord
.top-bar-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 130px;
	margin-left: 1vw;
	font-size: x-large;
	font-family: Trebuchet MS;
	color: #76553f;
	font-size: 30px;
	font-weight: bold;
	cursor: pointer;
}

//username, avatar, settings
.top-bar-right {
	display: flex;
	justify-content: space-around;
	align-items: center;

	.top-bar-username {
		margin-right: 1.1vw;
		font-size: medium;
		font-family: Trebuchet MS;
		color: #76553f;
	}

	.top-bar-avatar {
		margin-right: 1.1vw;
		height: 2.7rem;
		width: 2.7rem;
		border-radius: 5px;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
		cursor: pointer;
	}

	.top-bar-settings {
		margin-right: 3vw;
		border: #76553f;
	}
}
</style>
