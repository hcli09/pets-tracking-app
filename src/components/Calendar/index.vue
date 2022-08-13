<template>
    <Close @click="$router.back()" />
	<div class="text-center section">
		<div class="filter-pets">
			<ul class="legend-list">
				<template v-if="props.for">
					<li v-if="props.for === 'event'" class="event">Event</li>
					<li v-if="props.for === 'task'" class="task">Task</li>
				</template>
				<template v-else>
					<li class="event">Event</li>
					<li class="task">Task</li>
				</template>
			</ul>
			<el-select
				v-model="filterValue"
				class="m-1"
				placeholder="All"
				style="width: 120px"
			>
				<el-option
					v-for="pet in petList"
					:key="pet.petId"
					:label="pet.petName"
					:value="pet.petId"
				/>
			</el-select>
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
							class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
							:class="attr.customData.className"
						>
							{{ attr.customData.title }}
						</p>
					</div>
				</div>
			</template>
		</v-calendar>
	</div>
</template>

<script setup>
import moment from 'moment';
import {
	reactive,
	computed,
	ref,
	onMounted,
	defineProps,
	toRaw,
	watch
} from 'vue';
import services from '../../services';
import Close from '@common/components/CloseButton/index.vue';
const month = new Date().getMonth();
const year = new Date().getFullYear();
const masks = { weekdays: 'WWW' };
const filterValue = ref('All');

const props = defineProps({
	for: {
		type: String
	}
});

// Get base attributes (base data) for calendar
const baseAttributes = reactive([]);
const eventAttributes = reactive([]);
const taskAttributes = reactive([]);
const getCalendarByMonthAsync = async month => {
	const { data: res, status } = await services.calendar.getCalendarByMonth({
		uid: '4EL4hp_qRUYMzzal_G29f',
		month
	});
	const filtered = res.data.filter(
		item => item.eventList.length > 0 || item.taskList.length > 0
	);
	const newData = [];
	filtered.forEach(item => {
		const events = [];
		for (let event of item.eventList) {
			events.push({
				key: event.eventTitle,
				customData: {
					title: event.eventTitle,
					className: 'bg-blue-400',
					pets: event.petIdList
				},
				dates: new Date(item.date)
			});
		}
		eventAttributes.push(...events);

		const tasks = [];
		for (let task of item.taskList) {
			tasks.push({
				key: task.taskTitle,
				customData: {
					title: task.taskTitle,
					className: 'bg-rose-400',
					pets: task.petIdList
				},
				dates: new Date(item.date)
			});
		}
		taskAttributes.push(...tasks);

		newData.push(...events, ...tasks);
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
newPetList.unshift({ petId: 'All', petName: 'All' });
petList.push(...newPetList);
// filter implementation

let attributes = computed(() => {
	if (props.for && props.for === 'event') {
		if (filterValue.value === 'All') {
			return eventAttributes;
		} else {
			return eventAttributes.filter(attr =>
				attr.customData.pets.includes(filterValue.value)
			);
		}
	}
	if (props.for && props.for === 'task') {
		if (filterValue.value === 'All') {
			return taskAttributes;
		} else {
			return taskAttributes.filter(attr =>
				attr.customData.pets.includes(filterValue.value)
			);
		}
	}
	if (filterValue.value === 'All') {
		return baseAttributes;
	} else {
		return baseAttributes.filter(attribute =>
			attribute.customData.pets.includes(filterValue.value)
		);
	}
});

const inputEvent = page => {
	console.log(page);
};
</script>
<!-- 
<script>
export default {
	data() {
		return {
			baseAttributes: []
		};
	},
	created() {
		services.calendar
			.getCalendarByMonth({
				uid: '4EL4hp_qRUYMzzal_G29f',
				month: moment().format('YYYY-MM')
			})
			.then(({ data: res, status }) => {
				const filtered = res.data.filter(
					item =>
						item.eventList.length > 0 || item.taskList.length > 0
				);
				const newData = [];

				filtered.forEach(item => {
					for (let event of item.eventList) {
						newData.push({
							key: event.eventTitle,
							customData: {
								title: event.eventTitle,
								className: 'bg-rose-400',
								pets: event.petIdList
							},
							dates: new Date(item.date)
						});
					}
					for (let task of item.taskList) {
						newData.push({
							key: task.taskTitle,
							customData: {
								title: task.taskTitle,
								className: 'bg-blue-400',
								pets: task.petIdList
							},
							dates: new Date(item.date)
						});
					}
				});
				this.$data.baseAttributes = newData;
			});
	}
};
</script> -->

<style lang="scss" scoped>
.filter-pets {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
p {
	color: white;
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
		&.task {
			&::before {
				display: inline-block;
				content: '';
				width: 14px;
				height: 14px;
				background: #fb7185;
				margin-right: 5px;
				border-radius: 5px;
			}
		}
		&.event {
			&::before {
				display: inline-block;
				content: '';
				width: 14px;
				height: 14px;
				background: #60a5fa;
				margin-right: 5px;
				border-radius: 5px;
			}
		}
	}
}
</style>
