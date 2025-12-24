import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from '../store/filtersSlice'
import seatsReducer from '../store/seatsSlice'
import passengersReducer from '../store/passengersSlice'
import paymentReducer from "../store/paymentSlice"
import orderReducer from "../store/orderSlice"
import loadingReducer from "../store/loadingSlice"
import searchReducer from '../store/searchSlice';
import searchResultReducer from '../store/searchResultSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    filters: filtersReducer,
    searchResult: searchResultReducer,
    seats: seatsReducer,
    passengers: passengersReducer,
    payment: paymentReducer,
    order: orderReducer,
    loading: loadingReducer,
  },
})
