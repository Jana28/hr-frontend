import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthenticatedUser } from './actions/loginAction';
import { logout } from './actions/logoutAction';
import Routes from "./routes/index";

function App() {
 	const dispatch = useDispatch();

	const {isLoading} = useSelector((state) => state.auth);

	useEffect(() => {
    const token = localStorage.getItem('hrtoken');
		if (token) {
			dispatch(getAuthenticatedUser());			
		}
		else {
			console.log("hrtoken not found")
			dispatch(logout()); // set loading to true
		}	
	}, [dispatch]);
	console.log("isLoadingisLoading", isLoading)
	if(isLoading) {
		return <div> still loading</div>
	}
	return (
		<>
			<Routes/>
		</>
	);
}

export default App;
