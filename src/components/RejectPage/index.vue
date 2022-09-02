<template>
	<div class="top">
		<p class="text">
			Sorry to see you go, you have rejected the following appointment
		</p>
	</div>

	<div class="middle">
		<div class="backgroud-picture">
			<el-image
				class="pic"
				src="src/assets/Resultpage/reject_Image.png"
			></el-image>
		</div>
		<div class="details">
			<div class="info-row">
				<p>Title</p>
				<p>Play with John’s dog at the park</p>
			</div>
			<div class="info-row">
				<p>Email</p>
				<p>john.doe@gmail.com</p>
			</div>
			<div class="info-row">
				<p>Pets</p>
				<p>Bernard</p>
			</div>
			<div class="info-row">
				<p>Time</p>
				<p>Thu 25 Aug 13:00-15:00</p>
			</div>
			<div class="info-row">
				<p>Location</p>
				<p>1 Anthony Rolfe Ave, Gungahlin, ACT 2912</p>
			</div>
			<div class="info-row">
				<p>Description</p>
				<p>Please bring your own bottle</p>
			</div>
		</div>
	</div>
</template>

<script setup></script>

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
	}
}
</style>
