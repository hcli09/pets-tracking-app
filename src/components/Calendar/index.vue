<template>
	<div class="text-center section">
		<div class="filter-pets">
			<ul class="legend-list">
				<template v-if="props.for">
					<li v-if="props.for === 'event'" class="event">Event</li>
					<li v-if="props.for === 'task'" class="task">Task</li>
					<li v-if="props.for === 'booking'" class="booking-accept">
						Booking Accepted
					</li>
					<li v-if="props.for === 'booking'" class="booking-pending">
						Booking Pending
					</li>
				</template>
				<template v-else>
					<li class="event">Event</li>
					<li class="task">Task</li>
					<li class="booking-accept">Booking Accepted</li>
					<li class="booking-pending">Booking Pending</li>
				</template>
			</ul>
			<div>
				<el-select
					v-if="
						props.for === 'event' ||
						props.for === 'task' ||
						!props.for
					"
					v-model="filterValuePets"
					class="m-1"
					placeholder="All Pets"
					style="width: 120px"
				>
					<el-option
						v-for="pet in petList"
						:key="pet.petId"
						:label="pet.petName"
						:value="pet.petId"
					/>
				</el-select>
				<el-select
					v-if="!props.for"
					v-model="filterValueItems"
					class="m-1"
					placeholder="All Items"
					style="width: 120px"
				>
					<el-option key="all" label="All Items" value="all" />
					<el-option key="events" label="Events" value="events" />
					<el-option key="tasks" label="Tasks" value="tasks" />
					<el-option
						key="bookings"
						label="Bookings"
						value="bookings"
					/>
				</el-select>
				<el-select
					v-if="props.for === 'booking' || !props.for"
					v-model="filterValueBookings"
					class="m-1"
					placeholder="All Bookings"
					style="width: 120px"
				>
					<el-option key="all" label="All Bookings" value="all" />
					<el-option
						key="confirmed"
						label="Confirmed"
						value="confirmed"
					/>
					<el-option key="pending" label="Pending" value="pending" />
				</el-select>
			</div>
		</div>
		<v-calendar
			class="custom-calendar max-w-full"
			:masks="masks"
			:attributes="attributes"
			locale="eng"
			disable-page-swipe
			is-expanded
			@update:from-page="onMonthChange"
		>
			<template v-slot:day-content="{ day, attributes }">
				<div class="flex flex-col h-full z-10 overflow-hidden">
					<span class="day-label text-sm text-gray-900">{{
						day.day
					}}</span>
					<div class="flex-grow overflow-y-auto overflow-x-auto">
						<p
							v-for="attr in attributes"
							:key="attr.key"
							class="text-xs text-center leading-tight rounded-sm p-1 mt-0 mb-1"
							:class="attr.customData.className"
						>
							<CalPopover :attr="attr" />
						</p>
					</div>
				</div>
			</template>
		</v-calendar>
	</div>
</template>

<script setup>
import moment from 'moment';
import { reactive, computed, ref, defineProps } from 'vue';
import services from '../../services';
import CalPopover from '@common/components/CalPopover/index.vue';

const month = new Date().getMonth();
const year = new Date().getFullYear();
const masks = { weekdays: 'WWW' };
const filterValuePets = ref('All Pets');
const filterValueItems = ref('all');
const filterValueBookings = ref('all');

const props = defineProps({
	for: {
		type: String
	},
	closeBT: {
		type: String
	}
});

// Get base attributes (base data) for calendar
const baseAttributes = reactive([]);
const eventAttributes = reactive([]);
const taskAttributes = reactive([]);
const bookingAttributes = reactive([]);

const getCalendarByMonthAsync = async month => {
	const { data: res, status } = await services.calendar.getCalendarByMonth({
		uid: localStorage.getItem('uid'),
		month
	});
	const filtered = res.data.filter(
		item =>
			item.eventList.length > 0 ||
			item.taskList.length > 0 ||
			item.bookingList.length > 0
	);

	const newData = [];
	filtered.forEach(item => {
		const events = [];
		const eventList = item.eventList.filter(
			event => event.petAbList.length > 0 && event.petIdList.length > 0
		);
		for (let event of eventList) {
			events.push({
				key: event.eventId,
				customData: {
					type: 'event',
					title: event.eventTitle,
					className: 'bg-blue-400',
					pets: event.petAbList,
					startTime: event.startDateTime,
					endTime: event.endDateTime,
					detail: event
				},
				dates: new Date(item.date)
			});
		}
		eventAttributes.push(...events);

		const tasks = [];
		for (let task of item.taskList) {
			tasks.push({
				key: task.taskId,
				customData: {
					type: 'task',
					title: task.taskTitle,
					className: 'bg-rose-400',
					pets: task.petAbList,
					detail: task
				},
				dates: new Date(item.date)
			});
		}
		taskAttributes.push(...tasks);

		const bookings = [];
		item.bookingList = item.bookingList.filter(
			booking =>
				booking.status === 'pending' || booking.status === 'confirmed'
		);
		for (let booking of item.bookingList) {
			bookings.push({
				key: booking.booking_id,
				customData: {
					type: 'booking',
					title: booking.title,
					className:
						booking.status === 'pending'
							? 'bg-amber-200'
							: 'bg-emerald-400',
					pets: booking.petAbList,
					startTime: booking.start_time,
					endTime: booking.end_time,
					detail: booking,
					status: booking.status
				},
				dates: new Date(item.date)
			});
		}
		bookingAttributes.push(...bookings);

		newData.push(...events, ...tasks, ...bookings);
	});
	baseAttributes.push(...newData);
};

