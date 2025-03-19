import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import crownLogo from '../../assets/crown.svg'
import "./Header.scss"
import { isAuthenticated, logout } from '../../api/user.api'
import { toast } from 'react-toastify'

const Header = () => {
    const navigate = useNavigate();
    const currentUser = isAuthenticated();

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
        <div className='navigation'>
            <div className="logo-container">
                <Link to={'/'}>
                    <img src={crownLogo} alt='crown-logo' />
                </Link>
            </div>


            <div className="nav-links-container">
                <Link to={"/shop"} className="nav-link">Shop</Link>
                {
                    currentUser ?
                    <Link onClick={handleSingOut} className="nav-link">Sign Out</Link>
                    :
                    <Link to={"/sign-up"} className="nav-link">Sign Up</Link>
                }
            </div>
        </div>
    )
}

export default Header