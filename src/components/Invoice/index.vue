<template>
	<div class="record-header">
		<p>Invoice</p>
	</div>

	<div class="Record-content">
		<el-tabs
			v-model="activeName"
			@tab-click="handleClick"
			type="border-card"
			tab-position="top"
		>
			<el-tab-pane label="List" name="first"
				><RecordList></RecordList
			></el-tab-pane>
			<el-tab-pane label="Grid" name="second"
				><RecordGrid></RecordGrid
			></el-tab-pane>
		</el-tabs>

		<!-- add new document pop up window -->

		<el-button
			@click="dialogFormVisible = true"
			label="Add"
			style="position: absolute; right: 10px; top: 3px; color: #76553f"
			><el-icon><Plus /></el-icon
		></el-button>
		<el-dialog
			width="600px"
			title="Add Document"
			v-model="dialogFormVisible"
		>
			<el-form :model="documentForm">
				<el-form-item label="Document Title">
					<el-input
						v-model="documentForm.documentTitle"
						placeholder="Enter document title"
						autocomplete="off"
					></el-input>
				</el-form-item>

				<div class="document-dialog-datepet">
					<el-form-item label="Pet" width="10vw">
						<el-select
							v-model="documentForm.petName"
							placeholder="Select a pet"
						>
							<el-option label="Lucy" value="Lucy"></el-option>
							<el-option label="Bella" value="Bella"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="Date">
						<el-date-picker
							type="date"
							v-model="documentForm.Date"
							format="YYYY/MM/DD"
							value-format="YYYY/MM/DD"
						>
						</el-date-picker>
					</el-form-item>
				</div>

				<el-upload
					class="document-dialog-upload"
					action="https://jsonplaceholder.typicode.com/posts/"
					:on-preview="handlePreview"
				>
					<el-button size="medium" type="primary"
						>Upload Document</el-button
					>
				</el-upload>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button
						@click="dialogFormVisible = false"
						type="primary"
						plain
						>Cancel</el-button
					>
					<el-button
						@click="dialogFormVisible = false"
						type="primary"
						plain
						>Create</el-button
					>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import RecordList from '@common/components/RecordList/index.vue';
import RecordGrid from '@common/components/RecordGrid/index.vue';
</script>

<script>
export default {
	data() {
		return {
			activeName: 'first',
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
					documentTitle: 'Snack invoice',
					tag: 'Bella'
				},
				{
					date: '2016-05-01',
					petName: 'Lucy',
					documentTitle: 'Vaccination',
					tag: 'Lucy'
				},
				{
					date: '2016-05-03',
					petName: 'Bella',
					documentTitle: 'Medicine Invoice',
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
	methods: {}
};
</script>

<style lang="scss" scoped>
.record-header {
	height: 70px;
	position: relative;
	padding: 0.5vh 0 0.5vh 0vw;

	p {
		margin-left: 1vw;
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		font-size: large;
		font-family: Trebuchet MS;
		color: #76553f;
	}
}
.Record-content {
	position: relative;
	background-color: white;
	border-radius: 1rem;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

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
	.el-tabs__nav-scroll {
		background-color: #f1eeec;
	}
}
</style>
