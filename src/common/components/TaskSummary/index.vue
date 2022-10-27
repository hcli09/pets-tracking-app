<template>
	<el-scrollbar height="270px">
		<div class="flex align-center justify-between">
			<h3 class="task-heading">Tasks</h3>
			<div>
				<el-button @click="router.push('/home/task-table')"
					>List</el-button
				>
			</div>
		</div>
		<template v-if="tasks.length < 1">
			<div
				style="
					width: 320px;
					height: 220px;
					display: flex;
					justify-content: center;
					align-items: center;
				"
			>
				<h3 class="task-heading-2">No tasks today</h3>
			</div>
		</template>
		<template v-else>
			<TaskBox
				v-for="(task, index) in tasks"
				:key="task.taskId"
				:index="index"
				:customData="task"
			/>
		</template>
	</el-scrollbar>
</template>

<script setup>
import { reactive } from 'vue';
import TaskBox from '@common/components/TaskBox/index.vue';
import services from '../../../services';
import moment from 'moment';

import { useRouter } from 'vue-router';
const router = useRouter();

const tasks = reactive([]);
const getTasksByDateAsync = async () => {
	try {
		const { data: res, status } = await services.tasks.getTasksByDate({
			uid: localStorage.getItem('uid'),
			date: moment().format('YYYY-MM-DD')
		});

		if (status === 200) {
			tasks.push(...res.data.taskList);
		}
	} catch (error) {
		console.log(error);
	}
};

getTasksByDateAsync();
</script>

<style lang="scss" scoped>
.task-heading {
	color: #4b4b4b;
	font-family: Trebuchet MS;
	font-size: 2.5vmin;
	font-weight: bold;
}
.task-heading-2 {
	color: #908f8c;
	font-family: Trebuchet MS;
	font-size: 2.5vmin;
}
:deep(.el-scrollbar__view) {
	padding: 0 10px;
}
</style>
