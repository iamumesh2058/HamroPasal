import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import crownLogo from '../../assets/crown.svg';
import CartIcon from '../../components/CartIcon/CartIcon';
import CartDropdown from '../../components/CartDropdown/CartDropdown';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import { signOutUser} from '../../utils/FitebaseUtils';
import { LogoContainer, NavLink, NavLinksContainer, Navigation } from './Header.Style';

const Header = () => {
    const {isCartOpen} = useContext(CartContext);
    const {currentUser} = useContext(UserContext);
    return (
        <Navigation>
            <LogoContainer>
                <Link to={'/'}>
                    <img src={crownLogo} alt="crown-log" />
                </Link>
            </LogoContainer>
            <NavLinksContainer>
                <NavLink to={'/shop'}>Shop</NavLink>
                {
                    currentUser ? 
                    (<NavLink as={'span'} to='/sign-in' onClick={signOutUser}>SIGN OUT</NavLink>) 
                    : (<NavLink to={'/sign-in'}>Sign In</NavLink>)
                }
                <CartIcon />
            </NavLinksContainer>
            {
                isCartOpen && <CartDropdown />
            }
            
        </Navigation>
    )
}

export default Header