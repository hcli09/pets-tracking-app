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
	},
	getcalorie(params) {
		return axios({
			url: '/user/pet/calorie',
			method: 'post',
			params
		});
	},
	addcalorie(data) {
		return axios({
			url: '/user/pet/calorie/add',
			method: 'post',
			data
		});
	},
	getsleep(params) {
		return axios({
			url: '/user/pet/sleep',
			method: 'post',
			params
		});
	},
	addsleep(data) {
		return axios({
			url: '/user/pet/sleep/add',
			method: 'post',
			data
		});
	},
	getexercise(params) {
		return axios({
			url: '/user/pet/exercise',
			method: 'post',
			params
		});
	},
	addexercise(data) {
		return axios({
			url: '/user/pet/exercise/add',
			method: 'post',
			data
		});
	},
	getallhealth(params) {
		return axios({
			url: '/user/pet/health',
			method: 'post',
			params
		});
	}
};
