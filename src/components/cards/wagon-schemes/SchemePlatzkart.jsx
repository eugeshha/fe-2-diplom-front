import React from 'react'
import { renderSeat } from './renderSeat'
import './WagonScheme.css'
import {CoachInfo} from "../../common/CoachConsts";

export default function SchemePlatzkart({ coach, seats, selectedSeats, onSeatClick }) {
    if (!coach) return null;

    const availableMap = new Map((seats || []).map(seat => [seat.index, seat.available]));

    const allSeats = Array.from({ length: 48 }, (_, i) => {
        const index = i + 1;
        return {
            index,
            available: availableMap.get(index) ?? false,
        };
    });

    const topSeats = allSeats.filter(seat => seat.index % 2 === 0 && seat.index <= CoachInfo.RegularSeatsInPlatzkart);
    const bottomSeats = allSeats.filter(seat => seat.index % 2 !== 0 && seat.index <= CoachInfo.RegularSeatsInPlatzkart);
    const sideSeats = allSeats.filter(seat => seat.index > CoachInfo.RegularSeatsInPlatzkart);

    return (
        <div className="seats-scheme platzkart">
            <span className="scheme_wagon-number">{coach.name.slice(-2)}</span>

            <ul className="scheme_top-seats">
                {topSeats.map(seat => renderSeat(seat, selectedSeats, onSeatClick))}
            </ul>

            <ul className="scheme_bottom-seats">
                {bottomSeats.map(seat => renderSeat(seat, selectedSeats, onSeatClick))}
            </ul>

            <ul className="scheme_side-seats">
                {sideSeats.map(seat => renderSeat(seat, selectedSeats, onSeatClick))}
            </ul>
        </div>
    );
}
