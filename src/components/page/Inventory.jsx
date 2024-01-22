import React, { useState, useEffect } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import '/src/components/css/companets.css';
import { crs } from '/src/index';

const Inventory = () => {
    const [formData, setFormData] = useState(crs);
    const [quantityChanges, setQuantityChanges] = useState({});
    const [commentChanges, setCommentChanges] = useState({});
    const [activeIndex, setActiveIndex] = useState(null);
    const [staticQuantities, setStaticQuantities] = useState({});
    const [step, setStep] = useState(1);

    useEffect(() => {
        const staticQuantitiesData = {};
        formData.forEach((item, index) => {
            staticQuantitiesData[index] = item.product_quantity;
        });
        setStaticQuantities(staticQuantitiesData);
    }, [formData]);

    const handleEdit = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleQuantityChange = (index, newQuantity) => {
        setQuantityChanges((prevQuantityChanges) => ({
            ...prevQuantityChanges,
            [index]: newQuantity,
        }));
    };

    const handleCommentChange = (index, newComment) => {
        setCommentChanges((prevCommentChanges) => ({
            ...prevCommentChanges,
            [index]: newComment,
        }));
    };

    const handleSave = () => {
        const updatedFormData = formData.map((item, index) => ({
            ...item,
            product_quantity: quantityChanges[index] !== undefined ? quantityChanges[index] : item.product_quantity,
            product_comment: commentChanges[index] !== undefined ? commentChanges[index] : item.product_comment,
        }));

        console.log(updatedFormData);
        // Здесь можете добавить вашу логику сохранения данных вместо console.log
    };

    const handlePreview = () => {
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    return (
        <div className='components'>
{step === 1 && (
    <>
        <h1>Список элементов:</h1>
        <ul className="multi-step-form-list">
            {formData.map((item, index) => (
                <li key={index} className={`multi-step-form-list-item ${quantityChanges[index] !== undefined ? 'edited' : ''}`}>
                    <div>
                        <MdModeEdit
                            alt="Edit"
                            className="edit-icon"
                            onClick={() => handleEdit(index)}
                        />
                    </div>
                    <p>
                        {item.product_name} - {staticQuantities[index]}
                    </p>
                    {activeIndex === index && (
                        <div>
                            <label>
                                Изменить количество:
                                <input
                                    type="number"
                                    value={quantityChanges[index] || ''}
                                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                                />
                            </label>
                            <label>
                                Комментарий:
                                <input
                                    type="text"
                                    value={commentChanges[index] || ''}
                                    onChange={(e) => handleCommentChange(index, e.target.value)}
                                />
                            </label>
                        </div>
                    )}
                </li>
            ))}
        </ul>
        <div className="multi-step-form-button">
            <button onClick={handlePreview}>Предпросмотр</button>
        </div>
    </>
)}

            {step === 2 && (
                <>
                    <div className="components">
                        <h1>Предпросмотр:</h1>
                        <ul className='multi-step-form-list'>
                            {formData.map((item, index) => (
                                <li key={index} className={quantityChanges[index] !== undefined ? 'multi-step-form-list-item-rec' : 'multi-step-form-list-item'}>
                                    {item.product_name} - {quantityChanges[index] !== undefined ? `Изменено: ${quantityChanges[index]}` : item.product_quantity}
                                    <br />
                                    {commentChanges[index] !== undefined && (
                                        <>Комментарий: {commentChanges[index]}</>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className="multi-step-form-button">
                            <button onClick={handleBack}>Назад</button>
                            <button onClick={handleSave}>Сохранить</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Inventory;
