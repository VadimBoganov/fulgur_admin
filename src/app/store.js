import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import productTypesSlice from './productTypesSlice';

export const store = configureStore({
    reducer:{
        products: productsSlice,
        producttypes: productTypesSlice,
    }
})