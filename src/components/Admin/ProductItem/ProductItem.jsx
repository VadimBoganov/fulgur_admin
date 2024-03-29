import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { NavLink } from "react-router-dom";
import styles from "../Admin.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductSubtypes } from "../../../app/productSubtypeSlice";
import {
  fetchProductItems,
  removeProductItem,
  updateProductItem,
} from "../../../app/productItemsSlice";
import { Accordion } from "react-bootstrap";
import StringInput from "../Common/Inputs/StringInput";

const ProductItem = () => {
  const dispatch = useDispatch();

  const [file, setFile] = useState("");
  const [_name, setName] = useState("");
  const [_link, setLink] = useState();

  const prodSubTypes = useSelector(({ productsubtypes }) => productsubtypes);

  useEffect(() => {
    dispatch(fetchProductSubtypes());
    dispatch(fetchProductItems());
  }, [dispatch]);

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
        <Accordion data-bs-theme="dark">
          {list &&
            list.map(({ id, productSubTypeId, name, imageUrl, link }) => (
              <Accordion.Item key={id} eventKey={id}>
                <Accordion.Header>{name}</Accordion.Header>
                <Accordion.Body>
                  <form key={id} className={styles.form}>
                    <label htmlFor="file">Изображение:</label>
                    <input
                      id="file"
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    {imageUrl && <img src={imageUrl} alt="file" />}
                    {file && (
                      <>
                        <span style={{ margin: "auto" }}>Заменить на:</span>
                        <img src={URL.createObjectURL(file)} alt="file" />
                      </>
                    )}
                    <label htmlFor="addItem">Название продукта:</label>
                    <select
                      id="addItem"
                      name="product items"
                      defaultValue={prodSubTypes.list.filter(item => item.id === productSubTypeId)[0]?.name}
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
                      placeholder={name}
                      autoComplete="off"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <StringInput
                      id={id}
                      value={link}
                      labelValue={"Ссылка"}
                      setValue={setLink}
                    />
                    <section>
                      <button
                        className={styles.button}
                        onClick={(e) => {
                          e.preventDefault();
                          const prodSubType =
                            selectValue === null || selectValue === undefined
                              ? prodSubTypes.list[0]
                              : prodSubTypes.list.filter(
                                (item) => item.name === selectValue
                              )[0];
                          dispatch(
                            updateProductItem({
                              Id: id,
                              ProductSubTypeId: prodSubType.id,
                              Name: _name || name,
                              File: file,
                              Link: _link || link,
                            })
                          );
                          setName("");
                          setFile(null);
                        }}
                      >
                        Обновить
                      </button>
                      <button
                        className={styles.remove_button}
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(removeProductItem(id));
                        }}
                      >
                        Удалить
                      </button>

                    </section>

                  </form>
                </Accordion.Body>
              </Accordion.Item>
            ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ProductItem;
