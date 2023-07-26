import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import config from "../config/config.json"

export const fetchProductTypes = createAsyncThunk('fetchProductTypes', async (_, thunkApi) => {
    try{
        const resp = await axios(config.productTypesUrl);
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const addProductType = createAsyncThunk('addProductType', async(data, thunkApi) => {
    try{ 
        const resp = await axios.post(config.productTypesUrl, data);
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const updateProductType = createAsyncThunk('updateProductType', async(data, thunkApi) => {
    try{ 
        const resp = await axios.put(config.productTypesUrl, data);
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }  
})

export const removeProductType = createAsyncThunk('removeProduct', async(id, thunkApi) => {
    try{
        const resp = await axios.delete(`${config.productTypesUrl}/${id}`);
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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductTypes.fulfilled, (state, {payload}) => {
            state.list = payload; 
        })
       
        builder.addCase(addProductType.fulfilled, (state, {payload}) => {
            state.list.push(payload)
        })
        builder.addCase(updateProductType.fulfilled, (state, {payload}) => {
            const ind = state.list.findIndex(o => o.Id === payload.Id)
            state.list[ind].Name = payload.Name
            state.list[ind].ProductId = payload.ProductId
        })
        builder.addCase(removeProductType.fulfilled, (state, {payload}) => {
            state.list = state.list.filter((item) => item.Id !== payload)
        })
    }
})

export default productTypesSlice.reducer;