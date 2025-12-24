import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const TrainsSort = {
    Date: "date",
    Price: "price_min",
    Duration: "duration",
}

const initialState = {
    page: 1,
    limit: 5,
    offset: 0,
    sort: TrainsSort.Date,
    isLoading: false,
    trains: {
        items: [],
        total_count: 0,
    }
}


export const selectSearchQuery = createSelector(
    (state) => state.search,
    (state) => state.filters,
    (state) => state.searchResult.sort,
    (state) => state.searchResult.offset,
    (state) => state.searchResult.limit,
    (search, filters, sort, offset, limit) => ({
        ...search,
        ...filters,
        sort,
        offset,
        limit
    })
);

export const fetchTrains = createAsyncThunk(
    'filters/fetchTrains',
    async (state) => {
        const params = {
            from_city_id: state.fromCityId,
            to_city_id: state.toCityId,
            date_start: state.dateStart,
            date_end: state.dateEnd,
            price_from: state.priceFrom,
            price_to: state.priceTo,
            have_first_class: state.options?.have_first_class,
            have_second_class: state.options?.have_second_class,
            have_third_class: state.options?.have_third_class,
            have_fourth_class: state.options?.have_fourth_class,
            have_wifi: state.options?.have_wifi,
            have_air_conditioning: state.options?.have_air_conditioning,
            start_departure_hour_from: state.startTimes?.departure?.[0],
            start_departure_hour_to: state.startTimes?.departure?.[1],
            start_arrival_hour_from: state.startTimes?.arrival?.[0],
            start_arrival_hour_to: state.startTimes?.arrival?.[1],
            end_departure_hour_from: state.endTimes?.departure?.[0],
            end_departure_hour_to: state.endTimes?.departure?.[1],
            end_arrival_hour_from: state.endTimes?.arrival?.[0],
            end_arrival_hour_to: state.endTimes?.arrival?.[1],
            sort: state.sort,
            limit: state.limit,
            offset: state.offset,

        }

        Object.keys(params).forEach((key) => {
            if (
                params[key] === false ||
                params[key] === null ||
                params[key] === ''
            ) {
                delete params[key]
            }
        })

        const query = new URLSearchParams(params).toString();

        const url = `https://students.netoservices.ru/fe-diplom/routes?${query}`;

        const res = await axios.get(url);
        return res.data;
    }
);

const searchResultSlice = createSlice({
    name: 'searchResult',
    initialState,
    reducers: {
        setTrainsOnPage: (state, action) => {
            state.limit = action.payload;
            state.offset = 0;
            state.page = 1;
        },
        setPage: (state, action) => {
            state.page = action.payload;
            state.offset = (state.page - 1) * state.limit;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        resetPage: (state, action) => {
            state.page = 1;
            state.offset = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrains.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchTrains.fulfilled, (state, action) => {
                state.trains = action.payload;
                state.isLoading = false
            })
            .addCase(fetchTrains.rejected, (state, action) => {
                state.isLoading = false
                state.trainsQueryError = action.error.message;
            })
        ;
    },
})

export const {
    setPage,
    resetPage,
    setSort,
    setTrainsOnPage
} = searchResultSlice.actions

export default searchResultSlice.reducer
