import axios from 'axios';
import moment from 'moment';

export const getHolidays = async () => {
	const res = await axios({
		method: 'get',
		url: 'holidays',
	});
	return res.data.data;
};

export const createHoliday = async (holiday) => {
	const res = await axios({
		method: 'post',
		url: 'holiday',
		data: {
			name: holiday.name,
            startDate: moment(holiday.startDate).format("YYYY-MM-DD"),
            endDate: moment(holiday.endDate).format("YYYY-MM-DD"),
		},
	})
	return res.status;
};

export const updateHoliday = async (holiday) => {
	const res = await axios({
		method: 'put',
		url: `holiday/${holiday.id}`,
		data: {
			name: holiday.name,
            startDate: moment(holiday.startDate).format("YYYY-MM-DD"),
            endDate: moment(holiday.endDate).format("YYYY-MM-DD"),
		},
	});
	return res.status;
};

export const deleteHoliday = (id) => {
	axios({
		method: 'delete',
		url: `holiday/${id}`,
	}).then((resp) => {
	});
};
