import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'

import Home from '../Home/Home'
import Admin from '../Admin/Admin'


export const AppRoutes = () => {
  return (
    <Routes>
        <Route index element = {<Home/>}/>
        <Route path={ROUTES.ADMIN} element={<Admin/>}/>
    </Routes>
  )
}
