import { React, useEffect, useState } from "react";
import styles from "../Admin.module.scss";
import {
  fetchProducts,
  removeProduct,
  updateProduct,
} from "../../../app/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Sidebar from "../Sidebar";
import { Accordion } from "react-bootstrap";
import StringInput from "../Common/Inputs/StringInput";

const Product = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [_link, setLink] = useState()

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const { list } = useSelector(({ products }) => products);

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
            list.map(({ id, name, link }) => (
              <Accordion.Item key={id} eventKey={id}>
                <Accordion.Header>{name}</Accordion.Header>
                <Accordion.Body>
                  <form key={id} className={styles.form}>
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
                          dispatch(
                            updateProduct({ id: id, name: value || name, link: _link || link })
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
                          dispatch(removeProduct(id));
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
