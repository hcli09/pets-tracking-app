<template>
	<div class="left">
		<el-table
			row-key="dataid"
			ref="filterTable"
			:data="medicationData"
			class="folder-list"
		>
			<!-- Document title -->
			<el-table-column
				width="180"
				prop="medicationName"
				align="center"
				label="Medication Name"
				column-key="medicationName"
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
</template>

<script setup></script>

<script>
export default {
	data() {
		return {
			medicationData: [
				{
					medicationName: 'Ibuprofen',
					frequency: 'every week',
					notes: 'NA',
					dataid: 123
				}
			]
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
</style>
