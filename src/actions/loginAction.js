import axios from 'axios';
import { logout } from './logoutAction';

export const login = (user_info) => ({
	type: 'INITIALIZE_USER_INFO',
	user_info,
});

export const setLoginError = (errors_res) => {
	return ({
	type: 'LOGIN_ERROR',
	errors_res,
})};
export const setUpdateProfileError = (errors_res) => {
	return ({
	type: 'FORM_ERRORS',
	errors_res,
})};

export const startLogin = (payload) => {
	console.log(payload)
	return (dispatch) => {
		axios({
			method: 'post',
			url: 'login',
			data: {
				email: payload.email,
				password: payload.password,
			},
		}).then((res) => {
			const {
				token,
				user
			} = res.data;
			const {
				id,
				userType,
				firstName,
				lastName,
				imageName,
				email,
				phoneNumber,
				commission,
				salary,
				hireDate,
				isResigned,
				resignationDate,
				job,
				department,
				employeeHolidays,
				leaves,
			} = user;

			if (token && id && userType && firstName && lastName && imageName && email) {
				localStorage.setItem('hrtoken', token);
				axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
				if (userType.localeCompare("ADMIN") === 0)
					dispatch(
						login({
							id,
							email,
							userType,
							firstName,
							lastName,
							imageName,
						})
					);
				if (userType.localeCompare("EMPLOYEE") === 0)
					dispatch(
						login({
							id,
							email,
							userType,
							firstName,
							lastName,
							imageName,
							phoneNumber,
							commission,
							salary,
							hireDate,
							isResigned,
							resignationDate,
							job,
							department,
							employeeHolidays,
							leaves,
						})
					);
			} else {
				console.log('error');
			}
            return res.status;
		}).catch((error) => {
			console.log("error", error)
			//empty errors
			dispatch(setLoginError([]));
			const errors = error.response.data.error;
			console.log(errors)
			let errors_res = []
			if(error.response) errors_res.push({message: "Wrong email or password", name: "emailPassword"});
			dispatch(setLoginError(errors_res));
		});
	};
};

export const getAuthenticatedUser = () => {
	return (dispatch) => {
		axios({
			method: 'get',
			url: 'me',
		}).then((res) => {
			const {
				id,
				userType,
				firstName,
				lastName,
				imageName,
				email,
				phoneNumber,
				commission,
				salary,
				hireDate,
				isResigned,
				resignationDate,
				job,
				department,
				employeeHolidays,
				leaves,
			} = res.data.user;
			console.log(res.data.user)
			if (userType && firstName && lastName && email) {
				if (userType.localeCompare("ADMIN") === 0)
					dispatch(
						login({
							id,
							email,
							userType,
							firstName,
							lastName,
							imageName,
						})
					);
				if (userType.localeCompare("EMPLOYEE") === 0)
					dispatch(
						login({
							id,
							email,
							userType,
							firstName,
							lastName,
							imageName,
							phoneNumber,
							commission,
							salary,
							hireDate,
							isResigned,
							resignationDate,
							job,
							department,
							employeeHolidays,
							leaves,
						})
					);
			} else {
				dispatch(logout());
				console.log('error');
			}
            return res.status;
		}).catch((error) => {
			if(error.response) 
				if( error.response.status === 401) {
					console.log("error.response", error.response)
					dispatch(logout());
				}
		});
	};
};

export const startUpdateEmployeeProfile = ({employeeProfile}) => {
	const formData = new FormData()
    formData.append('image', employeeProfile.image);
	formData.append('firstName', employeeProfile.firstName);
	formData.append('lastName', employeeProfile.lastName);
	if (employeeProfile.phoneNumber)
		formData.append('phoneNumber', employeeProfile.phoneNumber);
	return (dispatch) => {
		axios({
			method: 'post',
			url: `updateProfile`,
			data: formData,
		}).then((res) => {
			const {
				id,
				userType,
				firstName,
				lastName,
				imageName,
				email,
				phoneNumber,
				commission,
				salary,
				hireDate,
				isResigned,
				resignationDate,
				job,
				department,
				employeeHolidays,
				leaves,
			} = res.data.user;
			//empty errors
			dispatch(setUpdateProfileError([]));
			console.log(res.status);
			if (res.status === 200) {
				alert("Employee changed")
			}
			dispatch(
				login({
					id,
					email,
					userType,
					firstName,
					lastName,
					imageName,
					phoneNumber,
					commission,
					salary,
					hireDate,
					isResigned,
					resignationDate,
					job,
					department,
					employeeHolidays,
					leaves,
				})
			);
		}).catch((error) => {
			if(error.response) {
				//empty errors
				dispatch(setUpdateProfileError([]));
				const errors = error.response.data.error;
                console.log(errors)
                let errors_res = []
				if(errors.firstName) errors_res.push({message: errors.firstName[0], name: "firstName"});
				if(errors.lastName) errors_res.push({message: errors.lastName[0], name: "lastName"});
				if(errors.phoneNumber) errors_res.push({message: errors.phoneNumber[0], name: "phoneNumber"});
				if(errors.image) errors_res.push({message: errors.image[0], name: "image"});
				dispatch(setUpdateProfileError(errors_res));
				if (errors_res.length !== 0) {
					alert("Failed to change employee")
				}
			}
		});
	};
};