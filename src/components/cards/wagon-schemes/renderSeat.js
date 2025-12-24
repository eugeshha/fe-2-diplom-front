import React from 'react'

export const renderSeat = (seat, selectedSeats, onSeatClick) => {
    const isSelected = selectedSeats.some((s) => s.index === seat.index)
    const isTaken = !seat.available;

    const className = [
        'seat-wagon_button_box',
        // seat.available ? 'available-place' : 'occupied_seat',
        isTaken ? 'place_is_taken' : 'available-place',
        isSelected ? 'seat-wagon_button_selected' : ''
    ].join(' ')

    return (
        <li
            key={seat.index}
            className={className}
            // onClick={() => seat.available && onSeatClick(seat)}
            onClick={() => !isTaken && onSeatClick(seat)}
        >
            {seat.index}
        </li>
    )
}

