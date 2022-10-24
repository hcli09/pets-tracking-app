<template>
	<!-- load booking details when response is 200 -->
	<template v-if="loading">
		<div class="top">
			<p class="text">
				Sorry to see you go, you have cancelled the following
				appointment
			</p>
		</div>

		<div class="middle">
			<div class="backgroud-picture">
				<el-image
					class="pic"
					src="https://firebasestorage.googleapis.com/v0/b/pet-tracking-app-51857.appspot.com/o/Screen%20Shot%202022-08-28%20at%207.23.00%20PM.png?alt=media&token=37649e56-15a1-4bc5-a22b-52226587b02b"
				></el-image>
			</div>
			<div class="details">
				<div class="info-row">
					<p style="font-weight: 900">Title</p>
					<p>{{ booking_details.title }}</p>
				</div>
				<div class="info-row">
					<p style="font-weight: 900">Email</p>
					<p>{{ booking_details.attendee }}</p>
				</div>
				<div class="pet-row">
					<p style="font-weight: 900">Pets</p>
					<div class="pets-name">
						<p
							v-for="(item, index) in booking_details.petAbList"
							:key="item.petId"
						>
							{{
								(index ==
									booking_details.petAbList.length - 1 &&
									item.petName) ||
								item.petName + ','
							}}
						</p>
					</div>
				</div>
				<div class="info-row">
					<p style="font-weight: 900">Start Time</p>
					<p>{{ booking_details.start_time }}</p>
				</div>
				<div class="info-row">
					<p style="font-weight: 900">End Time</p>
					<p>{{ booking_details.end_time }}</p>
				</div>
				<div class="info-row">
					<p style="font-weight: 900">Location</p>
					<p>{{ booking_details.location }}</p>
				</div>
				<div class="info-row">
					<p style="font-weight: 900">Description</p>
					<p>{{ booking_details.description }}</p>
				</div>
			</div>
		</div>
	</template>

	<template v-else>
		<div class="top">
			<p style="color: coral" class="text">
				You have already cancelled this booking!
			</p>
		</div>
	</template>
</template>

<style lang="scss" scoped>
.top {
	height: 15vh;
	position: relative;

	.text {
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
			'Lucida Sans', Arial, sans-serif;
		color: #c86276;
		font-size: large;
	}
}

.middle {
	display: flex;
	justify-content: center;
	align-items: center;

	.backgroud-picture {
		width: 50%;
		height: 80vh;
		position: relative;

		.pic {
			width: 40vw;
			position: absolute;
			left: 8vw;
			bottom: 3vw;
		}
	}

	.details {
		width: 50%;
		height: 70vh;
		display: flex;
		flex-direction: column;

		.info-row {
			left: 0;
			width: 60%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 2.5vh;
			text-align-last: justify;
			padding: 0 1vw;

			p {
				color: #343e4d;
				font-family: 'Trebuchet MS', 'Lucida Sans Unicode',
					'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
				font-size: small;
			}
		}

		.pet-row {
			left: 0;
			width: 60%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 2.5vh;
			text-align-last: justify;
			padding: 0 1vw;
			white-space: nowrap;

			p {
				color: #343e4d;
				font-family: 'Trebuchet MS', 'Lucida Sans Unicode',
					'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
				font-size: small;
			}
		}
	}
}
</style>

<script setup>
import httpServices from '@services';
</script>

<script>
export default {
	data() {
		return {
			loading: false,
			booking_details: {},
			bookingId: this.$route.query.id
		};
	},
	created: function () {
		httpServices.resultPage
			.cancelBooking({ booking_id: this.$data.bookingId })
			.then(response => {
				if (response.status == 200) {
					this.$data.booking_details = response.data.data;
					this.$data.loading = true;
				}
			})
			.catch(error => {
				this.$data.loading = false;
				this.$data.booking_details = {};
				console.log(error.message);
			});
	}
};
</script>
