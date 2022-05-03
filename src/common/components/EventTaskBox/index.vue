<template>
	<el-row :span="6" class="events-tasks-big-box">
		<h3 class="start-time-event-task">
			{{ isEvent ? timeRange.substr(0, 5) : 'Due ' + dates }}
		</h3>
		<el-card
			shadow="hover"
			:class="'event-task-card'"
			:style="bgColors[type]"
			@click="toCalendar"
		>
			<div class="event-task-small-box">
				<div class="event-task-inside">
					<span>{{ title }}</span>
					<p>{{ isEvent ? timeRange : '' }}</p>
				</div>
				<div class="pet-name">
					<img :src="pets[0].avatarUrl" alt="" />
					<span class="name">
						{{ pets[0].name }}
					</span>
					<template v-if="pets.length > 1">
						<el-tooltip
							class="box-item"
							effect="dark"
							:content="`with ${pets
								.slice(1)
								.map(pet => pet.name)}`"
							placement="right"
						>
							<div
								class="more-than-one"
								style="font-size: 6"
							></div>
						</el-tooltip>
					</template>
				</div>
			</div>
		</el-card>
	</el-row>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
	customData: {
		type: Object,
		required: true
	},
	index: {
		type: Number
	}
});
const bgColors = {
	task: { 'background-color': '#eff6ff', color: '#1e40af' }, // bg-blue-200
	event: { 'background-color': '#fff1f2', color: '#9f1239' } // bg-rose-200
};
const textWhite = 'color: white';

const { type, timeRange, title, className, pets, dates } = props.customData;
const { index } = props;

console.log(index, type);
const isEvent = type == 'event';

const toCalendar = () => {
	router.push('/calendar');
};
</script>

<style lang="scss" scoped>
// p {
// 	color: rgb(94 234 212);
// }
.events-tasks-big-box {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	padding-top: 0;
	margin-bottom: 20px;
	box-sizing: border-box;
	.start-time-event-task {
		margin-left: 0.2vw;
		width: 100%;
		color: #908f8c;
		font-family: Trebuchet MS;
		font-size: 2vmin;
		font-weight: bold;
	}
	.event-task-card {
		width: 34vh;
		height: 10vh;
		// background-color: #e9eaf4;
		border-radius: 1rem;
		cursor: pointer;

		.event-task-small-box {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			font-family: Trebuchet MS;
			max-width: 14.875rem /* 238/16 */;
			height: 6vh;

			.event-task-inside {
				text-align: left;
				width: 11.2rem /* 178/16 */;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				// padding-right: 2rem;
			}

			//event name and pet name
			span {
				font-weight: bold;
				color: inherit;
				font-size: 1.8vmin;
			}
			p {
				color: inherit;
				font-size: 1.5vmin;
			}
			.pet-name {
				display: inline-flex;
				flex-direction: column;
				align-items: center;
				font-weight: bold;
				box-sizing: border-box;
				padding-left: 10px;
				position: relative;

				.name {
					font-size: 14px;
				}
				.more-than-one {
					position: absolute;
					bottom: 12px;
					right: -8px;
					font-size: 12px;
					width: 6px;
					height: 6px;
					background: royalblue;
					color: #fff;
					border-radius: 50%;
					display: inline-flex;
					justify-content: center;
					align-items: center;
				}
				img {
					width: 30px;
					border-radius: 5px;
				}
			}
		}
	}
}
</style>
