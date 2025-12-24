import React from 'react'
import { renderSeat } from './renderSeat'
import './WagonScheme.css'




export default function SchemeSitting({ coach, seats, selectedSeats, onSeatClick }) {
    if (!coach) return null;

    const availableMap = new Map((seats || []).map(seat => [seat.index, seat.available]));

    const allSeats = Array.from({ length: 62 }, (_, i) => {
        const index = i + 1;
        return {
            index,
            available: availableMap.get(index) ?? false,
        };
    });
    const upperTop = allSeats.filter(s => s.index >= 2 && s.index <= 32 && s.index % 2 === 0);
    const upperBottom = allSeats.filter(s => s.index >= 1 && s.index <= 31 && s.index % 2 !== 0);
    const lowerTop = allSeats.filter(s => s.index >= 34 && s.index <= 62 && s.index % 2 === 0);
    const lowerBottom = allSeats.filter(s => s.index >= 33 && s.index <= 61 && s.index % 2 !== 0);

    return (
        <div className="seats-scheme sitting-wagon">
            <span className="scheme_wagon-number">
                {coach.name.slice(-2)}
            </span>

            <ul className="scheme_upper-top">
                {upperTop.map(seat => renderSeat(seat, selectedSeats, onSeatClick))}
            </ul>
            <ul className="scheme_upper-bottom">
                {upperBottom.map(seat => renderSeat(seat, selectedSeats, onSeatClick))}
            </ul>
            <ul className="scheme_lower-top">
                {lowerTop.map(seat => renderSeat(seat, selectedSeats, onSeatClick))}
            </ul>
            <ul className="scheme_lower-bottom">
                {lowerBottom.map(seat => renderSeat(seat, selectedSeats, onSeatClick))}
            </ul>
        </div>
    );
}
