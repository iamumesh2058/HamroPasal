import React from 'react';
import adminNavLinks from './adminNavLinks';
import { NavLink } from 'react-router-dom';
import "./AdminSideBar.scss";

const AdminSideBar = () => {
    return (
        <div className='admin-sidebar-container'>
            {
                adminNavLinks.map((navLink) => {
                    const { text, path } = navLink;
                    return(
                        <div key={path} className='navlink'>
                            <NavLink to={path}>{text}</NavLink>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AdminSideBar;