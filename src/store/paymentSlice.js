import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    personalData: {
        surname: "",
        name: "",
        father: "",
        phone: "",
        mail: "",
    },
    paymentMethod: "online",
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setPersonalData: (state, action) => {
            state.personalData = action.payload;
        },
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
    },
});

export const {
    setPersonalData,
    setPaymentMethod
} = paymentSlice.actions;
export default paymentSlice.reducer;
