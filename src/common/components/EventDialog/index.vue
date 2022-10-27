<template>
	<el-dialog
		v-model="dialogVisible"
		:title="props.eventId ? 'Edit event' : 'Add an event'"
		:show-close="false"
		custom-class="event-dialog"
	>
		<el-form :model="form">
			<!-- Event Title -->
			<el-form-item label="Event Title" :label-width="formLabelWidth">
				<el-input
					v-model="form.eventData.eventTitle"
					autocomplete="off"
					placeholder="Please input event title"
					style="width: 75%"
				/>
			</el-form-item>

			<!-- Pet Selector -->
			<el-form-item label="Pet" :label-width="formLabelWidth">
				<el-select
					v-model="form.eventData.petIdList"
					placeholder="Please select a pet"
					style="width: 75%"
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

			<!-- Event Type -->
			<el-form-item label="Event Type" :label-width="formLabelWidth">
				<el-select
					v-model="form.eventData.eventType"
					placeholder="Please select an event type"
					style="width: 75%"
				>
					<el-option label="Vaccination" value="Vaccination" />
					<el-option label="Pet Grocery" value="Pet Grocery" />
				</el-select>
			</el-form-item>

			<!-- Date and time -->
			<el-form-item label="Date and time" :label-width="formLabelWidth">
				<el-radio-group
					v-model="isAllDay"
					class="ml-4"
					@change="onChangeTimeType"
				>
					<el-radio :label="true">All Day</el-radio>
					<el-radio :label="false">Fixed Time</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item :label-width="142" v-if="!isAllDay">
				<div
					:style="{
						display: 'flex',
						alignItems: 'center',
						marginBottom: '10px'
					}"
				>
					<el-date-picker
						v-model="eventDateTime.startDate"
						type="date"
						placeholder="Start date"
						value-format="YYYY-MM-DD"
						style="width: 45%; margin-right: 14px"
					/>

					<el-time-picker
						v-model="eventDateTime.startTime"
						format="HH:mm"
						placeholder="Start time"
						value-format="HH:mm"
						style="width: 48%"
					/>
				</div>

				<div
					:style="{
						display: 'flex',
						alignItems: 'center'
					}"
				>
					<el-date-picker
						v-model="eventDateTime.endDate"
						type="date"
						placeholder="End date"
						value-format="YYYY-MM-DD"
						style="width: 45%; margin-right: 14px"
					/>
					<el-time-picker
						v-model="eventDateTime.endTime"
						format="HH:mm"
						placeholder="End time"
						value-format="HH:mm"
						style="width: 48%"
					/>
				</div>
			</el-form-item>

			<!-- Description -->
			<el-form-item label="Description" :label-width="formLabelWidth">
				<el-input
					v-model="form.eventData.description"
					:rows="5"
					type="textarea"
					placeholder="Please input description"
					style="width: 75%"
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
import moment from 'moment';
import services from '../../../services';

const reload = inject('reload');
const props = defineProps({
	dialogVisible: {
		type: Boolean,
		required: true
	},
	eventId: {
		type: String
	}
});

const emits = defineEmits(['setVisible']);
const isSubmitting = ref(false);
const isAllDay = ref(true);
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
const eventDateTime = reactive({
	startDate: '',
	startTime: '',
	endDate: '',
	endTime: ''
});
const form = reactive({
	uid: '',
	eventData: {
		eventId: null,
		petIdList: [],
		eventTitle: '',
		eventType: '',
		startDateTime: '',
		endDateTime: '',
		description: '',
		petAbList: null
	}
});

const init = async eventId => {
	const { data: res } = await services.events.getEventsById({ eventId });
	if (res.data) {
		const tempEventDateTime = {
			startDate: res.data.startDateTime.slice(0, 10),
			startTime: res.data.startDateTime.slice(11),
			endDate: res.data.endDateTime.slice(0, 10),
			endTime: res.data.endDateTime.slice(11)
		};

		Object.assign(eventDateTime, tempEventDateTime);
		Object.assign(form, { uid: '', eventData: res.data });
	}
};

props.eventId && init(props.eventId);

const onSubmit = async () => {
	isSubmitting.value = true;
	form.eventData.startDateTime = eventDateTime.startDate
		? eventDateTime.startDate + ' ' + eventDateTime.startTime
		: moment().startOf('day').format('YYYY-MM-DD HH:mm');
	form.eventData.endDateTime = eventDateTime.endDate
		? eventDateTime.endDate + ' ' + eventDateTime.endTime
		: moment().endOf('day').format('YYYY-MM-DD HH:mm');

	// console.log('form', form);
	try {
		if (props.eventId) {
			form.uid = localStorage.getItem('uid');
			delete form.eventData.petAbList;
			const { data: res } = await services.events.editEvent(form);
			if (res.status === 200) {
				isSubmitting.value = false;
				ElMessage({
					message: 'Event edited successfully',
					type: 'success',
					duration: 3000
				});
				reload();
				emits('setVisible');
			}
		} else {
			const res = await services.events.addEvent(form);
			if (res.status === 200) {
				isSubmitting.value = false;
				ElMessage({
					message:
						'New event created successfully. You will get notified when the event is approaching',
					type: 'success',
					duration: 6000
				});
				reload();
				emits('setVisible');
			}
		}
	} catch (error) {
		ElMessage.error('Failed to create or edit event');
		console.log(error);
	}
};

const onChangeTimeType = isAllDay => {
	if (isAllDay) {
		Object.assign(eventDateTime, {
			startDate: '',
			startTime: '',
			endDate: '',
			endTime: ''
		});
	}
};

const petList = ref([]);
try {
	let user = JSON.parse(localStorage.getItem('user'));
	petList.value = user && user.petList;
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
// :deep(.el-input__inner) {
// 	padding-right: 0 !important;
// }
.dialog-footer button:first-child {
	margin-right: 10px;
}

.span-color {
	&:hover {
		background: transparent;
	}
}

:deep(input[placeholder='Start date']) {
	padding-left: 40px !important;
}
:deep(input[placeholder='End date']) {
	padding-left: 40px !important;
}
:deep(input[placeholder='Start time']) {
	padding-left: 40% !important;
}
:deep(input[placeholder='End time']) {
	padding-left: 40% !important;
}
:deep(textarea.el-textarea__inner) {
	font-family: Trebuchet MS;
}
</style>

<style>
.event-dialog {
	/* box-sizing: border-box; */
	padding-left: 10px;
	border-radius: 10px;
	background-image: url('@assets/dialog/dialog-3.png');
	background-size: 430px 509px;
	background-position: 380px 85px;
	background-repeat: no-repeat;
}
</style>
