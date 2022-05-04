<template>
	<el-table
		row-key="date"
		ref="filterTable"
		:data="tableData"
		class="folder-list"
	>
		<!-- Document title -->
		<el-table-column prop="documentTitle" align="center" label="Title">
		</el-table-column>

		<!-- pet Name -->
		<el-table-column
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
</template>

<script>
export default {
	data() {
		return {
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
.Record-content {
	background-color: white;
	border-radius: 1rem;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

	.el-tabs__content {
		height: 65vh;
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		align-items: center;
		// border-bottom: #f2f2f2 solid;
		padding: 2vw 0 1vw 0;
		margin: 0 3vw;

		.document-dialog-datepet {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.document-dialog-upload {
			text-align: center;
		}

		.el-form-item__label {
			color: #76553f;
			text-align: justify;
			margin-right: 1px;
			font-size: medium;
		}

		.el-dialog__body {
			margin: 0 1vw;
			padding-bottom: 0;
		}

		.el-dialog__header {
			background-color: #f1eeec;
			margin-right: 0;
			.el-dialog__title {
				color: #76553f;
				text-align: justify;

				font-size: medium;
			}
		}
		.el-dialog__footer {
			padding-top: 0;
			padding-right: 35px;
		}
	}

	.folder-list {
		width: 85vw;
		margin: 0 2vw 1vw 3vw;
		text-align: center;
	}
}
</style>
