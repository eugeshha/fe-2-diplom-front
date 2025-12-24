import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import FiltersDatePickers from './FiltersDatePickers'
import TrainOptionsBlock from './TrainOptionsBlock'
import RangeSliderBlock from './RangeSliderBlock'
import PriceFilter from './PriceFilter';


import './TrainFilters.css'
import iconTo from '../../../assets/img/subtract.png'
import iconBack from '../../../assets/img/subtract-back.png'
import collapseIcon from '../../../assets/img/collapse.svg'
import collapseStartIcon from '../../../assets/img/collapse_start.svg'
import {setDateEnd, setDateStart} from "../../../store/searchSlice";
import {setEndTimes, setOption, setPriceRange, setStartTimes} from "../../../store/filtersSlice";
import {resetPage} from "../../../store/searchResultSlice";

export default function TrainFilters() {
    const dispatch = useDispatch()
    const filters = useSelector((state) => state.filters)
    const search = useSelector((state) => state.search)

    const [collapsed, setCollapsed] = useState({ to: false, back: false })

    return (
        <div className="trains-filters">
            <div className="trains-filters__dates">
                <FiltersDatePickers
                    dateStart={search.dateStart}
                    dateEnd={search.dateEnd}
                    onChangeStart={(val) =>  {
                        dispatch(setDateStart(val));
                        dispatch(resetPage());
                    }}
                    onChangeEnd={(val) => {
                        dispatch(setDateEnd(val));
                        dispatch(resetPage());
                    }}
                />
            </div>

            <div className="trains-filters__options">
                <TrainOptionsBlock
                    values={filters.options}
                    onChange={(name, value) => {
                        dispatch(setOption({name, value}));
                        dispatch(resetPage());
                    }}
                />
            </div>

            <div className="trains-filters__price">
                <PriceFilter
                    min={0}
                    max={10000}
                    onChange={(val) => {
                        dispatch(setPriceRange(val));
                        dispatch(resetPage());
                    }}
                />
            </div>

            <div className="trains-filters__times-wrapper">
                <div className="trains-filters__times-block">
                    <div className="range-slider-block__header">
                        <img src={iconTo} alt="icon to" className="range-slider-block__icon"/>
                        <h3 className="range-slider-block__title">Туда</h3>
                        <img
                            src={collapsed.to ? collapseStartIcon : collapseIcon}
                            alt="collapse"
                            className="range-slider-block__collapse"
                            onClick={() => setCollapsed(prev => ({...prev, to: !prev.to}))}
                        />
                    </div>

                    {!collapsed.to && (
                        <>
                            <RangeSliderBlock
                                subtitleFrom="Время отбытия"
                                className="departure"
                                position="left"
                                value={filters.startTimes.departure}
                                onChange={(val) => {
                                    dispatch(setStartTimes({...filters.startTimes, departure: val}));
                                    dispatch(resetPage());
                                }}
                                min={0}
                                max={24}
                                step={1}
                                isTime={true}
                            />
                            <RangeSliderBlock
                                subtitleFrom="Время прибытия"
                                position="right"
                                value={filters.startTimes.arrival}
                                onChange={(val) => {
                                    dispatch(setStartTimes({...filters.startTimes, arrival: val}))
                                    dispatch(resetPage());
                                }}
                                min={0}
                                max={24}
                                step={1}
                                isTime={true}
                            />
                        </>
                    )}
                </div>

                <div className="trains-filters__times-block">
                    <div className="range-slider-block__header">
                        <img src={iconBack} alt="icon back" className="range-slider-block__icon"/>
                        <h3 className="range-slider-block__title">Обратно</h3>
                        <img
                            src={collapsed.back ? collapseStartIcon : collapseIcon}
                            alt="collapse"
                            className="range-slider-block__collapse"
                            onClick={() => setCollapsed(prev => ({...prev, back: !prev.back}))}
                        />
                    </div>

                    {!collapsed.back && (
                        <>
                            <RangeSliderBlock
                                subtitleFrom="Время отбытия"
                                className="departure"
                                position="left"
                                value={filters.endTimes.departure}
                                onChange={(val) =>
                                    dispatch(setEndTimes({...filters.endTimes, departure: val}))
                                }
                                min={0}
                                max={24}
                                step={1}
                                isTime={true}
                            />
                            <RangeSliderBlock
                                subtitleFrom="Время прибытия"
                                position="right"
                                value={filters.endTimes.arrival}
                                onChange={(val) =>
                                    dispatch(setEndTimes({...filters.endTimes, arrival: val}))
                                }
                                min={0}
                                max={24}
                                step={1}
                                isTime={true}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
