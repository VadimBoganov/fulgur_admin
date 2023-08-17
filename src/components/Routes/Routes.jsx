import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'

import Home from '../Home/Home'
import Admin from '../Admin/Admin'
import ProdutTypeAdd  from '../Admin/ProductType/ProdutTypeAdd'
import AdminItem from '../Admin/Item/AdminItem'
import ProductAdd from '../Admin/Products/ProductAdd'
import Product from '../Admin/Products/Product'
import ProductType from '../Admin/ProductType/ProductType'
import ProductSubtype from '../Admin/ProductSubType/ProductSubtype'
import ProductSubtypeAdd from '../Admin/ProductSubType/ProductSubtypeAdd'
import ProductItem from '../Admin/ProductItem/ProductItem'
import ProductItemAdd from '../Admin/ProductItem/ProductItemAdd'
 

export const AppRoutes = () => {
  return (
    <Routes>
        <Route index element = {<Home/>}/>
        <Route path={ROUTES.ADMIN} element={<Admin/>}/>
        <Route path={ROUTES.PRODUCT} element={<Product/>}/>
        <Route path={ROUTES.PRODUCTADD} element={<ProductAdd/>}/>
        <Route path={ROUTES.PRODUCTTYPE} element={<ProductType/>} />
        <Route path={ROUTES.PRODUCTTYPEADD} element={<ProdutTypeAdd/>}/>
        <Route path={ROUTES.PRODUCTSUBTYPE} element={<ProductSubtype/>} />
        <Route path={ROUTES.PRODUCTSUBTYPEADD} element={<ProductSubtypeAdd/>} />
        <Route path={ROUTES.PRODUCTITEM} element={<ProductItem/>} />
        <Route path={ROUTES.PRODUCTITEMADD} element={<ProductItemAdd/>} />
        <Route path={ROUTES.ITEM} element={<AdminItem/>}/>
    </Routes>
  )
}
