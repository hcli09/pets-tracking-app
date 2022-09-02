import axios from 'axios';

const getOneBookingUrl = '/user/task/add';
export const getOneBooking = data =>
	axios({ url: getOneBookingUrl, method: 'post', data });
