import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import config from "../config/config.json"

const url = `${config.apiBaseUrl}/products`
let headers = {}

export const fetchProducts = createAsyncThunk('fetchProducts', async (_, thunkApi) => {
    try{
        const resp = await axios.get(url, {headers: headers, withCredentials: true})
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const addProduct = createAsyncThunk('addProduct', async(data, thunkApi) => {
    try{ 
        const resp = await axios.post(url, data, {headers: headers, withCredentials: true});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const updateProduct = createAsyncThunk('updateProduct', async(data, thunkApi) => {
    try{ 
        const resp = await axios.put(url, data, {headers: headers, withCredentials: true});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }  
})

export const removeProduct = createAsyncThunk('removeProduct', async(id, thunkApi) => {
    try{
        const resp = await axios.delete(`${url}/${id}`, {headers: headers, withCredentials: true});
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
       status: 'idle',
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchProducts.fulfilled, (state, {payload}) => {
            state.list = payload;
            state.status = 'succeeded';
        })
        builder.addCase(fetchProducts.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(removeProduct.fulfilled, (state, {payload}) => {
            state.list = state.list.filter((item) => item.id !== payload.id)
        })
        builder.addCase(addProduct.fulfilled, (state, {payload}) => {
            state.list.push(payload)
        })
        builder.addCase(updateProduct.fulfilled, (state, {payload}) => {
            const ind = state.list.findIndex(o => o.id === payload.id)
            state.list[ind].name = payload.name
        })
    }
})

export default productsSlice.reducer;