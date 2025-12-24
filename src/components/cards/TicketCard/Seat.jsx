import React from 'react';
import { useSelector } from 'react-redux';

import './TicketCard.css';

export default function Seat({
                                 id,
                                 number,
                                 type,
                                 available,
                                 direction,
                                 onClick,
                             }) {
    const seats = useSelector((state) => state.seats.selectedSeats[direction].seats);
    const selected = seats[id] || [];
    const isSelected = selected.includes(number);

    const getSeatClass = () => {
        let base = 'coach-seat';
        if (!available) return `${base} coach-seat--disabled`;
        if (isSelected) return `${base} coach-seat--active coach-seat--${type}`;
        return `${base} coach-seat--${type}`;
    };

    return (
        <button
            type="button"
            className={getSeatClass()}
            onClick={onClick}
            disabled={!available}
        >
            <p className="coach-seat-number">{number}</p>
        </button>
    );
}
