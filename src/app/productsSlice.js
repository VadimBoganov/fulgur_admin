import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import config from "../config/config.json"

const url = `${config.protocol}${config.host}${config.port}/api/products`
const token = sessionStorage.getItem("access_token")
const headers = {"Authorization": "Bearer " + token }

export const fetchProducts = createAsyncThunk('fetchProducts', async (_, thunkApi) => {
    try{
        const resp = await axios.get(url, {headers: headers})
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const addProduct = createAsyncThunk('addProduct', async(data, thunkApi) => {
    try{ 
        const resp = await axios.post(url, data, {headers: headers});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const updateProduct = createAsyncThunk('updateProduct', async(data, thunkApi) => {
    try{ 
        const resp = await axios.put(url, data, {headers: headers});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }  
})

export const removeProduct = createAsyncThunk('removeProduct', async(id, thunkApi) => {
    try{
        const resp = await axios.delete(`${url}/${id}`, {headers: headers});
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