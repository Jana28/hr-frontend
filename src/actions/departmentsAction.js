import axios from 'axios';

export const getDepartments = async () => {
	const res = await axios({
		method: 'get',
		url: 'departments',
	});
	return res.data.data;
};

export const createDepartment = async (department) => {
	const res = await axios({
		method: 'post',
		url: 'department',
		data: department,
	})
	return res.status;
};

export const updateDepartment = async (department) => {
	const res = await axios({
		method: 'put',
		url: `department/${department.id}`,
		data: {
			name: department.name,
		},
	});
	return res.status;
};

export const deleteDepartment = (id) => {
	axios({
		method: 'delete',
		url: `department/${id}`,
	}).then((resp) => {
	});
};
