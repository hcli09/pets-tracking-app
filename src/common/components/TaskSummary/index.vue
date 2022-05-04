<template>
	<el-scrollbar height="270px">
		<h3 class="task-heading">Tasks</h3>
		<EventTaskBox
			v-for="(task, index) in tasks"
			:key="task.key"
			:index="index"
			:customData="task.customData"
		/>
	</el-scrollbar>
</template>

<script setup>
import { reactive } from 'vue';
import EventTaskBox from '@common/components/EventTaskBox/index.vue';
const month = new Date().getMonth();
const year = new Date().getFullYear();
const masks = { weekdays: 'WWW' };

const tasks = reactive([
	{
		key: 1,
		customData: {
			title: "Renew prescription for Max's medication",
			type: 'task',
			pets: [
				{
					name: 'Max',
					avatarUrl:
						'https://previews.123rf.com/images/lar01joka/lar01joka1804/lar01joka180400019/100152648-cute-shiba-inu-dog-avatar.jpg'
				}
			],
			timeRange: '',
			dates: 'May 05'
		},
		dates: new Date(year, month, 5)
	},
	{
		key: 2,
		customData: {
			title: 'Take Max for vet check up',
			type: 'task',
			pets: [
				{
					name: 'Max',
					avatarUrl:
						'https://previews.123rf.com/images/lar01joka/lar01joka1804/lar01joka180400019/100152648-cute-shiba-inu-dog-avatar.jpg'
				}
			],
			timeRange: '',
			dates: 'May 05'
		},
		dates: new Date(year, month, 5)
	},
	{
		key: 3,
		customData: {
			title: 'Play date with Lucy and Odie',
			type: 'task',
			pets: [
				{
					name: 'Lucy',
					avatarUrl:
						'https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png'
				},
				{
					name: 'Odie',
					avatarUrl:
						'https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg'
				}
			],
			timeRange: '',
			dates: 'May 22'
		},
		dates: new Date(year, month, 22)
	},
	{
		key: 4,
		customData: {
			title: "Renew prescription for Lucy's medication",
			type: 'task',
			pets: [
				{
					name: 'Lucy',
					avatarUrl:
						'https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png'
				}
			],
			timeRange: '',
			dates: 'May 05'
		},
		dates: new Date()
	}
]);
</script>

<style lang="scss" scoped>
.task-heading {
	color: #908f8c;
	font-family: Trebuchet MS;
	font-size: 2.5vmin;
	font-weight: bold;
}
</style>
