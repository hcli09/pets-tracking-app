<template>
	<el-row :span="6" class="events-tasks-big-box">
		<h3 class="start-time-event-task">
			{{ 'On ' + start_time.substr(-11) }}
		</h3>
		<el-card
			shadow="hover"
			:class="'event-task-card'"
			:style="{ backgroundColor: '#EAF5EA', color: '#2F5D28' }"
		>
			<div class="event-task-small-box">
				<div class="event-task-inside">
					<el-tooltip
						class="box-item"
						effect="dark"
						:content="title"
						placement="bottom"
					>
						<span>{{ title }}</span>
					</el-tooltip>
					<span class="invitee">{{ attendee }}</span>
				</div>
				<el-tooltip
					class="box-item"
					effect="dark"
					:content="`with ${pets.map(pet => pet.petName).join(', ')}`"
					placement="right"
				>
					<div class="pet-name">
						<template v-if="pets.length < 2">
							<img
								class="first-img"
								:src="pets[0].petAvatar"
								alt=""
							/>
						</template>
						<template v-else>
							<div>
								<img :src="pets[0].petAvatar" alt="" />
								<img
									class="following-imgs"
									v-for="pet in pets.slice(1)"
									:src="pet.petAvatar"
									alt=""
								/>
							</div>
						</template>
					</div>
				</el-tooltip>
			</div>
		</el-card>
	</el-row>
</template>

<script setup>
import { defineProps, toRaw, inject } from 'vue';
import services from '../../../services';

const props = defineProps({
	customData: {
		type: Object,
		required: true
	},
	index: {
		type: Number
	}
});
let { title, start_time, attendee, petAbList: pets } = props.customData;

const reload = inject('reload');
</script>

<style lang="scss" scoped>
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
	}
	.event-task-card {
		width: 100%;
		height: 10vh;
		// background-color: #e9eaf4;
		border-radius: 1rem;
		cursor: pointer;

		.event-task-small-box {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			font-family: Trebuchet MS;
			max-width: 100%;
			height: 6vh;

			.event-task-inside {
				display: flex;
				align-items: left;
				flex-direction: column;
				text-align: left;
				width: 11.2rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				.invitee {
					font-size: 12px;
					font-weight: 300;
				}
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
				position: relative;
				display: inline-flex;
				align-items: center;
				font-weight: bold;
				box-sizing: border-box;
				margin-left: 10px;
				width: 70px;
				height: 35px;
				// border: 1px solid #908f8c;

				.name {
					font-size: 14px;
				}
				img {
					width: 35px;
					border-radius: 5px;
					position: absolute;
					left: 0;
					top: 0;
					z-index: 99;
					background: #fff;
					// left: 30px;
					// bottom: 30px;
					// transform: translate(-50%, -50%);
					// right: 0;
					&.first-img {
						left: 50%;
						transform: translate(-50%, 0);
					}
					&.following-imgs {
						left: 24px;
						z-index: 9;
					}
				}
			}
		}
	}
}
</style>
