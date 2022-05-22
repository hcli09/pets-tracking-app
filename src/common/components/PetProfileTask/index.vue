<template>
	<div style="display: flex; flex-direction: column; align-items: center">
		<el-table
			class="eventtable"
			:data="this.$data.taskList"
			height="40vh"
			style="width: 100%"
		>
			<!-- <el-icon Calendar></el-icon> -->
			<el-table-column prop="taskTitle" label="Title" align="center">
			</el-table-column>
			<el-table-column
				sortable
				prop="dueDate"
				label="Due Date"
				align="center"
			/>
			<el-table-column prop="checked" label="Checked" align="center" />
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
			:dialogVisible="taskDialogVisible"
			@setVisible="setTaskDialogVisible"
		/>

		<EventDialog
			:dialogVisible="eventDialogVisible"
			@setVisible="setEventDialogVisible"
		/>
	</div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { Flag, CircleCheck, Calendar } from '@element-plus/icons-vue';

import httpServices from '@services';
import TaskDialog from '@common/components/TaskDialog/index.vue';

const taskDialogVisible = ref(false);
const setTaskDialogVisible = () => {
	taskDialogVisible.value = !taskDialogVisible.value;
};
</script>

<script>
export default {
	data() {
		return {
			uid: '4EL4hp_qRUYMzzal_G29f',
			taskList: [],
			// get petid from url
			curr_petId: this.$route.query.id
		};
	},
	created: function () {
		//get all tasks of this pet
		httpServices.petprofile
			.getAllTasks({ uid: this.$data.uid })
			.then(response => {
				let taskobject = response.data.data;
				this.$data.taskList = taskobject;
				this.$data.taskList = this.$data.taskList.filter(item =>
					item.petIdList.includes(this.$data.curr_petId)
				);
				console.log(this.$data.taskList);
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
