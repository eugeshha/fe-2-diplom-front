import './TicketCard.css';

const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
};

const formatDuration = (sec) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    return `${hours} ч ${minutes} мин`;
};

export default function TrainInfo({ route, direction }) {
    if (!route || !route.train || !route.from || !route.to) return null;

    const arrowIcon = direction === 'departure'
        ? '/assets/img/train-arrow.png'
        : '/assets/img/train-arrow-back.png';

    return (
        <div className="ticket-card__train-info">
            <div className="ticket-card__aside">
                <div className="ticket-card__aside-icon" />
                <div className="ticket-card__aside-title">
                    <div className="desc-name">{route.train.name}</div>
                    <div className="desc-city">{route.from.city.name} → {route.to.city.name}</div>
                </div>
            </div>

            <div className="ticket-card__route">
                <div className="route-info">
                    <div className="time">{formatTime(route.from.datetime)}</div>
                    <div className="desc-city">{route.from.city.name}</div>
                    <div className="station">{route.from.railway_station_name} вокзал</div>
                </div>

                <div
                    className="direction-arrow"
                    style={{ backgroundImage: `url(${arrowIcon})` }}
                />

                <div className="route-info">
                    <div className="time">{formatTime(route.to.datetime)}</div>
                    <div className="desc-city">{route.to.city.name}</div>
                    <div className="station">{route.to.railway_station_name} вокзал</div>
                </div>
            </div>

            <div className="ticket-card__duration">
                <div className="duration-img" />
                <div className="duration-text">{formatDuration(route.duration)}</div>
            </div>
        </div>
    );
}
