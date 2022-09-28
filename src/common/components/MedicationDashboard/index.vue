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

			<el-table-column
				sortable=""
				width="180"
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

	<!-- add dialog -->
	<el-dialog width="700px" title="Add Data" v-model="AdddialogFormVisible">
		<el-form :model="documentForm">
			<el-form-item label="Medication Name">
				<el-input
					v-model="documentForm.medi_name"
					placeholder="Enter Medication"
					autocomplete="off"
				></el-input>
			</el-form-item>

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

			<el-form-item label="Frequency">
				<el-select v-model="documentForm.frequency" placeholder="">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					>
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="Notes">
				<el-input
					v-model="documentForm.notes"
					placeholder="Enter Notes"
					autocomplete="off"
				></el-input>
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

<script setup></script>

<script>
export default {
	data() {
		return {
			medicationData: [
				{
					pet_id: '_ofDQyX8yw1BacfvcrFlm',
					date: '2022-01-06',
					medi_name: 'med 1',
					frequency: '3 times per day',
					notes: 'with water'
				},
				{
					pet_id: '_ofDQyX8yw1BacfvcrFlm',
					date: '2022-05-07',
					medi_name: 'Ibuprofen',
					frequency: 'every week',
					notes: 'with water'
				}
			],
			options: [
				{
					value: 'Four times a day',
					label: 'Four times a day'
				},
				{
					value: 'Three times a day',
					label: 'Three times a day'
				},
				{
					value: 'Twice Daily',
					label: 'Twice Daily'
				},
				{
					value: 'Everyday',
					label: 'Everyday'
				},
				{
					value: 'By Month',
					label: 'By Month'
				},
				{
					value: 'As Needed',
					label: 'As Needed'
				}
			],
			value: ''
		};
	},
	created() {
		this.$data.AdddialogFormVisible = false;
		this.$data.documentForm = {
			pet_id: '',
			date: '',
			medi_name: '',
			frequency: '',
			notes: ''
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
	width: 400px;
}

:deep(.el-form-item__label) {
	width: 200px;
}
</style>
