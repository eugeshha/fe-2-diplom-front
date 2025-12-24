import { createSelector } from '@reduxjs/toolkit';
import {PassengerType} from "../components/common/PassengerType";
import {GetSeatPrice} from "../components/common/PriceCalculator";

export const selectBothDirectionsSeats = (state) => {
    return {
        departureSeats: state.seats.selectedSeats?.departure?.seats || [],
        arrivalSeats: state.seats.selectedSeats?.arrival?.seats || []
    };
};

export const selectTicketPrice = createSelector(
    [selectBothDirectionsSeats],
    (seats) => {

        const departureAdults = seats.departureSeats
            .filter(s => s.passenger_type === PassengerType.Adult)
            .map(s => GetSeatPrice(s))
            .reduce((acc, val) => acc + val, 0);

        const departureChildren = seats.departureSeats
            .filter(s => s.passenger_type === PassengerType.Child)
            .map(s => GetSeatPrice(s))
            .reduce((acc, val) => acc + val, 0);

        const arrivalAdults = seats.arrivalSeats
            .filter(s => s.passenger_type === PassengerType.Adult)
            .map(s => GetSeatPrice(s))
            .reduce((acc, val) => acc + val, 0);

        const arrivalChildren = seats.arrivalSeats
            .filter(s => s.passenger_type === PassengerType.Child)
            .map(s => GetSeatPrice(s))
            .reduce((acc, val) => acc + val, 0);

        return {
            departureAdults,
            departureChildren,
            arrivalAdults,
            arrivalChildren
        };
    }
);