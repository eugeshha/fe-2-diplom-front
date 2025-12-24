import React, { useState, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { updatePassengerData } from '../../store/passengersSlice';
import './PassengerCard.css';
import ValidIcon from '../../assets/img/Valid.svg';
import NovalidIcon from '../../assets/img/Novalid.svg';
import CollapseIcon from '../../assets/img/collapse-cirlcle.svg';
import CollapseActiveIcon from '../../assets/img/collapse-round-active.svg';
import CloseIcon from '../../assets/img/close.svg';
import {PassengerType} from "../common/PassengerType";
import {PassengerGender} from "../common/PassengerGender";
import {DocumentType} from "../common/DocumentType";

const PassengerCard = forwardRef(
    ({ type, number, data, updateValidation, validationResults, scrollToNext, onDelete }, ref) => {
        const dispatch = useDispatch();
        const [isSubmitted, setIsSubmitted] = useState(false);
        const [collapsed, setCollapsed] = useState(false);

        const handleSubmit = () => {
            const isChild = data.passengerType === PassengerType.Child;
            let isValid = true;
            let error = '';

            const letterPattern = /^[A-Za-zА-Яа-яЁё\s-]+$/;

            if (!data.surname || !letterPattern.test(data.surname)) {
                isValid = false;
                error = 'Фамилия должна содержать только буквы';
            } else if (!data.name || !letterPattern.test(data.name)) {
                isValid = false;
                error = 'Имя должно содержать только буквы';
            } else if (!data.patronymic || !letterPattern.test(data.patronymic)) {
                isValid = false;
                error = 'Отчество должно содержать только буквы';
            }

            else if (!data.birthDate) {
                isValid = false;
                error = 'Укажите дату рождения';
            }
            else {
                const inputDate = new Date(data.birthDate);
                const maxDate = new Date('2025-07-01');
                if (inputDate > maxDate) {
                    isValid = false;
                    error = 'Дата рождения не может быть позже 01-07-2025';
                }
            }


            if (isChild) {
                const pattern = /^[IVXLCDM]+-[А-ЯЁ]{2}-\d{6}$/i;
                if (!pattern.test(data.birthCertNumber || '')) {
                    isValid = false;
                    error = 'Номер свидетельства о рождении указан некорректно. Пример: VIII-ЫП-123456';
                }
            } else {
                const passportSeriesPattern = /^\d{4}$/;
                const passportNumberPattern = /^\d{6}$/;

                if (
                    !passportSeriesPattern.test(data.passportSeries || '') ||
                    !passportNumberPattern.test(data.passportNumber || '')
                ) {
                    isValid = false;
                    error = 'Серия и номер паспорта должны содержать 4 и 6 цифр соответственно';
                }
            }

            setIsSubmitted(true);
            updateValidation(data.id, isValid, error);

            if (isValid && scrollToNext) {
                setTimeout(() => {
                    scrollToNext();
                }, 100);
            }
        };

        if (!data) return null;

        const handleChange = (updatedFields) => {
            dispatch(updatePassengerData({ id: data.id, changes: updatedFields }));
        };

        return (
            <div
                className={`passenger-card ${collapsed ? 'collapsed' : ''}`}
                ref={ref}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSubmit();
                    }
                }}
            >
                <div className="passenger-card__header">
                    <div className="passenger-card__header-left">
                        <img
                            src={collapsed ? CollapseActiveIcon : CollapseIcon}
                            alt="Свернуть/Развернуть"
                            className="collapse-toggle"
                            onClick={() => setCollapsed(!collapsed)}
                        />
                        <h4 className="passenger-card__title">Пассажир {number}</h4>
                    </div>

                    <img
                        src={CloseIcon}
                        alt="close"
                        className="close-icon"
                        onClick={onDelete}
                    />
                </div>

                {!collapsed && (
                    <>
                        <div className="personal-info">
                            <div className="field-group">
                                <select
                                    className="field-group_type"
                                    value={data.passengerType}
                                    onChange={(e) => handleChange({passengerType: e.target.value})}
                                >
                                    <option value={PassengerType.Adult}>Взрослый</option>
                                    <option value={PassengerType.Child}>Детский</option>
                                </select>
                            </div>

                            <div className="field-row fio">
                                {['surname', 'name', 'patronymic'].map((field, index) => (
                                    <div className="field-group" key={index}>
                                        <label className="field-group__label">
                                            {field === 'surname' && 'Фамилия'}
                                            {field === 'name' && 'Имя'}
                                            {field === 'patronymic' && 'Отчество'}
                                        </label>
                                        <input
                                            className="field-group__input"
                                            type="text"
                                            value={data[field] || ''}
                                            onChange={(e) => handleChange({[field]: e.target.value})}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="field-row birth-row">
                                <div className="field-group">
                                    <label className="field-group__label">Пол</label>
                                    <div className="gender-group">
                                        <button
                                            type="button"
                                            className={`gender-button ${data.gender === PassengerGender.Male ? 'active' : ''}`}
                                            onClick={() => handleChange({gender: PassengerGender.Male})}
                                        >
                                            м
                                        </button>
                                        <button
                                            type="button"
                                            className={`gender-button ${data.gender === PassengerGender.Female ? 'active' : ''}`}
                                            onClick={() => handleChange({gender: PassengerGender.Female})}
                                        >
                                            ж
                                        </button>
                                    </div>
                                </div>

                                <div className="field-group birth-date-group">
                                    <label className="field-group__label">Дата рождения</label>
                                    <input
                                        className="field-group__input birth-date-input"
                                        type="date"
                                        placeholder="ДД/ММ/ГГ"
                                        value={data.birthDate || ''}
                                        onChange={(e) => handleChange({birthDate: e.target.value})}
                                    />
                                </div>

                            </div>

                            <div className="mobility-checkbox">
                                <label className="mobility-label">
                                    <input
                                        type="checkbox"
                                        checked={data.isLimitedMobility || false}
                                        onChange={(e) => handleChange({isLimitedMobility: e.target.checked})}
                                    />
                                    Ограниченная подвижность
                                </label>
                            </div>
                        </div>

                        <hr className="section-divider" />

                        <div className="field-row docs-row">
                            <div className="field-group">
                                <label className="field-group__label">Тип документа</label>
                                <select
                                    className="field-group__input type-doc"
                                    value={data.documentType}
                                    onChange={(e) => handleChange({documentType: e.target.value})}
                                >
                                    {data.passengerType === PassengerType.Adult ? (
                                        <>
                                            <option value={DocumentType.Passport}>Паспорт</option>
                                            <option value={DocumentType.Other}>Другое</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value={DocumentType.BirthCertificate}>Свидетельство о рождении</option>
                                            <option value={DocumentType.Other}>Другое</option>
                                        </>
                                    )}
                                </select>
                            </div>

                            {data.documentType === DocumentType.Passport ? (
                                <>
                                    <div className="field-group">
                                        <label className="field-group__label">Серия паспорта</label>
                                        <input
                                            className="field-group__input"
                                            type="text"
                                            value={data.passportSeries || ''}
                                            onChange={(e) => handleChange({passportSeries: e.target.value})}
                                        />
                                    </div>
                                    <div className="field-group">
                                        <label className="field-group__label">Номер паспорта</label>
                                        <input
                                            className="field-group__input"
                                            type="text"
                                            value={data.passportNumber || ''}
                                            onChange={(e) => handleChange({passportNumber: e.target.value})}
                                        />
                                    </div>
                                </>
                            ) : data.documentType === DocumentType.BirthCertificate ? (
                                <div className="field-group">
                                    <label className="field-group__label">Номер свидетельства о рождении</label>
                                    <input
                                        className="field-group__input"
                                        type="text"
                                        value={data.birthCertNumber || ''}
                                        onChange={(e) => handleChange({birthCertNumber: e.target.value})}
                                    />
                                </div>
                            ) : (
                                <div className="field-group">
                                    <label className="field-group__label">Номер другого документа</label>
                                    <input
                                        className="field-group__input"
                                        type="text"
                                        value={data.otherDocumentNumber || ''}
                                        onChange={(e) => handleChange({otherDocumentNumber: e.target.value})}
                                    />
                                </div>
                            )}
                        </div>

                        <hr className="section-divider"/>
                    </>
                )}

                {isSubmitted && validationResults?.[data.id] && (
                    <div className={`validation-message ${validationResults[data.id].isValid ? 'valid' : 'invalid'}`}>
                        <img
                            src={validationResults[data.id].isValid ? ValidIcon : NovalidIcon}
                            alt=""
                        />
                        {validationResults[data.id].isValid ? (
                            <>
                                <span>Готово</span>
                                <button
                                    type="button"
                                    className="next-passenger-button"
                                    onClick={handleSubmit}
                                >
                                    Следующий пассажир
                                </button>
                            </>
                        ) : (
                            <span>{validationResults[data.id].error}</span>
                        )}
                    </div>
                )}

                {!isSubmitted && (
                    <div className="next-button-wrapper">
                        <button
                            type="button"
                            className="next-passenger-button"
                            onClick={handleSubmit}
                        >
                            Следующий пассажир
                        </button>
                    </div>
                )}
            </div>

        );
    }
);

export default PassengerCard;
