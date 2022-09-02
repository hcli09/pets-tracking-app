<template>
	<el-scrollbar height="270px">
		<div class="flex align-center justify-between">
			<h3 class="task-heading">Booking</h3>
			<div>
				<el-button @click="router.push('/home/task-table')"
					>Details</el-button
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

const router = useRouter();

const bookings = reactive([
	{
		booking_id: 123,
		uid: '4EL4hp_qRUYMzzal_G29f',
		invitee: 'jane@gmail.com',
		petAbList: [
			{
				petId: 'AonE9egnd-QIG7W8J4CtK',
				petName: 'Bernard',
				petAvatar:
					'https://firebasestorage.googleapis.com/v0/b/pet-tr…=media&token=8c3a27e3-5e10-430b-8e41-982fe5dbc950'
			}
		],
		title: 'Adoption advice with Jane',
		start_time: '2022-09-10 14:00',
		end_time: '2022-09-10 16:00',
		location: 'ANU',
		description: 'none',
		status: 'confirmed'
	}
]);

// const getTasksByDateAsync = async () => {
// 	try {
// 		const { data: res, status } = await services.tasks.getTasksByDate({
// 			uid: '4EL4hp_qRUYMzzal_G29f',
// 			date: moment().format('YYYY-MM-DD')
// 		});

// 		if (status === 200) {
// 			tasks.push(...res.data.taskList);
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// getTasksByDateAsync();
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