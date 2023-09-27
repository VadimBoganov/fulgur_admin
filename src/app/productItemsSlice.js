import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import config from "../config/config.json"

export const fetchProductItems = createAsyncThunk('fetchProductitems', async(_, thunkApi) => {
    try{
        const resp = await axios.get(config.productItemsUrl)
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const addProductItem = createAsyncThunk('addProductItem', async(data, thunkApi) => {
    try{ 
        const resp = await axios.post(config.productItemsUrl, data, { headers: {'Content-Type': 'multipart/form-data'}});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const updateProductItem = createAsyncThunk('updateProductItem', async(data, thunkApi) => {
    try{ 
        const resp = await axios.put(config.productItemsUrl, data, { headers: {'Content-Type': 'multipart/form-data'}});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }  
})

export const removeProductItem = createAsyncThunk('removeProductItem', async(id, thunkApi) => {
    try{
        const resp = await axios.delete(`${config.productItemsUrl}/${id}`);
        return resp.data
    }
    catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }
})

const productItemsSlice = createSlice({
    name: 'productItems',
    initialState: {
       list: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductItems.fulfilled, (state, {payload}) => {
            state.list = payload; 
        })
        builder.addCase(removeProductItem.fulfilled, (state, {payload}) => {
            state.list = state.list.filter((item) => item.Id !== payload)
        })
        builder.addCase(addProductItem.fulfilled, (state, {payload}) => {
            state.list = state.list || []
            state.list.push(payload)
        })
        builder.addCase(updateProductItem.fulfilled, (state, {payload}) => {
            const ind = state.list.findIndex(o => o.Id === payload.Id)
            state.list[ind].Name = payload.Name
            state.list[ind].ImageUrl = payload.ImageUrl
        })
    }
})

export default productItemsSlice.reducer;
