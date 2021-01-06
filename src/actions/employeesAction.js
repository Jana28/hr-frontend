import axios from 'axios';
import moment from 'moment';

export const getEmployee = async (employee_id) => {
	const res = await axios({
		method: 'get',
		url: `employee/${employee_id}`,
    });
	return res.data.user;
};

export const getEmployees = async () => {
	const res = await axios({
		method: 'get',
		url: 'employees',
	});
	return res.data.data;
};

export const setError = (errors_res) => {
	return ({
	type: 'FORM_ERRORS',
	errors_res,
})};

export const createEmployee = ({employee, initEmployees}) => {
	console.log(employee)
	const formData = new FormData()
    formData.append('image', employee.image);
	formData.append('firstName', employee.firstName);
	formData.append('lastName', employee.lastName);
	formData.append('email', employee.email);
	formData.append('password', employee.password);
	formData.append('c_password', employee.cPassword);
	formData.append('phoneNumber', employee.phoneNumber);
	formData.append('commission', employee.commission.toString());
	formData.append('salary', employee.salary.toString());
	formData.append('job_id', employee.job_id.toString());
	formData.append('department_id', employee.department_id.toString());
	formData.append('hireDate',  moment(employee.hireDate).format("YYYY-MM-DD"));
	return (dispatch) => {
		axios({
			method: 'post',
			url: 'employee',
			data: formData,
		}).then((res) => {
			//empty errors
			console.log(res.status)
			dispatch(setError([]));
			if (res.status === 200) {
				alert("Employee added")
				initEmployees();
			}
		}).catch((error) => {
			if(error.response) {
				//empty errors
				dispatch(setError([]));
				const errors = error.response.data.error;
                console.log(errors)
                let errors_res = []
				if(errors.c_password) errors_res.push({message: errors.c_password[0], name: "c_password"});
				if(errors.password) errors_res.push({message: errors.password[0], name: "password"});
				if(errors.email) errors_res.push({message: errors.email[0], name: "email"});
				if(errors.firstName) errors_res.push({message: errors.firstName[0], name: "firstName"});
				if(errors.lastName) errors_res.push({message: errors.lastName[0], name: "lastName"});
				if(errors.phoneNumber) errors_res.push({message: errors.phoneNumber[0], name: "phoneNumber"});
				if(errors.commission) errors_res.push({message: errors.commission[0], name: "commission"});
				if(errors.salary) errors_res.push({message: errors.salary[0], name: "salary"});
				if(errors.job_id) errors_res.push({message: errors.job_id[0], name: "job_id"});
				if(errors.department_id) errors_res.push({message: errors.department_id[0], name: "department_id"});
				if(errors.hireDate) errors_res.push({message: errors.hireDate[0], name: "hireDate"});
				if(errors.image) errors_res.push({message: errors.image[0], name: "image"});
				dispatch(setError(errors_res));
				if (errors_res.length !== 0) {
					alert( "Failed to add employee")
				}
			}
		});
	};
};

export const updateEmployee = ({employee, initEmployees}) => {
	const formData = new FormData()
    formData.append('image', employee.image);
	formData.append('firstName', employee.firstName);
	formData.append('lastName', employee.lastName);
	formData.append('phoneNumber', employee.phoneNumber);
	formData.append('commission', employee.commission.toString());
	formData.append('salary', employee.salary.toString());
	formData.append('job_id', employee.job_id.toString());
	formData.append('department_id', employee?.department_id.toString());
	formData.append('hireDate',  moment(employee.hireDate).format("YYYY-MM-DD"));
	if (employee.resignationDate)
		formData.append('resignationDate',  moment(employee.resignationDate).format("YYYY-MM-DD"));
    formData.append('isResigned', employee.isResigned ? "1" : "0");
	return (dispatch) => {
		axios({
			method: 'post',
			url: `employee/${employee.id}`,
			data: formData,
		}).then((res) => {
			//empty errors
			dispatch(setError([]));
			initEmployees();
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
				if(errors.phoneNumber) errors_res.push({message: errors.phoneNumber[0], name: "phoneNumber"});
				if(errors.commission) errors_res.push({message: errors.commission[0], name: "commission"});
				if(errors.salary) errors_res.push({message: errors.salary[0], name: "salary"});
				if(errors.job_id) errors_res.push({message: errors.job_id[0], name: "job_id"});
				if(errors.department_id) errors_res.push({message: errors.department_id[0], name: "department_id"});
				if(errors.hireDate) errors_res.push({message: errors.hireDate[0], name: "hireDate"});
				if(errors.resignationDate) errors_res.push({message: errors.resignationDate[0], name: "resignationDate"});
				if(errors.isResigned) errors_res.push({message: errors.isResigned[0], name: "isResigned"});
				if(errors.image) errors_res.push({message: errors.image[0], name: "image"});
				dispatch(setError(errors_res));
			}
		});
	};
};

