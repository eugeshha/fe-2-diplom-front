import React from "react";
import calendarIcon from "../../../assets/img/Calender.svg";

export default function FiltersDatePickers({
                                               dateStart,
                                               dateEnd,
                                               onChangeStart,
                                               onChangeEnd,
                                           }) {
    return (
        <div className="filters-date-pickers">
            <label className="trains-filters__date-title">Дата поездки</label>
            <div className="trains-filters__date-container">
                <input
                    type="date"
                    value={dateStart}
                    onChange={(e) => onChangeStart(e.target.value)}
                    className="trains-filters__datepicker"
                />
                <img src={calendarIcon} alt="calendar" className="calendar-icon" />
            </div>

            <label className="trains-filters__date-title">Дата возвращения</label>
            <div className="trains-filters__date-container">
                <input
                    type="date"
                    value={dateEnd}
                    onChange={(e) => onChangeEnd(e.target.value)}
                    className="trains-filters__datepicker"
                />
                <img src={calendarIcon} alt="calendar" className="calendar-icon" />
            </div>
        </div>
    );
}
