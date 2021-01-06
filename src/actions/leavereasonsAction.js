import axios from 'axios';

export const getLeavereasons = async () => {
	const res = await axios({
		method: 'get',
		url: 'leavereasons',
	});
	return res.data.data;
};

export const createLeavereason = async (leavereason) => {
	console.log("leavereason", leavereason);
	const res = await axios({
		method: 'post',
		url: 'leavereason',
		data: leavereason,
	})
	return res.status;
};

export const updateLeavereason = async (leavereason) => {
	const res = await axios({
		method: 'put',
		url: `leavereason/${leavereason.id}`,
		data: {
			description: leavereason.description,
		},
	});
	return res.status;
};

export const deleteLeavereason = (id) => {
	axios({
		method: 'delete',
		url: `leavereason/${id}`,
	}).then((resp) => {
	});
};
