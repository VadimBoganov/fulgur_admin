import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config/config.json"

export const fetchUsers = createAsyncThunk('fetchUsers', async(_, thunkApi) => {
    try{
        const resp = await axios.get(config.baseUrl + "/api/user", {withCredentials:true})
        if (resp.data.id > 0)
            return resp.data
        else {
            window.location.href="/admin";            
            return false;
        }
    }
    catch(err){
        window.location.href="/admin";
        return false;
    }
}) 

export const removeUser = createAsyncThunk('removeUser', async() => {
    
})

const usersSlice = createSlice({
    name: 'userSlice',
    initialState:{
        list:[]
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, {payload}) => {
            state.list = payload
        })
        builder.addCase(removeUser.fulfilled, (state, {payload}) => {
            state.list = state.list.filter((item) => item.Id !== payload)
        })
    }
})

export default usersSlice.reducer;