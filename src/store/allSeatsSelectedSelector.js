import {createSelector} from "@reduxjs/toolkit";

export const areAllSeatsSelected = createSelector(
    state => state.passengers.passengersCount,
    state => state.seats.selectedSeats.departure.seats.length,
    state => state.seats.selectedSeats.arrival.seats.length,
    (passengersCount, departureSeatsCount, arrivalSeatsCount) => {
        const seats = passengersCount.adult + passengersCount.child;
        return departureSeatsCount === seats && arrivalSeatsCount === seats;
    }
);