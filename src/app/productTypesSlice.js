import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import config from "../config/config.json"

const url = `${config.protocol}${config.host}${config.port}/api/producttypes`
let headers = {}

export const fetchProductTypes = createAsyncThunk('fetchProductTypes', async (_, thunkApi) => {
    try{
        const token = sessionStorage.getItem("access_token")
        headers = {"Authorization": "Bearer " + token }
        const resp = await axios(url, {headers: headers});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const addProductType = createAsyncThunk('addProductType', async(data, thunkApi) => {
    try{ 
        const resp = await axios.post(url, data, {headers: headers});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const updateProductType = createAsyncThunk('updateProductType', async(data, thunkApi) => {
    try{ 
        const resp = await axios.put(url, data, {headers: headers});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }  
})

export const removeProductType = createAsyncThunk('removeProductType', async(id, thunkApi) => {
    try{
        const resp = await axios.delete(`${url}/${id}`, {headers: headers});
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