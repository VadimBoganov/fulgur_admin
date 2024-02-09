import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../Admin.module.scss";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductSubtypes } from "../../../app/productSubtypeSlice";
import { addProductItem } from "../../../app/productItemsSlice";
import AddButton from "../Common/Buttons/AddButton";

const ProductItemAdd = () => {
  const dispatch = useDispatch();

  const [file, setFile] = useState();
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(fetchProductSubtypes());
  }, [dispatch]);

  const prodSubTypes = useSelector(({ productsubtypes }) => productsubtypes);

  const [selectValue, setSelectValue] = useState("");

  function validate() {
    if (file === undefined) {
      alert('Файл не добавлен.')
      return false
    }

    if (value.length === 0){
      alert('Имя не может быть пустым.')
      return false
    }

    return true
  }

  return (
    <div className={styles.admin}>
      <Sidebar />
      <div className={styles.container}>
        <form className={styles.form}>
          <label htmlFor="file">Изображение:</label>
          <input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files[0])} 
          />
          {file && <img src={URL.createObjectURL(file)} alt="file" />}
          <label htmlFor="addItem">Название продукта:</label>
          <select
            id="addItem"
            name="product items"
            onChange={(e) => setSelectValue(e.target.value)}
          >
            {prodSubTypes.list &&
              prodSubTypes.list.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
          </select>
          <label htmlFor="productItemName">Название:</label>
          <input
            id="productItemName"
            type="text"
            placeholder="Написать..."
            autoComplete="off"
            onChange={(e) => setValue(e.target.value)}
          />
          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            to={`/admin/productitem`}
          >
            <AddButton
              data={{ProductSubTypeId: selectValue === null ? prodSubTypes.list[0]?.id : prodSubTypes.list.filter((item) => item.name === selectValue)[0]?.id,
                Name: value,
                File: file,
              }}
              func={addProductItem}
              validate={validate}
            />
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default ProductItemAdd;
