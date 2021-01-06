import axios from 'axios';
import moment from 'moment';

export const getLeaves = async () => {
	const res = await axios({
		method: 'get',
		url: 'leaves',
	});
	return res.data.data;
};

export const createLeave = async (leave) => {
	const res = await axios({
		method: 'post',
		url: 'leave',
		data: {
			employee_id: leave.employee_id,
			leavereason_id: leave.leavereason_id,
            startDate: moment(leave.startDate).format("YYYY-MM-DD"),
            endDate: moment(leave.endDate).format("YYYY-MM-DD"),
		},
	})
	return res.status;
};

export const updateLeave = async (leave) => {
	const res = await axios({
		method: 'put',
		url: `leave/${leave.id}`,
		data: {
			employee_id: leave.employee_id,
			leavereason_id: leave.leavereason_id,
            startDate: moment(leave.startDate).format("YYYY-MM-DD"),
            endDate: moment(leave.endDate).format("YYYY-MM-DD"),
		},
	});
	return res.status;
};

export const deleteLeave = (id) => {
	axios({
		method: 'delete',
		url: `leave/${id}`,
	}).then((resp) => {
	});
};
