import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../Admin.module.scss";
import Sidebar from "../Sidebar";
import { NavLink } from "react-router-dom";
import { addProductType } from "../../../app/productTypesSlice";
import AddButton from "../Common/Buttons/AddButton";
import StringInput from "../Common/Inputs/StringInput";

const ProdutTypeForm = () => {
  const { list } = useSelector(({ products }) => products);
  const [value, setValue] = useState("");
  const [selectValue, setSelectValue] = useState(list[0].Name);
  const [link, setLink] = useState()

  function validate() {
    if (value.length === 0) {
      alert('Имя не может быть пустым.')
      return false
    }

    if (value.length === 0) {
      alert('Ссылка не может быть пустой.')
      return false
    }
    return true
  }

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
              list.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
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
          <StringInput
            value={link}
            labelValue={"Ссылка"}
            setValue={setLink}
          />
          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            to={`/admin/producttype`}
          >
            <AddButton
              data={{
                productId: list.filter((item) => item.name === selectValue)[0]?.id,
                name: value,
                link: link
              }}
              func={addProductType}
              validate={validate}
            />
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default ProdutTypeForm;
