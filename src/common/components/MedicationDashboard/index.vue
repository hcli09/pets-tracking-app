<template>
	<div class="left">
		<el-table
			stripe
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

	<!-- edit dialog related -->
	<el-dialog
		width="700px"
		title="Edit Document"
		v-model="EditdialogFormVisible"
	>
		<el-form :model="EditdocumentForm">
			<el-form-item label="Medication Name">
				<el-input
					v-model="EditdocumentForm.medi_name"
					placeholder="Enter Medication"
					autocomplete="off"
				></el-input>
			</el-form-item>

			<el-form-item label="Frequency">
				<el-select v-model="EditdocumentForm.frequency" placeholder="">
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
					v-model="EditdocumentForm.notes"
					placeholder="Enter Notes"
					autocomplete="off"
				></el-input>
			</el-form-item>
		</el-form>

		<template #footer>
			<span class="dialog-footer">
				<el-button
					@click="EditdialogFormVisible = false"
					type="primary"
					plain
					>Cancel</el-button
				>
				<el-button @click="editdocument" type="primary" plain
					>Save</el-button
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
		<span>Are you sure to delete this medication ?</span>
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
import httpServices from '@services';
</script>

<script>
export default {
	data() {
		return {
			petId: this.$route.query.id,
			medicationData: [],
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
	mounted() {
		//get medication data
		httpServices.healthTracking
			.getmedi({ pet_id: this.$data.petId, range: 'All' })
			.then(response => {
				this.$data.medicationData = response.data.data;
			})
			.catch(error => {
				console.log(error.message);
			});
	},
	created() {
		this.$data.AdddialogFormVisible = false;
		this.$data.documentForm = {
			pet_id: this.$data.petId,
			date: '2021-09-03',
			medi_name: '',
			frequency: '',
			notes: ''
		};

		//edit dialog related
		this.$data.EditdialogFormVisible = false;
		this.$data.EditdocumentForm = {
			data_id: '',
			pet_id: this.$data.petId,
			date: '2021-09-03',
			medi_name: '',
			frequency: '',
			notes: ''
		};

		//delete dialog related
		this.$data.deletedialogVisible = false;
		this.$data.delete_data_id = '';
	},
	methods: {
		adddocument() {
			this.$data.AdddialogFormVisible = false;

			// add new medication data
			httpServices.healthTracking
				.addmedi(this.$data.documentForm)
				.then(response => {
					location.reload();
				})
				.catch(error => {
					console.log(error);
				});
		},

		handleEdit(index, row) {
			this.$data.EditdialogFormVisible = true;
			this.$data.EditdocumentForm.data_id = row.data_id;
			this.$data.EditdocumentForm.petId = row.petId;
			this.$data.EditdocumentForm.medi_name = row.medi_name;
			this.$data.EditdocumentForm.frequency = row.frequency;
			this.$data.EditdocumentForm.notes = row.notes;
		},

		editdocument() {
			httpServices.healthTracking
				.editmedi(this.$data.EditdocumentForm)
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
