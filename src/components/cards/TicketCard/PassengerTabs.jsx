import './TicketCard.css'
import {PassengerType} from "../../common/PassengerType";
import {useSelector} from "react-redux";

const MAX_ADULTS   = 5;
const MAX_CHILDREN = 5;
const BABYS_PER_ADULT = 3;

export default function PassengerTabs({ activeTab, onTabChange, counts, onCountChange }) {
    const { adult, child, baby } = useSelector((state) => state.passengers.passengersCount);

    const departureSeats = useSelector((state) => state.seats.selectedSeats.departure.seats);
    const arrivalSeats = useSelector((state) => state.seats.selectedSeats.arrival.seats);
    const seatsCount = adult + child;

    const lockSeats = departureSeats.length >= seatsCount || arrivalSeats.length >= seatsCount || seatsCount === 1;
    const maxBabys = adult * BABYS_PER_ADULT;

    if (baby > maxBabys)
        onCountChange(PassengerType.Baby, maxBabys)


    const tabs = [
        { key: PassengerType.Adult, label: 'Взрослых', max: MAX_ADULTS, min: lockSeats ? adult : 0 },
        { key: PassengerType.Child, label: 'Детских', max: MAX_CHILDREN, min: lockSeats ? child : 0 },
        { key: PassengerType.Baby, label: 'Детских «без места»', max: maxBabys, min: 0 },
    ]

    const extraAdults = MAX_ADULTS - adult;
    const extraChildren = MAX_CHILDREN - child;

    const descriptions = {
        adult: extraAdults > 0 ? 'Можно добавить еще ' + extraAdults + ' пассажиров' : "",
        child: extraChildren > 0 ?
            'Можно добавить еще ' + extraChildren + ' детей до 10 лет. Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%' : "",
        baby: 'Без предоставления места',
    };

    return (
        <div className="ticket-ages-tabs">
            {tabs.map((tab) => (
                <div
                    key={tab.key}
                    className={`age-tab ${activeTab === tab.key ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.key)}
                >
                    <div className="age-tab__input-wrapper">
                        <div className="age-tab__fake-input">
                            <span className="age-tab__prefix">{tab.label} — </span>
                            <input
                                type="number"
                                value={counts[tab.key] ?? 0}
                                onChange={(e) => onCountChange(tab.key, Number(e.target.value))}
                                min={tab.min}
                                max={tab.max}
                                className="age-tab__number"
                            />
                        </div>
                        <p className="input-desc">{descriptions[tab.key]}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
