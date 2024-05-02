import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import "./Header.scss";
import crownLogo from "../../assets/crown.svg";
import { CartDropdown, CartIcon } from '../../components';
import { toast } from "react-toastify";
import { isAuthenticated } from '../../api/user.api';

const Header = ({ isDarkTheme, toggleTheme }) => {
    const navigate = useNavigate();
    const { isCartOpen } = useSelector((state => state.cartDropdown));
    const user = isAuthenticated();

    const [linksOpen, setNavlinksOpen] = useState(false);

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
                        <Link onClick={handleLogout} className='nav-link'>Logout</Link>
                        :
                        <Link className='nav-link' to={'/sign-in'}>Sign In</Link>
                }

                {
                    isDarkTheme ?
                        <div className="sun" onClick={toggleTheme}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>
                        </div>
                        :
                        <div className="moon" onClick={toggleTheme}>
                            <svg mlns="http://www.w3.org/2000/svg" fill="#1e202a" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#1e202a">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        </div>
                }

                {
                    user?.role !== "admin" &&
                    <>
                        <CartIcon />
                        <div className="burger" onClick={() => setNavlinksOpen(!linksOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </div>

                        {
                            linksOpen &&
                            <div className="nav-links-dropdown">
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
                            </div>
                        }
                    </>
                }

            </div>
            {
                isCartOpen && <CartDropdown />
            }
        </div >
    )
}

export default Header;