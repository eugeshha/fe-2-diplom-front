import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    seatsItemSelect,
    seatsItemUnSelect,
} from '../../../store/seatsSlice';

import Price from './Price';
import Services from './Services';
import RoubleIcon from '../../../assets/img/Rouble.svg';

import SchemeKupe from '../wagon-schemes/SchemeKupe';
import SchemePlatzkart from '../wagon-schemes/SchemePlatzkart';
import SchemeSitting from '../wagon-schemes/SchemeSitting';
import SchemeLux from '../wagon-schemes/SchemeLux';
import './TicketCard.css'
import {PassengerType} from "../../common/PassengerType";
import {CoachTypes} from "../../common/CoachConsts";


const schemeComponents = {
    second: SchemeKupe,
    third: SchemePlatzkart,
    fourth: SchemeSitting,
    first: SchemeLux,
};

export default function CoachDetails({ selectedCoach, direction }) {
    const dispatch = useDispatch();
    const seatsState = useSelector((state) => state.seats.selectedSeats[direction]);

    const { coach, seats } = selectedCoach;
    const selectedSeats = seatsState?.seatsMap?.[coach._id] || [];
    const seatsCount = selectedSeats.length;

    const { passengersCount } = useSelector((state) => state.passengers);

    const maxSeats = passengersCount.adult + passengersCount.child;

    const currentCoachServices = useSelector((state) => state.seats.selectedSeats[direction].services[coach._id]) || [];

    const isLux = coach.class_type === CoachTypes.Lux;
    const isPlatz = coach.class_type === CoachTypes.Platzkart;
    // const isKupe = coach.class_type === CoachTypes.Kupe;
    // const isSeat = coach.class_type === CoachTypes.Seat;
    const SchemeComponent = schemeComponents[coach.class_type];

    const selectedSeatsArray = useSelector((state) => state.seats.selectedSeats[direction].seats);

    function handleSeatClick (seat) {
        const isSelected = seatsState?.seatsMap?.[coach._id]?.includes(seat.index);
        if (isSelected) {
            dispatch(seatsItemUnSelect({ coach: coach, seat_number: seat.index, direction: direction }));
        } else if (seatsCount < maxSeats) {
            const selectedAdults = selectedSeatsArray.filter(s => s.passenger_type === PassengerType.Adult)
            const selectedChildren = selectedSeatsArray.filter(s => s.passenger_type === PassengerType.Child)

            var passengerType = "";

            if (selectedAdults.length < passengersCount.adult)
                passengerType = PassengerType.Adult
            else if (selectedChildren.length < passengersCount.child)
                passengerType = PassengerType.Child
            else
                console.error("No more seats available")

            dispatch(seatsItemSelect({
                coach: coach,
                seat_number: seat.index,
                passenger_type: passengerType,
                extra_services: currentCoachServices,
                direction: direction,
            }));
        }
    }

    return (
        <div className="coach-wrapper">
            <div className="coach-info">
                <div className="coach-info-header">
                    <p className="coach-number">{coach.name.replace(/\D/g, '')}</p>
                    <p className="coach-title">вагон</p>
                </div>

                <div className="coach-info-card coach-info-card--seats">
                    <h5 className="coach-info-title">
                        Места <span className="coach-info-count">{coach.available_seats}</span>
                    </h5>
                    {!isLux && (
                        <>
                            <p className="coach-info-text">
                                Верхние{' '}
                                <span>
                  {seats.filter((el) => el.index % 2 === 0 && el.index < 33).length}
                </span>
                            </p>
                            <p className="coach-info-text">
                                Нижние{' '}
                                <span>
                  {seats.filter((el) => el.index % 2 !== 0 && el.index < 33).length}
                </span>
                            </p>
                        </>
                    )}
                    {isPlatz && (
                        <p className="coach-info-text">
                            Боковые{' '}
                            <span>{seats.filter((el) => el.index > 32).length}</span>
                        </p>
                    )}
                </div>

                <div className="coach-info-card coach-info-card--price">
                    <h5 className="coach-info-title">Стоимость</h5>
                    {!isLux && (
                        <p className="coach-info-text">
                            <Price title="coach-info-price" value={coach.top_price}/>
                            <img src={RoubleIcon} alt="₽" className="rouble-icon"/>
                        </p>
                    )}
                    <p className="coach-info-text">
                        <Price title="coach-info-price" value={coach.bottom_price}/>
                        <img src={RoubleIcon} alt="₽" className="rouble-icon"/>
                    </p>
                    {isPlatz && (
                        <p className="coach-info-text">
                            <Price title="coach-info-price" value={coach.side_price}/>
                            <img src={RoubleIcon} alt="₽" className="rouble-icon"/>
                        </p>
                    )}
                </div>

                <div className="coach-info-card coach-info-card--services">
                    <h5 className="coach-info-title">Обслуживание ФПК</h5>
                    <Services coach={coach} direction={direction}/>
                    <div className="coach-demand">
                        {seats.filter((el) => !el.available).length} человек выбирают места в этом поезде
                    </div>
                </div>
            </div>

            <div className="coach-inner">

                <SchemeComponent
                    coach={coach}
                    seats={seats}
                    selectedSeats={
                        (seatsState?.seatsMap?.[coach._id] || []).map((seat_number) => ({ index: seat_number }))
                    }
                    onSeatClick={handleSeatClick}
                />
            </div>
        </div>
    );
}

