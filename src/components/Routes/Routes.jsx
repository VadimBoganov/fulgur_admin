import { Route, Routes } from 'react-router-dom'
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
 
export const AppRoutes = () => {
  return (
    <Routes>
        <Route index element = {<Home/>}/>
        <Route path={ROUTES.LOGIN} element={<Login/>}/>
        <Route path={ROUTES.PRODUCT} element={<Product/>}/>
        <Route path={ROUTES.PRODUCTADD} element={<ProductAdd/>}/>
        <Route path={ROUTES.PRODUCTTYPE} element={<ProductType/>} />
        <Route path={ROUTES.PRODUCTTYPEADD} element={<ProdutTypeAdd/>}/>
        <Route path={ROUTES.PRODUCTSUBTYPE} element={<ProductSubtype/>} />
        <Route path={ROUTES.PRODUCTSUBTYPEADD} element={<ProductSubtypeAdd/>} />
        <Route path={ROUTES.PRODUCTITEM} element={<ProductItem/>} />
        <Route path={ROUTES.PRODUCTITEMADD} element={<ProductItemAdd/>} />
        <Route path={ROUTES.ITEM} element={<Item/>}/>
        <Route path={ROUTES.ITEMADD} element={<ItemAdd/>}/>
    </Routes>
  )
}
