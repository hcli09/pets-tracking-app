<template>
	<div class="petprofile-header">
		<template v-if="petsummary">
			<el-image class="pet-avatar" :src="petsummary.petAvatar" />
			<p
				style="
					font-weight: 10;
					font-size: large;
					font-family: Trebuchet MS;
					color: #76553f;
				"
				@click="toEditPage"
				class="pet-name"
			>
				{{ petsummary.petName }}
			</p>
		</template>
		<el-link
			style="
				font-weight: 10;
				font-size: small;
				font-family: Trebuchet MS;
				color: #76553f;
			"
			@click="toTrackingDashboard"
			>Main Tracking Dashboard</el-link
		>
	</div>

	<div class="petprofile-main">
		<el-tabs
			class="petprofile-left"
			v-model="activeName"
			type="border-card"
			@tab-click="handleClick"
			:key="activeName"
		>
			<el-tab-pane label="Weight" name="first">
				<WeightDashboard></WeightDashboard>
			</el-tab-pane>
			<el-tab-pane label="Calorie" name="second">
				<CalorieDashboard></CalorieDashboard>
			</el-tab-pane>
			<el-tab-pane label="Sleep" name="third">
				<SleepDashboard></SleepDashboard>
			</el-tab-pane>
			<el-tab-pane label="Exercise" name="fourth">
				<ExerciseDashboard></ExerciseDashboard>
			</el-tab-pane>
			<el-tab-pane label="Food" name="fifth">
				<FoodDashboard></FoodDashboard>
			</el-tab-pane>
			<el-tab-pane label="Medication" name="sixth">
				<MedicationDashboard></MedicationDashboard>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
import httpServices from '@services';
import CalorieDashboard from '../../common/components/CalorieDashboard/index.vue';
import WeightDashboard from '../../common/components/WeightDashboard/index.vue';
import MedicationDashboard from '../../common/components/MedicationDashboard/index.vue';
import FoodDashboard from '../../common/components/FoodDashboard/index.vue';
import SleepDashboard from '../../common/components/SleepDashboard/index.vue';
import ExerciseDashboard from '../../common/components/ExerciseDashboard/index.vue';
</script>

<script>
export default {
	data() {
		return {
			petsummary: {},
			userInfo: {},
			uid: localStorage.getItem('uid'),
			petId: this.$route.query.id // get petid from url
		};
	},
	created: function () {
		this.$data.activeName = 'first';
	},
	methods: {
		handleClick(tab, event) {
			sessionStorage.setItem('currentTab', tab.props.name);
		},
		toTrackingDashboard() {
			this.$router.push({
				path: '/home/main-tracking-dashboard',
				query: { id: this.$data.petId }
			});
		}
	},
	mounted() {
		let name = sessionStorage.getItem('currentTab');
		if (name) {
			this.activeName = name;
		}
		//get pet profile
		httpServices.petprofile
			.getPet({ uid: this.$data.uid, petId: this.$data.petId })
			.then(response => {
				let petobject = response.data.data;
				this.$data.petsummary = petobject;
			})
			.catch(error => {
				console.log(error.message);
			});
	}
};
</script>

<style lang="scss" scoped>
.petprofile-header {
	height: 20vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	p {
		font-size: large;
		font-family: Trebuchet MS;
		color: #76553f;
		font-weight: 600;
	}

	.pet-avatar {
		width: 6vw;
		border-radius: 50%;
		margin-bottom: 1vh;
	}
}

.petprofile-main {
	margin-top: 3vh;
	display: flex;
	justify-content: space-around;
	height: 55vh;

	.petprofile-left {
		width: 70vw;
		border: #f2f4f7;

		:deep(.el-tabs__content) {
			height: 50vh;
			background-color: white;
		}

		:deep(.el-tabs__nav-scroll) {
			background-color: #f2f4f7;
		}

		:deep(.is-active) {
			border-radius: 12% 12% 0 0;
			border: #f2f4f7;
		}
	}
}
</style>
