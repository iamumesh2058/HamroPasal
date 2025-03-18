import React from 'react'
import { Link } from 'react-router-dom'
import crownLogo from '../../assets/crown.svg'
import "./Header.scss"

const Header = () => {
    return (
        <div className='navigation'>
            <div className="logo-container">
                <Link to={'/'}>
                    <img src={crownLogo} alt='crown-logo' />
                </Link>
            </div>

            <div className="nav-links-container">
                <Link to={"/shop"}>Shop</Link>
            </div>
        </div>
    )
}

export default Header