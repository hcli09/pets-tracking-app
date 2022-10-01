import axios from 'axios';

export default {
	getmedi(params) {
		return axios({
			url: '/user/pet/medi',
			method: 'post',
			params
		});
	},
	addmedi(data) {
		return axios({
			url: '/user/pet/medi/add',
			method: 'post',
			data
		});
	},
	editmedi(data) {
		return axios({
			url: '/user/pet/medi/edit',
			method: 'post',
			data
		});
	},
	deletedata(params) {
		return axios({
			url: '/user/pet/health/delete',
			method: 'delete',
			params
		});
	},
	getfood(params) {
		return axios({
			url: '/user/pet/food',
			method: 'post',
			params
		});
	},
	addfood(data) {
		return axios({
			url: '/user/pet/food/add',
			method: 'post',
			data
		});
	},
	editfood(data) {
		return axios({
			url: '/user/pet/food/edit',
			method: 'post',
			data
		});
	},
	getweight(params) {
		return axios({
			url: '/user/pet/weight',
			method: 'post',
			params
		});
	},
	addweight(data) {
		return axios({
			url: '/user/pet/weight/add',
			method: 'post',
			data
		});
	}
};
