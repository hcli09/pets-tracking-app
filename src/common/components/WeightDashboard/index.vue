<template>
	<div class="left">
		<div class="date_filter">
			<el-checkbox-group
				style="margin-left: 20%"
				class="checkbox"
				v-model="checkList"
			>
				<el-checkbox label="All"></el-checkbox>
				<el-checkbox label="Week"></el-checkbox>
				<el-checkbox label="Month"></el-checkbox>
				<el-checkbox label="6Month"></el-checkbox>
				<el-checkbox label="Year"></el-checkbox>
			</el-checkbox-group>
		</div>
		<div class="line_chart">
			<div id="main" style="height: 370px"></div>
		</div>
	</div>
	<div class="right">
		<div class="filter_add">
			<el-button
				class="rihgt_buttons"
				style="margin-top: 1vw"
				type="primary"
				plain
				>Show All Data</el-button
			>
			<!-- add new document pop up window -->
			<el-button
				class="rihgt_buttons"
				label="Add"
				type="primary"
				plain
				style="margin-top: 1vw"
				@click="AdddialogFormVisible = true"
				><el-icon><Plus /></el-icon> Add Data</el-button
			>
		</div>
	</div>

	<el-dialog width="300px" title="Add Data" v-model="AdddialogFormVisible">
		<el-form :model="documentForm">
			<el-form-item label="Kg">
				<el-input
					v-model="documentForm.weight"
					placeholder="Enter Data"
					autocomplete="off"
				></el-input>
			</el-form-item>

			<el-form-item label="Time">
				<el-date-picker
					type="date"
					placeholder="Select a Date"
					v-model="documentForm.time"
					format="YYYY-MM-DD"
					value-format="YYYY-MM-DD"
				>
				</el-date-picker>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button
					@click="AdddialogFormVisible = false"
					type="primary"
					plain
					>Cancel</el-button
				>
				<el-button @click="adddocument" type="primary" plain
					>Create</el-button
				>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { onMounted } from 'vue';
import * as echarts from 'echarts';
onMounted(() => {
	let myChart = echarts.init(document.getElementById('main'));
	myChart.setOption({
		title: {
			text: 'Weight'
		},
		tooltip: {},
		xAxis: {
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		},
		yAxis: {},
		series: [
			{
				name: 'Weight',
				type: 'line',
				data: [7, 8, 6, 9, 10, 12, 11]
			}
		]
	});
	window.onresize = function () {
		myChart.resize();
	};
});
</script>

<script>
export default {
	data() {
		return {
			checkList: ['All']
		};
	},
	created() {
		this.$data.AdddialogFormVisible = false;
		this.$data.documentForm = {
			recordTitle: '',
			petId: '',
			date: '',
			fileDir: '',
			fileFormat: ''
		};
	}
};
</script>

<style lang="scss" scoped>
.left {
	float: left;
	width: 80%;
}
.right {
	float: right;
	width: 20%;
}

.filter_add {
	margin-top: 50%;
	display: flex;
	justify-content: space-evenly;
	flex-direction: column;
	align-items: center;

	.rihgt_buttons {
		margin-left: 0;
		margin-right: 0;
		width: 100px;
		height: 40px;
	}
}

:deep(.el-input__inner) {
	width: 200px;
}

:deep(.el-form-item__label) {
	width: 50px;
}
</style>
