import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import config from "../config/config.json"

const url = `${config.protocol}${config.host}${config.port}/api/productitems`
let headers = {}

export const fetchProductItems = createAsyncThunk('fetchProductitems', async(_, thunkApi) => {
    try{
        const token = sessionStorage.getItem("access_token")
        headers = {"Authorization": "Bearer " + token, "Content-Type": "multipart/form-data" }
        const resp = await axios.get(url, {headers:headers})
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const addProductItem = createAsyncThunk('addProductItem', async(data, thunkApi) => {
    try{ 
        console.log(data)
        const resp = await axios.post(url, data, { headers: headers});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }     
})

export const updateProductItem = createAsyncThunk('updateProductItem', async(data, thunkApi) => {
    try{ 
        const resp = await axios.put(url, data, {headers: headers});
        return resp.data;
    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err);
    }  
})

export const removeProductItem = createAsyncThunk('removeProductItem', async(id, thunkApi) => {
    try{
        const resp = await axios.delete(`${url}/${id}`, {headers: headers});
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
