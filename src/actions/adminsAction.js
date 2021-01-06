import axios from 'axios';

export const getAdmins = async () => {
	const res = await axios({
		method: 'get',
		url: 'admins',
	});
	return res.data.data;
};

export const setError = (errors_res) => {
	return ({
	type: 'FORM_ERRORS',
	errors_res,
})};

export const createAdmin = ({admin, initAdmins}) => {
	const formData = new FormData()
    formData.append('image', admin.image);
	formData.append('firstName', admin.firstName);
	formData.append('lastName', admin.lastName);
	formData.append('email', admin.email);
	formData.append('password', admin.password);
	formData.append('c_password', admin.cPassword);
	return (dispatch) => {
		axios({
			method: 'post',
			url: 'admin',
			data: formData,
		}).then((res) => {
			//empty errors
			console.log(res.status)
			dispatch(setError([]));
			if (res.status === 200) {
				alert("Admin added")
				initAdmins();
			}
		}).catch((error) => {
			if(error.response) {
				//empty errors
				dispatch(setError([]));
                const errors = error.response.data.error;
                console.log(errors)
                let errors_res = []
				if(errors.email) errors_res.push({message: errors.email[0], name: "email"});
				if(errors.password) errors_res.push({message: errors.password[0], name: "password"});
				if(errors.c_password) errors_res.push({message: errors.c_password[0], name: "c_password"});
				if(errors.firstName) errors_res.push({message: errors.firstName[0], name: "firstName"});
				if(errors.lastName) errors_res.push({message: errors.lastName[0], name: "lastName"});
				if(errors.image) errors_res.push({message: errors.image[0], name: "image"});
				dispatch(setError(errors_res));
				if (errors_res.length !== 0) {
					alert("Failed to add admin")
				}
			}
		});
	};
};

export const updateAdmin = ({admin, initAdmins}) => {
    const formData = new FormData()
    formData.append('image', admin.image);
	formData.append('firstName', admin.firstName);
	formData.append('lastName', admin.lastName);
	return (dispatch) => {
		axios({
            method: 'post',
            url: `admin/${admin.id}`,
            data: formData,
        }).then((res) => {
			//empty errors
			dispatch(setError([]));
			initAdmins();
            console.log(res.status);
		}).catch((error) => {
			if(error.response) {
				//empty errors
				dispatch(setError([]));
                const errors = error.response.data.error;
                console.log(errors)
                let errors_res = []
				if(errors.firstName) errors_res.push({message: errors.firstName[0], name: "firstName"});
				if(errors.lastName) errors_res.push({message: errors.lastName[0], name: "lastName"});
				if(errors.image) errors_res.push({message: errors.image[0], name: "image"});
				dispatch(setError(errors_res));
			}
		});
	};
};

export const deleteAdmin = (id) => {
	axios({
		method: 'delete',
		url: `admin/${id}`,
	}).then((resp) => {
	});
};
