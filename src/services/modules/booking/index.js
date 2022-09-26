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

const acceptBookingUrl = '/user/booking/confirm';
export const acceptBooking = data =>
	axios({
		url: acceptBookingUrl,
		method: 'post',
		data: qs.stringify(data)
	});

const rejectBookingUrl = '/user/booking/reject';
export const rejectBooking = data =>
	axios({
		url: rejectBookingUrl,
		method: 'post',
		data: qs.stringify(data)
	});

const cancelBookingUrl = '/user/booking/cancel';
export const cancelBooking = data =>
	axios({
		url: cancelBookingUrl,
		method: 'post',
		data: qs.stringify(data)
	});
