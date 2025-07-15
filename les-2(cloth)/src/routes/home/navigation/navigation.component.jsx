import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CartIcon from '../../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../../components/cart-dropdown/cart-dropdown.component';

import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';

import { selectIsCartOpen } from '../../../store/cart/cart.selector';
import { selectCurrentUser } from '../../../store/user/user.selector';

import { signOutUser } from '../../../utils/firebase/firebase.utils'; // 👈 Импортируем Firebase-функцию
import { setCurrentUser } from '../../../store/user/user.reducer';

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from './navigation.styles';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const handleSignOut = async () => {
    await signOutUser(); // 👈 вызываем Firebase logout
    dispatch(setCurrentUser(null)); // 👈 сбрасываем пользователя в Redux
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>

        <NavLinks>
          <NavLink to='/shop'>SHOP</NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={handleSignOut}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;