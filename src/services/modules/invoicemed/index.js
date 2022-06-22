import axios from 'axios';

export default {
	getPetList(data) {
		return axios({
			url: '/user/pet/all',
			method: 'post',
			data
		});
	},

	getAllRecords(data) {
		return axios({
			url: '/user/record/all/type',
			method: 'post',
			data
		});
	},

	addNewRecord(data) {
		return axios({
			url: '/user/record/add',
			method: 'post',
			data
		});
	},

	editRecord(data) {
		return axios({
			url: '/user/record/edit',
			method: 'post',
			data
		});
	},

	deleteRecord(data) {
		return axios({
			url: '/user/record/delete',
			method: 'delete',
			data
		});
	}
};
