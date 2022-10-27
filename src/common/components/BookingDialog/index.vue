<template>
	<el-dialog
		v-model="dialogVisible"
		title="Add a booking"
		:show-close="false"
		custom-class="booking-dialog"
	>
		<el-form :model="form">
			<!-- Booking Title -->
			<el-form-item label="Title" :label-width="formLabelWidth">
				<el-input
					v-model="form.title"
					autocomplete="off"
					placeholder="Please input your booking title"
					style="width: 75%"
				/>
			</el-form-item>

			<!-- Invitee Selector -->
			<el-form-item label="Invitee" :label-width="formLabelWidth">
				<el-autocomplete
					v-model="form.attendee"
					:fetch-suggestions="querySearch"
					:trigger-on-focus="false"
					clearable
					class="inline-input"
					placeholder="Please Input"
					@select="handleSelect"
					style="width: 75%"
				/>
			</el-form-item>

			<!-- Pet Selector -->
			<el-form-item label="Pet" :label-width="formLabelWidth">
				<el-select
					v-model="form.pet_id_list"
					placeholder="Please select a pet"
					style="width: 75%"
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
			<el-form-item label="Date and time" :label-width="formLabelWidth">
				<el-tooltip
					class="box-item"
					effect="dark"
					content="Start date and time"
					placement="bottom"
				>
					<Datepicker
						v-model="startDateTime"
						:format="formatBookingDateTime"
						inputClassName="dp-custom-input"
						placeholder="Start date and time"
					/>
				</el-tooltip>
				<el-tooltip
					class="box-item"
					effect="dark"
					content="End date and time"
					placement="bottom"
				>
					<Datepicker
						v-model="endDateTime"
						:format="formatBookingDateTime"
						inputClassName="dp-custom-input"
						placeholder="End date and time"
					/>
				</el-tooltip>
			</el-form-item>

			<!-- Location -->
			<el-form-item label="Location" :label-width="formLabelWidth">
				<el-input
					v-model="form.location"
					autocomplete="off"
					placeholder="Please input location"
					style="width: 75%"
				/>
			</el-form-item>

			<!-- Description -->
			<el-form-item label="Description" :label-width="formLabelWidth">
				<el-input
					v-model="form.description"
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
import {
	inject,
	reactive,
	ref,
	defineProps,
	defineEmits,
	onMounted,
	toRaw
} from 'vue';
import moment from 'moment';
import services from '../../../services';
import { inviteBooking } from '../../../services/modules/booking';

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
const formLabelWidth = '140px';

const startDateTime = ref();
const endDateTime = ref();

const form = reactive({
	booking_id: null,
	uid: '',
	attendee: '',
	pet_id_list: [],
	title: '',
	start_time: '',
	end_time: '',
	location: '',
	description: '',
	status: 'pending',
	request_sender: true,
	pair_bk_id: null
});
const formatBookingDateTime = (date, isSubmit) => {
	const rawDate = toRaw(date);
	if (isSubmit) {
		return moment(rawDate).format('YYYY-MM-DD HH:mm');
	} else {
		return `${moment(rawDate).format('YYYY-MM-DD HH:mm')}`;
	}
};

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

	form.start_time = formatBookingDateTime(startDateTime.value, true);
	form.end_time = formatBookingDateTime(endDateTime.value, true);
	form.pet_id_list = [form.pet_id_list];

	console.log('form', form);

	try {
		const res = await inviteBooking(form);
		if (res.status === 200) {
			isSubmitting.value = false;
			ElMessage({
				message:
					'Thank you! Please ask the invitee to CHECK its email to either accept or reject the booking',
				type: 'success',
				duration: 6000
			});
			reload();
			emits('setVisible');
		}
	} catch (error) {
		ElMessage.error('Failed to create a booking');
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

const emailItems = ref([]);
const querySearch = (queryString, cb) => {
	const results = queryString
		? emailItems.value.filter(createFilter(queryString))
		: emailItems.value;
	// call callback function to return suggestions
	cb(results);
};
const createFilter = queryString => {
	return email => {
		return (
			email.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
		);
	};
};
const loadAll = () => {
	return [
		{ value: 'julia.jouravlev@accenture.com' },
		{ value: 'rabia.ahmed@accenture.com' },
		{ value: 'asha.naznin@accenture.com' },
		{ value: 'kenneth.a.young@accenture.com' },
		{ value: 'u6946329@anu.edu.au' },
		{ value: 'u7076185@anu.edu.au' },
		{ value: 'Xinyu.Kang@anu.edu.au' },
		{ value: 'Min.Du@anu.edu.au' },
		{ value: 'Yushen.Jin@anu.edu.au' },
		{ value: 'Wei.Wang3@anu.edu.au' },
		{ value: 'Penghao.Jiang@anu.edu.au' },
		{ value: 'jane@gmail.com' }
	];
};
onMounted(() => {
	emailItems.value = loadAll();
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

.span-color {
	&:hover {
		background: transparent;
	}
}
:deep(.dp-custom-input) {
	width: 23vh;
	&:first-of-type {
		margin-right: 1vh;
	}
	&::placeholder {
		font-size: 14px;
		font-family: 'Trebuchet MS';
		font-weight: 500;
		color: #a9abb1;
	}
}
</style>

<style lang="scss">
.booking-dialog {
	/* box-sizing: border-box; */
	padding-left: 10px;
	border-radius: 10px;
	background-image: url('@assets/dialog/add_booking.jpeg');
	background-size: 70vh 50vh;
	background-position: 30vh 13vh;
	background-repeat: no-repeat;
}
</style>
