import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './index.scss';

import App from './App';

import { store, persistor } from './store/store';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter> 
       
            <App />
     
    </BrowserRouter>
    </PersistGate>
   </Provider>
  </React.StrictMode>
);

reportWebVitals();
