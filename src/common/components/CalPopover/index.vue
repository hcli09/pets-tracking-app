<template>
	<el-popover
		placement="right-start"
		:title="attr.customData.title"
		:width="300"
		trigger="hover"
	>
		<template #reference>
			{{ attr.customData.title }}
		</template>
		<template #default>
			<el-avatar
				v-if="attr.customData.pets.length > 1"
				v-for="pet in attr.customData.pets"
				shape="square"
				:size="100"
				:fit="fit"
				:src="pet.petAvatar"
				style="margin: 5px"
			/>

			<img
				v-else
				class="rounded-lg shadow-md"
				:src="attr.customData.pets[0].petAvatar"
			/>

			<ul class="info-list">
				<li v-if="attr.customData?.detail?.eventType">
					<label>Type:</label>
					<span>{{ attr.customData?.detail?.eventType }}</span>
				</li>
				<li v-if="attr.customData?.startTime">
					<label>From:</label>
					<span>{{ attr.customData?.startTime }}</span>
				</li>
				<li v-if="attr.customData?.endTime">
					<label>To:</label>
					<span>{{ attr.customData?.endTime }}</span>
				</li>
				<li v-if="attr.customData?.detail?.attendee">
					<label>With:</label>
					<span>{{ attr.customData?.detail?.attendee }}</span>
				</li>
				<li v-if="attr.customData?.detail?.location">
					<label>Location:</label>
					<span>{{ attr.customData?.detail?.location }}</span>
				</li>
				<li v-if="attr.customData?.detail?.description">
					<label>Description:</label>
					<span>{{ attr.customData?.detail?.description }}</span>
				</li>
				<li
					v-if="
						typeof attr.customData?.detail?.checked !== 'undefined'
					"
				>
					<label>Finished:</label>
					<span>{{
						attr.customData?.detail?.checked ? 'Yes' : 'No'
					}}</span>
				</li>
				<li
					v-if="
						typeof attr.customData?.detail?.dueDate !== 'undefined'
					"
				>
					<label>Due:</label>
					<span>{{ attr.customData?.detail?.dueDate }}</span>
				</li>
			</ul>
			<el-row v-if="attr.customData.type === 'booking'" justify="center">
				<template v-if="attr.customData.status === 'pending'">
					<el-button
						type="success"
						plain
						@click="
							acceptBookingProm(attr.customData.detail.booking_id)
						"
						>Accept</el-button
					>
					<el-button
						type="danger"
						plain
						@click="
							rejectBookingProm(attr.customData.detail.booking_id)
						"
						>Reject</el-button
					>
				</template>
				<el-button
					v-if="attr.customData.status === 'confirmed'"
					type="danger"
					plain
					@click="
						cancelBookingProm(attr.customData.detail.booking_id)
					"
					>Cancel</el-button
				>
			</el-row>
		</template>
	</el-popover>
</template>

<script setup>
import { inject } from 'vue';
import {
	acceptBooking,
	cancelBooking,
	rejectBooking
} from '../../../services/modules/booking';

const reload = inject('reload');
const props = defineProps({
	attr: {
		type: Object
	}
});

const { attr } = props;

const acceptBookingProm = booking_id => {
	acceptBooking({ booking_id })
		.then(({ data: res, message }) => {
			if (res.status === 200) {
				ElMessage({
					message: 'You have accepted the booking',
					type: 'success'
				});
			}
			reload();
		})
		.catch(error => {
			ElMessage({
				message: error.response.data.message,
				type: 'warning'
			});
		});
};
const rejectBookingProm = booking_id => {
	rejectBooking({ booking_id })
		.then(({ data: res, message }) => {
			if (res.status === 200) {
				ElMessage({
					message: 'You have rejected the booking',
					type: 'success'
				});
			}
			reload();
		})
		.catch(error => {
			ElMessage({
				message: error.response.data.message,
				type: 'warning'
			});
		});
};
const cancelBookingProm = booking_id => {
	cancelBooking({ booking_id })
		.then(({ data: res, message }) => {
			if (res.status === 200) {
				ElMessage({
					message: 'You have cancelled the booking',
					type: 'success'
				});
			}
			reload();
		})
		.catch(error => {
			ElMessage({
				message: error.response.data.message,
				type: 'warning'
			});
		});
};
</script>

<style lang="scss" scoped>
p {
	color: white;
	font-family: 'Trebuchet MS';
	font-weight: 600;
}
.info-list {
	li {
		display: flex;
		justify-content: space-between;
		label {
			width: 30%;
			text-align: right;
		}
		span {
			width: 68%;
			text-align: left;
		}
	}
	margin-bottom: 8px;
}
</style>
