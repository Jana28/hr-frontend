import axios from 'axios';

export const getWorkreasons = async () => {
	const res = await axios({
		method: 'get',
		url: 'workreasons',
	});
	return res.data.data;
};

export const createWorkreason = async (workreason) => {
	console.log("workreason", workreason);
	const res = await axios({
		method: 'post',
		url: 'workreason',
		data: workreason,
	})
	return res.status;
};

export const updateWorkreason = async (workreason) => {
	const res = await axios({
		method: 'put',
		url: `workreason/${workreason.id}`,
		data: {
			description: workreason.description,
		},
	});
	return res.status;
};

export const deleteWorkreason = (id) => {
	axios({
		method: 'delete',
		url: `workreason/${id}`,
	}).then((resp) => {
	});
};
