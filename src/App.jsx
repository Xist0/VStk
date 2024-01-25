import React, { useState } from 'react';
import './index.css'
import './components/css/companets.css';

import BurgerMenu from './components/BurgermMenu';

const App = () => {
  return (
    <div>
      <div className="components">
        <BurgerMenu/>
      </div>
    </div>
  );
};

export default App;
