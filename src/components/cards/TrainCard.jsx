import React, {useEffect} from 'react';
import './TrainCard.css';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchArrivalSeats, fetchDepartureSeats, resetSeats, setTrain} from '../../store/seatsSlice';
import Loading from "../common/Loading";

const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
};

const formatDuration = (sec) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    return `${hours} ч ${minutes} мин`
};

export default function TrainCard({ data, availableSeatsInfo, priceInfo, readonly = false, customButton = null }) {
    const dep = data.departure;
    const arr = data.arrival;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const departureSeats = useSelector((state) => state.seats.availableCoaches.departure);
    const arrivalSeats = useSelector((state) => state.seats.availableCoaches.arrival);

    // const handleChange = () => {
    //     navigate('/');
    // };

    const handleSelect = () => {
        dispatch(resetSeats());

        dispatch(setTrain({
            departureTrain: dep,
            arrivalTrain: arr,
            seatsInfo: data.available_seats_info,
            priceInfo: { departure: dep.price_info, arrival: arr?.price_info }
        }));
        dispatch(fetchDepartureSeats(dep._id));
        dispatch(fetchArrivalSeats(arr._id));
    };

    useEffect(() => {
        if (!readonly && departureSeats.couchesList && arrivalSeats.couchesList) {
            navigate('/wagon-selection');
        }
    }, [readonly, departureSeats, arrivalSeats, navigate]);

    const seatTypes = [
        { label: 'Сидячий', key: 'fourth', price: 'fourth', count: 'fourth' },
        { label: 'Плацкарт', key: 'third', price: 'third', count: 'third' },
        { label: 'Купе', key: 'second', price: 'second', count: 'second' },
        { label: 'Люкс', key: 'first', price: 'first', count: 'first' },
    ];

    return (
        <div className="train-card">
            <div className="train-card__aside">
                <div className="train-card__number">{dep.train.name}</div>
                <div className="train-card__rote">
                    <div className="train-card__rote-text">{dep.from.city.name}</div>
                    <div>→</div>
                    <div className="train-card__rote-text">{dep.to.city.name}</div>
                </div>
            </div>

            <div className="train-card__main">
                <div className="train-card__directions">
                    {/* Туда */}
                    <div className="train__direction">
                        <div className="train__direction-info">
                            <div className="train__direction-info__time">{formatTime(dep.from.datetime)}</div>
                            <div>{dep.from.city.name}</div>
                            <div className="train__direction-info__railway">{dep.from.railway_station_name}</div>
                        </div>

                        <div className="direction__arrow-time">
                            <div className="direction-arrow to" />
                            <div className="travel-time">{formatDuration(dep.duration)}</div>
                        </div>

                        <div className="train__direction-info">
                            <div className="train__direction-info__time">{formatTime(dep.to.datetime)}</div>
                            <div>{dep.to.city.name}</div>
                            <div className="train__direction-info__railway">{dep.to.railway_station_name}</div>
                        </div>
                    </div>

                    {/* Обратно */}
                    {arr && (
                        <div className="train__direction">
                            <div className="train__direction-info">
                                <div className="train__direction-info__time">{formatTime(arr.from.datetime)}</div>
                                <div>{arr.from.city.name}</div>
                                <div className="train__direction-info__railway">{arr.from.railway_station_name}</div>
                            </div>

                            <div className="direction__arrow-time">
                                <div className="direction-arrow back" />
                                <div className="travel-time">{formatDuration(arr.duration)}</div>
                            </div>

                            <div className="train__direction-info">
                                <div className="train__direction-info__time">{formatTime(arr.to.datetime)}</div>
                                <div>{arr.to.city.name}</div>
                                <div className="train__direction-info__railway">{arr.to.railway_station_name}</div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="train-card__type">

                    {seatTypes.map((type) => {
                        const count = readonly
                            ? availableSeatsInfo?.[type.count]
                            : data.available_seats_info?.[type.count];

                        const price = readonly
                            ? priceInfo?.departure?.[type.price]?.top_price
                            : dep.price_info?.[type.price]?.top_price;

                        if (!count || !price) return null;

                        return (
                            <div key={type.key} className="train-seats__item">
                                <div className="train-seats__type">{type.label}</div>
                                <div className="train-seats__count">{count}</div>
                                <div className="train-seats__price">
                                    <span className="train-seats__price-text">от {price}{readonly ? ' ' : ''}</span>
                                    <span className="train-seats__price-img"/>
                                </div>
                            </div>
                        );
                    })}

                    <div className="train-service__block">
                        {dep.have_wifi && <div className="train-service__item train-service__item-wifi"/>}
                        {dep.have_air_conditioning && (
                            <div className="train-service__item train-service__item-conditioner"/>
                        )}
                        {dep.is_express && <div className="train-service__item train-service__item-express"/>}
                    </div>

                    {!readonly ? (
                        <button className="train-card__btn" onClick={handleSelect}>Выбрать места</button>
                    ) : (
                        customButton
                    )}
                    {!readonly && (departureSeats.queryStatus === 'loading' || arrivalSeats.queryStatus === 'loading') && (
                        <Loading />
                    )}
                </div>
            </div>
        </div>
    );
}