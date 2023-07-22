import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import config from "../config/config.json"

export const fetchProducts = createAsyncThunk('fetchProducts', async (_, thunkApi) => {
    try{
        const resp = await axios(config.productsUrl);
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

const productsSlice = createSlice({
    name: 'products',
    initialState: {
       list: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.list = action.payload; 
        })
    }
})

export default productsSlice.reducer;