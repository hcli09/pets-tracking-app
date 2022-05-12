import axios from 'axios';

export default {
	getCalendarByMonth(data) {
		return axios({
			url: '/user/calendar/month',
			method: 'post',
			data
		});
	},
	getCalendarByDate(data) {
		return axios({
			url: '/user/calendar/date',
			method: 'post',
			data
		});
	}
};
