

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { GlobalProvider } from './pages/AUTH/GlobalContext'; // import the provider

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
