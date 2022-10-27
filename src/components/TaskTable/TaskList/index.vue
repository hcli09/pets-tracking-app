<template>
	<div class="list-container">
		<el-skeleton
			style="width: 100%"
			direction="vertical"
			alignment="flex-start"
			:loading="loading"
			animated
			:rows="12"
		>
			<el-table
				row-key="recordId"
				ref="filterTable"
				:data="tasks"
				class="folder-list"
			>
				<!-- Document title -->
				<el-table-column align="left" label="Task" column-key="taskId">
					<template #default="scope">
						<div class="flex items-center">
							{{ scope.row.taskTitle }}
						</div>
					</template>
				</el-table-column>

				<el-table-column
					align="left"
					label="Pets"
					column-key="taskId"
					width="100"
				>
					<template #default="scope">
						<el-tooltip
							class="box-item"
							effect="dark"
							:content="`with ${scope.row.petAbList
								.map(pet => pet.petName)
								.join(', ')}`"
							placement="right"
						>
							<el-scrollbar>
								<div class="flex items-center">
									<img
										v-for="pet in scope.row.petAbList"
										:src="pet.petAvatar"
										style="
											width: 30px;
											border-radius: 50%;
											margin-right: 2px;
										"
									/>
								</div>
							</el-scrollbar>
						</el-tooltip>
					</template>
				</el-table-column>

				<el-table-column
					prop="dueDate"
					align="center"
					label="Due Date"
					column-key="taskId"
					sortable
				/>

				<el-table-column
					align="center"
					label="Checked"
					column-key="taskId"
					width="100"
				>
					<template #default="scope">
						<span>{{ scope.row.checked ? 'Yes' : 'No' }}</span>
					</template>
				</el-table-column>

				<!-- Operations -->
				<el-table-column label="Operations" align="center">
					<template #default="scope">
						<el-button
							size="small"
							@click="handleEdit(scope.row.taskId)"
							style="background: #f1eeec"
							>Edit
						</el-button>

						<el-button
							size="small"
							@click="
								handleCheck(scope.row.taskId, scope.row.checked)
							"
							style="background: #f1eeec"
							>Check
						</el-button>

						<el-popconfirm
							confirm-button-text="Yes"
							cancel-button-text="No, thanks"
							:icon="InfoFilled"
							icon-color="#f56c6c"
							title="Are you sure to delete this task?"
							@confirm="confirmDeleteTask(scope.row.taskId)"
							@cancel="cancelDeleteEvent"
						>
							<template #reference>
								<el-button size="small" type="danger"
									>Delete</el-button
								>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
		</el-skeleton>

		<TaskDialog
			v-if="editTaskDialogVisible"
			:taskId="taskIdToEdit"
			:dialogVisible="editTaskDialogVisible"
			@setVisible="setEditTaskDialogVisible"
		/>

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
							v-for="pet in petList"
							:key="pet.petId"
							:label="pet.petName"
							:value="pet.petId"
						>
						</el-option>
					</el-select>
				</div>

				<div class="filter_add">
					<el-button
						class="right_button"
						type="primary"
						plain
						@click="resetFilters"
						>Reset Filters</el-button
					>
				</div>
			</el-form>
		</div>
	</div>
</template>
<script setup>
import {
	defineProps,
	reactive,
	inject,
	ref,
	defineAsyncComponent,
	toRaw
} from 'vue';
import services from '../../../services';
import { InfoFilled } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import moment from 'moment';
const TaskDialog = defineAsyncComponent(() =>
	import('../../../common/components/TaskDialog/index.vue')
);
const router = useRouter();
const reload = inject('reload');
const props = defineProps({
	curUid: {
		type: String,
		required: true
	},
	archived: {
		type: Boolean
	}
});

const { curUid, archived } = props;

const tasks = ref([]);
const petList = reactive([...JSON.parse(localStorage.getItem('user')).petList]);
const baseData = ref([]);

const loading = ref(true);
const getAllTasksAsync = async () => {
	const { data: res } = await services.tasks.getAllTasks({
		uid: curUid
	});
	if (res.data) {
		loading.value = false;
		tasks.value = res.data;
		baseData.value = res.data;
	}
};

const getAllArchivedTasksAsync = async () => {
	const { data: res } = await services.tasks.getAllArchivedTasks({
		uid: curUid
	});
	if (res.data) {
		loading.value = false;
		tasks.value = res.data;
	}
};

if (archived) {
	getAllArchivedTasksAsync();
} else {
	getAllTasksAsync();
}

const confirmDeleteTask = async taskId => {
	const { data: res } = await services.tasks.deleteTask({
		uid: curUid,
		taskId
	});
	if (res.status === 200) {
		ElMessage({
			message: 'Task successfully deleted',
			type: 'success'
		});
		reload();
	}
};
const taskIdToEdit = ref('');
const editTaskDialogVisible = ref(false);

const setEditTaskDialogVisible = () => {
	editTaskDialogVisible.value = !editTaskDialogVisible.value;
};
const handleEdit = taskId => {
	taskIdToEdit.value = taskId;
	editTaskDialogVisible.value = true;
};
const handleCheck = async (taskId, checked) => {
	const { data: res } = await services.tasks.checkOffTask({
		uid: curUid,
		taskId,
		isChecked: +!checked
	});

	if (res.status === 200) {
		ElMessage({
			message: 'Task successfully checked',
			type: 'success'
		});
		reload();
	}
};

const petSelected = ref('');
const dateRange = ref('');
const MOMENT_FORMAT = 'YYYY-MM-DD HH:mm';
const applyFilter = () => {
	tasks.value = baseData.value;

	const range = dateRange.value
		? toRaw(dateRange.value).map(item => moment(item).format(MOMENT_FORMAT))
		: [];

	if (dateRange.value && petSelected.value) {
		tasks.value = tasks.value
			.filter(task =>
				moment(task.dueDate + ' 00:00').isBetween(range[0], range[1])
			)
			.filter(task => task.petIdList.includes(petSelected.value));
	} else if (dateRange.value) {
		tasks.value = tasks.value.filter(task =>
			moment(task.dueDate + ' 00:00').isBetween(range[0], range[1])
		);
	} else if (petSelected.value) {
		tasks.value = tasks.value.filter(task =>
			task.petIdList.includes(petSelected.value)
		);
	}
};

const resetFilters = () => {
	dateRange.value = '';
	petSelected.value = '';
	tasks.value = baseData.value;
};
</script>

<style lang="scss" scoped>
.list-container {
	display: flex;
	justify-content: space-between;
}

.folder-list {
	text-align: center;
	display: flex;
	justify-content: space-around;
}

.right-filter {
	margin: 0 1vw;
	.datepicker {
		width: 210px;
		margin-top: 8px;
		p {
			color: #76553f;
			margin: 0 2px;
			font-family: 'Trebuchet MS';
			font-size: 14px;
			font-weight: bold;
		}
	}

	.pet-filter {
		width: 210px;
		margin-top: 15px;
		p {
			color: #76553f;
			margin: 0 2px;
			font-family: 'Trebuchet MS';
			font-size: 14px;
			font-weight: bold;
		}

		:deep(.el-select .el-input__inner) {
			font-size: 14px;
			width: 210px;
		}
	}
}

.document-dialog-datepet {
	display: flex;
	justify-content: space-between;
	align-items: left;
}
.document-dialog-upload {
	text-align: center;
}

.filter_add {
	display: flex;
	justify-content: space-evenly;
	flex-direction: column;
	align-items: center;

	.right_button {
		margin-left: 0;
		margin-right: 0;
		width: 100px;
		height: 40px;
		margin-top: 1vw;
	}
}
</style>
