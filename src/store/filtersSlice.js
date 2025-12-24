import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    priceFrom: 0,
    priceTo: 10000,
    options: {
        have_first_class: false,
        have_second_class: false,
        have_third_class: false,
        have_fourth_class: false,
        have_wifi: false,
        have_air_conditioning: false,
    },
    startTimes: {
        departure: [0, 24],
        arrival: [0, 24],
    },
    endTimes: {
        departure: [0, 24],
        arrival: [0, 24],
    }
};


const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        resetFilters: (state, action) => {
            Object.assign(state, initialState);
        },
        setPriceRange: (state, action) => {
            const [from, to] = action.payload
            state.priceFrom = from
            state.priceTo = to
        },
        setOption: (state, action) => {
            const { name, value } = action.payload
            state.options[name] = value
        },
        setStartTimes: (state, action) => {
            state.startTimes = action.payload
        },
        setEndTimes: (state, action) => {
            state.endTimes = action.payload
        }
    }
})

export const {
    resetFilters,
    setPriceRange,
    setOption,
    setStartTimes,
    setEndTimes,
} = filtersSlice.actions

export default filtersSlice.reducer
