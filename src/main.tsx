import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

window.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

window.isIPad = /iPad/.test(navigator.userAgent);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
