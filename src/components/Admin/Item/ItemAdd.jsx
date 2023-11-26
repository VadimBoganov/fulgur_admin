import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Admin.module.scss";
import { fetchProductItems } from "../../../app/productItemsSlice";
import Sidebar from "../Sidebar";
import { NavLink } from "react-router-dom";
import { addItem } from "../../../app/itemsSlice";
import { fetchUsers } from "../../../app/usersSlice";

const ItemAdd = () => {
  const dispatch = useDispatch();

  const [file, setFile] = useState();
  const [value, setValue] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    dispatch(fetchUsers())
  },[dispatch])

  useEffect(() => {
    dispatch(fetchProductItems());
  }, [dispatch]);

  const productItems = useSelector(({ productitems }) => productitems);

  const [selectValue, setSelectValue] = useState("");

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
          <label htmlFor="addItem">Название продукта:</label>
          <select
            id="addItem"
            name="product items"
            onChange={(e) => setSelectValue(e.target.value)}
          >
            {productItems.list &&
              productItems.list.map(({ Id, Name }) => (
                <option key={Id} value={Name}>
                  {Name}
                </option>
              ))}
          </select>
          <label htmlFor="productName">Название:</label>
          <input
            id="productName"
            type="text"
            placeholder="Написать..."
            autoComplete="off"
            onChange={(e) => setValue(e.target.value)}
          />
          <label htmlFor="price">Цена (от):</label>
          <input
            id="price"
            type="number"
            placeholder="Ввести..."
            min="0"
            onChange={(e) => setPrice(e.target.value)}
          />
          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            to={`/admin/item`}
          >
            <button
              className={styles.button}
              onClick={() => {
                const productItem = productItems.list.filter(
                  (item) => item.Name === selectValue || productItems.list[0]
                )[0];

                dispatch(
                  addItem({
                    ProductItemId: productItem.Id,
                    Name: value,
                    Price: price,
                    File: file,
                  })
                );
              }}
            >
              Добавить
            </button>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default ItemAdd;
