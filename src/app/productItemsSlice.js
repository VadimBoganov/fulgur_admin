import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import config from "../config/config.json"

const url = `${config.apiBaseUrl}/productitems`
let headers = {}

export const fetchProductItems = createAsyncThunk('fetchProductitems', async(_, thunkApi) => {
    try{
        headers = {"Content-Type": "multipart/form-data" }
        const resp = await axios.get(url, {headers:headers, withCredentials: true})
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const addProductItem = createAsyncThunk('addProductItem', async(data, thunkApi) => {
    try{ 
        const resp = await axios.post(url, data, { headers: headers, withCredentials: true});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const updateProductItem = createAsyncThunk('updateProductItem', async(data, thunkApi) => {
    try{ 
        const resp = await axios.put(url, data, {headers: headers, withCredentials: true});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }  
})

export const removeProductItem = createAsyncThunk('removeProductItem', async(id, thunkApi) => {
    try{
        const resp = await axios.delete(`${url}/${id}`, {headers: headers, withCredentials: true});
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
       status: 'idle',
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductItems.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchProductItems.fulfilled, (state, {payload}) => {
            state.list = payload;
            state.status = 'succeeded';
        })
        builder.addCase(fetchProductItems.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(removeProductItem.fulfilled, (state, {payload}) => {
            state.list = state.list.filter((item) => item.id !== payload.id)
        })
        builder.addCase(addProductItem.fulfilled, (state, {payload}) => {
            state.list = state.list || []
            state.list.push(payload)
        })
        builder.addCase(updateProductItem.fulfilled, (state, {payload}) => {
            const ind = state.list.findIndex(o => o.id === payload.id)
            state.list[ind].name = payload.name
            state.list[ind].imageUrl = payload.imageUrl
            state.list[ind].productTypeId = payload.productTypeId
            state.list[ind].productSubTypeId = payload.productSubTypeId
        })
    }
})

export default productItemsSlice.reducer;
