import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import TicketCard from '../components/cards/TicketCard/TicketCard';
import TrainFilters from '../components/common/TrainFilters/TrainFilters';
import LastTickets from '../components/info/LastTickets/LastTickets';
import '../App.css';
import {areAllSeatsSelected} from "../store/allSeatsSelectedSelector";

export default function WagonSelection() {
    const navigate = useNavigate();

    const departureTrain = useSelector((state) => state.seats.train.departure);
    const arrivalTrain = useSelector((state) => state.seats.train.arrival);

    const departureAvailableCoaches = useSelector((state) => state.seats.availableCoaches.departure);
    const arrivalAvailableCoaches = useSelector((state) => state.seats.availableCoaches.arrival);

    const seatsSelected = useSelector(areAllSeatsSelected);

    const handleClick = () => {
        navigate('/passenger-details');
    };

    return (
        <section className="wagon-selection content__block page">
            <div className="page-container">
            <aside className="sidebar">
                <TrainFilters />
                <LastTickets />
            </aside>

            <main className="main-section">
                <h3 className="title seats_title">Выбор мест</h3>

                {departureTrain && <TicketCard train={departureTrain} coachesList={departureAvailableCoaches.couchesList} direction="departure" />}
                {arrivalTrain   && <TicketCard train={arrivalTrain}   coachesList={arrivalAvailableCoaches.couchesList}   direction="arrival" />}

                <div className="seats_buttons">
                    <button
                        type="button"
                        className="button seats_button"
                        onClick={handleClick}
                        disabled={!seatsSelected}
                    >
                        Далее
                    </button>
                </div>
            </main>

            </div>
        </section>
    );
}
