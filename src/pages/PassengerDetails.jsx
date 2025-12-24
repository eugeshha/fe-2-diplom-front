import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import RouteDetails from '../components/common/RouteDetails'
import PassengerCard from '../components/cards/PassengerCard'
import PlusIcon from '../assets/img/plus.svg';
import '../App.css'
import { useNavigate } from 'react-router-dom'
import {setInitialPassengers, removePassenger, canAddPassenger} from '../store/passengersSlice';
import {PassengerType} from "../components/common/PassengerType";
import {PassengerGender} from "../components/common/PassengerGender";
import {DocumentType} from "../components/common/DocumentType";

export default function PassengerDetails() {
    const dispatch = useDispatch()
    const handleDelete = (id) => {
        dispatch(removePassenger(id));
    };
    const canAddPassengerLocal = useSelector(canAddPassenger);

    const handleAddPassenger = () => {
        if (!canAddPassengerLocal) return;
        const newPassenger = {
            id: nanoid(),
            passengerType: PassengerType.Adult,
            surname: '',
            name: '',
            patronymic: '',
            gender: PassengerGender.Unknown,
            birthDate: '',
            isLimitedMobility: false,
            passportSeries: '',
            passportNumber: '',
            birthCertNumber: '',
            otherDocumentNumber: "",
            documentType: DocumentType.Other
        };

        dispatch(setInitialPassengers([...passengers, newPassenger]));
    };
    const passengerRefs = useRef([]);
    const count = useSelector((state) => state.passengers.passengersCount)
    const passengers = useSelector((state) => state.passengers.passengers)
    const [validationResults, setValidationResults] = useState({});
    const updateValidation = (passengerId, isValid, error = '') => {
        setValidationResults((prev) => ({
            ...prev,
            [passengerId]: { isValid, error },
        }));
    };
    const navigate = useNavigate();

    const handleClick = () => {
        const totalPassengers = passengers.length;
        const validatedCount = Object.keys(validationResults).length;

        if (validatedCount < totalPassengers) {
            alert("Пожалуйста, подтвердите данные всех пассажиров");
            return;
        }

        const allValid = Object.values(validationResults).every((res) => res?.isValid === true);

        if (!allValid) {
            alert("Некоторые пассажиры заполнены с ошибками");
            return;
        }

        navigate("/payment");
    };
    const scrollToPassenger = (index) => {
        const nextEl = passengerRefs.current[index];
        if (nextEl) {
            nextEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            nextEl.focus?.();
        }
    };

    useEffect(() => {
        if (passengers.length === 0 && count) {
            const { adult = 0, child = 0 } = count
            const total = adult + child

            const initialPassengers = Array.from({ length: total }, (_, i) => ({
                id: nanoid(),
                passengerType: i < adult ? PassengerType.Adult : PassengerType.Child,
                surname: ["Дюнова", "Дюнчикова", "Ретриверная", "Дюненко", "Люмчиков" ][i % 5],
                name: ["Дюна", "Джойка", "Одичка", "Луна", "Кубик" ][i % 5],
                patronymic: ["Дюновна", "Джоевна", "Кубиковна", "Стефановна", "Косовна" ][i % 5],
                gender: [PassengerGender.Female, PassengerGender.Male][i % 2],
                birthDate: ["2001-01-31", "2002-02-28", "2003-03-31", "2004-04-30", "2005-05-31"][i%5],
                isLimitedMobility: false,
                passportSeries: ["1234", "5678", "9012", "3456", "7890"][i%5],
                passportNumber: ["123456", "234567", "345678", "456789", "567890"][i%5],
                birthCertNumber: ["I-ЫП-123456", "II-ЫП-123456", "III-ЫП-123456", "IV-ЫП-123456", "V-ЫП-123456"][i%5],
                otherDocumentNumber: "",
                documentType: i < adult ? DocumentType.Passport : DocumentType.BirthCertificate
            }))

            dispatch(setInitialPassengers(initialPassengers))
        }
    }, [dispatch, passengers.length, count])

    return (
        <div className="page-container">
            <aside className="sidebar">
                <RouteDetails />
            </aside>

            <section className="main-section">
                {passengers.map((passenger, i) => (
                    <PassengerCard
                        key={passenger.id}
                        data={passenger}
                        number={i + 1}
                        updateValidation={updateValidation}
                        validationResults={validationResults}
                        ref={(el) => (passengerRefs.current[i] = el)}
                        scrollToNext={() => scrollToPassenger(i + 1)}
                        onDelete={() => handleDelete(passenger.id)}
                    />
                ))}
                <div className="add-passenger" onClick={handleAddPassenger}>
                    <span className="add-passenger__text">Добавить пассажира</span>
                    <img src={PlusIcon} alt="+" className="add-passenger__icon"/>
                </div>
                <div className="seats_buttons further-button">
                    <button
                        type="button"
                        className="button seats_button"
                        onClick={handleClick}
                    >
                        Далее
                    </button>
                </div>


            </section>
        </div>
    )
}
