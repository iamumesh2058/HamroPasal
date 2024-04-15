import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import "./Header.scss";
import crownLogo from "../../assets/crown.svg";
import { CartDropdown, CartIcon } from '../../components';
import { toast } from "react-toastify";
import { isAuthenticated } from '../../api/user.api';

const Header = () => {
    const navigate = useNavigate();
    const { isCartOpen } = useSelector((state => state.cartDropdown));
    const user = isAuthenticated();

    const handleLogout = () => {
        sessionStorage.removeItem("jwt");
        toast.success("User Logout");
        return navigate('/');
    }

    return (
        <div className="navigation">
            <div className="logo-container">
                <Link to={'/'}>
                    <img src={crownLogo} alt='crown-logo' />
                </Link>
            </div>
            <div className="nav-links-container">
                {
                    user?.role !== "admin" &&
                    <Link className='nav-link' to={'/shop'}>Shop</Link>
                }

                {
                    user ?
                        <Link onClick={handleLogout}>Logout</Link>
                        :
                        <Link className='nav-link' to={'/sign-in'}>Sign In</Link>
                }

                {
                    user?.role !== "admin" &&
                    <CartIcon />
                }
            </div>
            {
                isCartOpen && <CartDropdown />
            }
        </div>
    )
}

export default Header;