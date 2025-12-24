import { createSlice } from '@reduxjs/toolkit';
import {fetchArrivalSeats, fetchDepartureSeats} from "./seatsSlice";
import {fetchTrains} from "./searchResultSlice";

const initialState = {
    isLoading: false
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrains.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchTrains.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(fetchTrains.rejected, (state, action) => {
                state.isLoading = false
            })
            .addCase(fetchDepartureSeats.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchArrivalSeats.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchDepartureSeats.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(fetchArrivalSeats.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(fetchDepartureSeats.rejected, (state, action) => {
                state.isLoading = false
            })
            .addCase(fetchArrivalSeats.rejected, (state, action) => {
                state.isLoading = false
            });
        ;
    },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
