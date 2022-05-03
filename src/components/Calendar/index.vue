<template>
	<div class="text-center section">
		<div class="filter-pets">
			<ul class="legend-list">
				<li>Event</li>
				<li>Task</li>
			</ul>
			<el-select
				v-model="filterValue"
				class="m-1"
				placeholder="All"
				style="width: 120px"
			>
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value"
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
import { reactive, computed, ref } from 'vue';
const month = new Date().getMonth();
const year = new Date().getFullYear();
const masks = { weekdays: 'WWW' };
const filterValue = ref('All');
const baseAttributes = [
	{
		key: 1,
		customData: {
			title: 'Take Bailey to vet appointment',
			className: 'bg-rose-400',
			type: 'event',
			pets: ['Bailey'],
			timeRange: '10:30-12:30'
		},
		dates: new Date(year, month, 1)
	},
	{
		key: 2,
		customData: {
			title: 'Lucy vaccination appointment',
			className: 'bg-rose-400',
			type: 'event',
			pets: ['Lucy'],
			timeRange: '14:00-15:00'
		},
		dates: new Date(year, month, 2)
	},
	{
		key: 3,
		customData: {
			title: 'Lucy vaccination appointment',
			className: 'bg-rose-400',
			type: 'event',
			pets: ['Lucy'],
			timeRange: '14:00-15:00'
		},
		dates: { months: 5, ordinalWeekdays: { 2: 1 } }
	},
	{
		key: 4,
		customData: {
			title: "Renew prescription for Max's medication",
			className: 'bg-blue-400',
			type: 'task',
			pets: ['Max'],
			timeRange: ''
		},
		dates: new Date(year, month, 5)
	},
	{
		key: 5,
		customData: {
			title: 'Take Max for vet check up',
			className: 'bg-blue-400',
			type: 'task',
			pets: ['Max'],
			timeRange: ''
		},
		dates: new Date(year, month, 5)
	},
	{
		key: 6,
		customData: {
			title: 'Play date with Lucy and Odie',
			className: 'bg-blue-400',
			task: 'task',
			pets: ['Lucy', 'Odie'],
			timeRange: ''
		},
		dates: new Date(year, month, 22)
	},
	{
		key: 'today',
		customData: {
			title: "Renew prescription for Lucy's medication",
			className: 'bg-blue-400',
			tasks: 'task',
			pets: ['Lucy'],
			timeRange: ''
		},
		dates: new Date()
	}
];
// let attributes = reactive(baseAttributes);

let attributes = computed(() => {
	switch (filterValue.value) {
		case 'All':
			return baseAttributes;
		case 'Lucy':
			return baseAttributes.filter(item =>
				item.customData.pets.includes('Lucy')
			);
		case 'Max':
			return baseAttributes.filter(item =>
				item.customData.pets.includes('Max')
			);
		case 'Bailey':
			return baseAttributes.filter(item =>
				item.customData.pets.includes('Bailey')
			);
		case 'Odie':
			return baseAttributes.filter(item =>
				item.customData.pets.includes('Odie')
			);
		default:
			break;
	}
});

const options = [
	{ value: 'All', label: 'All' },
	{
		value: 'Bailey',
		label: 'Bailey'
	},
	{
		value: 'Lucy',
		label: 'Lucy'
	},
	{
		value: 'Max',
		label: 'Max'
	},
	{
		value: 'Odie',
		label: 'Odie'
	}
];
</script>

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
		&:first-of-type {
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
		&:last-of-type {
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
