// import { useState, useEffect } from "react";
// import "./TrainFilters.css";
//
// export default function PriceFilter({ min, max, onChange }) {
//     const [range, setRange] = useState([min, max]);
//
//     useEffect(() => {
//         setRange([min, max]);
//     }, [min, max]);
//
//     const handleChange = (e, index) => {
//         const newRange = [...range];
//         newRange[index] = +e.target.value;
//         setRange(newRange);
//         onChange(newRange);
//     };
//
//     return (
//         <div className="price-filter">
//             <h4>Цена</h4>
//             <div className="price-inputs">
//                 <input
//                     type="number"
//                     value={range[0]}
//                     onChange={(e) => handleChange(e, 0)}
//                     min={0}
//                 />
//                 <span>–</span>
//                 <input
//                     type="number"
//                     value={range[1]}
//                     onChange={(e) => handleChange(e, 1)}
//                     min={0}
//                 />
//             </div>
//         </div>
//     );
// }
import { useState, useEffect, useRef } from "react";
import "./TrainFilters.css";

export default function PriceFilter({ min, max, onChange }) {
    const [range, setRange] = useState([min, max]);
    const debounceTimeout = useRef(null);

    useEffect(() => {
        setRange([min, max]);
    }, [min, max]);

    const handleChange = (value, index) => {
        const newRange = [...range];
        newRange[index] = Number(value);

        if (newRange[0] > newRange[1]) {
            newRange[1 - index] = newRange[index];
        }

        setRange(newRange);

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
            onChange(newRange);
        }, 300);
    };

    const getPercent = (value) => ((value - min) / (max - min)) * 100;

    return (
        <div className="price-filter">
            <h4 className="price-filter__title">Стоимость</h4>

            <div className="price-filter__labels">
                <span>от</span>
                <span>до</span>
            </div>

            <div className="price-filter__slider">
                <div className="slider-track">
                    <div
                        className="slider-range"
                        style={{
                            left: `${getPercent(range[0])}%`,
                            width: `${getPercent(range[1]) - getPercent(range[0])}%`,
                        }}
                    />
                </div>

                <input
                    type="range"
                    min={min}
                    max={max}
                    value={range[0]}
                    onChange={(e) => handleChange(e.target.value, 0)}
                    className="thumb thumb-left"
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={range[1]}
                    onChange={(e) => handleChange(e.target.value, 1)}
                    className="thumb thumb-right"
                />

                <div
                    className={`thumb-label ${range[0] !== min ? 'visible' : ''}`}
                    style={{ left: `${getPercent(range[0])}%` }}
                >
                    {range[0]}
                </div>

                <div
                    className={`thumb-label ${range[1] !== max ? 'visible' : ''}`}
                    style={{ left: `${getPercent(range[1])}%` }}
                >
                    {range[1]}
                </div>
            </div>

            <div className="price-filter__limits">
                <span>{min}</span>
                <span>{max}</span>
            </div>
        </div>
    );
}


