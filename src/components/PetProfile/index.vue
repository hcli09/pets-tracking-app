<template>
	<!-- header of pet profile page -->
	<div class="petprofile-header">
		<template v-if="petsummary">
			<el-image class="pet-avatar" :src="petsummary.petAvatar" />
			<el-link
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
			</el-link>
		</template>
		<el-link
			style="
				font-weight: 10;
				font-size: small;
				font-family: Trebuchet MS;
				color: #76553f;
			"
			@click="toTrackingDashboard"
			>Tracking Dashboard</el-link
		>
	</div>

	<div class="petprofile-main">
		<el-tabs
			class="petprofile-left"
			v-model="activeName"
			type="border-card"
			@tab-click="handleClick"
		>
			<el-tab-pane label="Profile" name="first">
				<PetSummary
					:petsummary="petsummary"
					:userInfo="userInfo"
				></PetSummary>
			</el-tab-pane>
			<el-tab-pane label="Events" name="second">
				<PetProfileEvent></PetProfileEvent>
			</el-tab-pane>
			<el-tab-pane label="Tasks" name="third"
				><PetProfileTask></PetProfileTask
			></el-tab-pane>
		</el-tabs>

		<el-tabs
			class="petprofile-right"
			v-model="record_activeName"
			type="border-card"
		>
			<el-tab-pane label="Records" name="first" class="pet-records">
				<div class="folder" @click="toInvoice">
					<img
						class="folder-image"
						src="https://api.iconify.design/bxs/folder.svg?color=%23e9eaf4"
					/>
					<el-button class="folder-name-button" type="text"
						>Invoice
					</el-button>
				</div>

				<div class="folder" @click="toMedication">
					<img
						class="folder-image"
						src="https://api.iconify.design/bxs/folder.svg?color=%23ffeeea"
					/>
					<el-button class="folder-name-button" type="text"
						>Medication
					</el-button>
				</div>

				<div class="folder" @click="toVaccination">
					<img
						class="folder-image"
						src="https://api.iconify.design/bxs/folder.svg?color=%23fff9ec"
					/>
					<el-button class="folder-name-button" type="text"
						>Vaccination
					</el-button>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
import httpServices from '@services';
import PetSummary from '../../common/components/PetSummary/index.vue';
import PetProfileEvent from '../../common/components/PetProfileEvent/index.vue';
import PetProfileTask from '../../common/components/PetProfileTask/index.vue';
</script>

<script>
export default {
	data() {
		return {
			petsummary: {},
			userInfo: {},
			uid: localStorage.getItem('uid'), //get uid from local storage
			petId: this.$route.query.id // get petid from url
		};
	},
	created: function () {
		this.$data.activeName = 'first';
		this.$data.record_activeName = 'first';
	},
	methods: {
		toTrackingDashboard() {
			this.$router.push({
				path: '/home/tracking-dashboard',
				query: { id: this.$data.petId }
			});
		},
		toEditPage() {
			this.$router.push({
				path: '/home/editpet',
				query: { id: this.$data.petId }
			});
		},
		toInvoice() {
			this.$router.push({
				path: '/home/invoice',
				query: { id: this.$data.petId }
			});
		},
		toVaccination() {
			this.$router.push({
				path: '/home/vaccinationhistory',
				query: { id: this.$data.petId }
			});
		},
		toMedication() {
			this.$router.push({
				path: '/home/medication',
				query: { id: this.$data.petId }
			});
		},
		handleClick(tab, event) {
			sessionStorage.setItem('currentTab', tab.props.name);
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

		//get user profile
		httpServices.petprofile
			.getUserProfile({ uid: this.$data.uid })
			.then(response => {
				let userobject = response.data.data;
				this.$data.userInfo = userobject;
			})
			.catch(error => {
				console.log(error.message);
			});
	},
	beforeRouteLeave(to, from, next) {
		sessionStorage.removeItem('currentTab');
		next();
	}
};
</script>

<style lang="scss" scoped>
.petprofile-header {
	height: 25vh;
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
	display: flex;
	justify-content: space-around;

	.petprofile-left {
		width: 55vw;
		height: 55vh;
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

	.petprofile-right {
		background-color: white;
		width: 20vw;
		height: 55vh;
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

		.pet-records {
			display: flex;
			flex-wrap: wrap;

			.folder {
				width: 25%;
				box-sizing: border-box;

				display: flex;
				justify-content: space-between;
				flex-direction: column;
				align-items: center;
				margin: 0 2vw;

				.folder-image {
					width: 20vh;
				}

				.folder-name-button {
					padding-top: 0;
					align-items: center;
					width: 1vw;
					font-weight: bold;
				}
			}
		}
	}
}
</style>
