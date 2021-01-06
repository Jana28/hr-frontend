import axios from 'axios';

export const getEmployeeHolidays = async () => {
	const res = await axios({
		method: 'get',
		url: 'employeeHolidays',
	});
	return res.data.data;
};

export const createEmployeeHoliday = async (employeeHoliday) => {
	const res = await axios({
		method: 'post',
		url: 'employeeHoliday',
		data: {
			employee_id: employeeHoliday.employee_id,
			holiday_id: employeeHoliday.holiday_id,
			workreason_id: employeeHoliday.workreason_id,
		},
	})
	return res.status;
};

export const updateEmployeeHoliday = async (employeeHoliday) => {
	const res = await axios({
		method: 'put',
		url: `employeeHoliday/${employeeHoliday.id}`,
		data: {
			employee_id: employeeHoliday.employee_id,
			holiday_id: employeeHoliday.holiday_id,
			workreason_id: employeeHoliday.workreason_id,
		},
	});
	return res.status;
};

export const deleteEmployeeHoliday = (id) => {
	axios({
		method: 'delete',
		url: `employeeHoliday/${id}`,
	}).then((resp) => {
	});
};
