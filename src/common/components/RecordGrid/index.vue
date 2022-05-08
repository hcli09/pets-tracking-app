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
							<el-dropdown>
								<span class="el-dropdown-link">
									<el-button size="small" type="primary" plain
										><el-icon><More /></el-icon
									></el-button>
								</span>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item
											>View</el-dropdown-item
										>
										<el-dropdown-item
											>Edit</el-dropdown-item
										>
										<el-dropdown-item
											>Delete</el-dropdown-item
										>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</div>

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
		margin: 0 0 1vw 3vw;
		text-align: center;
	}
	.el-tabs__content {
		height: 65vh;
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
