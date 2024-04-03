import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../Admin.module.scss";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductSubtypes } from "../../../app/productSubtypeSlice";
import { fetchProductTypes} from "../../../app/productTypesSlice"
import { addProductItem } from "../../../app/productItemsSlice";
import AddButton from "../Common/Buttons/AddButton";
import StringInput from "../Common/Inputs/StringInput";

const ProductItemAdd = () => {
  const dispatch = useDispatch();

  const [file, setFile] = useState();
  const [value, setValue] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    dispatch(fetchProductSubtypes());
    dispatch(fetchProductTypes())
  }, [dispatch]);

  const prodSubTypes = useSelector(({ productsubtypes }) => productsubtypes);
  const productTypes = useSelector(({ producttypes}) => producttypes);

  const [selectValue, setSelectValue] = useState();
  const [selectType, setSelectType] = useState();

  function validate() {
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
        <form className={styles.form}>
          <label htmlFor="file">Изображение:</label>
          <input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file && <img src={URL.createObjectURL(file)} alt="file" />}
          <label htmlFor="addType">Тип продукта:</label>
          <select
            id="addType"
            name="product types"
            onChange={(e) => {
              setSelectType(e.target.value)
              
            }}
          >
            {productTypes.list &&
              productTypes.list.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
          </select>
          <label htmlFor="addItem">Название продукта:</label>
          <select
            id="addItem"
            name="product items"
            onChange={(e) => setSelectValue(e.target.value)}
          >
            {prodSubTypes.list &&
              prodSubTypes.list.filter(st => st.productTypeId === productTypes.list.filter(pt => pt.name === selectType)[0]?.id).map(({ id, name }) => (
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
          <StringInput
            value={link}
            labelValue={"Ссылка"}
            setValue={setLink}
          />
          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            to={`/admin/productitem`}
          >
            <AddButton
              data={{
                ProductTypeId: productTypes.list.filter((item) => item.name === selectType)[0]?.id || productTypes.list[0].id,
                ProductSubTypeId: prodSubTypes.list.filter((item) => item.name === selectValue)[0]?.id,
                Name: value,
                File: file,
                Link: link
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
