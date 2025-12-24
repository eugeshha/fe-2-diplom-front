import React, {useState, useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    coachClassChange, coachSelect, resetSeats, resetTrain,
} from '../../../store/seatsSlice';
import { passengersCountChange } from '../../../store/passengersSlice';
import Loading from '../../common/Loading';
import TicketHeader from './TicketHeader';
import TrainInfo from './TrainInfo';
import PassengerTabs from './PassengerTabs';
import { useNavigate } from 'react-router-dom';
import './TicketCard.css';
import CoachTypeSelector from "./CoachTypeSelector";
import CoachDetails from "./CoachDetails";

export default function TicketCard({train, coachesList, direction }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const seatState = useSelector((state) => state.seats.selectedSeats[direction]);
    const [activeTab, setActiveTab] = useState('adult');
    const passengerCount = useSelector((state) => state.passengers.passengersCount);
    const coachClass = seatState?.selectedCoachClass;
    const coachesOfSelectedClass = seatState?.coachesOfSelectedClass;
    const selectedCoachId = seatState?.selectedCoachId;
    const selectedCoach = coachesList ? coachesList.find(c => c.coach._id === selectedCoachId) : null;
    const availableClasses = {
        fourth: train.have_fourth_class,
        third: train.have_third_class,
        second: train.have_second_class,
        first: train.have_first_class,
    };

    const handleCoachClassChange = useCallback((type) => {
        const coachesOfSelectedClass = coachesList.filter((el) => el.coach.class_type === type);
        dispatch(coachClassChange({
            coachClass: type,
            coachesOfSelectedClass: coachesOfSelectedClass,
            type: direction }));
    }, [coachesList, direction, dispatch]);

    const handleCoachToggle = useCallback((id) => {
        dispatch(coachSelect({ id, type: direction }))
    }, [direction, dispatch]);

    const handleSelectAnotherTrain = () => {
        dispatch(resetSeats())
        dispatch(resetTrain())
        navigate("/search");
    }

    useEffect(() => {
        if (!coachClass && coachesList.length > 0) {
            const classOfTheFirstCoach = coachesList[0].coach.class_type;
            handleCoachClassChange(classOfTheFirstCoach);
        }
    }, [coachClass, coachesList, direction, dispatch, handleCoachClassChange])

    useEffect(() => {
        if (coachesOfSelectedClass.length > 0 && (!selectedCoach || selectedCoach.coach.class_type !== coachClass)) {
            handleCoachToggle(coachesOfSelectedClass[0].coach._id)
        }
    }, [coachClass, selectedCoach, coachesOfSelectedClass, direction, dispatch, handleCoachToggle]);

    if (!coachesList || !train) {
        return <Loading />;
    }

    return (
        <div className="ticket-card">
            <TicketHeader type={direction} onSelectAnotherTrain={handleSelectAnotherTrain}/>
            <TrainInfo route={train} direction={direction}/>
            <PassengerTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                counts={passengerCount}
                onCountChange={(type, value) => {
                    if (value !== '') {
                        dispatch(passengersCountChange({type, count: value}));
                    }
                }}
            />

            <div className="seat-carriage-type">
                <h3 className="ticket-section-title">Тип вагона</h3>
                <CoachTypeSelector
                    selectedType={coachClass}
                    onSelect={handleCoachClassChange}
                    availability={availableClasses}
                />
            </div>


            {coachesOfSelectedClass.length > 0 && (
                <div className="ticket-card__wagon-placeholder">
                    <div className="ticket-card__wagon-numbers">
                        <div className="wagon-numbers__left">
                            <div className="wagon-numbers__title">Вагоны</div>

                            <div className="wagon-numbers__buttons">
                                {coachesOfSelectedClass.map((el) => (
                                    <button
                                        key={el.coach._id}
                                        className={`carriage-button ${el.coach._id === selectedCoachId ? 'active' : ''}`}
                                        onClick={() => handleCoachToggle(el.coach._id)}
                                    >
                                        <div className="number-current">{el.coach.name.replace(/\D/g, '')}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="wagon-numbers__note">
                            Нумерация вагонов начинается с головы поезда
                        </div>
                    </div>

                    {selectedCoach && (
                        <CoachDetails
                            key={selectedCoach.coach.name}
                            selectedCoach={selectedCoach}
                            direction={direction}
                        />
                    )}
                </div>
            )}
        </div>
    );
}