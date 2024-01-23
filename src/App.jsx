import React, { useState } from 'react';
import './index.css'
import { Link } from 'react-router-dom';
import './components/css/companets.css';
import QRcodeScaner from './components/QRcodeScaner';

const App = () => {
  return (
    <div>
      <div className="components">
        <div className="nav">
          <Link to='/invoice'>Инв</Link>
          <Link to='/inventory'>Накладная</Link>
        </div>
        <QRcodeScaner />
      </div>
    </div>
  );
};

export default App;
