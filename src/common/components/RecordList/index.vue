<template>
	<div class="record-box">
		<el-table
			row-key="date"
			ref="filterTable"
			:data="tableData"
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

			<!-- pet Name -->
			<!-- <el-table-column
			prop="petName"
			label="Pet"
			align="center"
			:filters="[
				{ text: 'Lucy', value: 'Lucy' },
				{ text: 'Bella', value: 'Bella' }
			]"
			:filter-method="filterTag"
			filter-placement="bottom-end"
		>
			<template #default="scope">
				<el-tag disable-transitions>{{ scope.row.tag }}</el-tag>
			</template>
		</el-table-column> -->
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
			<div class="datepicker">
				<p>Date Filter</p>
				<el-date-picker
					v-model="value1"
					type="daterange"
					range-separator="to"
					start-placeholder="Start"
					end-placeholder="End"
					align="center"
					size="mini"
				>
				</el-date-picker>
			</div>

			<div class="pet-filter">
				<p>Pet Filter</p>
				<el-select v-model="value" placeholder="Select Pet">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					>
					</el-option>
				</el-select>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			options: '',
			value1: '',
			tableData: [
				{
					date: '2016-05-02',
					petName: 'Lucy',
					documentTitle: 'Medical Exam Invoice',
					tag: 'Lucy'
				},
				{
					date: '2016-05-04',
					petName: 'Bella',
					documentTitle: 'Vaccination',
					tag: 'Bella'
				},
				{
					date: '2016-05-01',
					petName: 'Lucy',
					documentTitle: 'Checkup invoice',
					tag: 'Lucy'
				},
				{
					date: '2016-05-03',
					petName: 'Bella',
					documentTitle: 'Invoice',
					tag: 'Bella'
				}
			],
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
		}
	}
};
</script>

<style lang="scss">
.record-box {
	display: flex;
	justify-content: space-between;
}
.el-tabs__content {
	height: 65vh;
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
