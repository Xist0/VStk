import React, { useState, useEffect, useRef } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { crs } from '/src/index';
import '/src/components/css/companets.css';

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

    const textareaRefs = useRef([]);

    useEffect(() => {
        textareaRefs.current.forEach((textareaRef) => {
            if (textareaRef) {
                textareaRef.style.height = 'auto';
                textareaRef.style.height = `${textareaRef.scrollHeight}px`;
            }
        });
    }, [step]);

    const handleTextareaChange = (index, event) => {
        const textareaRef = textareaRefs.current[index];

        if (textareaRef) {
            textareaRef.style.height = 'auto';
            textareaRef.style.height = `${textareaRef.scrollHeight}px`;

            const isOverflowing = textareaRef.scrollHeight > textareaRef.clientHeight;

            if (isOverflowing) {
                // Добавляем перенос строки к тексту, если блок стал выше, чем его содержимое
                handleCommentChange(index, event.target.value + '\n');
            } else {
                handleCommentChange(index, event.target.value);
            }
        }
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
                                    <div className='multi-step-form-list-editor'>
                                        <label>
                                            <h4>Изменить количество:</h4>
                                            <input
                                                type="number"
                                                value={quantityChanges[index] || ''}
                                                onChange={(e) => handleQuantityChange(index, e.target.value)}
                                            />
                                        </label>
                                        <label id='comments'>
                                            <h4>Комментарий:</h4>
                                            <textarea
                                                type="text"
                                                id='comment-inp'
                                                value={commentChanges[index] || ''}
                                                onChange={(e) => handleTextareaChange(index, e)}
                                                ref={(ref) => (textareaRefs.current[index] = ref)}
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
                    <div className="components-end">
                        <h1>Предпросмотр:</h1>
                        <ul className='multi-step-form-list'>
                            {formData.map((item, index) => (
                                <li key={index} className={quantityChanges[index] !== undefined ? 'multi-step-form-list-item-rec' : 'multi-step-form-list-item'}>
                                    {item.product_name} - {quantityChanges[index] !== undefined ? `Изменено: ${quantityChanges[index]}` : item.product_quantity}
                                    <br />
                                    <div className="comment-wrapper">
                                        {commentChanges[index] !== undefined && (
                                            <div className="comment">
                                                Комментарий: {commentChanges[index]}
                                            </div>
                                        )}
                                    </div>
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
