import axios from 'axios';

export default {
	getPet(data) {
		return axios({
			url: '/user/pet/profile',
			method: 'post',
			data
		});
	},
	getUserProfile(data) {
		return axios({
			url: '/user/profile',
			method: 'post',
			data
		});
	}
};
