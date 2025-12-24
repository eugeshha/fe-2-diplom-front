import React from 'react';
import './AboutUs.css';

export default function AboutUs() {
    return (
        <section className="about-us" id="about">
            <div className="about-us__container">
                <p className="about-us__title col-lg-2">О нас</p>
                <div className="about-us-vertical-line"></div>
                <div className="about-us__text">
                    <p>
                        Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы
                        наблюдаем, как с каждым днем все больше людей заказывают жд
                        билеты через интернет.
                    </p>
                    <p>
                        Сегодня можно заказать железнодорожные билеты онлайн всего в 2
                        клика, но стоит ли это делать? Мы расскажем о преимуществах
                        заказа через интернет.
                    </p>
                    <p className="about-us__text-bold">
                        Покупать жд билеты дешево можно за 90 суток до отправления
                        поезда. Благодаря динамическому ценообразованию цена на билеты в
                        это время самая низкая.
                    </p>
                </div>
            </div>
        </section>
    );
}
