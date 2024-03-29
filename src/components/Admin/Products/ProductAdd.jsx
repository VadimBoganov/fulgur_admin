import React, { useState } from "react";
import { addProduct } from "../../../app/productsSlice";
import styles from "../Admin.module.scss";
import Sidebar from "../Sidebar";
import { NavLink } from "react-router-dom";
import AddButton from "../Common/Buttons/AddButton";
import StringInput from "../Common/Inputs/StringInput";

const ProductAdd = () => {
  const [value, setValue] = useState("");
  const [link, setLink] = useState()

  function validate() {
    if (value.length === 0) {
      alert('Имя не может быть пустым.')
      return false
    }

    if (link.length === 0) {
      alert('Ссылка не может быть пустой.')
      return false
    }

    return true
  }

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
          <StringInput
            value={link}
            labelValue={"Ссылка"}
            setValue={setLink}
          />
          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            to={`/admin/product`}
          >
            <AddButton
              data={{ Name: value, Link: link }}
              func={addProduct}
              validate={validate}
            />
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default ProductAdd;
