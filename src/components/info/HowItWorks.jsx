import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
    return (
        <section className="how-it-works" id="how-it-works">
            <div className="how-it-works__container">
                <div className="how-it-works__header">
                    <h2 className="how-it-works__title">Как это работает</h2>
                    <button className="how-it-works__btn">Узнать больше</button>
                </div>

                <div className="how-it-works__content">
                    <div className="how-it-works__item">
                        <div className="how-it-works__icon icon1" />
                        <p className="how-it-works__text">Удобный заказ на сайте</p>
                    </div>

                    <div className="how-it-works__item">
                        <div className="how-it-works__icon icon2" />
                        <p className="how-it-works__text">Нет необходимости ехать в офис</p>
                    </div>

                    <div className="how-it-works__item">
                        <div className="how-it-works__icon icon3" />
                        <p className="how-it-works__text">Огромный выбор направлений</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
