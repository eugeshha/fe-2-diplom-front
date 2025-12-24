import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const purchaseTickets = createAsyncThunk(
    'passengers/purchaseTickets',
    async (order) => {
        const res = await axios.post(`https://students.netoservices.ru/fe-diplom/order`, order);
        return res.data;
    }
);