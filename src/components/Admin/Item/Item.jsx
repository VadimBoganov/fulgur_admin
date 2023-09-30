import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import styles from "../Admin.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchProductItems } from "../../../app/productItemsSlice";
import { fetchItems, removeItem, updateItem } from "../../../app/itemsSlice";
import { Accordion } from "react-bootstrap";

const Item = () => {
  const dispatch = useDispatch();

  const [file, setFile] = useState("");
  const [value, setValue] = useState("");
  const [price, setPrice] = useState(0);

  const productItems = useSelector(({ productitems }) => productitems);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductItems());
  }, [dispatch]);

  const { list } = useSelector(({ items }) => items);

  const [selectValue, setSelectValue] = useState();

  return (
    <div className={styles.admin}>
      <Sidebar />
      <div className={styles.container}>
        <NavLink
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
          to={`/admin/item/add`}
        >
          <button className={styles.add_button}>Добавить</button>
        </NavLink>
        <Accordion data-bs-theme="dark">
          {list &&
            list.map(({ Id, ProductItemId, Name, Price, ImageUrl }) => (
              <Accordion.Item key={Id} eventKey={Id}>
                <Accordion.Header>{Name}</Accordion.Header>
                <Accordion.Body>
                  <form key={Id} className={styles.form}>
                    <label htmlFor="file">Изображение:</label>
                    <input
                      id="file"
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    {ImageUrl && <img src={ImageUrl} alt="file" />}
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
                      onChange={(e) => setSelectValue(e.target.value)}
                    >
                      {productItems.list &&
                        productItems.list.map(({ Id, Name }) => (
                          <option key={Id} value={Name} selected={Id === ProductItemId}>
                            {Name}
                          </option>
                        ))}
                    </select>
                    <label htmlFor="productName">Название:</label>
                    <input
                      id="productName"
                      type="text"
                      placeholder={Name}
                      autoComplete="off"
                      onChange={(e) => setValue(e.target.value)}
                    />
                    <label htmlFor="price">Цена (от):</label>
                    <input
                      id="price"
                      type="number"
                      placeholder={Price}
                      min="0"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <section>
                      <button
                        className={styles.button}
                        onClick={(e) => {
                          e.preventDefault();
                          const productItem =
                            selectValue === null || selectValue === undefined
                              ? productItems.list[0]
                              : productItems.list.filter(
                                  (item) => item.Name === selectValue
                                )[0];
                          console.log(file);
                          dispatch(
                            updateItem({
                              Id: Id,
                              ProductItemId: productItem.Id,
                              Name: value || Name,
                              Price: price || Price,
                              File: file,
                            })
                          );
                          setValue("");
                          setFile("");
                        }}
                      >
                        Обновить
                      </button>
                      <button
                        className={styles.remove_button}
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(removeItem(Id));
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

export default Item;
