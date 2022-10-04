import axios from 'axios';
import qs from 'qs';

export default {
	verifyEmail(params) {
		return axios({
			url: '/verify',
			method: 'post',
			params
		});
	},
	sendVerifyEmail(params) {
		return axios({
			url: '/verify/send',
			method: 'post',
			params
		});
	}

};