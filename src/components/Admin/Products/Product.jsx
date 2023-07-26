import { React, useEffect, useState } from "react";
import styles from "../Admin.module.scss";
import { fetchProducts, removeProduct, updateProduct } from "../../../app/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Sidebar from "../Sidebar";

const Product = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const { list } = useSelector(({ products }) => products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={styles.admin}>
      <Sidebar />
      <div className={styles.container}>
        <NavLink
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
          to={`/admin/product/add`}
        >
          <button className={styles.add_button}>Добавить</button>
        </NavLink>
        {list &&
          list.map(({ Id, Name }) => (
            <form key={Id} className={styles.form}>
              <label htmlFor={Id}>{Name}:</label>
              <input
                id={Id}
                type="text"
                placeholder="Написать..."
                autoComplete="off"
                onChange={(e) => setValue(e.target.value)}
              />
              <section>
                <button
                  className={styles.button}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(updateProduct({ id: Id, name: value }));
                    setValue("");
                  }}
                >
                  Обновить
                </button>
                <button
                  className={styles.remove_button}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(removeProduct(Id));
                  }}
                >
                  Удалить
                </button>
              </section>
            </form>
          ))}
      </div>
    </div>
  );
};

export default Product;
