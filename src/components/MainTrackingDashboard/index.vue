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
			@click="backtoDashboard"
			>Back To Tracking Dashboard</el-link
		>
	</div>

	<div class="filtertime">
		<el-radio-group v-model="radio" @change="applyFilter">
			<el-radio :label="1">All Data</el-radio>
			<el-radio :label="2">This Week </el-radio>
			<el-radio :label="3">Last Month</el-radio>
			<el-radio :label="4">Last 6 Months</el-radio>
			<el-radio :label="5">Last Year</el-radio>
		</el-radio-group>
	</div>

	<div class="wrapper">
		<div class="dashboard-box">
			<div class="line_chart" id="weight_chart"></div>
		</div>
		<div class="dashboard-box">
			<div class="line_chart" id="calorie_chart"></div>
		</div>
		<div class="dashboard-box">
			<p class="table-label">Food</p>
			<el-table
				stripe
				row-key="dataid"
				ref="filterTable"
				:data="foodData"
				class="folder-list"
			>
				<el-table-column
					width="180"
					prop="amount"
					align="center"
					label="Amount"
					column-key="amount"
				>
				</el-table-column>

				<el-table-column
					width="180"
					prop="notes"
					align="center"
					label="Notes"
					column-key="notes"
				>
				</el-table-column>

				<el-table-column
					sortable=""
					width="130"
					prop="date"
					align="center"
					label="Date"
					column-key="date"
				>
				</el-table-column>
			</el-table>
		</div>
		<div class="dashboard-box">
			<div class="line_chart" id="sleep_chart"></div>
		</div>
		<div class="dashboard-box">
			<div class="line_chart" id="exercise_chart"></div>
		</div>
		<div class="dashboard-box">
			<p class="table-label">Medication</p>
			<el-table
				stripe
				row-key="data_id"
				ref="filterTable"
				:data="medicationData"
				class="folder-list"
			>
				<!-- Document title -->
				<el-table-column
					width="180"
					prop="medi_name"
					align="center"
					label="Medication Name"
					column-key="medi_name"
				>
				</el-table-column>

				<el-table-column
					label="Frequency"
					prop="frequency"
					align="center"
					column-key="frequency"
				>
				</el-table-column>

				<el-table-column
					width="180"
					prop="notes"
					align="center"
					label="Notes"
					column-key="notes"
				>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script setup>
import * as echarts from 'echarts';

import httpServices from '@services';
</script>

