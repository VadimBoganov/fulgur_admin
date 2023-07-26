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


export const AppRoutes = () => {
  return (
    <Routes>
        <Route index element = {<Home/>}/>
        <Route path={ROUTES.ADMIN} element={<Admin/>}/>
        <Route path={ROUTES.PRODUCT} element={<Product/>}/>
        <Route path={ROUTES.PRODUCTADD} element={<ProductAdd/>}/>
        <Route path={ROUTES.PRODUCTTYPE} element={<ProductType/>} />
        <Route path={ROUTES.PRODUCTTYPEADD} element={<ProdutTypeAdd/>}/>
        <Route path={ROUTES.PRODUCTSUBTYPE} element={<ProductType/>} />
        <Route path={ROUTES.PRODUCTITEM} element={<ProductType/>} />
        <Route path={ROUTES.ITEM} element={<AdminItem/>}/>
    </Routes>
  )
}
