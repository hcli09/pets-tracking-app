<template>
	<div style="display: flex; flex-direction: column; align-items: center">
		<el-table
			class="eventtable"
			:data="taskList"
			height="40vh"
			style="width: 100%"
		>
			<el-table-column prop="taskTitle" label="Title" align="center">
			</el-table-column>
			<el-table-column
				sortable
				prop="dueDate"
				label="Due Date"
				align="center"
			/>

			<el-table-column label="Check Task" align="center">
				<template #default="scope">
					<el-checkbox
						size="small"
						@change="checkTask(scope.$index, scope.row)"
					></el-checkbox>
				</template>
			</el-table-column>
		</el-table>
		<!-- add task diaglog -->
		<el-button
			class="add-button"
			color="#76553f"
			style="border: #fd6540"
			type="primary"
			plain
			:icon="CircleCheck"
			@click="setTaskDialogVisible"
		>
			Add Task
		</el-button>
		<TaskDialog
			v-if="taskDialogVisible"
			:dialogVisible="taskDialogVisible"
			@setVisible="setTaskDialogVisible"
		/>
	</div>
</template>
<script setup>
import { ElMessage } from 'element-plus';

import { reactive, ref, inject } from 'vue';
import { Flag, CircleCheck, Calendar } from '@element-plus/icons-vue';

import httpServices from '@services';
import TaskDialog from '@common/components/TaskDialog/index.vue';
// import { and } from '@vueuse/shared';

const taskDialogVisible = ref(false);
const setTaskDialogVisible = () => {
	taskDialogVisible.value = !taskDialogVisible.value;
};
</script>

<script>
export default {
	inject: ['reload'],
	data() {
		return {
			uid: localStorage.getItem('uid'),
			taskList: [],
			curr_petId: this.$route.query.id
		};
	},
	methods: {
		checkTask(index, row) {
			httpServices.petprofile
				.checkTask({
					uid: this.$data.uid,
					taskId: row.taskId,
					isChecked: 1
				})
				.then(response => {
					this.ElMessage({
						message: 'Task checked off!',
						type: 'success',
						duration: 1000
					});
					this.reload();
				})
				.catch(error => {
					console.log(error.message);
				});
		}
	},
	created: function () {
		//get all tasks of this pet
		httpServices.petprofile
			.getAllTasks({ uid: this.$data.uid })
			.then(response => {
				let taskobject = response.data.data;
				this.$data.taskList = taskobject;
				this.$data.taskList = this.$data.taskList.filter(
					item =>
						item.petIdList.includes(this.$data.curr_petId) &&
						item.checked === false
				);
			})
			.catch(error => {
				console.log(error.message);
			});
	}
};
</script>

<style lang="scss" scoped>
.add-button {
	margin-top: 1vw;
	justify-content: center;
}

:deep(.el-table td.el-table__cell div) {
	font-size: small;
}
</style>
