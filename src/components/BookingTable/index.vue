<template>
	<div class="record-header">
		<p>Bookings</p>
	</div>

	<div class="Record-content">
		<el-tabs
			v-model="activeName"
			@tab-click="handleClick"
			type="border-card"
			tab-position="top"
		>
			<el-tab-pane
				label="List"
				name="first"
				style="height: 97%; overflow-y: auto; overflow-x: hidden"
				><BookingList :currUid="uid"></BookingList
			></el-tab-pane>
			<el-tab-pane
				label="Calendar"
				name="second"
				style="height: 97%; overflow-y: auto; overflow-x: hidden"
			>
				<Calendar for="booking" close-b-t="none" />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
import BookingList from './BookingList/index.vue';
import Calendar from '../Calendar/index.vue';
import Close from '@common/components/CloseButton/index.vue';
import { ref } from 'vue';

// jys uid
const uid = localStorage.getItem('uid');
const activeName = ref('first');
</script>

<style lang="scss" scoped>
.record-header {
	height: 35px;
	position: relative;
	padding: 0.5vh 0 0.5vh 0vw;

	p {
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		font-size: 22px;
		font-family: Trebuchet MS;
		font-weight: bold;
		color: #76553f;
	}
}
.Record-content {
	position: relative;
	background-color: white;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	margin-top: 2vh;
}
</style>
