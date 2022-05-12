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
				></RecordList
			></el-tab-pane>
			<el-tab-pane label="Grid" name="second"
				><RecordGrid
					:petList="petList"
					:petOptions="petOptions"
					:initial_recordType="recordType"
					:curr_uid="uid"
				></RecordGrid
			></el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
import RecordList from '@common/components/RecordList/index.vue';
import RecordGrid from '@common/components/RecordGrid/index.vue';
import httpServices from '@services';
</script>

<script>
export default {
	data() {
		return {
			uid: '4EL4hp_qRUYMzzal_G29f',
			activeName: 'first',
			petList: [],
			petOptions: [],
			recordType: 'Invoice'
		};
	},
	created: function () {
		//get pet list
		httpServices.invoicemed
			.getPetList({ uid: this.$data.uid })
			.then(response => {
				this.$data.petList = response.data.data;
				//generate pet options for el-select
				for (let pet of this.$data.petList) {
					let temp = { value: pet.petId, label: pet.petName };
					this.$data.petOptions.push(temp);
					console.log(this.$data.petOptions);
				}
			})
			.catch(error => {
				console.log(error);
			});
	},

	methods: {}
};
</script>

<style lang="scss" scoped>
.record-header {
	height: 70px;
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
}
</style>
