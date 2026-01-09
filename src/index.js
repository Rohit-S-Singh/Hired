

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import './index.css';
import { GlobalProvider } from './pages/AUTH/GlobalContext'; // import the provider

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
        <PayPalScriptProvider options={{ 
      "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID 
  }}>
      <App />

        </PayPalScriptProvider>
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
