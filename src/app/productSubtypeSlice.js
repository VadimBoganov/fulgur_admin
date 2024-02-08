import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import config from "../config/config.json"

const url = `${config.protocol}${config.host}${config.port}/api/productsubtypes`
const token = sessionStorage.getItem("access_token")
const headers = {"Authorization": "Bearer " + token }

export const fetchProductSubtypes = createAsyncThunk('fetchProductSubtypes', async (_, thunkApi) => {
    try{
        const resp = await axios(url, {headers: headers})
        return resp.data
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }    
})

export const addProductSubtype = createAsyncThunk('addProductSubtype', async(data, thunkApi) => {
    try{ 
        const resp = await axios.post(url, data, {headers: headers});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }   
})

export const updateProductSubtype =  createAsyncThunk('updateProductSubtype', async(data, thunkApi) => {
    try{ 
        const resp = await axios.put(url, data, {headers: headers});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }  
})

export const removeProductSubtype = createAsyncThunk('removeProductSubtype', async(id, thunkApi) => {
    try{
        const resp = await axios.delete(`${url}/${id}`, {headers: headers});
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
            const ind = state.list.findIndex(o => o.id === payload.id)
            state.list[ind].name = payload.name
            state.list[ind].productId = payload.productId
        })
        builder.addCase(removeProductSubtype.fulfilled, (state, {payload}) => {
            state.list = state.list.filter((item) => item.id !== payload.id)
        })
    }
})

export default productSubtypesSlice.reducer;