import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDepartureSeats = createAsyncThunk(
    'seats/fetchDepartureSeats',
    async (routeId) => {
        const res = await axios.get(`https://students.netoservices.ru/fe-diplom/routes/${routeId}/seats`);
        return res.data;
    }
);

export const fetchArrivalSeats = createAsyncThunk(
    'seats/fetchArrivalSeats',
    async (routeId) => {
        const res = await axios.get(`https://students.netoservices.ru/fe-diplom/routes/${routeId}/seats`);
        return res.data;
    }
);


const initialState = {
    train: {
        departure: null,
        arrival: null,
    },
    availableSeatsInfo: null,       // new
    priceInfo: null,  // new
    availableCoaches: {
        departure: {
            couchesList: null,
            queryStatus: 'idle',
            queryError: null,
        },
        arrival: {
            couchesList: null,
            queryStatus: 'idle',
            queryError: null,
        },
    },
    selectedSeats: {
        departure: {
            selectedCoachClass: null,
            coachesOfSelectedClass: [],
            selectedCoachId: null,
            seatsMap: {},
            seats: [],
            services: {},
        },
        arrival: {
            selectedCoachClass: null,
            coachesOfSelectedClass: [],
            selectedCoachId: null,
            seatsMap: {},
            seats: [],
            services: {},
        }
    },
};

const seatsSlice = createSlice({
    name: 'seats',
    initialState,
    reducers: {
        resetTrain: (state) => {
            state.train.departure = null;
            state.train.arrival = null;
            state.availableSeatsInfo = null;
            state.priceInfo = null;
        },
        setTrain: (state, action) => {
            const { departureTrain, arrivalTrain, seatsInfo, priceInfo } = action.payload;
            state.train.departure = departureTrain;
            state.train.arrival = arrivalTrain;
            state.availableSeatsInfo = seatsInfo;
            state.priceInfo = priceInfo;
        },
        resetSeats: (state) => {
            state.availableCoaches.departure = { couchesList: null, queryStatus: 'idle', queryError: null };
            state.availableCoaches.arrival = { couchesList: null, queryStatus: 'idle', queryError: null };
        },
        coachSelect: (state, { payload }) => {
            const { id, type } = payload;
            state.selectedSeats[type].selectedCoachId = id;
        },
        coachItemsClear: (state, { payload }) => {
            state.selectedSeats[payload.type].coachesOfSelectedClass = [];
            state.selectedSeats[payload.type].selectedCoach = null;
            state.selectedSeats[payload.type].seatsMap = {};
            state.selectedSeats[payload.type].seats = [];
            state.selectedSeats[payload.type].services = {};
        },
        coachClassChange: (state, { payload }) => {
            state.selectedSeats[payload.type].selectedCoachClass = payload.coachClass;
            state.selectedSeats[payload.type].coachesOfSelectedClass = payload.coachesOfSelectedClass;
        },
        seatsItemSelect: (state, { payload }) => {
            const { coach, seat_number, passenger_type, extra_services, direction } = payload;
            if (!state.selectedSeats[direction].seatsMap[coach._id]) state.selectedSeats[direction].seatsMap[coach._id] = [];
            state.selectedSeats[direction].seatsMap[coach._id].push(seat_number);
            state.selectedSeats[direction].seats.push({
                coach: coach,
                seat_number: seat_number,
                passenger_type: passenger_type,
                extra_services: extra_services,
            });
        },
        seatsItemUnSelect: (state, { payload }) => {
            const { coach, seat_number, direction } = payload;
            state.selectedSeats[direction].seatsMap[coach._id] = state.selectedSeats[direction].seatsMap[coach._id].filter((n) => n !== seat_number);
            if (state.selectedSeats[direction].seatsMap[coach._id].length === 0)
                delete state.selectedSeats[direction].seatsMap[coach._id];


            const filteredSeats = state.selectedSeats[direction].seats.filter(s => !(s.coach._id === coach._id && s.seat_number === seat_number));
            state.selectedSeats[direction].seats = filteredSeats
        },
        serviceItemSelect: (state, { payload }) => {
            const { coach_id, service, direction } = payload;
            if (!state.selectedSeats[direction].services[coach_id]) state.selectedSeats[direction].services[coach_id] = [];
            if (!state.selectedSeats[direction].services[coach_id].includes(service)) {
                state.selectedSeats[direction].services[coach_id].push(service);

                for(var seat of state.selectedSeats[direction].seats) {
                    if (seat.coach._id === coach_id && !seat.extra_services.includes(service)) {
                        seat.extra_services.push(service);
                    }
                }
            }
        },
        serviceItemUnSelect: (state, { payload }) => {
            const { coach_id, service, direction } = payload;
            if (state.selectedSeats[direction].services[coach_id]) {
                state.selectedSeats[direction].services[coach_id] = state.selectedSeats[direction].services[coach_id].filter((s) => s !== service);
                if (state.selectedSeats[direction].services[coach_id].length === 0)
                    delete state.selectedSeats[direction].services[coach_id];

                for(var seat of state.selectedSeats[direction].seats) {
                    if (seat.coach._id === coach_id && seat.extra_services.includes(service)) {
                        seat.extra_services = seat.extra_services.filter(s => s !== service)
                    }
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartureSeats.pending, (state) => {
                state.availableCoaches.departure.queryStatus = 'loading';
            })
            .addCase(fetchDepartureSeats.fulfilled, (state, action) => {
                state.availableCoaches.departure.couchesList = action.payload;
                state.availableCoaches.departure.seatsQueryStatus = 'succeeded';
            })
            .addCase(fetchArrivalSeats.fulfilled, (state, action) => {
                state.availableCoaches.arrival.couchesList = action.payload;
                state.availableCoaches.arrival.seatsQueryStatus = 'succeeded';
            })
            .addCase(fetchDepartureSeats.rejected, (state, action) => {
                state.availableCoaches.departure.queryStatus = 'failed';
                state.availableCoaches.departure.queryError = action.error.message;
            })
            .addCase(fetchArrivalSeats.rejected, (state, action) => {
                state.availableCoaches.arrival.queryStatus = 'failed';
                state.availableCoaches.arrival.queryError = action.error.message;
            });
    },
});

export const {
    setTrain,
    resetTrain,
    resetSeats,
    coachSelect,
    coachItemsClear,
    coachClassChange,
    seatsItemSelect,
    seatsItemUnSelect,
    serviceItemSelect,
    serviceItemUnSelect,
} = seatsSlice.actions;

export default seatsSlice.reducer;
