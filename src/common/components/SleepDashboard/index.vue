<template>
	<div class="left" v-if="!showListView">
		<div class="line_chart">
			<div id="sleep_chart" style="height: 370px"></div>
		</div>
	</div>

	<div v-else class="left">
		<el-table
			stripe
			row-key="dataid"
			ref="filterTable"
			:data="sleepData"
			class="folder-list"
		>
			<!-- Document title -->
			<el-table-column
				sortable=""
				width="300"
				prop="duration_str"
				align="center"
				label="Duration"
				column-key="duration_str"
			>
			</el-table-column>

			<el-table-column
				sortable=""
				width="200"
				prop="date"
				align="center"
				label="Date"
				column-key="date"
			>
			</el-table-column>

			<!-- Operations -->
			<el-table-column label="Operations" align="center">
				<template #default="scope">
					<el-button
						size="small"
						@click="handleDelete(scope.$index, scope.row)"
						style="background: #f1eeec"
						>Delete</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</div>

	<div class="right">
		<div class="filter_add">
			<div class="filtertime">
				<el-radio-group v-model="radio" @change="applyFilter">
					<el-radio :label="1">All Data</el-radio>
					<el-radio :label="2">This Week </el-radio>
					<el-radio :label="3">Last Month</el-radio>
					<el-radio :label="4">Last 6 Months</el-radio>
					<el-radio :label="5">Last Year</el-radio>
				</el-radio-group>
			</div>

			<el-button
				v-if="!showListView"
				class="rihgt_buttons"
				style="margin-top: 1vw"
				type="primary"
				plain
				@click="showListView = true"
				>Show All Data</el-button
			>
			<el-button
				v-else
				class="rihgt_buttons"
				style="margin-top: 1vw"
				type="primary"
				plain
				@click="(showListView = False), applyFilter()"
				>Show Chart</el-button
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
	<!-- add dialog -->
	<el-dialog width="350px" title="Add Data" v-model="AdddialogFormVisible">
		<el-form :model="documentForm">
			<el-form-item label="Date">
				<el-date-picker
					type="date"
					placeholder="Select a Date"
					v-model="documentForm.date"
					format="YYYY-MM-DD"
					value-format="YYYY-MM-DD"
				>
				</el-date-picker>
			</el-form-item>

			<el-form-item label="Sleep Time">
				<el-time-select
					placeholder="Enter time"
					v-model="documentForm.duration_str"
					format="HH:mm"
					start="00:05"
					step="00:05"
					end="12:00"
				>
				</el-time-select>
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

	<!-- delete dialog -->
	<el-dialog
		v-model="deletedialogVisible"
		title=""
		width="30%"
		:before-close="handleClose"
	>
		<span>Are you sure to delete this record?</span>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="deletedialogVisible = false"
					>Cancel</el-button
				>
				<el-button type="primary" @click="documentDelete()"
					>Delete</el-button
				>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { onMounted } from 'vue';
import * as echarts from 'echarts';
import httpServices from '@services';
</script>

<script>
export default {
	data() {
		return {
			petId: this.$route.query.id,
			sleepData: []
		};
	},
	mounted() {
		this.getdata(this.$data.petId, 'All');
	},
	created() {
		this.$data.radio = 1;
		this.$data.showListView = false;
		this.$data.AdddialogFormVisible = false;
		this.$data.documentForm = {
			pet_id: this.$data.petId,
			date: '',
			duration_str: ''
		};

		//delete dialog related
		this.$data.deletedialogVisible = false;
		this.$data.delete_data_id = '';
	},
	methods: {
		applyFilter() {
			var dict = {
				1: 'All',
				2: 'Week',
				3: 'Month',
				4: '6Month',
				5: 'Year'
			};
			this.getdata(this.$data.petId, dict[this.$data.radio]);
		},
		getdata(petid, range) {
			//get sleep data
			httpServices.healthTracking
				.getsleep({ pet_id: petid, range: range })
				.then(response => {
					this.$data.sleepData = response.data.data;
					let temp_dates = [];
					let temp_duration = [];
					for (const record of this.$data.sleepData) {
						temp_duration.push(
							(record.minutes / 60).toPrecision(2)
						);

						temp_dates.push(record.date);
					}
					this.renderChart(temp_dates, temp_duration);
				})
				.catch(error => {
					console.log(error.message);
				});
		},
		renderChart(date, minutes) {
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

		adddocument() {
			this.$data.AdddialogFormVisible = false;

			// add new sleep data
			httpServices.healthTracking
				.addsleep(this.$data.documentForm)
				.then(response => {
					location.reload();
				})
				.catch(error => {
					console.log(error);
				});
		},

		//delete document related
		handleDelete(index, row) {
			this.$data.deletedialogVisible = true;
			this.$data.delete_data_id = row.data_id;
		},
		documentDelete() {
			this.$data.deletedialogVisible = false;
			//delete record list
			httpServices.healthTracking
				.deletedata({ data_id: this.$data.delete_data_id })
				.then(response => {
					location.reload();
				})
				.catch(error => {
					console.log(error);
				});
		}
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
	margin-top: 3vh;
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

	.filtertime {
		display: flex;
		justify-content: space-evenly;
		flex-direction: column;
		align-items: center;
		margin-left: 50px;
		margin-top: 20px;
	}

	:deep(.el-radio-group) {
		display: inline-flex;
		align-items: flex-start;
		flex-direction: column;
	}
}

:deep(.el-input__inner) {
	width: 200px;
}

:deep(.el-form-item__label) {
	width: 90px;
}

.line_chart {
	margin-top: 2%;
	margin-left: 2%;
}
</style>
