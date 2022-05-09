<template>
	<div class="folder-content">
		<div class="folder-grid">
			<el-scrollbar height="60vh">
				<el-col
					:gutter="24"
					v-for="(record, index) in this.$data.displayedRecordList"
					:key="index"
				>
					<!-- one document -->
					<el-card
						style="
							width: 250px;
							height: 255px;
							margin-right: 2vw;
							margin-top: 1vw;
							position: relative;
						"
					>
						<div
							style="position: absolute; top: 0.5vw; right: 0.5vw"
						>
							<!-- drop down list -->
							<el-dropdown trigger="click">
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
							<!-- end of dropdown list -->
						</div>

						<!-- pdf image -->
						<div class="pdf">
							<vue-pdf-embed
								height="10"
								width="120"
								:page="1"
								class="image"
								:source="record.fileDir"
								@click="popoverPDF(index)"
							/>
						</div>
						<el-dialog
							v-if="cur == index"
							:title="record.documentTitle"
							v-model="dialogPDFVisible"
						>
							<vue-pdf-embed :source="record.fileDir" />
						</el-dialog>
						<!-- <img
							style="width: 6vw; height: 8vw; margin-left: 1.5vw"
							src="https://api.iconify.design/bxs/file-pdf.svg?color=%2376553f"
							class="image"
							@click="dialogPDFVisible = true"
						/> -->
						<div class="card-bottom">
							<div style="margin-top: 0.3vw">
								<b>{{ record.documentTitle }}</b>
								<p>{{ record.date }}</p>
								<p>{{ record.petName }}</p>
							</div>

							<!-- pet avatar -->

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
</template>

<script>
import VuePdfEmbed from 'vue-pdf-embed';

export default {
	components: {
		VuePdfEmbed
	},
	data() {
		return {
			recordList: [
				{
					date: '2022-05-02',
					petName: 'Lucy',
					documentTitle: 'Medical Exam Invoice',
					tag: 'Lucy',
					fileDir:
						'https://firebasestorage.googleapis.com/v0/b/pet-tracking-app-51857.appspot.com/o/invoiceExample1.pdf?alt=media&token=303348a1-3b88-4c43-a6b8-4f5d5e49dcba'
				},
				{
					date: '2022-05-04',
					petName: 'Bella',
					documentTitle: 'Vaccination',
					tag: 'Bella',
					fileDir:
						'https://firebasestorage.googleapis.com/v0/b/pet-tracking-app-51857.appspot.com/o/git-cheat-sheet-education.pdf?alt=media&token=23ca76e2-d3fe-4d67-8790-a6e3a067de6f'
				},
				{
					date: '2022-05-01',
					petName: 'Lucy',
					documentTitle: 'Checkup invoice',
					tag: 'Lucy',
					fileDir:
						'https://firebasestorage.googleapis.com/v0/b/pet-tracking-app-51857.appspot.com/o/git-cheat-sheet-education.pdf?alt=media&token=23ca76e2-d3fe-4d67-8790-a6e3a067de6f'
				},
				{
					date: '2022-05-03',
					petName: 'Bella',
					documentTitle: 'Invoice',
					tag: 'Bella',
					fileDir:
						'https://firebasestorage.googleapis.com/v0/b/pet-tracking-app-51857.appspot.com/o/git-cheat-sheet-education.pdf?alt=media&token=23ca76e2-d3fe-4d67-8790-a6e3a067de6f'
				}
			],
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
			displayedRecordList: [],
			dialogTableVisible: false,
			dialogFormVisible: false,
			dialogPDFVisible: false,
			cur: 0,
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
		this.$data.displayedRecordList = this.$data.recordList.slice();
	},
	methods: {
		popoverPDF(index) {
			this.cur = index;
			this.dialogPDFVisible = true;
		},

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
		//filter date
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
		// 	this.$data.displayedRecordList = [];
		// 	for (let record of this.$data.recordList) {
		// 		if (record.petName == this.$data.petSelected) {
		// 			this.$data.displayedRecordList.push(record);
		// 		}
		// 	}
		// },

		resetRecordList() {
			this.$data.displayedRecordList = this.$data.recordList.slice();
			this.$data.dateRange = '';
			this.$data.petSelected = '';
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

		.pdf {
			width: 6vw;
			height: 8vw;
			margin-left: 1.5vw;
		}
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

	b {
		font-size: medium;
		font-family: Trebuchet MS;
		color: #76553f;
	}
	p {
		font-size: small;
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
