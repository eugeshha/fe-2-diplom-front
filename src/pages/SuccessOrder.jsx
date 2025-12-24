import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectTotalPrice } from '../store/summarySlice';
// import SuccessHeader from '../components/common/SuccessHeader';
import './SuccessOrder.css';

import rubIcon from '../assets/img/Rouble.svg';
import img1 from '../assets/img/success-icon1.svg';
import img2 from '../assets/img/success-icon2.svg';
import img3 from '../assets/img/success-icon3.svg';

const SuccessOrder = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const payer = useSelector((state) => state.payment.personalData);
    const handleStarClick = (index) => {
        setRating(index === rating ? 0 : index); // сброс при повторном клике
    };
    const totalPrice = useSelector(selectTotalPrice);


    return (
        <>
            <main className="success-main">
                <section className="success-block">
                    <div className="success-header">
                        <p className="success-order-number">№ Заказа 285АА</p>
                        <div className="success-sum">
                            <span className="success-sum-text">Сумма</span>
                            <span className="success-sum-value">{totalPrice}</span>
                            <img src={rubIcon} alt="₽" className="success-currency"/>
                        </div>
                    </div>

                    <div className="success-instructions">
                        <div className="success-instruction">
                            <img src={img1} alt="email"/>
                            <p>Билеты будут отправлены на ваш <strong>e-mail</strong></p>
                        </div>
                        <div className="success-instruction">
                            <img src={img2} alt="print"/>
                            <p><strong>Распечатайте</strong> и сохраняйте билеты до поездки</p>
                        </div>
                        <div className="success-instruction">
                            <img src={img3} alt="present"/>
                            <p><strong>Предъявите</strong> распечатанные билеты при посадке</p>
                        </div>
                    </div>

                    <div className="success-status">
                        <h3>{payer.name} {payer.father}!</h3>
                        <p>Ваш заказ успешно оформлен.</p>
                        <p>В ближайшее время с вами свяжется наш оператор для подтверждения.</p>
                        <p className="success-thanks">
                            Благодарим за доверие и желаем приятного путешествия!
                        </p>
                    </div>

                    <div className="success-footer">
                        <div className="success-rating">
                            <span>Оцените сервис</span>

                            <div className="success-stars">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <button
                                        key={i}
                                        className={`star ${i <= rating ? 'check' : ''}`}
                                        onClick={() => handleStarClick(i)}
                                    />
                                ))}
                            </div>
                        </div>
                        <button
                            className="success-button"
                            onClick={() => {
                                navigate('/');
                                window.scrollTo({top: 0, behavior: 'smooth'});
                            }}
                        >
                            Вернуться на главную
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
};

export default SuccessOrder;
