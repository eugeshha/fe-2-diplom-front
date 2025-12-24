import React from 'react'
import { renderSeat } from './renderSeat'
import './WagonScheme.css'

export default function SchemeKupe({ coach, seats, selectedSeats, onSeatClick }) {
    if (!coach) return null;

    const availableMap = new Map((seats || []).map(seat => [seat.index, seat.available]));

    const allSeats = Array.from({ length: 32 }, (_, i) => {
        const index = i + 1;
        return {
            index,
            available: availableMap.get(index) ?? false,
        };
    });

    const topSeats = allSeats.filter(seat => seat.index % 2 === 0);
    const bottomSeats = allSeats.filter(seat => seat.index % 2 !== 0);

    return (
        <div className="seats-scheme cupe">
            <span className="scheme_wagon-number">
                {coach.name.slice(-2)}
            </span>

            <ul className="scheme_top-seats">
                {topSeats.map(seat => renderSeat(seat, selectedSeats, onSeatClick))}
            </ul>

            <ul className="scheme_bottom-seats">
                {bottomSeats.map(seat => renderSeat(seat, selectedSeats, onSeatClick))}
            </ul>
        </div>
    );
}
