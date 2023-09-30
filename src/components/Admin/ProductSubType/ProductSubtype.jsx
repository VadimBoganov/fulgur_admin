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
  }, [dispatch]);

  useEffect(() => {
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
            list.map(({ Id, ProductTypeId, Name }) => (
              <Accordion.Item key={Id} eventKey={Id}>
                <Accordion.Header>{Name}</Accordion.Header>
                <Accordion.Body>
                  <form key={Id} className={styles.form}>
                    <label htmlFor="productSubtype">Название продукции:</label>
                    <select
                      id="productSubtype"
                      name="product sub types"
                      onChange={(e) => setSelectValue(e.target.value)}
                    >
                      {prodTypes.list &&
                        prodTypes.list.map(({ Id, Name }) => (
                          <option key={Id} value={Name} selected={Id === ProductTypeId}>
                            {Name}
                          </option>
                        ))}
                    </select>
                    <label htmlFor={Id}>Название:</label>
                    <input
                      id={Id}
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
                          const prodType =
                            selectValue === null || selectValue === undefined
                              ? prodTypes.list[0]
                              : prodTypes.list.filter(
                                  (item) => item.Name === selectValue
                                )[0];
                          dispatch(
                            updateProductSubtype({
                              Id: Id,
                              ProductTypeId: prodType.Id,
                              Name: value || Name,
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
                          dispatch(removeProductSubtype(Id));
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
