import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../Admin.module.scss";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductSubtypes } from "../../../app/productSubtypeSlice";

const ProductItemAdd = () => {
  const dispatch = useDispatch();
  const prodSubTypes = useSelector(({ productsubtypes }) => productsubtypes);

  const [file, setFile] = useState("");

  useEffect(() => {
    dispatch(fetchProductSubtypes());
  }, [dispatch]);

  return (
    <div className={styles.admin}>
      <Sidebar />
      <div className={styles.container}>
        <form className={styles.form}>
          <label htmlFor="file">Изображение:</label>
          <input
            id="file"
            type="file"
            onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))}
          />
          {file && <img src={file} alt="file" />}
          <label htmlFor="addItem">Название продукта:</label>
          <select id="addItem" name="product items">
            {prodSubTypes.list &&
              prodSubTypes.list.map(({ Id, Name }) => (
                <option key={Id} value={Name}>
                  {Name}
                </option>
              ))}
          </select>
          <label htmlFor="productName">Название:</label>
          <input
            id="productName"
            type="text"
            placeholder="Написать..."
            autoComplete="off"
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
                // const prodType = list.filter(
                //   (item) => item.Name === selectValue
                // )[0];
                // dispatch(
                //   addProductSubtype({ ProductTypeId: prodType.Id, Name: value })
                // );
                // setValue("");
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
