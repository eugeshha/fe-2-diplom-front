import React from 'react';
import './ErrorPopup.css';

const ErrorPopup = ({ text, onClose }) => (
    <div className="error-popup">
        <div className="error-popup__title">!</div>
        <p>{text}</p>
        <button className="ok-button" onClick={onClose}>
            Понятно
        </button>
    </div>
);

export default ErrorPopup;
