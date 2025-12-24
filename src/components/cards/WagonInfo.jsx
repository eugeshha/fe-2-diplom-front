import React from 'react'
import './WagonInfo.css'

export default function WagonInfo({ coach }) {
    if (!coach) return null

    const displayOption = (title, isIncluded, className) => (
        <li
            data-title={title}
            className={
                isIncluded
                    ? `facilities-vector ${className} ${className}-included`
                    : `facilities-vector ${className}`
            }
        ></li>
    )

    return (
        <div className="wagon-info">
            <div className="wagon-info__number">
                <p className="wagon-info__number-digit">{coach.name.slice(-2)}</p>
                <p>вагон</p>
            </div>

            <div className="wagon-info__description">
                <div className="wagon-info__section">
                    <h3>Места</h3>
                    <p className="available-seats">{coach.available_seats}</p>
                </div>

                <div className="wagon-info__section">
                    <h3>Стоимость</h3>
                    {['side', 'top', 'bottom'].map((type) =>
                        coach[`${type}_price`] > 0 ? (
                            <p key={type}>
                                {coach[`${type}_price`]} ₽ ({{
                                side: 'боковые',
                                top: 'верхние',
                                bottom: 'нижние'
                            }[type]})
                            </p>
                        ) : null
                    )}
                </div>

                <div className="wagon-info__section">
                    <h3>Обслуживание</h3>
                    <ul className="facilities-list">
                        {displayOption('Кондиционер', coach.have_air_conditioning, 'conditioner')}
                        {displayOption('Wi-Fi', coach.have_wifi, 'wifi')}
                        {displayOption('Белье', coach.is_linens_included, 'linens')}
                        {displayOption('Питание', coach.is_linens_included, 'food')}
                    </ul>
                </div>
            </div>
        </div>
    )
}
