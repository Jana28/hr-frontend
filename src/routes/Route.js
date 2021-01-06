import React from 'react';
import { useSelector } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

function RouteWrapper({component, isPrivate, isAdminRoute, ...props}) {
	const {isAuthenticated, user} = useSelector((state) => state.auth );
	if (isPrivate) {
		if (isAuthenticated) {
			if (!isAdminRoute){
				console.log("1");
				return <Route {...props} component={component} />;
			}
			if (user.userType === "ADMIN") {
				console.log("2");
				return <Route {...props} component={component} />;
			}
			console.log("3");
			return <Redirect to="/unauthorized" />;
		}
		console.log("4");
		return <Redirect to="/login" />;
	}
	if (component.name === 'Login' && isAuthenticated) {
		console.log("5");
		return <Redirect to="/" />;
	}
	console.log("6");
	return <Route {...props} component={component} />;
}

export default RouteWrapper;
