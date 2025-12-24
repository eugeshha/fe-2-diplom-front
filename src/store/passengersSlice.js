import {createSelector, createSlice} from '@reduxjs/toolkit';

const initialState = {
    passengersCount: {
        adult: 1,
        child: 0,
        baby: 0,
    },
    passengers: [],
};

export const canAddPassenger = createSelector(
    state => state.passengers.passengersCount,
    state => state.passengers.passengers.length,
    (passengersCount, passengerDetailsCount) => {
        const seats = passengersCount.adult + passengersCount.child;
        return passengerDetailsCount < seats;
    }
);

const passengersSlice = createSlice({
    name: 'passengers',
    initialState,
    reducers: {
        passengersCountChange: (state, { payload }) => {
            const { type, count } = payload;
            state.passengersCount[type] = Number(count);
        },
        setInitialPassengers: (state, { payload }) => {
            state.passengers = payload;
        },
        updatePassengerData: (state, { payload }) => {
            const { id, changes } = payload;
            const passenger = state.passengers.find(p => p.id === id);
            if (passenger) {
                Object.assign(passenger, changes);
            }
        },
        removePassenger: (state, action) => {
            const idToRemove = action.payload;
            state.passengers = state.passengers.filter(passenger => passenger.id !== idToRemove);
            // delete state.validation[idToRemove];
        }
    },
});

export const {
    passengersCountChange,
    setInitialPassengers,
    updatePassengerData,
    removePassenger,
} = passengersSlice.actions;

export default passengersSlice.reducer;
