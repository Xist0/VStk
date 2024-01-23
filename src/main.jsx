import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Inventory from './components/page/Inventory';
import Invoice from './components/Invoice';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/inventory',
    element: <Inventory />,
  },
  {
    path: '/invoice',
    element: <Invoice/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes} />
);
