import { React, useEffect, useState } from "react";
import styles from "../Admin.module.scss";
import {
  fetchProducts,
  removeProduct,
  updateProduct,
} from "../../../app/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink} from "react-router-dom";
import Sidebar from "../Sidebar";
import { Accordion } from "react-bootstrap";
import { fetchUsers } from "../../../app/usersSlice";
import { fetchProductItems } from "../../../app/productItemsSlice";

const Product = () => {
  
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const { list } = useSelector(({ products }) => products);

  useEffect(() => {
    dispatch(fetchUsers())
  },[dispatch])

  useEffect(() => {
    dispatch(fetchProductItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={styles.admin}>
    <Sidebar />
    <div className={styles.container}>
      <NavLink
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ""}`
        }
        to={`/admin/product/add`}
      >
        <button className={styles.add_button}>Добавить</button>
      </NavLink>
      <Accordion data-bs-theme="dark">
        {list &&
          list.map(({ Id, Name }) => (
            <Accordion.Item key={Id} eventKey={Id}>
              <Accordion.Header>{Name}</Accordion.Header>
              <Accordion.Body>
                <form key={Id} className={styles.form}>
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
                        dispatch(
                          updateProduct({ id: Id, name: value || Name })
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
                        dispatch(removeProduct(Id));
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

export default Product;
