<template>
	<div class="record-header">
		<p>Invoice</p>
	</div>

	<div class="Record-content">
		<el-tabs
			v-model="activeName"
			@tab-click="handleClick"
			type="border-card"
			tab-position="top"
		>
			<el-tab-pane label="List" name="first"
				><RecordList
					:petList="petList"
					:petOptions="petOptions"
					:initial_recordType="recordType"
					:curr_uid="uid"
					:record_List="recordList"
				></RecordList
			></el-tab-pane>
			<el-tab-pane label="Grid" name="second"
				><RecordGrid
					:petList="petList"
					:petOptions="petOptions"
					:initial_recordType="recordType"
					:curr_uid="uid"
					:record_List="recordList"
				></RecordGrid
			></el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
import RecordList from '@common/components/RecordList/index.vue';
import RecordGrid from '@common/components/RecordGrid/index.vue';
import Close from '@common/components/CloseButton/index.vue';
import httpServices from '@services';
</script>

<script>
export default {
	data() {
		return {
			uid: localStorage.getItem('uid'),
			petList: [],
			petOptions: [],
			recordType: 'Invoice',
			recordList: [],
			petId: this.$route.query.id
		};
	},
	created: function () {
		this.$data.activeName = 'first';
		//get pet list
		httpServices.invoicemed
			.getPetList({ uid: this.$data.uid })
			.then(response => {
				this.$data.petList = response.data.data;

				if (this.$data.petId !== undefined) {
					this.$data.petList = this.$data.petList.filter(
						item => item.petId === this.$data.petId
					);
				}
				//generate pet options for el-select
				for (let pet of this.$data.petList) {
					let temp = { value: pet.petId, label: pet.petName };
					this.$data.petOptions.push(temp);
				}
			})
			.catch(error => {
				console.log(error);
			});

		//get record list
		httpServices.invoicemed
			.getAllRecords({
				uid: this.$data.uid,
				recordType: this.$data.recordType
			})
			.then(response => {
				this.$data.recordList = response.data.data;
				if (this.$data.petId !== undefined) {
					this.$data.recordList = this.$data.recordList.filter(
						item => item.petId === this.$data.petId
					);
				}
			})
			.catch(error => {
				console.log(error);
			});
	},

	methods: {
		topetProfile() {
			this.$router.push({
				path: '/home/pet-profile',
				query: { id: this.$data.petId }
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.record-header {
	height: 35px;
	position: relative;
	padding: 0.5vh 0 0.5vh 0vw;

	p {
		margin-left: 1vw;
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		font-size: large;
		font-family: Trebuchet MS;
		color: #76553f;
	}
}
.Record-content {
	position: relative;
	background-color: white;
	border-radius: 1rem;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

	:deep(.el-tabs__nav-scroll) {
		background-color: #f1eeec;
	}
}
</style>
