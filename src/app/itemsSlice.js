import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../config/config.json"
import axios from "axios";

const url = `${config.protocol}${config.host}${config.port}/api/items`
const token = sessionStorage.getItem("access_token")
const headers = {"Authorization": "Bearer " + token, "Content-Type": "multipart/form-data" }

export const fetchItems = createAsyncThunk('fetchItems', async(_, thunkApi) => {
    try{
        const resp = await axios.get(url, {headers: headers})
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const addItem = createAsyncThunk('addItem', async(data, thunkApi) => {
    try{ 
        const resp = await axios.post(url, data, {headers: headers});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const updateItem = createAsyncThunk('updateItem', async(data, thunkApi) => {
    try{ 
        const resp = await axios.put(url, data, {headers: headers});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }  
})

export const removeItem = createAsyncThunk('removeItem', async(id, thunkApi) => {
    try{
        const resp = await axios.delete(`${url}/${id}`, {headers: headers});
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
            state.list = state.list.filter((item) => item.id !== payload.id)
        })
        builder.addCase(addItem.fulfilled, (state, {payload}) => {
            state.list = state.list || []
            state.list.push(payload)
        })
        builder.addCase(updateItem.fulfilled, (state, {payload}) => {
            const ind = state.list.findIndex(o => o.id === payload.id)
            state.list[ind].name = payload.name
            state.list[ind].productItemId = payload.productItemId
            state.list[ind].price = payload.price
            state.list[ind].imageUrl = payload.imageUrl
        })
    }
})

export default itemsSlice.reducer;