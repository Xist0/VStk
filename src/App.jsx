// App.jsx
import React, { useState } from 'react';
import MultiStepForm from './components/MultiStepForm';
import { crs } from './index';
import './index.css'
import './components/css/companets.css';

const App = () => {
  const [formData, setFormData] = useState(crs);

  const handleSave = (updatedData) => {
    console.log('Сохранено:', updatedData);
    setFormData(updatedData);
    // Здесь ты можешь использовать API или другие методы для сохранения данных на сервере
  };

  return (
    <div>
      <div className="components">
        <h1>Инвентаризация</h1>
        <MultiStepForm data={formData} onSave={handleSave} />
      </div>
    </div>
  );
};

export default App;
