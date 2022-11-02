<template>
	<div class="pet-summary">
		<div class="left">
			<div class="owner-box">
				<el-image
					v-if="userInfo.image"
					class="user-image"
					:src="userInfo.image"
				></el-image>
				<p class="name">
					{{ userInfo.firstName }} {{ userInfo.lastName }}
				</p>
				<p class="location">{{ userInfo.address }}</p>
			</div>
		</div>
		<div class="right">
			<div class="info-row">
				<p>Gender</p>
				<p>{{ petsummaryList.gender }}</p>
			</div>
			<div class="info-row">
				<p>Age</p>
				<p>{{ petsummaryList.petDob }}</p>
			</div>
			<div class="info-row">
				<p>Species</p>
				<p>{{ petsummaryList.species }}</p>
			</div>
			<div class="info-row">
				<p>Breed</p>
				<p>{{ petsummaryList.breed }}</p>
			</div>
			<div class="info-row">
				<p>Body Weight</p>
				<p>{{ petsummaryList.weight }}</p>
			</div>
			<div class="last-row">
				<p>Body Height</p>
				<p>{{ petsummaryList.height }}</p>
			</div>
		</div>
		<div class="right">
			<!-- fixed input for now -->
			<div class="info-row">
				<p>Microchip Number</p>
				<p>00071A3357</p>
			</div>
			<div class="info-row">
				<p>Litter Details</p>
				<p>NA</p>
			</div>
			<div class="info-row">
				<p>Desexed</p>
				<p>No</p>
			</div>
			<div class="info-row">
				<p>Medications</p>
				<p>Ibuprofen</p>
			</div>
			<div class="last-row">
				<p>Recommended Calorie Intake</p>
				<p>250</p>
			</div>
			<div class="info-row" style="background-color: white">
				<p></p>
				<p></p>
			</div>
		</div>
	</div>
</template>
<script setup>
import httpServices from '@services';
</script>

<script>
export default {
	props: ['petsummary', 'userInfo'],
	data() {
		return {
			petsummaryList: []
		};
	},
	watch: {
		petsummary(newval) {
			this.$data.petsummaryList = newval;
			if (this.$data.petsummaryList.gender === 0) {
				this.$data.petsummaryList.gender = 'Female';
			} else if (this.$data.petsummaryList.gender === 1) {
				this.$data.petsummaryList.gender = 'Male';
			} else {
				this.$data.petsummaryList.gender = 'NA';
			}

			var today = new Date();
			var birthDate = new Date(this.$data.petsummaryList.petDob);
			var age = today.getFullYear() - birthDate.getFullYear();
			this.$data.petsummaryList.petDob = age;
		}
	}
};
</script>

<style lang="scss" scoped>
.pet-summary {
	display: flex;
	justify-content: space-around;
	height: 45vh;
	.left {
		display: flex;
		align-items: center;
		justify-content: center;

		.owner-box {
			width: 12vw;
			height: 38vh;
			background-color: #f1eeec;
			border-radius: 5%;
			display: flex;
			align-items: center;
			flex-direction: column;

			font-size: large;
			font-family: Trebuchet MS;
			color: #76553f;
			.user-image {
				width: 5vw;
				margin-top: 3vw;
				border-radius: 5%;
			}
			.name {
				margin-top: 3vh;
				font-weight: 600;
			}

			.location {
				margin-top: 1vh;
			}
		}
	}

	.right {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.info-row {
			width: 17vw;
			height: 4vh;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #f1eeec;
			border-radius: 10px 10px 10px 10px;
			margin-bottom: 2.5vh;
			text-align-last: justify;
			padding: 0 1vw;
			overflow: hidden;

			p {
				overflow: hidden;
				font-size: small;
				font-family: Trebuchet MS;
				color: #76553f;
				font-weight: 600;
			}
		}

		.last-row {
			width: 17vw;
			height: 4vh;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #f1eeec;
			border-radius: 10px 10px 10px 10px;
			padding: 0 1vw;
			overflow: hidden;
			p {
				overflow: hidden;
				font-size: small;
				font-family: Trebuchet MS;
				color: #76553f;
				font-weight: 600;
			}
		}
	}
}
</style>
