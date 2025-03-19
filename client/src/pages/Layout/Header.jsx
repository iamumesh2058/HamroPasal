import React from 'react'
import { Link } from 'react-router-dom'
import crownLogo from '../../assets/crown.svg'
import "./Header.scss"
import { useSelector } from 'react-redux'

const Header = () => {
    const { currentUser } = useSelector((state) => state.user);
    console.log(currentUser);
    return (
        <div className='navigation'>
            <div className="logo-container">
                <Link to={'/'}>
                    <img src={crownLogo} alt='crown-logo' />
                </Link>
            </div>


            <div className="nav-links-container">

                <Link to={"/sign-in"}>Sign In</Link>
                <Link to={"/shop"}>Shop</Link>
            </div>
        </div>
    )
}

export default Header