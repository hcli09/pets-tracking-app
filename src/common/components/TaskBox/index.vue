<template>
	<el-row :span="6" class="events-tasks-big-box">
		<h3 class="start-time-event-task">
			{{ 'Due ' + dueDate.substr(-5) }}
		</h3>
		<el-card
			shadow="hover"
			:class="'event-task-card'"
			:style="{ backgroundColor: '#eff6ff', color: '#1e40af' }"
			@click="toCalendar"
		>
			<div class="event-task-small-box">
				<div class="event-task-inside">
					<span>{{ title }}</span>
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
import { defineProps, onMounted, reactive, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { getPetAbListWithFullAvatar } from '../../utils/getPetAvatar';
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

let { taskTitle: title, dueDate, petAbList } = props.customData;
const pets = toRaw(petAbList);

const toCalendar = () => {
	router.push('/calendar');
};
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
				position: relative;

				display: inline-flex;
				// flex-direction: column;
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
