import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import productTypesSlice from './productTypesSlice';
import productSubtypeSlice from "./productSubtypeSlice";
import productItemsSlice from "./productItemsSlice";
import itemsSlice from "./itemsSlice"
import usersSlice from "./usersSlice"

export const store = configureStore({
    reducer:{
        products: productsSlice,
        producttypes: productTypesSlice,
        productsubtypes: productSubtypeSlice,
        productitems: productItemsSlice,
        items: itemsSlice,
        users: usersSlice,
    }
})