getCalendarByMonthAsync(moment().format('YYYY-MM'));

const onMonthChange = change =>
	getCalendarByMonthAsync(
		moment(`${change?.year}-${change?.month}`).format('YYYY-MM')
	);

// Get pet filter selector
const petList = reactive([]);
let { petList: newPetList } = JSON.parse(localStorage.getItem('user'));
newPetList.unshift({ petId: 'All Pets', petName: 'All Pets' });
petList.push(...newPetList);
// filter implementation
let getAttributesByPets = (props, filterValuePets) => {};

let attributes = computed(() => {
	// For general calendar - filter by items
	if (filterValueItems.value !== 'all') {
		switch (filterValueItems.value) {
			case 'events':
				return eventAttributes;
			case 'tasks':
				return taskAttributes;
			case 'bookings':
				return bookingAttributes;
			default:
				return baseAttributes;
		}
	}
	// For general calendar - filter by bookings
	if (filterValueBookings.value !== 'all') {
		switch (filterValueBookings.value) {
			case 'confirmed':
				return bookingAttributes.filter(
					attr => attr.customData.status === 'confirmed'
				);
			case 'pending':
				return bookingAttributes.filter(
					attr => attr.customData.status === 'pending'
				);
			default:
				return baseAttributes;
		}
	}
	// For event table - filter by pets
	if (props.for && props.for === 'event') {
		if (filterValuePets.value === 'All Pets') {
			return eventAttributes;
		} else {
			return eventAttributes.filter(attribute =>
				attribute.customData.pets
					.map(pet => pet.petId)
					.includes(filterValuePets.value)
			);
		}
	}
	// For task table - filter by pets
	if (props.for && props.for === 'task') {
		if (filterValuePets.value === 'All Pets') {
			return taskAttributes;
		} else {
			return taskAttributes.filter(attribute =>
				attribute.customData.pets
					.map(pet => pet.petId)
					.includes(filterValuePets.value)
			);
		}
	}
	// For booking table - filter by status
	if (props.for && props.for === 'booking') {
		if (filterValueBookings.value === 'all') {
			return bookingAttributes;
		} else {
			// console.log(bookingAttributes.map(attr => attr.customData.pets));

			return bookingAttributes.filter(attr =>
				attr.customData.status.includes(filterValueBookings.value)
			);
		}
	}
	// For general calendar - filter by pets
	if (filterValuePets.value === 'All Pets') {
		return baseAttributes;
	} else {
		const attr = baseAttributes.filter(attribute => {
			return attribute.customData.pets
				.map(pet => pet.petId)
				.includes(filterValuePets.value);
		});
		return attr;
	}
});

const inputEvent = page => {
	console.log(page);
};
</script>

<style lang="scss" scoped>
* {
	font-family: 'Trebuchet MS';
}
.filter-pets {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
p {
	color: white;
	font-family: 'Trebuchet MS';
	font-weight: 600;
}
::-webkit-scrollbar {
	width: 0px;
}
::-webkit-scrollbar-track {
	display: none;
}
.custom-calendar.vc-container ::v-deep {
	--day-border: 1px solid #b8c2cc;
	--day-border-highlight: 1px solid #b8c2cc;
	--day-width: 90px;
	--day-height: 90px;
	--weekday-bg: #f8fafc;
	--weekday-border: 1px solid #eaeaea;
	border-radius: 0;
	width: 100%;
	& .vc-header {
		background-color: #f1f5f8;
		padding: 10px 0;
	}
	& .vc-weeks {
		padding: 0;
	}
	& .vc-weekday {
		background-color: var(--weekday-bg);
		border-bottom: var(--weekday-border);
		border-top: var(--weekday-border);
		padding: 5px 0;
	}
	& .vc-day {
		padding: 0 5px 3px 5px;
		text-align: left;
		height: var(--day-height);
		min-width: var(--day-width);
		background-color: white;
		&.weekday-1,
		&.weekday-7 {
			background-color: #eff8ff;
		}
		&:not(.on-bottom) {
			border-bottom: var(--day-border);
			&.weekday-1 {
				border-bottom: var(--day-border-highlight);
			}
		}
		&:not(.on-right) {
			border-right: var(--day-border);
		}
	}
	& .vc-day-dots {
		margin-bottom: 5px;
	}
}

.legend-list {
	display: flex;
	li {
		display: flex;
		align-items: center;
		color: #333;
		margin-right: 20px;
		&.task,
		&.event,
		&.booking-accept,
		&.booking-pending {
			&::before {
				display: inline-block;
				content: '';
				width: 14px;
				height: 14px;
				margin-right: 5px;
				border-radius: 5px;
			}
		}
		&.task {
			&::before {
				background: #fb7185;
			}
		}
		&.event {
			&::before {
				background: #60a5fa;
			}
		}
		&.booking-accept {
			&::before {
				background: #34d399;
			}
		}
		&.booking-pending {
			&::before {
				background: #fde68a;
			}
		}
	}
}
</style>
