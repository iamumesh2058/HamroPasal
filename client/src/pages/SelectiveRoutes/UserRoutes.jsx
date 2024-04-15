import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../api/user.api';

const UserRoutes = () => {
    const user  = isAuthenticated();
    return (
        <>
            {
                user?.role === "customer" ?
                    <Outlet />
                    :
                    <Navigate to='/sign-in' />
            }
        </>
    )
}

export default UserRoutes;