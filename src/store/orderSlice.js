import { createSlice } from '@reduxjs/toolkit';
import {purchaseTickets} from "./purchaseTicketsRequest";

const initialState = {
    complete: false,
    inProgress: false,
    success: false,
    errorMessage: "",
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetOrder: (state, { payload }) => {
            state.complete = false;
            state.inProgress = false;
            state.success = false;
            state.errorMessage = "";
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(purchaseTickets.pending, (state) => {
                state.inProgress = true;
            })
            .addCase(purchaseTickets.fulfilled, (state, action) => {
                state.inProgress = false;
                state.complete = true;

                if (Object.hasOwn(action.payload, "status")) {
                    state.success = action.payload.status;
                } else {
                    state.success = false;
                }

                if (Object.hasOwn(action.payload, "error")) {
                    state.success = false;
                    state.errorMessage = action.payload.error;
                }
            })
            .addCase(purchaseTickets.rejected, (state, action) => {
                state.complete = true;
                state.inProgress = false;
                state.errorMessage = "Error purchasing tickets"
            });
    },
});

export const {
    resetOrder

} = orderSlice.actions;

export default orderSlice.reducer;
