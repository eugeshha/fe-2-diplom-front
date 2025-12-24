import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './RouteDetails.css';
import { selectTotalPrice, selectSeatsPrice } from '../../store/summarySlice';


export default function RouteDetails() {

    const passengersCount = useSelector((state) => state.passengers.passengersCount)
    const [isDepartureCollapsed, setIsDepartureCollapsed] = useState(false);
    const [isArrivalCollapsed, setIsArrivalCollapsed] = useState(false);
    const [isPassengersCollapsed, setIsPassengersCollapsed] = useState(false);
    const departureTrain = useSelector((state) => state.seats.train.departure);
    const arrivalTrain = useSelector((state) => state.seats.train.arrival);
    const formatDate = (timestamp) =>
        new Date(timestamp * 1000).toLocaleDateString('ru-RU')
    const formatTime = (timestamp) =>
        new Date(timestamp * 1000).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        })
    const seatsPrice = useSelector(selectSeatsPrice);
    const totalPrice = useSelector(selectTotalPrice);
    const formatDuration = (sec) => {
        const hours = Math.floor(sec / 3600);
        const minutes = Math.floor((sec % 3600) / 60);
        return `${hours}:${minutes}`;
    };

    return (
        <aside className="route-details">
            <h3 className="route-details__title">Детали поездки</h3>

            {departureTrain && (
                <div className={`route-block ${isDepartureCollapsed ? 'collapsed' : ''}`}>
                    <div className="details-route-head">
                        <div className="details-route-icon departuretrain"/>
                        <h4 className="head-title">Туда</h4>
                        <p className="head-date">{formatDate(departureTrain.from.datetime)}</p>
                        <button className="collapse-button"
                                onClick={() => setIsDepartureCollapsed(!isDepartureCollapsed)}/>
                    </div>

                    {!isDepartureCollapsed && (
                        <div className="details-route-content">
                            <div className="number">
                                <h4>№ Поезда</h4>
                                <p>{departureTrain.train.name}</p>
                            </div>
                            <div className="title">
                                <h4>Название</h4>
                                <div className="details-route_city">
                                    <p>{departureTrain.from.city.name}</p>
                                    <p>{departureTrain.to.city.name}</p>
                                </div>
                            </div>
                            <div className="details-route-time">
                                <div className="durationText">{formatDuration(departureTrain.duration)}</div>
                                <div className="time-box to">
                                    <p className="itemTime">{formatTime(departureTrain.from.datetime)}</p>
                                    <p className="itemTime">{formatTime(departureTrain.to.datetime)}</p>
                                </div>
                                <div className="direction-dates">
                                    <p className="date">{formatDate(departureTrain.from.datetime)}</p>
                                    <p className="date">{formatDate(departureTrain.to.datetime)}</p>
                                </div>
                                <div className="direction-names">
                                    <h5 className="there-direction-from">{departureTrain.from.city.name}</h5>
                                    <h5 className="there-direction-to">{departureTrain.to.city.name}</h5>
                                </div>
                                <div className="stations-names">
                                    <h5 className="there-direction-from">{departureTrain.from.railway_station_name} вокзал</h5>
                                    <h5 className="there-direction-to">{departureTrain.to.railway_station_name} вокзал</h5>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {arrivalTrain && (
                <div className={`route-block ${isArrivalCollapsed ? 'collapsed' : ''}`}>
                    <div className="details-route-head">
                        <div className="details-route-icon arrivaltrain"/>
                        <h4 className="head-title">Обратно</h4>
                        <p className="head-date">{formatDate(arrivalTrain.from.datetime)}</p>
                        <button className="collapse-button" onClick={() => setIsArrivalCollapsed(!isArrivalCollapsed)}/>
                    </div>

                    {!isArrivalCollapsed && (
                        <div className="details-route-content">
                            <div className="number">
                                <h4>№ Поезда</h4>
                                <p>{arrivalTrain.train.name}</p>
                            </div>
                            <div className="title">
                                <h4>Название</h4>
                                <div className="details-route_city">
                                    <p>{arrivalTrain.from.city.name} </p>
                                    <p>{arrivalTrain.to.city.name}</p>
                                </div>
                            </div>
                            <div className="details-route-time">
                                <div className="durationText">{formatDuration(departureTrain.duration)}</div>
                                <div className="time-box back">
                                    <p className="itemTime">{formatTime(arrivalTrain.from.datetime)}</p>
                                    <p className="itemTime">{formatTime(arrivalTrain.to.datetime)}</p>
                                </div>
                                <div className="direction-dates">
                                    <p className="date">{formatDate(arrivalTrain.from.datetime)}</p>
                                    <p className="date">{formatDate(arrivalTrain.to.datetime)}</p>
                                </div>
                                <div className="direction-names">
                                    <h5 className="there-direction-from">{arrivalTrain.from.city.name}</h5>
                                    <h5 className="there-direction-to">{arrivalTrain.to.city.name}</h5>
                                </div>
                                <div className="stations-names">
                                    <h5 className="there-direction-from">{arrivalTrain.from.railway_station_name} вокзал</h5>
                                    <h5 className="there-direction-to">{arrivalTrain.to.railway_station_name} вокзал</h5>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className={`widget-details-pass ${isPassengersCollapsed ? 'collapsed' : ''}`}>
                <div className="pass-head">
                    <div className="head-img person"/>
                    <h4 className="head-title">Пассажиры</h4>
                    <button className="collapse-button"
                            onClick={() => setIsPassengersCollapsed(!isPassengersCollapsed)}/>
                </div>

                {!isPassengersCollapsed && (
                    <>
                        {passengersCount.adult > 0 && (
                            <div className="pass-age-price">
                                <p className="age-count">{passengersCount.adult} взрослых</p>
                                <div className="price">
                                    <p>{seatsPrice.departureAdults + seatsPrice.arrivalAdults}</p>
                                    <div className="currency-icon small"/>
                                </div>
                            </div>
                        )}
                        {passengersCount.child > 0 && (
                            <div className="pass-age-price">
                                <p className="age-count">{passengersCount.child} детских</p>
                                <div className="price">
                                    <p>{seatsPrice.departureChildren + seatsPrice.arrivalChildren}</p>
                                    <div className="currency-icon small"/>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="widget-details-total">
                <h4 className="total-title">ИТОГ</h4>
                <div className="total">
                    <p className="total-price">{totalPrice.toFixed(2)}</p>
                    <div className="currency-icon large"/>
                </div>
            </div>
        </aside>

    )
}