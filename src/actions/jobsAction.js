import axios from 'axios';

export const getJobs = async () => {
	const res = await axios({
		method: 'get',
		url: 'jobs',
	});
	return res.data.data;
};

export const createJob = async (job) => {
	const res = await axios({
		method: 'post',
		url: 'job',
		data: job,
	})
	return res.status;
};

export const updateJob = async (job) => {
	const res = await axios({
		method: 'put',
		url: `job/${job.id}`,
		data: {
			name: job.name,
		},
	});
	return res.status;
};

export const deleteJob = (id) => {
	axios({
		method: 'delete',
		url: `job/${id}`,
	}).then((resp) => {
	});
};
