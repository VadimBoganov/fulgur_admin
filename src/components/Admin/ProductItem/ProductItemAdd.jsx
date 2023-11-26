import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../Admin.module.scss";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductSubtypes } from "../../../app/productSubtypeSlice";
import { addProductItem } from "../../../app/productItemsSlice";
import { fetchUsers } from "../../../app/usersSlice";

const ProductItemAdd = () => {
  const dispatch = useDispatch();

  const [file, setFile] = useState();
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(fetchUsers())
  },[dispatch])

  useEffect(() => {
    dispatch(fetchProductSubtypes());
  }, [dispatch]);

  const prodSubTypes = useSelector(({ productsubtypes }) => productsubtypes);

  const [selectValue, setSelectValue] = useState("");

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
              prodSubTypes.list.map(({ Id, Name }) => (
                <option key={Id} value={Name}>
                  {Name}
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
            <button
              className={styles.button}
              onClick={() => {                
                const prodSubType = prodSubTypes.list.filter((item) => item.Name === selectValue || prodSubTypes.list[0])[0];
                
                dispatch(
                  addProductItem({ProductSubTypeId: prodSubType.Id, Name: value, File: file})
                );
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

export default ProductItemAdd;
