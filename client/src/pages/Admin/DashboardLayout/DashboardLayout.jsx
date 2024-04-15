import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSideBar } from '../../../components';
import "./DashboardLayout.scss";

const DashboardLayout = () => {
	return (
		<div className='dashboard-container'>
			<AdminSideBar />
			<Outlet />
		</div>
	)
}

export default DashboardLayout