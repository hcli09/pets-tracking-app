<template>
	<el-dialog
		v-model="dialogVisible"
		title="Add a task"
		:show-close="false"
		custom-class="task-dialog"
	>
		<el-form :model="form">
			<!-- Event Title -->
			<el-form-item label="Task Title" :label-width="formLabelWidth">
				<el-input
					v-model="form.taskData.taskTitle"
					autocomplete="off"
					placeholder="Please input task title"
					style="width: 80%"
				/>
			</el-form-item>

			<!-- Pet Selector -->
			<el-form-item label="Pet" :label-width="formLabelWidth">
				<el-select
					v-model="form.taskData.petIdList"
					placeholder="Please select a pet"
					style="width: 80%"
					multiple
				>
					<el-option
						v-for="pet in petList"
						:key="pet.petId"
						:label="pet.petName"
						:value="pet.petId"
					/>
				</el-select>
			</el-form-item>

			<!-- Date and time -->
			<el-form-item label="Due on" :label-width="formLabelWidth">
				<el-date-picker
					v-model="form.taskData.dueDate"
					type="date"
					placeholder="Due Date"
					value-format="YYYY-MM-DD"
					style="width: 39%; margin-right: 8px"
				/>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="$emit('setVisible')">Cancel</el-button>
				<el-button
					type="primary"
					:loading="isSubmitting"
					@click="onSubmit"
					>Confirm</el-button
				>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { inject, reactive, ref, defineProps, defineEmits } from 'vue';
import services from '../../../services';

const props = defineProps({
	taskId: {
		type: String
	},
	dialogVisible: {
		type: Boolean,
		required: true
	}
});
const emits = defineEmits(['setVisible']);

const formLabelWidth = '140px';
const shortcuts = [
	{
		text: 'Last week',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
			return [start, end];
		}
	},
	{
		text: 'Last month',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
			return [start, end];
		}
	},
	{
		text: 'Last 3 months',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
			return [start, end];
		}
	}
];
const reload = inject('reload');
const isSubmitting = ref(false);
const form = reactive({
	uid: '',
	taskData: {
		taskId: null,
		petIdList: [],
		petAbList: null,
		taskTitle: '',
		dueDate: '',
		checked: false
	}
});
const init = async taskId => {
	const { data: res } = await services.tasks.getTasksById({ taskId });
	if (res.data) {
		Object.assign(form, { uid: '', taskData: res.data });
	}
};

props.taskId && init(props.taskId);

const onSubmit = async () => {
	isSubmitting.value = true;
	try {
		if (props.taskId) {
			form.uid = localStorage.getItem('uid');
			delete form.taskData.petAbList;
			const { data: res } = await services.tasks.editTask(form);
			if (res.status === 200) {
				isSubmitting.value = false;
				ElMessage({
					message: 'Task edited successfully',
					type: 'success',
					duration: 3000
				});
				reload();
				emits('setVisible');
			}
		} else {
			const res = await services.tasks.addTask(form);
			if (res.status === 200) {
				isSubmitting.value = false;
				ElMessage({
					message:
						'New task created successfully. You will get notified when the task is due',
					type: 'success',
					duration: 6000
				});
				reload();
				emits('setVisible');
			}
		}
	} catch (error) {
		ElMessage.error('Failed to create or edit task');
		console.log(error);
	}
};
const petList = reactive([]);
try {
	let user = JSON.parse(localStorage.getItem('user'));
	user && petList.push(...user.petList);
} catch (error) {
	console.log('error', error);
}

form.uid = localStorage.getItem('uid');
</script>

<style lang="scss" scoped>
.el-button--text {
	margin-right: 15px;
}
.el-select {
	width: 300px;
}
.el-input {
	width: 300px;
}
.dialog-footer button:first-child {
	margin-right: 10px;
}

:deep(input[placeholder='Start Date']) {
	padding-left: 40px !important;
}
:deep(input[placeholder='Due Date']) {
	padding-left: 40px !important;
}
:deep(textarea.el-textarea__inner) {
	font-family: Trebuchet MS;
}
</style>

<style>
.task-dialog {
	/* box-sizing: border-box; */
	padding-left: 10px;
	border-radius: 10px;
	background-image: url('@assets/dialog/dialog-2.png');
	background-size: 460px 509px;
	background-position: -120px -30px;
	background-repeat: no-repeat;
}
</style>
