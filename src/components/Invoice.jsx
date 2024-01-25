import React, { useState } from 'react';
import MultiStepForm from './page/MultiStepForm';
import { crs } from '/src/index.js';
import '/src/components/css/companets.css';
import BurgerMenu from './BurgermMenu';

const Invoice = () => {
  const [formData, setFormData] = useState(crs);

  const handleSave = (updatedData) => {
    console.log('Сохранено:', updatedData);
    setFormData(updatedData);
  };

  return (
    <div>
      <BurgerMenu/>
      <div className="components">
        <MultiStepForm data={formData} onSave={handleSave} />
      </div>
    </div>
  );
};

export default Invoice;
