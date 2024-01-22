import React, { useState } from 'react';
import './index.css'
import { Link } from 'react-router-dom';  // Заменено на Link
import './components/css/companets.css';

const App = () => {
  return (
    <div>
      <div className="components">
        <Link to='/invoice'>Инв</Link>
        <Link to='/inventory'>Накладная</Link>
      </div>
    </div>
  );
};

export default App;
