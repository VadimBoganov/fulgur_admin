import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../config/config.json"
import axios from "axios";

export const fetchItems = createAsyncThunk('fetchItems', async(_, thunkApi) => {
    try{
        const resp = await axios.get(config.itemsUrl)
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const addItem = createAsyncThunk('addItem', async(data, thunkApi) => {
    try{ 
        console.log(data)
        const resp = await axios.post(config.itemsUrl, data, { headers: {'Content-Type': 'multipart/form-data'}});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const updateItem = createAsyncThunk('updateItem', async(data, thunkApi) => {
    try{ 
        const resp = await axios.put(config.itemsUrl, data, { headers: {'Content-Type': 'multipart/form-data'}});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }  
})

export const removeItem = createAsyncThunk('removeItem', async(id, thunkApi) => {
    try{
        const resp = await axios.delete(`${config.itemsUrl}/${id}`);
        return resp.data
    }
    catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }
})

const itemsSlice = createSlice({
    name:'itemsSlice',
    initialState: {
        list: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.fulfilled, (state, {payload}) => {
            state.list = payload; 
        })
        builder.addCase(removeItem.fulfilled, (state, {payload}) => {
            state.list = state.list.filter((item) => item.Id !== payload)
        })
        builder.addCase(addItem.fulfilled, (state, {payload}) => {
            state.list = state.list || []
            state.list.push(payload)
        })
        builder.addCase(updateItem.fulfilled, (state, {payload}) => {
            const ind = state.list.findIndex(o => o.Id === payload.Id)
            state.list[ind].Name = payload.Name
            state.list[ind].Price = payload.Price
            state.list[ind].ImageUrl = payload.ImageUrl
        })
    }
})

export default itemsSlice.reducer;