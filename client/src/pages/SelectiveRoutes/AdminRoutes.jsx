import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../api/user.api';

const AdminRoutes = () => {
    const user  = isAuthenticated();
    return (
        <>
            {
                user?.role === "admin" ?
                    <Outlet />
                    :
                    <Navigate to='/sign-in' />
            }
        </>
    )
}

export default AdminRoutes;