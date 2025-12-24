import React from 'react';
import wifiIcon from '../../../assets/img/Wifi.svg';
import teaIcon from '../../../assets/img/TeaCup.png';
import expressIcon from '../../../assets/img/Express.svg';

export default function LastTicket({ ticket }) {
    return (
        <div className="ticket-preview">
            <div className="ticket-preview__header">
                <div className="ticket-preview__from">
                    <h4 className="ticket-preview__city">
                        {ticket.departure.from.city.name}
                    </h4>
                    <span className="ticket-preview__station">
                        {ticket.departure.from.railway_station_name} вокзал
                    </span>
                </div>
                <div className="ticket-preview__to">
                    <h4 className="ticket-preview__city">
                        {ticket.departure.to.city.name}
                    </h4>
                    <span className="ticket-preview__station">
                        {ticket.departure.to.railway_station_name} вокзал
                    </span>
                </div>
            </div>
            <div className="ticket-preview__body">
                <div className="ticket-preview__features">
                    {ticket.departure.have_wifi && (
                        <img src={wifiIcon} alt="Wi-Fi" className="ticket-preview__icon"/>
                    )}
                    {ticket.departure.have_service && (
                        <img src={teaIcon} alt="Сервис" className="ticket-preview__icon"/>
                    )}
                    {ticket.departure.is_express && (
                        <img src={expressIcon} alt="Экспресс" className="ticket-preview__icon"/>
                    )}
                </div>
                <div className="ticket-preview__price">
                    <p className="ticket-preview__price-label">от</p>
                    <h4 className="ticket-preview__price-value">
                        {ticket.departure.min_price.toLocaleString('ru-RU')}
                    </h4>
                    <div className="ticket-preview__currency"></div>
                </div>
            </div>
        </div>
    );
}
