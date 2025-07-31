import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Spinner from './components/spinner/spinner.component';

import { GlobalStyle } from './global.styles';

import { checkUserSession } from './store/user/user.action';

const Shop = lazy(() => import('./routes/shop/shop.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));

const Navigation = lazy(() => import('./routes/home/navigation/navigation.component'));

const Home = lazy(() => import('./routes/home/home.component'));
const Authentication = lazy(() => import('./routes/home/authentication/authentication.component'));

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth
} from './utils/firebase/firebase.utils';

import { setCurrentUser } from './store/user/user.action'; // ✅ исправлено

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        await createUserDocumentFromAuth(user);

        const { accessToken, email, displayName, uid } = user;
        dispatch(setCurrentUser({ accessToken, email, displayName, uid }));
      } else {
        dispatch(setCurrentUser(null));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return ( 
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route> 
    </Routes>
   </Suspense>
  );
};

export default App;
