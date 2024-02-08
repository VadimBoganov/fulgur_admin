import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductSubtypes,
  removeProductSubtype,
  updateProductSubtype,
} from "../../../app/productSubtypeSlice";
import styles from "../Admin.module.scss";
import { fetchProductTypes } from "../../../app/productTypesSlice";
import { Accordion } from "react-bootstrap";

const ProductSubtype = () => {
  const dispatch = useDispatch();
  const prodTypes = useSelector(({ producttypes }) => producttypes);
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(fetchProductTypes());
    dispatch(fetchProductSubtypes());
  }, [dispatch]);

  const { list } = useSelector(({ productsubtypes }) => productsubtypes);

  const [selectValue, setSelectValue] = useState();

  return (
    <div className={styles.admin}>
      <Sidebar />
      <div className={styles.container}>
        <NavLink
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
          to={`/admin/productsubtype/add`}
        >
          <button className={styles.add_button}>Добавить</button>
        </NavLink>
        <Accordion data-bs-theme="dark">
          {list &&
            list.map(({ id, productTypeId, name }) => (
              <Accordion.Item key={id} eventKey={id}>
                <Accordion.Header>{name}</Accordion.Header>
                <Accordion.Body>
                  <form key={id} className={styles.form}>
                    <label htmlFor="productSubtype">Название продукции:</label>
                    <select
                      id="productSubtype"
                      name="product sub types"
                      defaultValue={prodTypes.list.filter(item => item.id === productTypeId)[0]?.name}
                      onChange={(e) => setSelectValue(e.target.value)}
                    >
                      {prodTypes.list &&
                        prodTypes.list.map(({ id, name }) => (
                          <option key={id} value={name}>
                            {name}
                          </option>
                        ))}
                    </select>
                    <label htmlFor={id}>Название:</label>
                    <input
                      id={id}
                      type="text"
                      placeholder={name}
                      autoComplete="off"
                      onChange={(e) => setValue(e.target.value)}
                    />
                    <section>
                      <button
                        className={styles.button}
                        onClick={(e) => {
                          e.preventDefault();
                          const prodType =
                            selectValue === null || selectValue === undefined
                              ? prodTypes.list[0]
                              : prodTypes.list.filter(
                                  (item) => item.name === selectValue
                                )[0];
                          dispatch(
                            updateProductSubtype({
                              Id: id,
                              ProductTypeId: prodType.id,
                              Name: value || name,
                            })
                          );
                          setValue("");
                        }}
                      >
                        Обновить
                      </button>
                      <button
                        className={styles.remove_button}
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(removeProductSubtype(id));
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

export default ProductSubtype;
