import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../Admin.module.scss";
import Sidebar from "../Sidebar";
import { NavLink } from "react-router-dom";

const ProdutTypeForm = () => {
  const { list } = useSelector(({ products }) => products);
  const [value, setValue] = useState('')

  return (
    <div className={styles.admin}>
      <Sidebar />
      <div className={styles.container}>
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
            autoComplete="off"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            to={`/admin/producttype`}
          >
            <button
              className={styles.button}
              onClick={() => {
                //dispatch(addProduct([{ Name: value }]));
                setValue("");
              }}
            >
              Добавить
            </button>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default ProdutTypeForm;
