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
	},
	addEvent(data) {
		return axios({
			url: '/user/event/add',
			method: 'post',
			data
		});
	},
	getAllEvents(data) {
		return axios({
			url: '/user/event/all',
			method: 'post',
			data
		});
	},
	addTask(data) {
		return axios({
			url: '/user/task/add',
			method: 'post',
			data
		});
	},
	getAllTasks(data) {
		return axios({
			url: '/user/task/all',
			method: 'post',
			data
		});
	},
	checkTask(data) {
		return axios({
			url: '/user/task/check',
			method: 'post',
			data
		});
	}
};
