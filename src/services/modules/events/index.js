import axios from 'axios';
import qs from 'qs';
export default {
	addEvent(data) {
		return axios({
			url: '/user/event/add',
			method: 'post',
			data
		});
	},
	deleteEvent(data) {
		return axios({
			url: '/user/event/delete',
			method: 'delete',
			data
		});
	},
	editEvent(data) {
		return axios({
			url: '/user/event/edit',
			method: 'post',
			data
		});
	},
	getEventsByDate(data) {
		return axios({
			url: '/user/event/date',
			method: 'post',
			data
		});
	},
	getEventsById(data) {
		return axios({
			url: '/user/event',
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
	}
};
