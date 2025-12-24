import React, { useState } from 'react';
import RouteDetails from '../components/common/RouteDetails'
import '../App.css'
import PaymentForm from "../components/forms/PaymentForm";
import { useNavigate } from 'react-router-dom';
import {resetOrder} from "../store/orderSlice";
import {useDispatch} from "react-redux";
import ErrorPopup from "../components/common/ErrorPopup";


const Payment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isFormValid, setIsFormValid] = useState(false);
    const [formError, setFormError] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [popupText, setPopupText] = useState('');

    const handleBuyClick = () => {
        dispatch(resetOrder());
        navigate('/confirmation');
    };



    return (
        <div>
            <main className="page-container">
                <aside className="sidebar">
                    <RouteDetails/>
                </aside>
                <section className="main-section">
                    <PaymentForm
                        onValidationChange={(isValid, error) => {
                            setIsFormValid(isValid);
                            setFormError(error);
                        }}
                    />
                    <div className="payment-buy seats_buttons">
                        <button
                            className="seats_button"
                            onClick={() => {
                                if (!isFormValid) {
                                    setPopupText(formError);
                                    setShowPopup(true);
                                    return;
                                }
                                handleBuyClick();
                            }}
                        >
                            Купить билеты
                        </button>
                    </div>

                    {showPopup && (
                        <ErrorPopup
                            text={popupText}
                            onClose={() => setShowPopup(false)}
                        />
                    )}
                </section>

            </main>
        </div>
    );
};

export default Payment;