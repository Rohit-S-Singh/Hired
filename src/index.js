

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { GlobalProvider } from '../src/Components/GlobalContext'; // import the provider

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
