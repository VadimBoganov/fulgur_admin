import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { NavLink } from "react-router-dom";
import styles from "../Admin.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductSubtypes } from "../../../app/productSubtypeSlice";
import {fetchProductItems, removeProductItem, updateProductItem} from "../../../app/productItemsSlice"

const ProductItem = () => {
  const dispatch = useDispatch();
 
  const [file, setFile] = useState("");
  const [value, setValue] = useState("");

  const prodSubTypes = useSelector(({ productsubtypes }) => productsubtypes);

  useEffect(() => {
    dispatch(fetchProductSubtypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductItems())
  }, [dispatch])

  const { list } = useSelector(({ productitems }) => productitems);
  
  const [selectValue, setSelectValue] = useState();

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
        {list && list.map(({Id, ProductSubTypeId, Name, ImageUrl}) => (
          <form key={Id} className={styles.form}>
          <label htmlFor="file">Изображение:</label>
          <input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {ImageUrl && <img src={ImageUrl} alt="file" />}
          {file && <><span style={{margin:"auto"}}>Заменить на:</span><img src={URL.createObjectURL(file)} alt="file"/></>}
          <label htmlFor="addItem">Название продукта:</label>
          <select id="addItem" name="product items" defaultValue={prodSubTypes.list.length > 0 && prodSubTypes.list.filter((item) => item.Id === ProductSubTypeId)[0].Name} onChange={(e) => setSelectValue(e.target.value)}>
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
            placeholder={Name}
            autoComplete="off"
            onChange={(e) => setValue(e.target.value)}
          />
          <section>
            <button
              className={styles.button}
              onClick={(e) => {
                e.preventDefault();
                const prodSubType = selectValue === null || selectValue === undefined ? prodSubTypes.list[0] : prodSubTypes.list.filter((item) => item.Name === selectValue)[0]
                const name = value ? value : Name
                dispatch(
                  updateProductItem({Id: Id, ProductSubTypeId: prodSubType.Id, Name: name, File: file })
                );
                setValue('');
                setFile(null)
              }}
            >
              Обновить
            </button>
            <button
              className={styles.remove_button}
              onClick={(e) => {
                e.preventDefault();
                dispatch(removeProductItem(Id));
              }}
            >
              Удалить
            </button>
          </section>
        </form>
        ))}        
      </div>
    </div>
  );
};

export default ProductItem;