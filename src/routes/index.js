import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ManageDepartments from '../pages/ManageDepartments';
import ManageEmployeeHolidays from '../pages/ManageEmployeeHolidays';
import ManageEmployees from '../pages/ManageEmployees';
import ManageHolidays from '../pages/ManageHolidays';
import ManageJobs from '../pages/ManageJobs';
import ManageLeavereasons from '../pages/ManageLeavereasons';
import ManageLeaves from '../pages/ManageLeaves';
import ManageWorkreasons from '../pages/ManageWorkreasons';
import ManageAdmins from '../pages/ManageAdmins';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import NotFoundPage from '../pages/NotFoundPage';
import Profile from '../pages/Profile';

const routes = [
	{
		path: '/',
		exact: true,
		component: Home,
		isPrivate: true,
		isAdminRoute: false,
	},
	{
		path: '/profile',
		exact: true,
		component: Profile,
		isPrivate: true,
		isAdminRoute: false,
	},
	{
		path: '/login',
		exact: true,
		component: Login,
		isPrivate: false,
		isAdminRoute: false,
	},
	{
		path: '/manage-departments',
		exact: true,
		component: ManageDepartments,
		isPrivate: true,
		isAdminRoute: true,
	},
	{
		path: '/manage-holidays-work',
		exact: true,
		component: ManageEmployeeHolidays,
		isPrivate: true,
		isAdminRoute: true,
	},
	{
		path: '/manage-employees',
		exact: true,
		component: ManageEmployees,
		isPrivate: true,
		isAdminRoute: true,
	},
	{
		path: '/manage-holidays',
		exact: true,
		component: ManageHolidays,
		isPrivate: true,
		isAdminRoute: true,
	},
	{
		path: '/manage-jobs',
		exact: true,
		component: ManageJobs,
		isPrivate: true,
		isAdminRoute: true,
	},
	{
		path: '/manage-leavereasons',
		exact: true,
		component: ManageLeavereasons,
		isPrivate: true,
		isAdminRoute: true,
	},
	{
		path: '/manage-leaves',
		exact: true,
		component: ManageLeaves,
		isPrivate: true,
		isAdminRoute: true,
	},
	{
		path: '/manage-workreasons',
		exact: true,
		component: ManageWorkreasons,
		isPrivate: true,
		isAdminRoute: true,
	},
	{
		path: '/manage-admins',
		exact: true,
		component: ManageAdmins,
		isPrivate: true,
		isAdminRoute: true,
	},
	{
		path: '/unauthorized',
		exact: true,
		component: UnauthorizedPage,
		isPrivate: false,
		isAdminRoute: false,
	},
];
export default function Routes() {
	return (
		<Switch>
			{routes.map((route, index) => (
				<Route
					path={route.path}
					exact={route.exact}
					component={route.component}
					isPrivate={route.isPrivate}
					isAdminRoute={route.isAdminRoute}
					key={index}
				/>
			))}
			<Route
				component={NotFoundPage}
				isPrivate={false}
				isAdminRoute={false}
			/>
		</Switch>
	);
}
