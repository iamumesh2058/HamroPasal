import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthenticated, logout } from "../../api/user.api";
import { toast } from "react-toastify";

import { CartDropdown, CartIcon, ProfileIcon, ToggleThemeIcon } from "../../components";

import crownLogo from "../../assets/crown.svg";
import "./Header.scss";

const Header = ({ isDarkTheme, toggleTheme }) => {
    const navigate = useNavigate();
    const currentUser = isAuthenticated();
    const { isCartOpen } = useSelector((state) => state.cart);

    const handleSingOut = async () => {
        await logout()
            .then((data) => {
                if (data.err) {
                    toast.err(data.err);
                    return navigate("/");
                } else {
                    toast.success(data.msg);
                    sessionStorage.removeItem("jwt");
                    return navigate("/");
                }
            })
    }

    return (
        <div className="navigation">
            <div className="logo-container">
                <Link to={"/"}>
                    <img src={crownLogo} alt="crown-logo" />
                </Link>
            </div>


            <div className="nav-links-container">
                <Link to={"/shop"} className="nav-link">Shop</Link>
                <div>
                    {
                        currentUser ?
                            <Link onClick={handleSingOut} className="nav-link">Sign Out</Link>
                            :
                            <Link to={"/sign-in"} className="nav-link">Sign In</Link>
                    }
                </div>
                { currentUser && <CartIcon />}
                <ToggleThemeIcon isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
                <ProfileIcon />
            </div>
            {isCartOpen && <CartDropdown />}
        </div>
    )
}

export default Header