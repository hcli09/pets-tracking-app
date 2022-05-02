<template>
	<div class="folder-content">
		<div class="folder-grid">
			<el-scrollbar height="60vh">
				<el-col v-for="o in 20" :key="o">
					<el-card
						style="
							width: 11vw;
							height: 12vw;
							margin-right: 2vw;
							margin-top: 1vw;
							position: relative;
						"
					>
						<div
							style="position: absolute; top: 0.5vw; right: 0.5vw"
						>
							<el-popover
								placement="right"
								style="width: 1vw; height: 1vw"
								trigger="click"
							>
								<template #reference>
									<el-button size="small" type="primary" plain
										><el-icon><More /></el-icon
									></el-button>
								</template>
								<div class="expand-buttons">
									<el-button
										style="
											display: block;
											margin-left: 0.8vw;
										"
										type="text"
										>View</el-button
									>
									<el-button
										style="display: block"
										type="text"
										>Edit</el-button
									>
									<el-button
										style="display: block"
										type="text"
										>Delete</el-button
									>
								</div>
							</el-popover>
						</div>
						<!-- <img
								style="
									width: 1vw;
									height: 1vw;
									position: absolute;
									top: 1vw;
									right: 1vw;
								"
								src="https://api.iconify.design/fad/h-expand.svg?color=%2376553f"
								class="image"
							/> -->
						<img
							style="width: 6vw; height: 8vw"
							src="https://api.iconify.design/bxs/file-pdf.svg?color=%2376553f"
							class="image"
						/>
						<div class="card-bottom">
							<div style="margin-top: 0.3vw">
								<p>Invoice 1</p>
								<p>Mar 30, 2020</p>
							</div>

							<img
								style="
									width: 2vw;
									height: 2vw;
									border-radius: 1vw;
								"
								src="src/assets/Dashboard/doglucy.jpeg"
								class="image"
							/>
						</div>
					</el-card>
				</el-col>
			</el-scrollbar>
		</div>
		<div class="filter-order">
			<p>Pet</p>
			<el-checkbox-group v-model="checkList">
				<el-checkbox style="display: block" label="Lucy"></el-checkbox>
				<el-checkbox
					style="display: block"
					label="Oliver"
				></el-checkbox>
				<el-checkbox style="display: block" label="Bella"></el-checkbox>
			</el-checkbox-group>
		</div>
	</div>
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
.folder-content {
	display: flex;
	justify-content: space-evenly;
	text-align: top;

	.folder-grid {
		width: 80vw;
		height: 65vh;
		margin: 0 0 1vw 3vw;
		text-align: center;
	}

	.filter-order {
		padding-left: 0;
		margin-top: 1.5vw;

		p {
			margin-bottom: 1vw;
			font-family: Trebuchet MS;
			color: #76553f;
		}
		.el-checkbox__label {
			font-family: Trebuchet MS;
			color: #76553f;
		}
	}
}

.card-bottom {
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: left;

	p {
		font-size: 0.8vw;
		font-family: Trebuchet MS;
		color: #76553f;
	}
}
</style>
