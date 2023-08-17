import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import productTypesSlice from './productTypesSlice';
import productSubtypeSlice from "./productSubtypeSlice";

export const store = configureStore({
    reducer:{
        products: productsSlice,
        producttypes: productTypesSlice,
        productsubtypes: productSubtypeSlice
    }
})