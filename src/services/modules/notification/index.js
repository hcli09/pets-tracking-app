import axios from 'axios';
import qs from 'qs';

export default {
	getNotificationSettings(data) {
		return axios({
			url: '/user/notification',
			method: 'post',
			data
		});
	},
	editNotificationSettings(data) {
		return axios({
			url: '/user/notification/edit',
			method: 'post',
			data
		});
	},
};
