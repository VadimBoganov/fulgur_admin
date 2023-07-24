import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../Admin.module.scss'
import Sidebar from '../Sidebar';
import Product from './Product';
import { fetchProducts } from '../../../app/productsSlice';

const AdminProducts = () => {
    const dispatch = useDispatch();

    const { list } = useSelector(({ products }) => products);

    useEffect(() => {
        dispatch(fetchProducts());
      }, [dispatch]);

  return (
    <div className={styles.admin}>
      <Sidebar />
      <Product prods={list} />
    </div>
  )
}

export default AdminProducts