import axios from 'axios';

export default {
	confirmBooking(params) {
		return axios({
			url: '/user/booking/confirm',
			method: 'post',
			params
		});
	},
	rejectBooking(params) {
		return axios({
			url: '/user/booking/reject',
			method: 'post',
			params
		});
	},
	cancelBooking(params) {
		return axios({
			url: '/user/booking/cancel',
			method: 'post',
			params
		});
	}
};
