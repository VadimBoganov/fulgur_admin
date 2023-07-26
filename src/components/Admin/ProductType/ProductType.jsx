import React, { useState } from "react";
import styles from "../Admin.module.scss";
import Sidebar from "../Sidebar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductType = () => {
  const { list } = useSelector(({ products }) => products);
  const [value, setValue] = useState("");

  return (
    <div className={styles.admin}>
      <Sidebar />
      <div className={styles.container}>
        <NavLink
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
          to={`/admin/producttype/add`}
        >
          <button className={styles.add_button}>Добавить</button>
        </NavLink>
        <form className={styles.form}>
          <label htmlFor="addProductType">Название продукции:</label>
          <select id="addProductType" name="product types">
            {list &&
              list.map(({ Id, Name }) => (
                <option key={Id} value={Name}>
                  {Name}
                </option>
              ))}
          </select>
          <label htmlFor="productTypeName">Название:</label>
          <input
            id="productTypeName"
            type="text"
            placeholder="Написать..."
            value={value}
            autoComplete="off"
            onChange={(e) => setValue(e.target.value)}
          />
          <section>
            <button
              className={styles.button}
              onClick={(e) => {
                e.preventDefault();
                //dispatch(updateProduct({ id: Id, name: value }));
                setValue("");
              }}
            >
              Обновить
            </button>
            <button
              className={styles.remove_button}
              onClick={(e) => {
                e.preventDefault();
                //dispatch(removeProduct(Id));
              }}
            >
              Удалить
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default ProductType;