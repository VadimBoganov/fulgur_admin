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
import { Accordion, Spinner } from "react-bootstrap";
import StringInput from "../Common/Inputs/StringInput";

const ProductSubtype = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [_link, setLink] = useState()
  const [selectValue, setSelectValue] = useState();

  const prodTypes = useSelector(({ producttypes }) => producttypes);
  const productSubtypes = useSelector(({ productsubtypes }) => productsubtypes);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    Promise.all([
      dispatch(fetchProductTypes()),
      dispatch(fetchProductSubtypes()),
    ]).then(() => setReady(true));
  }, [dispatch]);

  const isLoading = !ready;

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
        {isLoading && (
          <div className={styles.spinner_wrapper}>
            <Spinner animation="border" variant="light" role="status" />
          </div>
        )}
        <Accordion data-bs-theme="dark">
          {!isLoading &&
            productSubtypes.list.map(({ id, productTypeId, name, link }) => (
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
                      {prodTypes.list.map(({ id, name }) => (
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
                          const prodType =
                            selectValue === null || selectValue === undefined
                              ? prodTypes.list.filter(item => item.id === productTypeId)[0]
                              : prodTypes.list.filter(
                                (item) => item.name === selectValue
                              )[0];
                          dispatch(
                            updateProductSubtype({
                              Id: id,
                              ProductTypeId: prodType.id,
                              Name: value || name,
                              Link: _link || link
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
