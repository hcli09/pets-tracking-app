<template>
	<div class="left">
		<el-table
			stripe
			row-key="dataid"
			ref="filterTable"
			:data="foodData"
			class="folder-list"
		>
			<!-- Document title -->
			<el-table-column
				width="180"
				prop="food_name"
				align="center"
				label="Food"
				column-key="food_name"
			>
			</el-table-column>

			<el-table-column
				width="130"
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
			<div class="filtertime">
				<el-radio-group v-model="radio" @change="applyFilter">
					<el-radio :label="1">All Data</el-radio>
					<el-radio :label="2">This Week </el-radio>
					<el-radio :label="3">Last Month</el-radio>
					<el-radio :label="4">Last 6 Months</el-radio>
					<el-radio :label="5">Last Year</el-radio>
				</el-radio-group>
			</div>
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
			<el-form-item label="Food">
				<el-input
					v-model="documentForm.food_name"
					placeholder="Enter Food"
					autocomplete="off"
				></el-input>
			</el-form-item>

			<el-form-item label="Amount">
				<el-input
					v-model="documentForm.amount"
					placeholder="Enter Amount"
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
					v-model="EditdocumentForm.food_name"
					placeholder="Enter Medication"
					autocomplete="off"
				></el-input>
			</el-form-item>

			<el-form-item label="Amount">
				<el-input
					v-model="EditdocumentForm.amount"
					placeholder="Enter Amount"
					autocomplete="off"
				></el-input>
			</el-form-item>

			<el-form-item label="Date">
				<el-date-picker
					type="date"
					placeholder="Select a Date"
					v-model="EditdocumentForm.date"
					format="YYYY-MM-DD"
					value-format="YYYY-MM-DD"
				>
				</el-date-picker>
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
		<span>Are you sure to delete this record ?</span>
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
			foodData: [],
			value: ''
		};
	},
	mounted() {
		//get food data
		httpServices.healthTracking
			.getfood({ pet_id: this.$data.petId, range: 'All' })
			.then(response => {
				this.$data.foodData = response.data.data;
			})
			.catch(error => {
				console.log(error.message);
			});
	},
	created() {
		this.$data.radio = 1;
		this.$data.AdddialogFormVisible = false;
		this.$data.documentForm = {
			pet_id: this.$data.petId,
			date: '',
			food_name: '',
			amount: '',
			notes: ''
		};

		//edit dialog related
		this.$data.EditdialogFormVisible = false;
		this.$data.EditdocumentForm = {
			data_id: '',
			pet_id: this.$data.petId,
			date: '',
			food_name: '',
			amount: '',
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
				.addfood(this.$data.documentForm)
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
			this.$data.EditdocumentForm.pet_id = row.pet_id;
			this.$data.EditdocumentForm.date = row.date;
			this.$data.EditdocumentForm.food_name = row.food_name;
			this.$data.EditdocumentForm.amount = row.amount;
			this.$data.EditdocumentForm.notes = row.notes;
		},

		editdocument() {
			httpServices.healthTracking
				.editfood(this.$data.EditdocumentForm)
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
		},

		applyFilter() {
			var dict = {
				1: 'All',
				2: 'Week',
				3: 'Month',
				4: '6Month',
				5: 'Year'
			};
			// get food data
			httpServices.healthTracking
				.getfood({
					pet_id: this.$data.petId,
					range: dict[this.$data.radio]
				})
				.then(response => {
					this.$data.foodData = response.data.data;
				})
				.catch(error => {
					console.log(error.message);
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
	width: 400px;
}

:deep(.el-form-item__label) {
	width: 200px;
}
</style>
