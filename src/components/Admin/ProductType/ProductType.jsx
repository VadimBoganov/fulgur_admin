import React, { useEffect, useState } from "react";
import styles from "../Admin.module.scss";
import Sidebar from "../Sidebar";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductTypes,
  removeProductType,
  updateProductType,
} from "../../../app/productTypesSlice";
import { fetchProducts } from "../../../app/productsSlice";
import { Accordion } from "react-bootstrap";
import StringInput from "../Common/Inputs/StringInput";

const ProductType = () => {
  const dispatch = useDispatch();
  const prods = useSelector(({ products }) => products);
  const [value, setValue] = useState("");
  const [_link, setLink] = useState()

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchProductTypes());
  }, [dispatch]);

  const { list } = useSelector(({ producttypes }) => producttypes);
  
  const [selectValue, setSelectValue] = useState();

  return (
    <div className={styles.admin}>
      <Sidebar />
      <div className={styles.container}>
        <NavLink
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
          to={`/admin/producttype/add`}
        >
          <button className={styles.add_button}>Добавить</button>
        </NavLink>
        <Accordion data-bs-theme="dark">
          {list &&
            list.map(({ id, productId, name, link }) => (
              <Accordion.Item key={id} eventKey={id}>
                <Accordion.Header>{name}</Accordion.Header>
                <Accordion.Body>
                  <form key={id} className={styles.form}>
                    <label htmlFor="productType">Название продукции:</label>
                    <select
                      id="productType"
                      name="product types"
                      defaultValue={prods.list.filter(item => item.id === productId)[0]?.name}
                      onChange={(e) => setSelectValue(e.target.value)}
                    >
                      {prods.list &&
                        prods.list.map(({ id, name }) => (
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
                          const prod =
                            selectValue === null || selectValue === undefined
                              ? prods.list[0]
                              : prods.list.filter(
                                  (item) => item.name === selectValue
                                )[0];
                          dispatch(
                            updateProductType({
                              Id: id,
                              ProductId: prod.id,
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
                          dispatch(removeProductType(id));
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

export default ProductType;
