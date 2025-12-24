import { createSelector } from '@reduxjs/toolkit';
import { selectTicketPrice } from './seatsPriceSelector';

export const selectSeatsPrice = selectTicketPrice;

export const selectTotalPrice = createSelector(
    selectTicketPrice,
    (price) =>
{
    return (price.departureAdults || 0) +
    (price.departureChildren || 0) +
    (price.arrivalAdults || 0) +
    (price.arrivalChildren || 0)
}
);

// const dummyReducer = (state = {}) => state;
// export default dummyReducer;
