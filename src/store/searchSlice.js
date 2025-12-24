import {createSelector, createSlice} from "@reduxjs/toolkit";

const initialState = {
    fromCityId: "67ceb6548c75f00047c8f78e",
    toCityId: "67ceb6548c75f00047c8f794",
    dateStart: '',
    dateEnd: ''
}

export const areCitiesValid = createSelector(
    state => state.search,
    (search) => {
        return search.fromCityId !== null && search.toCityId !== null;
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchParams: (state, { payload }) => {
            state.fromCityId = payload.fromCityId;
            state.toCityId = payload.toCityId;
            state.dateStart = payload.dateStart;
            state.dateEnd = payload.dateEnd;
        },
        setFromCityId: (state, action) => {
            state.fromCityId = action.payload
        },
        setToCityId: (state, action) => {
            state.toCityId = action.payload
        },
        setDateStart: (state, action) => {
            state.dateStart = action.payload
        },
        setDateEnd: (state, action) => {
            state.dateEnd = action.payload
        },
        toggleFromToCity: (state, action) => {
            const oldFrom = state.fromCityId;
            state.fromCityId = state.toCityId;
            state.toCityId = oldFrom;
        }
    }
})

export const {
    setSearchParams,
    setFromCityId,
    setToCityId,
    setDateStart,
    setDateEnd,
    toggleFromToCity,
} = searchSlice.actions

export default searchSlice.reducer
