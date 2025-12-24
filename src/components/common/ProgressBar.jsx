import './ProgressBar.css';

const steps = [
    { id: 1, title: 'Билеты' },
    { id: 2, title: 'Пассажиры' },
    { id: 3, title: 'Оплата' },
    { id: 4, title: 'Проверка' },
];

const ProgressBar = ({ step }) => {
    return (
        <ul className="progress-bar">
            {steps.map((elem, index) => {
                const isLast = elem.id === steps.length;
                const isActive = elem.id <= step;

                const baseClass = isLast
                    ? 'progress-bar__item-last-elem'
                    : elem.id === step
                        ? 'progress-bar__item-last-step'
                        : 'progress-bar__item';

                const activeClass = isActive ? `${baseClass}_active` : '';

                return (
                    <li className="progress-bar__elem" key={index}>
                        <div className={`${baseClass} ${activeClass}`}>
                            <span className="progress-bar__step">{elem.id}</span>
                            <p className="progress-bar__name">{elem.title}</p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default ProgressBar;
