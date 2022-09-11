import axios from 'axios';
import qs from 'qs';

export default {
	getBookingList(params) {
		return axios({
			url: '/user/booking/get',
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