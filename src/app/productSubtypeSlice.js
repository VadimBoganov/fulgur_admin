import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import config from "../config/config.json"

export const fetchProductSubtypes = createAsyncThunk('fetchProductSubtypes', async (_, thunkApi) => {
    try{
        const resp = await axios(config.productSubtypesUrl)
        return resp.data
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }    
})

export const addProductSubtype = createAsyncThunk('addProductSubtype', async(data, thunkApi) => {
    try{ 
        const resp = await axios.post(config.productSubtypesUrl, data);
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }   
})

export const updateProductSubtype =  createAsyncThunk('updateProductSubtype', async(data, thunkApi) => {
    try{ 
        const resp = await axios.put(config.productSubtypesUrl, data);
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }  
})

export const removeProductSubtype = createAsyncThunk('removeProductSubtype', async(id, thunkApi) => {
    try{
        const resp = await axios.delete(`${config.productSubtypesUrl}/${id}`);
        return resp.data
    }
    catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }
})

const productSubtypesSlice = createSlice({
    name: 'productSubtypes',
    initialState: {
       list: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductSubtypes.fulfilled, (state, {payload}) => {
            state.list = payload; 
        })
       
        builder.addCase(addProductSubtype.fulfilled, (state, {payload}) => {
            state.list = state.list || []
            state.list.push(payload)
        })
        builder.addCase(updateProductSubtype.fulfilled, (state, {payload}) => {
            const ind = state.list.findIndex(o => o.Id === payload.Id)
            state.list[ind].Name = payload.Name
            state.list[ind].ProductId = payload.ProductId
        })
        builder.addCase(removeProductSubtype.fulfilled, (state, {payload}) => {
            state.list = state.list.filter((item) => item.Id !== payload)
        })
    }
})

export default productSubtypesSlice.reducer;