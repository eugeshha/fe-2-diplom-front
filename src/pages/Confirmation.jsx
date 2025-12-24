import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Confirmation.css';
import RouteDetails from '../components/common/RouteDetails';
import TrainCard from '../components/cards/TrainCard';
import {useDispatch, useSelector} from 'react-redux';
import {selectTicketPrice} from "../store/seatsPriceSelector";
import {PassengerGender} from "../components/common/PassengerGender";
import {PassengerType} from "../components/common/PassengerType";
import React, {useEffect} from "react";
import {selectTicketsForOrder} from "../store/seatsOrderSelector";
import {purchaseTickets} from "../store/purchaseTicketsRequest";
import passengerIcon from '../assets/img/passenger.svg';

const Confirmation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const availableSeatsInfo = useSelector(state => state.seats.availableSeatsInfo);
    const priceInfo = useSelector(state => state.seats.priceInfo);
    const departureTrain = useSelector(state => state.seats.train.departure);
    const arrivalTrain = useSelector(state => state.seats.train.arrival);
    const paymentMethod = useSelector(state => state.payment.paymentMethod);
    const passengers = useSelector(state => state.passengers.passengers);
    const ticketsForOrder = useSelector(selectTicketsForOrder);

    const orderStatus = useSelector(state => {
        return state.order
    });

    if (orderStatus.complete) {
        console.log(orderStatus);
    }

    var order = {
        "user": {
            "first_name": "string",
            "last_name": "string",
            "patronymic": "string",
            "phone": "string",
            "email": "string",
            "payment_method": "cash"
        },
        "departure": ticketsForOrder.departureTickets,
        "arrival": ticketsForOrder.arrivalTickets,
    }

    const seatsPrice = useSelector(selectTicketPrice);
    const totalPrice = seatsPrice.departureAdults + seatsPrice.departureChildren + seatsPrice.arrivalAdults + seatsPrice.arrivalChildren;

    const handlePurchaseTicketsClick = () => {
        dispatch(purchaseTickets(order));
    };

    useEffect(() => {
        if (orderStatus.complete && orderStatus.success) {
            navigate('/success');
        }
    }, [orderStatus, navigate]);

    return (
        <main className="page-container">
            <aside className="sidebar">
                <RouteDetails/>
            </aside>

            <div className="main-section">
                <section className="confirmation-section">

                    {departureTrain && (
                        <div className="confirmation-form">
                            <h3 className="form-title">Поезд</h3>
                            <TrainCard
                                data={{departure: departureTrain, arrival: arrivalTrain}}
                                availableSeatsInfo={availableSeatsInfo}
                                priceInfo={priceInfo}
                                readonly
                                customButton={
                                    <div className="change-button-wrapper change-button-wrapper_train">
                                        <button className="change-button" onClick={() => navigate('/search')}>
                                            Изменить
                                        </button>
                                    </div>
                                }
                            />
                        </div>
                    )}

                    <div className="confirmation-overall">
                        <h3 className="form-title ">Пассажиры</h3>

                        <div className="confirmation-overall-row">
                            <div className="confirmation-form passengers-block">
                                {passengers.map((p) => (
                                    <div className="confirmation-passenger" key={p.id}>
                                        <div className="confirmation-passenger__icon-block">
                                            <div className="confirmation-passenger__icon">
                                                <img
                                                    src={passengerIcon}
                                                    alt="Пассажир"
                                                    className="confirmation-passenger__icon-img"
                                                />
                                            </div>
                                            <p className="confirmation-passenger__ticket-type">
                                                {p.passengerType === PassengerType.Adult ? 'Взрослый' : 'Детский'}
                                            </p>
                                        </div>

                                        <div className="confirmation-passenger__info">
                                            <p className="passenger-name">
                                                {`${p.surname} ${p.name} ${p.patronymic}`}
                                            </p>
                                            <p className="passenger-detail">
                                                Пол: {p.gender === PassengerGender.Male ? 'Мужской' : 'Женский'}
                                            </p>
                                            <p className="passenger-detail">Дата рождения: {p.birthDate}</p>
                                            <p className="passenger-detail">
                                                Документ:
                                                {p.birthDate === 'adult'
                                                    ? ` Паспорт: ${p.passportSeries} ${p.passportNumber}`
                                                    : ` Свидетельство о рождении: ${p.birthCertNumber}`}
                                            </p>
                                        </div>
                                    </div>

                                ))}
                            </div>

                            {availableSeatsInfo && priceInfo?.departure && (
                                <div className="confirmation-form summary-block">
                                    <div className="form-title">
                                        Всего <span style={{fontWeight: 700}}>{totalPrice}</span>
                                        <span className="summary-img"/>
                                    </div>
                                    <div className="change-button-wrapper">
                                        <button className="change-button" onClick={() => navigate('/passenger-details')}>
                                            Изменить
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="confirmation-payment">
                        <h3 className="form-title">Способ оплаты</h3>
                        <div className="confirmation-payment-method">
                            <p className="payment-value">
                                {paymentMethod === 'cash' ? 'Наличные' : 'Онлайн-оплата'}
                            </p>
                        </div>
                        <div className="change-button-wrapper">
                            <button className="change-button" onClick={() => navigate('/payment')}>Изменить</button>
                        </div>
                    </div>

                    <div className="seats_buttons">
                    <button
                            type="button"
                            className="button seats_button"
                            onClick={handlePurchaseTicketsClick}
                        >
                            Подтвердить
                        </button>
                    </div>

                </section>
            </div>
        </main>
    );
};

export default Confirmation;

