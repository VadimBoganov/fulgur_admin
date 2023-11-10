import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'

import Home from '../Home/Home'
import ProdutTypeAdd  from '../Admin/ProductType/ProdutTypeAdd'
import ProductAdd from '../Admin/Products/ProductAdd'
import Product from '../Admin/Products/Product'
import ProductType from '../Admin/ProductType/ProductType'
import ProductSubtype from '../Admin/ProductSubType/ProductSubtype'
import ProductSubtypeAdd from '../Admin/ProductSubType/ProductSubtypeAdd'
import ProductItem from '../Admin/ProductItem/ProductItem'
import ProductItemAdd from '../Admin/ProductItem/ProductItemAdd'
import Item from '../Admin/Item/Item'
import ItemAdd from '../Admin/Item/ItemAdd'
import Login from '../Auth/Login'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../app/usersSlice'
 

export const AppRoutes = () => {
  const [isAuth, setIsAuth] = useState(false)

  const dispatch = useDispatch();

  const {list} = useSelector(({users}) => users)

  useEffect(() => {
    dispatch(fetchUsers())
    setIsAuth(list !== '')    
  }, [dispatch, list])

console.log(isAuth)
  return (
    <Routes>
        <Route index element = {<Home/>}/>
        <Route path={ROUTES.LOGIN} element={<Login/>}/>
        <Route path={ROUTES.PRODUCT} element={isAuth ? <Product/> : <Navigate to="/admin"/>}/>
        <Route path={ROUTES.PRODUCTADD} element={isAuth ? <ProductAdd/> : <Navigate to="/admin"/>}/>
        <Route path={ROUTES.PRODUCTTYPE} element={isAuth ? <ProductType/> : <Navigate to="/admin"/>} />
        <Route path={ROUTES.PRODUCTTYPEADD} element={isAuth ? <ProdutTypeAdd/> : <Navigate to="/admin"/>}/>
        <Route path={ROUTES.PRODUCTSUBTYPE} element={isAuth ? <ProductSubtype/> : <Navigate to="/admin"/>} />
        <Route path={ROUTES.PRODUCTSUBTYPEADD} element={isAuth ? <ProductSubtypeAdd/> : <Navigate to="/admin"/>} />
        <Route path={ROUTES.PRODUCTITEM} element={isAuth ? <ProductItem/> : <Navigate to="/admin"/>} />
        <Route path={ROUTES.PRODUCTITEMADD} element={isAuth ? <ProductItemAdd/> : <Navigate to="/admin"/>} />
        <Route path={ROUTES.ITEM} element={isAuth ? <Item/> : <Navigate to="/admin"/>}/>
        <Route path={ROUTES.ITEMADD} element={isAuth ? <ItemAdd/> : <Navigate to="/admin"/>}/>
    </Routes>
  )
}
