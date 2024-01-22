import React, { useState } from 'react';
import '/src/components/css/companets.css';
import { crs } from '/src/index';

const Invoice = () => {
    const [formData, setFormData] = useState(crs);

    return (
        <div className='components'>
            <h1>Список элементов:</h1>
            <ul>
                {formData.map((item, index) => (
                    <li key={index}>
                        <p>{item.product_name} - {item.product_quantity}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Invoice;
