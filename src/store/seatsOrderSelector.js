import { createSelector } from '@reduxjs/toolkit';
import {PassengerType} from "../components/common/PassengerType";
import {DocumentType} from "../components/common/DocumentType";

export const selectPassengersForOrder = (state) => { return {
    trains: state.seats.train,
    departureSeats: state.seats.selectedSeats.departure.seats,
    arrivalSeats: state.seats.selectedSeats.arrival.seats,
    passengersCount: state.passengers.passengersCount,
    passengers: state.passengers.passengers,
}}

export const selectTicketsForOrder = createSelector(
    [selectPassengersForOrder],
    (ticketsForOder) => {
        const adults   = ticketsForOder.passengers.filter(p => p.passengerType === PassengerType.Adult)
        const children = ticketsForOder.passengers.filter(p => p.passengerType === PassengerType.Child)

        var departureTickets = {
            route_direction_id: ticketsForOder.trains.departure._id,
            seats: createDirectionSeatsOrder(adults, children, ticketsForOder.departureSeats, ticketsForOder.passengersCount.baby),
        };
        var arrivalTickets = {
            route_direction_id: ticketsForOder.trains.arrival._id,
            seats: createDirectionSeatsOrder(adults, children, ticketsForOder.arrivalSeats, ticketsForOder.passengersCount.baby),
        };

        return { departureTickets, arrivalTickets };
    });

function createDirectionSeatsOrder(adults, children, directionSeats, numberOfBabys) {
    const adultSeats    = directionSeats.filter(p => p.passenger_type === PassengerType.Adult)
    const childrenSeats = directionSeats.filter(p => p.passenger_type === PassengerType.Child)

    if (adultSeats.length !== adults.length) {
        throw new Error("Number of adult seats doesn't match the number of adult passengers")
    }

    if (childrenSeats.length !== children.length) {
        throw new Error("Number of children seats doesn't match the number of children passengers")
    }

    var ticketsOder = [];

    for (let i = 0; i < adultSeats.length; i++) {
        const seat = adultSeats[i];
        const passenger = adults[i];
        const includeBabySeat = i < numberOfBabys;
        ticketsOder.push(createPassenger(seat, passenger, includeBabySeat))
    }

    for (let i = 0; i < childrenSeats.length; i++) {
        const seat = childrenSeats[i];
        const passenger = children[i];
        ticketsOder.push(createPassenger(seat, passenger, false))
    }

    return ticketsOder;
}

function createPassenger(seat, passenger, includeBabySeat) {
    return {
        "coach_id": seat.coach._id,
        "person_info": {
            "is_adult": passenger.passengerType === PassengerType.Adult,
            "first_name": passenger.name,
            "last_name": passenger.surname,
            "patronymic": passenger.patronymic,
            "gender": passenger.gender,
            "birthday": passenger.birthDate,
            "document_type": passenger.documentType,
            "document_data": passenger.documentType === DocumentType.Passport ?
                passenger.passportSeries + " " + passenger.passportNumber :
                passenger.documentType === PassengerType.Child ?
                    passenger.birthCertNumber : passenger.otherDocumentNumber,
        },
        "seat_number": seat.seat_number,
        "is_child": passenger.passengerType === PassengerType.Child,
        "include_children_seat": includeBabySeat
    }
}

