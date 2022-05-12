<template>
	<el-scrollbar height="270px">
		<h3 class="event-heading">Events</h3>
		<template v-if="events.length < 1">
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
import { onMounted, reactive } from 'vue';
import EventBox from '@common/components/EventBox/index.vue';
import services from '../../../services';
import moment from 'moment';

const events = reactive([]);
const getEventsByDateAsync = async () => {
	try {
		const { data: res, status } = await services.events.getEventsByDate({
			uid: '4EL4hp_qRUYMzzal_G29f',
			date: moment().format('YYYY-MM-DD')
		});
		if (status === 200) {
			Object.assign(events, res.data.eventList);
		}
	} catch (error) {
		console.log(error);
	}
};
onMounted(() => {
	getEventsByDateAsync();
});
</script>

<style lang="scss" scoped>
.event-heading {
	color: #908f8c;
	font-family: Trebuchet MS;
	font-size: 2.5vmin;
	font-weight: bold;
}
.event-heading-2 {
	color: #908f8c;
	font-family: Trebuchet MS;
	font-size: 2.5vmin;
}
</style>
