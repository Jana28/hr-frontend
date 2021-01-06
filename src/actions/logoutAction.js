import axios from 'axios';

export const logout = () => ({
	type: 'CLEAR_AUTH_STATE',
});

export const startLogout = () => {    
	return (dispatch) => {
		return axios({
			method: 'post',
			url: 'logout',
		}).then((res) => {

			localStorage.removeItem('hrtoken');
			dispatch(logout());

            return res.status;
		}).catch((error) => {if(error.response) return error.response.status;});
	};
};
