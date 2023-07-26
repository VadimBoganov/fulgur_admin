import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Admin.module.scss";
import Sidebar from "../Sidebar";
import { NavLink } from "react-router-dom";
import { addProductType } from "../../../app/productTypesSlice";

const ProdutTypeForm = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(({ products }) => products);
  const [value, setValue] = useState("");
  const [selectValue, setSelectValue] = useState(list[0].Name);

  return (
    <div className={styles.admin}>
      <Sidebar />
      <div className={styles.container}>
        <form className={styles.form}>
          <label htmlFor="addProductType">Название продукции:</label>
          <select
            id="addProductType"
            name="product types"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
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
                const prod = list.filter((item) => item.Name === selectValue)[0]
                dispatch(addProductType({ProductId: prod.Id, Name: value }));
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
