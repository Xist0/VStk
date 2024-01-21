import React, { useState } from 'react';
import './css/companets.css';
import { MdModeEdit } from "react-icons/md";

const MultiStepForm = ({ data, onSave }) => {
    const [formData, setFormData] = useState(data);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantityChanges, setQuantityChanges] = useState({});
    const [isLastPage, setIsLastPage] = useState(false);

    const handleQuantityChange = (newQuantity) => {
        setQuantityChanges((prevChanges) => ({
            ...prevChanges,
            [currentIndex]: newQuantity,
        }));
    };

    const handleNext = () => {
        if (currentIndex === formData.length - 1) {
            setIsLastPage(true);
        } else {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePrev = () => {
        if (isLastPage) {
            setIsLastPage(false);
        } else {
            setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        }
    };

    const handleSave = () => {
        onSave(formData.map((item, index) => ({
            ...item,
            product_quantity: quantityChanges[index] !== undefined ? quantityChanges[index] : item.product_quantity,
        })));
    };

    const handleEdit = (index) => {
        setCurrentIndex(index);
        setIsLastPage(false);
    };

    return (
        <div className="multi-step-form-container">
            {isLastPage ? (
                <>
                    <h2>Проверьте перед сохранением</h2>
                    <ul className="multi-step-form-list">
                        {formData.map((item, index) => (
                            <li key={index} className={`multi-step-form-list-item ${quantityChanges[index] !== undefined ? 'edited' : ''}`}>
                                <div>
                                    <MdModeEdit
                                        alt="Edit"
                                        className="edit-icon"
                                        onClick={() => handleEdit(index)} />
                                </div>
                                {item.product_name} - {quantityChanges[index] !== undefined ? `Изменено: ${quantityChanges[index]}` : ''}
                            </li>
                        ))}
                    </ul>
                    <div className="multi-step-form-button">
                        <button onClick={handleSave}>Сохранить</button>
                    </div>
                </>
            ) : (
                <div className="multi-step-form">
                    <h1>Имя продукта: {formData[currentIndex].product_name}</h1>
                    <p>Количество: {formData[currentIndex].product_quantity}</p>
                    <label>

                        <input
                            className="multi-step-form-input"
                            type="number"
                            placeholder="Новое количество"
                            value={quantityChanges[currentIndex] !== undefined ? quantityChanges[currentIndex] : ''}
                            onChange={(e) => handleQuantityChange(e.target.value)}
                        />
                    </label>
                    <br />
                    <div className="multi-step-form-button">
                        <button onClick={handlePrev} disabled={currentIndex === 0}>
                            Назад
                        </button>
                        <button onClick={handleNext} disabled={isLastPage}>
                            {currentIndex === formData.length - 1 ? 'Проверить' : 'Вперед'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiStepForm;
