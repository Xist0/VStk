import React from 'react';
import { createRoot, render } from 'react-dom';
import App from './App';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);