import React from 'react';
import './TicketCard.css';
import subtractIcon from '../../../assets/img/subtract.png';
import subtractBackIcon from '../../../assets/img/subtract-back.png';


export default function TicketHeader({ type, onSelectAnotherTrain }) {

    const icon = type === 'departure' ? subtractIcon : subtractBackIcon;

    return (
        <div className="ticket-card__header">
            <img className="ticket-card__icon" src={icon} alt="иконка направления" />
            <button className="ticket-card__button" onClick={onSelectAnotherTrain}>
                Выбрать другой поезд
            </button>
        </div>
    );
}
