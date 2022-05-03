<template>
	<el-scrollbar height="270px">
		<h3 class="event-heading">Events</h3>
		<EventTaskBox
			v-for="event in events"
			:key="event.key"
			:customData="event.customData"
		/>
	</el-scrollbar>
</template>

<script setup>
import { reactive } from 'vue';
import EventTaskBox from '@common/components/EventTaskBox/index.vue';
const month = new Date().getMonth();
const year = new Date().getFullYear();
const masks = { weekdays: 'WWW' };

const events = reactive([
	{
		key: 1,
		customData: {
			title: 'Take Bailey to vet appointment',
			className: 'bg-rose-500',
			type: 'event',
			pets: [
				{
					name: 'Bailey',
					avatarUrl:
						'https://previews.123rf.com/images/lar01joka/lar01joka1804/lar01joka180400019/100152648-cute-shiba-inu-dog-avatar.jpg'
				}
			],
			timeRange: '10:30-12:30'
		},
		dates: new Date(year, month, 1)
	},
	{
		key: 2,
		customData: {
			title: 'Lucy vaccination appointment',
			className: 'bg-teal-500',
			type: 'event',
			pets: [
				{
					name: 'Lucy',
					avatarUrl:
						'https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png'
				}
			],
			timeRange: '14:00-15:00'
		},
		dates: new Date(year, month, 2)
	},
	{
		key: 3,
		customData: {
			title: 'Lucy vaccination appointment',
			className: 'bg-rose-500',
			type: 'event',
			pets: [
				{
					name: 'Lucy',
					avatarUrl:
						'https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png'
				}
			],
			timeRange: '14:00-15:00'
		},
		dates: { months: 5, ordinalWeekdays: { 2: 1 } }
	}
]);
</script>

<style lang="scss" scoped>
.event-heading {
	color: #908f8c;
	font-family: Trebuchet MS;
	font-size: 2.5vmin;
	font-weight: bold;
}
</style>
