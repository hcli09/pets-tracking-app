import axios from 'axios';

export default {
	getPet(data) {
		return axios({
			url: '/user/pet/profile',
			method: 'post',
			data
		});
	},
	confirmBooking(data) {
		return axios({
			url: '/user/booking/confirm',
			method: 'post',
			data
		});
	},
	rejectBooking(data) {
		return axios({
			url: '/user/booking/reject',
			method: 'post',
			data
		});
	},
	cancelBooking(data) {
		return axios({
			url: '/user/booking/cancel',
			method: 'post',
			data
		});
	}
};
