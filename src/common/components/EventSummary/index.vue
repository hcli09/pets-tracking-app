<template>
	<el-scrollbar height="270px">
		<div class="flex align-center justify-between">
			<h3 class="event-heading">Events</h3>
			<div>
				<el-button @click="router.push('/home/event-table')"
					>List</el-button
				>
			</div>
		</div>
		<template v-if="events.length === 0">
			<div
				style="
					width: 320px;
					height: 220px;
					display: flex;
					justify-content: center;
					align-items: center;
				"
			>
				<h3 class="event-heading-2">No events today</h3>
			</div>
		</template>
		<template v-else>
			<EventBox
				v-for="event in events"
				:key="event.eventId"
				:customData="event"
			/>
		</template>
	</el-scrollbar>
</template>

<script setup>
import { reactive } from 'vue';
import EventBox from '@common/components/EventBox/index.vue';
import services from '../../../services';
import moment from 'moment';

import { useRouter } from 'vue-router';
const router = useRouter();

const events = reactive([]);
const getEventsByDateAsync = async () => {
	try {
		const { data: res, status } = await services.events.getEventsByDate({
			uid: localStorage.getItem('uid'),
			date: moment().format('YYYY-MM-DD')
		});
		if (status === 200) {
			const data = res.data.eventList.filter(
				event =>
					event.petAbList.length > 0 && event.petIdList.length > 0
			);
			events.push(...data);
		}
	} catch (error) {
		console.log(error);
	}
};
getEventsByDateAsync();
</script>

<style lang="scss" scoped>
.event-heading {
	color: #4b4b4b;
	font-family: Trebuchet MS;
	font-size: 2.5vmin;
	font-weight: bold;
}
.event-heading-2 {
	color: #908f8c;
	font-family: Trebuchet MS;
	font-size: 2.5vmin;
}
:deep(.el-scrollbar__view) {
	padding: 0 10px;
}
</style>
