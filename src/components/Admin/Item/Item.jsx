import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import styles from "../Admin.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchProductItems } from "../../../app/productItemsSlice";
import { fetchItems, removeItem, updateItem } from "../../../app/itemsSlice";
import { Accordion } from "react-bootstrap";
import { fetchUsers } from "../../../app/usersSlice";
import CheckboxInput from "../Common/Inputs/CheckboxInput";
import DropdownInput from "../Common/Inputs/DropdownInput";
import FileInput from "../Common/Inputs/FileInput";
import NumberInput from "../Common/Inputs/NumberInput";
import StringInput from "../Common/Inputs/StringInput";
import RemoveButton from "../Common/Buttons/RemoveButton";
import UpdateButton from "../Common/Buttons/UpdateButton";

const Item = () => {
  const dispatch = useDispatch();

  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [isFullPrice, setIsFullPrice] = useState();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const [selectValue, setSelectValue] = useState(false);

  const productItems = useSelector(({ productitems }) => productitems);
  const items = useSelector(({ items }) => items);

  const groups = items.list.reduce(
    (item, { Id, ProductItemId, Name, Price, IsFullPrice }) => {
      if (!item[ProductItemId]) item[ProductItemId] = [];
      item[ProductItemId].push({ Id, ProductItemId, Name, Price, IsFullPrice });
      return item;
    },
    {}
  );

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
          {groups &&
            Object.entries(groups).map((group, index) => {
              return (
                <div key={index}>
                  <h3 key={index} className={styles.group}>
                    {
                      productItems.list.filter(
                        (pi) => pi.Id === parseInt(group[0])
                      )[0]?.Name
                    }
                  </h3>
                  {group[1].map(
                    (
                      { Id, ProductItemId, Name, Price, IsFullPrice },
                      index
                    ) => (
                      <Accordion.Item key={Id} eventKey={Id}>
                        <Accordion.Header>{Name}</Accordion.Header>
                        <Accordion.Body>
                          <form key={Id} className={styles.form}>
                            <FileInput
                              item={items.list[index]}
                              labelValue={"Изображение"}
                              setValue={setFile}
                            />
                            <DropdownInput
                              id={Id}
                              value={ProductItemId}
                              labelValue={"Название продукта"}
                              setValue={setSelectValue}
                              options={productItems.list}
                            />
                            <StringInput
                              id={Id}
                              value={Name}
                              labelValue={"Название изделия"}
                              setValue={setName}
                            />
                            <div className={styles.price}>
                              <NumberInput
                                id={Id}
                                value={Price}
                                labelValue={"Цена"}
                                setValue={setPrice}
                              />
                              <CheckboxInput
                                id={Id}
                                value={IsFullPrice}
                                labelValue={"Выводить цену (от)"}
                                setValue={setIsFullPrice}
                              />
                            </div>
                            <section>
                              <UpdateButton
                                data={{
                                  Id: Id,
                                  ProductItemId: selectValue
                                    ? productItems.list.filter(
                                        (pi) => pi.Name === selectValue
                                      )[0]?.Id
                                    : ProductItemId,
                                  Name: name || Name,
                                  Price: price || Price,
                                  IsFullPrice:
                                    isFullPrice === undefined
                                      ? IsFullPrice
                                      : isFullPrice,
                                  File: file,
                                }}
                                func={updateItem}
                              />
                              <RemoveButton id={Id} func={removeItem} />
                            </section>
                          </form>
                        </Accordion.Body>
                      </Accordion.Item>
                    )
                  )}
                </div>
              );
            })}
        </Accordion>
      </div>
    </div>
  );
};

export default Item;
