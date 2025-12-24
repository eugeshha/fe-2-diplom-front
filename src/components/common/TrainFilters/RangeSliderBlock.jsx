import { useState, useEffect, useRef } from 'react'
import './TrainFilters.css'

export default function RangeSliderBlock({
                                             title,
                                             subtitleFrom = 'от',
                                             value = [0, 24],
                                             min = 0,
                                             max = 24,
                                             step = 1,
                                             onChange,
                                             position = 'left',
                                             isTime = false,
                                             className=''
                                         }) {
    const [range, setRange] = useState(value)
    const timeoutRef = useRef(null)

    useEffect(() => {
        setRange(value)
    }, [value])

    const handleChange = (val, index) => {
        const newRange = [...range]
        newRange[index] = Number(val)

        if (newRange[0] > newRange[1]) {
            newRange[1 - index] = newRange[index]
        }

        setRange(newRange)

        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            onChange(newRange)
        }, 300)
    }

    const getPercent = (val) => ((val - min) / (max - min)) * 100

    return (
        <div className={`range-slider-block ${className || ''}`}>
            {title && <h4 className="range-slider-block__title">{title}</h4>}

            <div className="range-slider-block__section">
                <div className="price-filter__labels">
                    <span className={`range-slider-block__label ${position === 'right' ? 'align-right' : ''}`}>
                        {subtitleFrom}
                    </span>
                </div>

                <div className="price-filter__slider">
                    <div className={`slider-track ${isTime ? 'time' : ''}`}>
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
                        step={step}
                        value={range[0]}
                        onChange={(e) => handleChange(e.target.value, 0)}
                        className="thumb"
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={range[1]}
                        onChange={(e) => handleChange(e.target.value, 1)}
                        className="thumb"
                    />

                    <div
                        className={`thumb-label ${range[0] !== min ? 'visible' : ''}`}
                        style={{left: `${getPercent(range[0])}%`}}
                    >
                        {String(range[0]).padStart(2, '0') + ':00'}
                    </div>

                    <div
                        className={`thumb-label ${range[1] !== max ? 'visible' : ''}`}
                        style={{left: `${getPercent(range[1])}%`}}
                    >
                        {String(range[1]).padStart(2, '0') + ':00'}
                    </div>
                </div>

                <div className="price-filter__limits">
                    <span>{String(min).padStart(2, '0') + ':00'}</span>
                    <span>{String(max).padStart(2, '0') + ':00'}</span>
                </div>
            </div>
        </div>
    )
}

