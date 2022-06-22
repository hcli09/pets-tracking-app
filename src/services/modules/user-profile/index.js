import axios from 'axios';
import qs from 'qs';

export default {
	getUserProfile(data) {
		return axios({
			url: '/user/profile',
			method: 'post',
			data
		});
	},
	getAllUsers(data) {
		return axios({
			url: '/user/all',
			method: 'post',
			data
		});
	},
	postUserImage(data) {
		return axios({
			url: '/user/profile/image/update',
			method: 'post',
			data
		});
	}
};
