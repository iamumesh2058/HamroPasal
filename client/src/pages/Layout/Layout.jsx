import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setUser } from '../../Store/UserSlice';
import Header from './Header';
import { Outlet } from "react-router-dom";
import { isAuthenticated } from '../../api/user.api';

const Layout = () => {
    let { user } = isAuthenticated();
    const disptach = useDispatch();
	useEffect(() => {
		disptach(setUser(user));
        
	}, []);
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Layout;