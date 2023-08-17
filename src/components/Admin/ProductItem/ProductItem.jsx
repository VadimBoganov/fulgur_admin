import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { NavLink } from "react-router-dom";
import styles from "../Admin.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductSubtypes } from "../../../app/productSubtypeSlice";

const ProductItem = () => {
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
        <NavLink
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
          to={`/admin/productitem/add`}
        >
          <button className={styles.add_button}>Добавить</button>
        </NavLink>
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
          <section>
            <button
              className={styles.button}
              onClick={(e) => {
                e.preventDefault();
                // const prod = prods.list.filter((item) => item.Name === selectValue)[0]
                // dispatch(
                //   updateProductType({Id: Id, ProductId: prod.Id, Name: value })
                // );
                // setValue('');
              }}
            >
              Обновить
            </button>
            <button
              className={styles.remove_button}
              onClick={(e) => {
                e.preventDefault();
                //dispatch(removeProductType(Id));
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

export default ProductItem;
