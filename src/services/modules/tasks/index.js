import axios from 'axios';

export default {
	addTask(data) {
		return axios({
			url: '/user/task/add',
			method: 'post',
			data
		});
	},
	deleteTask(data) {
		return axios({
			url: '/user/task/delete',
			method: 'delete',
			data
		});
	},
	editTask(data) {
		return axios({
			url: '/user/task/edit',
			method: 'post',
			data
		});
	},
	getTasksByDate(data) {
		return axios({
			url: '/user/task/date',
			method: 'post',
			data
		});
	},
	getTasksById(data) {
		return axios({
			url: '/user/task',
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
	getAllArchivedTasks(data) {
		return axios({
			url: '/user/task/archive/all',
			method: 'post',
			data
		});
	},
	checkOffTask(data) {
		return axios({
			url: '/user/task/check',
			method: 'post',
			data
		});
	}
};
