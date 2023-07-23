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

export const addProduct = createAsyncThunk('addProduct', async(data, thunkApi) => {
    try{ 
        const headers = {
            'Content-Type': 'application/json'
        };
        const resp = await axios.post(config.productsUrl, data, headers);
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const updateProduct = createAsyncThunk('updateProduct', async(data, thunkApi) => {
    try{ 
        const resp = await axios.put(`${config.productsUrl}/${data.id}`, data);
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }  
})

export const removeProduct = createAsyncThunk('removeProduct', async(id, thunkApi) => {
    try{
        const resp = await axios.delete(`${config.productsUrl}/${id}`);
        return resp.data
    }
    catch(err){
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
        builder.addCase(fetchProducts.fulfilled, (state, {payload}) => {
            state.list = payload; 
        })
        builder.addCase(removeProduct.fulfilled, (state, {payload}) => {
            state.list = state.list.filter((item) => item.Id !== payload)
        })
        builder.addCase(addProduct.fulfilled, (state, {payload}) => {
            state.list.push(payload[0])
        })
        builder.addCase(updateProduct.fulfilled, (state, {payload}) => {
            const ind = state.list.findIndex(o => o.Id === payload.Id)
            state.list[ind].Name = payload.Name
        })
    }
})

export default productsSlice.reducer;