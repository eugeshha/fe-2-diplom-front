import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    serviceItemSelect,
    serviceItemUnSelect,
} from '../../../store/seatsSlice';
import {ExtraServices} from "../../common/ExtraServices";

export default function Services({ coach, direction }) {
    const dispatch = useDispatch();
    const services = useSelector((state) => state.seats.selectedSeats[direction].services);
    const coach_has_wifi = coach.have_wifi;
    const coach_has_air_conditioning = coach.have_air_conditioning;
    const linens_always_included = coach.is_linens_included;

    const handleClick = (service) => {
        const isSelected = services[coach._id]?.includes(service);
        if (isSelected) {
            dispatch(serviceItemUnSelect({ coach_id: coach._id, service, direction }));
        } else {
            dispatch(serviceItemSelect({ coach_id: coach._id, service, direction }));
        }
    };

    return (
        <div className="coach-services">
            {coach_has_air_conditioning && (
                <div className="tooltip">
                <button className="service air__item service-active air__item-active" />
                <span className="tooltip-text">Кондиционер</span>
                </div>
            )}
            {coach_has_wifi && (
                <div className="tooltip">
                    <button
                        className={`service wifi__item ${
                            services[coach._id]?.includes(ExtraServices.Wifi) ? 'service-active wifi__item-active' : ''
                        }`}
                        onClick={() => handleClick(ExtraServices.Wifi)}
                    />
                    <span className="tooltip-text">Wi-fi</span>
                </div>

            )}
            {coach.linens_price !== 0 && (
                <div className="tooltip">
                    <button
                        className={`service linens__item ${
                            services[coach._id]?.includes(ExtraServices.Linens) ? 'service-active linens__item-active' : ''
                        }`}
                        onClick={() => handleClick(ExtraServices.Linens)}
                        disabled={linens_always_included}
                    />
                    <span className="tooltip-text">Постельное белье</span>
                </div>

            )}
            <div className="tooltip">
                <button
                    className={`service food__item ${
                        services[coach._id]?.includes(ExtraServices.Food) ? 'service-active food__item-active' : ''
                    }`}
                    onClick={() => handleClick(ExtraServices.Food)}
                />
                <span className="tooltip-text">Питание на борту</span>
            </div>

        </div>
    );
}
