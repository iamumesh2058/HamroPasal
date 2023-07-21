import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import crownLogo from '../../assets/crown.svg';
import './Header.scss'
import CartIcon from '../../components/CartIcon/CartIcon';
import CartDropdown from '../../components/CartDropdown/CartDropdown';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import { signOutUser} from '../../utils/FitebaseUtils';

const Header = () => {
    const {isCartOpen} = useContext(CartContext);
    const {currentUser} = useContext(UserContext);
    return (
        <div className='navigation'>
            <div className='logo-container'>
                <Link to={'/'}>
                    <img src={crownLogo} alt="crown-log" />
                </Link>
            </div>
            <div className='nav-links-container'>
                <Link className='nav-link' to={'/shop'}>Shop</Link>
                {
                    currentUser ? (<span to='/sign-in' onClick={signOutUser} className='nav-link'>SIGN OUT</span>) : (<Link className='nav-link' to={'/sign-in'}>Sign In</Link>)
                }
                <CartIcon />
            </div>
            {
                isCartOpen && <CartDropdown />
            }
            
        </div>
    )
}

export default Header