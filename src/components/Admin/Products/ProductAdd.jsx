import React, { useEffect, useState } from "react";
import { addProduct } from "../../../app/productsSlice";
import { useDispatch } from "react-redux";
import styles from "../Admin.module.scss";
import Sidebar from "../Sidebar";
import { NavLink } from "react-router-dom";
import { fetchUsers } from "../../../app/usersSlice";

const ProductAdd = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(fetchUsers())
  },[dispatch])

  return (
    <div className={styles.admin}>
      <Sidebar />
      <div className={styles.container}>
        <form className={styles.add_form}>
          <label htmlFor="addProduct">Добавить продукцию:</label>
          <input
            key="addProduct"
            id="addProduct"
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
            to={`/admin/product`}
          >
            <button
              className={styles.button}
              onClick={() => {
                dispatch(addProduct([{ Name: value }]));
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

export default ProductAdd;
