<template>
	<div class="recordlist">
		<div class="record-box">
			<el-table
				row-key="date"
				ref="filterTable"
				:data="displayedRecordList"
				class="folder-list"
			>
				<!-- Document title -->
				<el-table-column
					prop="documentTitle"
					align="center"
					label="Title"
					sortable
					column-key="documentTitle"
				>
				</el-table-column>

				<el-table-column
					prop="petName"
					label="Pet"
					align="center"
					sortable
					column-key="Pet"
				>
				</el-table-column>

				<!-- Date -->
				<el-table-column
					prop="date"
					label="Date"
					sortable
					align="center"
					column-key="date"
				>
				</el-table-column>

				<!-- Operations -->
				<el-table-column label="Operations" align="center">
					<template #default="scope">
						<el-button
							size="small"
							@click="handleView(scope.$index, scope.row)"
							style="background: #f1eeec"
							>View</el-button
						>
						<el-button
							size="small"
							@click="handleEdit(scope.$index, scope.row)"
							style="background: #f1eeec"
							>Edit</el-button
						>
						<el-button
							size="small"
							@click="handleDelete(scope.$index, scope.row)"
							style="background: #f1eeec"
							>Delete</el-button
						>
					</template>
				</el-table-column>
			</el-table>

			<div class="right-filter">
				<el-form>
					<el-form-item class="datepicker">
						<p>Date Filter</p>
						<el-date-picker
							v-model="dateRange"
							type="daterange"
							range-separator="to"
							start-placeholder="Start"
							end-placeholder="End"
							align="center"
							size="mini"
							@change="applyFilter"
						>
						</el-date-picker>
					</el-form-item>

					<div class="pet-filter">
						<p>Pet Filter</p>
						<el-select
							v-model="petSelected"
							placeholder="Select Pet"
							@change="applyFilter"
						>
							<el-option
								v-for="pet in this.$data.petList"
								:key="pet.petId"
								:label="pet.petName"
								:value="pet.petName"
							>
							</el-option>
						</el-select>
					</div>

					<el-button
						style="margin-top: 1vw"
						type="primary"
						size="mini"
						plain
						@click="resetRecordList"
						>Reset</el-button
					>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			petList: [
				{
					petID: 'cxgfchfc',
					petName: 'Lucy'
				},
				{
					petID: 'ibhbikbh',
					petName: 'Bella'
				}
			],
			dateRange: '',
			petSelected: '',
			recordList: [
				{
					date: '2022-05-02',
					petName: 'Lucy',
					documentTitle: 'Medical Exam Invoice',
					tag: 'Lucy'
				},
				{
					date: '2022-05-04',
					petName: 'Bella',
					documentTitle: 'Vaccination',
					tag: 'Bella'
				},
				{
					date: '2022-05-01',
					petName: 'Lucy',
					documentTitle: 'Checkup invoice',
					tag: 'Lucy'
				},
				{
					date: '2022-05-03',
					petName: 'Bella',
					documentTitle: 'Invoice',
					tag: 'Bella'
				}
			],
			displayedRecordList: [],
			dialogTableVisible: false,
			dialogFormVisible: false,
			documentForm: {
				documentTitle: '',
				petName: '',
				date: '',
				documentName: ''
			}
		};
	},
	created: function () {
		// TODO: get recordList from API
		this.$data.displayedRecordList = this.$data.recordList;
	},
	methods: {
		filterTag(value, row) {
			return row.tag === value;
		},
		filterHandler(value, row, column) {
			const property = column['property'];
			return row[property] === value;
		},
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		},
		handleView(index, row) {
			console.log(index, row);
		},
		handlePreview(file) {
			console.log(file);
		},
		// //filter date
		// filterDate() {
		// 	this.$data.displayedRecordList = [];
		// 	let startDate = new Date(
		// 		this.$data.dateRange[0].toISOString().split('T')[0]
		// 	);
		// 	let endDate = new Date(
		// 		this.$data.dateRange[1].toISOString().split('T')[0]
		// 	);

		// 	for (let record of this.$data.recordList) {
		// 		let recordDate = new Date(record.date);
		// 		if (
		// 			recordDate.getTime() >= startDate.getTime() &&
		// 			recordDate.getTime() <= endDate.getTime()
		// 		) {
		// 			this.$data.displayedRecordList.push(record);
		// 		}
		// 	}
		// },
		//filter Pet
		// //filter date
		applyFilter() {
			this.$data.displayedRecordList = this.$data.recordList.slice();
			console.log(this.$data.dateRange);
			console.log(this.$data.petSelected);

			if (this.$data.dateRange !== '' && this.$data.petSelected === '') {
				let startDate = new Date(
					this.$data.dateRange[0].toISOString().split('T')[0]
				);
				let endDate = new Date(
					this.$data.dateRange[1].toISOString().split('T')[0]
				);

				for (let record of this.$data.recordList) {
					let recordDate = new Date(record.date);
					if (
						recordDate.getTime() < startDate.getTime() ||
						recordDate.getTime() > endDate.getTime()
					) {
						var index =
							this.$data.displayedRecordList.indexOf(record);
						if (index !== -1) {
							this.$data.displayedRecordList.splice(index, 1);
						}
					}
				}
			}

			if (this.$data.petSelected !== '' && this.$data.dateRange === '') {
				for (let record of this.$data.recordList) {
					if (record.petName != this.$data.petSelected) {
						var index =
							this.$data.displayedRecordList.indexOf(record);
						if (index !== -1) {
							this.$data.displayedRecordList.splice(index, 1);
						}
					}
				}
			}

			if (this.$data.dateRange !== '' && this.$data.petSelected !== '') {
				let startDate = new Date(
					this.$data.dateRange[0].toISOString().split('T')[0]
				);
				let endDate = new Date(
					this.$data.dateRange[1].toISOString().split('T')[0]
				);

				for (let record of this.$data.recordList) {
					let recordDate = new Date(record.date);
					console.log(record);
					if (
						recordDate.getTime() < startDate.getTime() ||
						recordDate.getTime() > endDate.getTime() ||
						record.petName !== this.$data.petSelected
					) {
						var index =
							this.$data.displayedRecordList.indexOf(record);
						if (index !== -1) {
							this.$data.displayedRecordList.splice(index, 1);
						}
					}
				}
			}
		},
		// //filter Pet
		// filterPet() {
		// 	this.$data.displayedReco
		resetRecordList() {
			this.$data.displayedRecordList = this.$data.recordList;
			this.$data.dateRange = '';
			this.$data.petSelected = '';
		}
	}
};
</script>

<style lang="scss">
.el-tabs__content {
	height: 65vh;
}

.record-box {
	display: flex;
	justify-content: space-between;
}

.folder-list {
	margin: 0 2vw 1vw 3vw;
	text-align: center;
	display: flex;
	justify-content: space-around;

	.el-button > span {
		color: #76553f;
		font-style: Trebuchet MS;
	}

	.cell {
		color: #76553f;
		font-family: 'Trebuchet MS';
	}
}

.right-filter {
	.datepicker {
		margin-top: 8px;
		p {
			color: #76553f;
			margin: 0 2px;
			font-family: 'Trebuchet MS';
			font-size: 14px;
			font-weight: bold;
		}
		.el-range-editor {
			width: 200px;
			margin-top: 5px;
			padding-right: 1px;

			.el-range-input {
				font-size: small;
			}
		}
		.el-range-separator {
			color: #76553f;
		}
	}

	.pet-filter {
		margin-top: 15px;
		p {
			color: #76553f;
			margin: 0 2px;
			font-family: 'Trebuchet MS';
			font-size: 14px;
			font-weight: bold;
		}
		.el-input__inner {
			margin-top: 5px;
			width: 200px;
			font-size: small;
		}
	}
}
</style>
