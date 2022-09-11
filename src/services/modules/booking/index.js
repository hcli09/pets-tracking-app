import axios from 'axios';
import qs from 'qs';

const inviteBookingUrl = '/user/booking/invite';
export const inviteBooking = data =>
	axios({ url: inviteBookingUrl, method: 'post', data });

const getBookingsByDateUrl = '/user/booking/get/by_date';
export const getBookingsByDate = data =>
	axios({
		url: getBookingsByDateUrl,
		method: 'post',
		data: qs.stringify(data)
	});
