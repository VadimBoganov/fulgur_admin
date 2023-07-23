import Product from "./Product";
import Sidebar from "./Sidebar";
import styles from './Admin.module.scss'
import { fetchProducts } from "../../app/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Admin = () => {
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
  );
};

export default Admin;
