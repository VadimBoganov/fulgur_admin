import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import config from "../config/config.json"

const url = `${config.apiBaseUrl}/producttypes`
let headers = {}

export const fetchProductTypes = createAsyncThunk('fetchProductTypes', async (_, thunkApi) => {
    try{
        const resp = await axios(url, {headers: headers, withCredentials: true});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const addProductType = createAsyncThunk('addProductType', async(data, thunkApi) => {
    try{ 
        const resp = await axios.post(url, data, {headers: headers, withCredentials: true});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const updateProductType = createAsyncThunk('updateProductType', async(data, thunkApi) => {
    try{ 
        const resp = await axios.put(url, data, {headers: headers, withCredentials: true});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }  
})

export const removeProductType = createAsyncThunk('removeProductType', async(id, thunkApi) => {
    try{
        const resp = await axios.delete(`${url}/${id}`, {headers: headers, withCredentials: true});
        return resp.data
    }
    catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }
})

const productTypesSlice = createSlice({
    name: 'productTypes',
    initialState: {
       list: [],
       status: 'idle',
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductTypes.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchProductTypes.fulfilled, (state, {payload}) => {
            state.list = payload;
            state.status = 'succeeded';
        })
        builder.addCase(fetchProductTypes.rejected, (state) => {
            state.status = 'failed';
        })
       
        builder.addCase(addProductType.fulfilled, (state, {payload}) => {
            state.list = state.list || []
            state.list.push(payload)
        })
        builder.addCase(updateProductType.fulfilled, (state, {payload}) => {
            const ind = state.list.findIndex(o => o.id === payload.id)
            state.list[ind].name = payload.name
            state.list[ind].productId = payload.productId
        })
        builder.addCase(removeProductType.fulfilled, (state, {payload}) => {
            state.list = state.list.filter((item) => item.id !== payload.id)
        })
    }
})

export default productTypesSlice.reducer;