import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Inventory from './components/page/Inventory';
import Invoice from './components/Invoice';
import QRcodeScaner from './components/QRcodeScaner';
import AuthLink from './components/AuthLink';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <AuthLink/>
  },
  {
    path: '/inventory',
    element: <Inventory />,
  },
  {
    path: '/invoice',
    element: <Invoice/>
  },
  {
    path: '/app',
    element: <App/>
  },
  {
    path: '/QRcodeScanner',
    element: <QRcodeScaner/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes} />
);
