<template>
	<el-dialog
		v-model="dialogVisible"
		:title="title"
		:show-close="false"
		custom-class="event-dialog"
	>
		<el-form :model="form">
			<!-- Event Title -->
			<el-form-item label="Event Title" :label-width="formLabelWidth">
				<el-input
					v-model="form.title"
					autocomplete="off"
					placeholder="Please input event title"
					style="width: 71%"
				/>
			</el-form-item>

			<!-- Pet Selector -->
			<el-form-item label="Pet" :label-width="formLabelWidth">
				<el-select
					v-model="form.pet"
					placeholder="Please select a pet"
					style="width: 71%"
				>
					<el-option label="Lucy" value="LucyId" />
					<el-option label="Oliver" value="OliverId" />
				</el-select>
			</el-form-item>

			<!-- Event Type -->
			<el-form-item label="Event Type" :label-width="formLabelWidth">
				<el-select
					v-model="form.eventType"
					placeholder="Please select an event type"
					style="width: 71%"
				>
					<el-option label="Vaccination" value="vaccination" />
					<el-option label="Pet Grocery" value="petGrocery" />
				</el-select>
			</el-form-item>

			<!-- Date and time -->
			<el-form-item label="Date and time" :label-width="formLabelWidth">
				<el-date-picker
					v-model="form.date"
					type="date"
					placeholder="Pick a day"
					style="width: 28%; margin-right: 5px"
				/>
				<el-time-picker
					v-model="form.time"
					is-range
					range-separator="to"
					start-placeholder="Start time"
					end-placeholder="End time"
					style="width: 42%"
				/>
			</el-form-item>

			<!-- Description -->
			<el-form-item label="Description" :label-width="formLabelWidth">
				<el-input
					v-model="form.description"
					:rows="5"
					type="textarea"
					placeholder="Please input description"
					style="width: 71%"
				/>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="$emit('setVisible')">Cancel</el-button>
				<el-button type="primary" @click="$emit('setVisible')"
					>Confirm</el-button
				>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { reactive, ref, defineProps, defineEmits } from 'vue';
const props = defineProps({
	title: {
		type: String
	},
	dialogVisible: {
		type: Boolean,
		required: true
	},
	numRows: {
		type: Number,
		required: true
	},
	customisation: {
		type: Object
	}
});
const emits = defineEmits(['setVisible']);
// const visible = ref(props.dialogVisible);
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
const form = reactive({
	name: '',
	region: '',
	date1: '',
	date2: '',
	delivery: false,
	type: [],
	resource: '',
	desc: ''
});
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
</style>

<style>
.event-dialog {
	/* box-sizing: border-box; */
	padding-left: 10px;
	border-radius: 10px;
	background-image: url('@assets/dialog/dialog-1.png');
	background-size: 430px 509px;
	background-position: 320px 64px;
	background-repeat: no-repeat;
}
</style>
