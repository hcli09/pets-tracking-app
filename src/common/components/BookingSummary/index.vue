<template>
	<el-scrollbar height="270px">
		<div class="flex align-center justify-between">
			<h3 class="task-heading">Booking</h3>
			<div>
				<el-button @click="router.push('/home/booking-table')"
					>List</el-button
				>
			</div>
		</div>
		<template v-if="bookings.length < 1">
			<div
				style="
					width: 320px;
					height: 220px;
					display: flex;
					justify-content: center;
					align-items: center;
				"
			>
				<h3 class="task-heading-2">No booking today</h3>
			</div>
		</template>
		<template v-else>
			<BookingBox
				v-for="(booking, index) in bookings"
				:key="booking.booking_id"
				:index="index"
				:customData="booking"
			/>
		</template>
	</el-scrollbar>
</template>

<script setup>
import { reactive } from 'vue';
import services from '../../../services';
import moment from 'moment';
import { useRouter } from 'vue-router';
import BookingBox from '../BookingBox/index.vue';
import { getBookingsByDate } from '../../../services/modules/booking';

const router = useRouter();

const bookings = reactive([]);

const getBookingsByDateAsync = async () => {
	try {
		const { data: res, status } = await getBookingsByDate({
			uid: localStorage.getItem('uid'),
			date: moment().format('YYYY-MM-DD')
		});

		if (status === 200) {
			bookings.push(...res.data);
		}
	} catch (error) {
		console.log(error);
	}
};

getBookingsByDateAsync();
</script>

<style lang="scss" scoped>
.task-heading {
	color: #4b4b4b;
	font-family: Trebuchet MS;
	font-size: 2.5vmin;
	font-weight: bold;
}
.task-heading-2 {
	color: #908f8c;
	font-family: Trebuchet MS;
	font-size: 2.5vmin;
}
:deep(.el-scrollbar__view) {
	padding: 0 10px;
}
</style>