<script>
export default {
	data() {
		return {
			weightData: [],
			calorieData: [],
			sleepData: [],
			exerciseData: [],
			foodData: [],
			medicationData: [],

			petsummary: {},
			userInfo: {},
			uid: localStorage.getItem('uid'),
			petId: this.$route.query.id // get petid from url
		};
	},
	created: function () {
		this.$data.radio = 1;
	},
	mounted() {
		this.getdata(this.$data.petId, 'All');
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
	},
	methods: {
		handleClick(tab, event) {
			sessionStorage.setItem('currentTab', tab.props.name);
		},
		backtoDashboard() {
			this.$router.push({
				path: '/home/tracking-dashboard',
				query: { id: this.$data.petId }
			});
		},
		getdata(petid, range) {
			//get weight data
			httpServices.healthTracking
				.getallhealth({ pet_id: petid, range: range })
				.then(response => {
					this.$data.weightData = response.data.data.weight_list;
					this.$data.calorieData = response.data.data.calorie_list;
					this.$data.sleepData = response.data.data.sleep_list;
					this.$data.exerciseData = response.data.data.exercise_list;
					this.$data.foodData = response.data.data.food_list;
					this.$data.medicationData = response.data.data.medi_list;

					//process weight data
					let weight_dates = [];
					let temp_weights = [];
					for (const record of this.$data.weightData) {
						temp_weights.push(record.weight);
						weight_dates.push(record.date);
					}
					this.renderWeightChart(weight_dates, temp_weights);

					//process calorie data
					let calorie_dates = [];
					let temp_calorie = [];
					for (const record of this.$data.calorieData) {
						temp_calorie.push(record.calorie);
						calorie_dates.push(record.date);
					}
					this.renderCalorieChart(calorie_dates, temp_calorie);

					//process sleep data
					let sleep_dates = [];
					let temp_duration = [];
					for (const record of this.$data.sleepData) {
						temp_duration.push(
							(record.minutes / 60).toPrecision(2)
						);

						sleep_dates.push(record.date);
					}
					this.renderSleepChart(sleep_dates, temp_duration);

					//process exercise data
					let exercise_dates = [];
					let exercise_duration = [];
					for (const record of this.$data.exerciseData) {
						exercise_duration.push(
							(record.minutes / 60).toPrecision(2)
						);

						exercise_dates.push(record.date);
					}
					this.renderExerciseChart(exercise_dates, exercise_duration);
				})
				.catch(error => {
					console.log(error.message);
				});
		},
		renderWeightChart(date, weight) {
			if (document.getElementById('weight_chart') == null) {
				return;
			}
			echarts.dispose(document.getElementById('weight_chart'));
			let myChart = echarts.init(document.getElementById('weight_chart'));
			myChart.setOption({
				title: {
					text: 'Weight'
				},
				tooltip: {},
				xAxis: {
					data: date,
					name: 'Date'
				},
				yAxis: {
					name: 'Kg'
				},
				series: [
					{
						name: 'Weight',
						type: 'line',
						data: weight
					}
				]
			});
			window.onresize = function () {
				myChart.resize();
			};
		},
		renderCalorieChart(date, calorie) {
			if (document.getElementById('calorie_chart') == null) {
				return;
			}
			echarts.dispose(document.getElementById('calorie_chart'));
			let calorieChart = echarts.init(
				document.getElementById('calorie_chart')
			);
			calorieChart.setOption({
				title: {
					text: 'Calorie'
				},
				tooltip: {},
				xAxis: {
					data: date,
					name: 'Date'
				},
				yAxis: {
					name: 'Kcal'
				},
				series: [
					{
						name: 'Calorie',
						type: 'line',
						data: calorie
					}
				]
			});
			window.onresize = function () {
				calorieChart.resize();
			};
		},
		renderSleepChart(date, minutes) {
			if (document.getElementById('sleep_chart') == null) {
				return;
			}
			echarts.dispose(document.getElementById('sleep_chart'));
			let sleepChart = echarts.init(
				document.getElementById('sleep_chart')
			);
			sleepChart.setOption({
				tooltip: {
					triggerOn: 'none',
					formatter: function (params) {
						return (
							'X: ' +
							params.data[0].toFixed(2) +
							'<br />Y: ' +
							params.data[1].toFixed(2)
						);
					}
				},
				title: {
					text: 'Sleep'
				},
				tooltip: {},
				xAxis: {
					data: date,
					name: 'Date'
				},
				yAxis: {
					data: minutes,
					name: 'Hours'
				},
				series: [
					{
						name: 'Sleep',
						type: 'line',
						data: minutes
					}
				]
			});
			window.onresize = function () {
				sleepChart.resize();
			};
		},
		renderExerciseChart(date, minutes) {
			if (document.getElementById('exercise_chart') == null) {
				return;
			}
			echarts.dispose(document.getElementById('exercise_chart'));
			let exerciseChart = echarts.init(
				document.getElementById('exercise_chart')
			);
			exerciseChart.setOption({
				tooltip: {
					triggerOn: 'none',
					formatter: function (params) {
						return (
							'X: ' +
							params.data[0].toFixed(2) +
							'<br />Y: ' +
							params.data[1].toFixed(2)
						);
					}
				},
				title: {
					text: 'Exercise'
				},
				tooltip: {},
				xAxis: {
					data: date,
					name: 'Date'
				},
				yAxis: {
					data: minutes,
					name: 'Hours'
				},
				series: [
					{
						name: 'Exercise',
						type: 'line',
						data: minutes
					}
				]
			});
			window.onresize = function () {
				exerciseChart.resize();
			};
		},
		applyFilter() {
			var dict = {
				1: 'All',
				2: 'Week',
				3: 'Month',
				4: '6Month',
				5: 'Year'
			};
			this.getdata(this.$data.petId, dict[this.$data.radio]);
		}
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

.wrapper {
	margin-top: 1em;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-column-gap: 10px;
	grid-row-gap: 1em;

	.dashboard-box {
		height: 240px;
		background-color: #ffffff;
		border-radius: 5% 5% 5% 5%;
		position: relative;
		.line_chart {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translateX(-50%) translateY(-50%);
			height: 250px;
			width: 400px;
			margin: 10px;
		}
	}

	.table-label {
		color: #464646;
		font-weight: 600;
		margin: 10px 0 0 10px;
	}
}

.filtertime {
	display: flex;
	justify-content: space-evenly;
	flex-direction: row;
	align-items: center;
	padding: 0%;
}
</style>
