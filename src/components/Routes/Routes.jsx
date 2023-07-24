import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'

import Home from '../Home/Home'
import Admin from '../Admin/Admin'
import AdminProducts from '../Admin/Products/AdminProducts'
import { AdminRouteTypes } from '../Admin/ProductType/AdminRouteTypes'
import AdminItem from '../Admin/Item/AdminItem'


export const AppRoutes = () => {
  return (
    <Routes>
        <Route index element = {<Home/>}/>
        <Route path={ROUTES.ADMIN} element={<Admin/>}/>
        <Route path={ROUTES.PRODUCT} element={<AdminProducts/>}/>
        <Route path={ROUTES.PRODUCTTYPE} element={<AdminRouteTypes/>} />
        <Route path={ROUTES.PRODUCTSUBTYPE} element={<AdminRouteTypes/>} />
        <Route path={ROUTES.PRODUCTITEM} element={<AdminRouteTypes/>} />
        <Route path={ROUTES.ITEM} element={<AdminItem/>}/>
    </Routes>
  )
}
