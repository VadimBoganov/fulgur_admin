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
import { fetchUsers } from "../../../app/usersSlice";

const ProductType = () => {
  const dispatch = useDispatch();
  const prods = useSelector(({ products }) => products);
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(fetchUsers())
  },[dispatch])


  useEffect(() => {
    dispatch(fetchProductTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
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
            list.map(({ Id, ProductId, Name }) => (
              <Accordion.Item key={Id} eventKey={Id}>
                <Accordion.Header>{Name}</Accordion.Header>
                <Accordion.Body>
                  <form key={Id} className={styles.form}>
                    <label htmlFor="productType">Название продукции:</label>
                    <select
                      id="productType"
                      name="product types"
                      defaultValue={Id === ProductId}
                      onChange={(e) => setSelectValue(e.target.value)}
                    >
                      {prods.list &&
                        prods.list.map(({ Id, Name }) => (
                          <option key={Id} value={Name}>
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
                          const prod =
                            selectValue === null || selectValue === undefined
                              ? prods.list[0]
                              : prods.list.filter(
                                  (item) => item.Name === selectValue
                                )[0];
                          dispatch(
                            updateProductType({
                              Id: Id,
                              ProductId: prod.Id,
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
                          dispatch(removeProductType(Id));
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
