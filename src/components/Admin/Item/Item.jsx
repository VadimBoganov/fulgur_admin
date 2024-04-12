import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import styles from "../Admin.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchProductItems } from "../../../app/productItemsSlice";
import { fetchItems, removeItem, updateItem } from "../../../app/itemsSlice";
import { Accordion } from "react-bootstrap";
import CheckboxInput from "../Common/Inputs/CheckboxInput";
import DropdownInput from "../Common/Inputs/DropdownInput";
import FileInput from "../Common/Inputs/FileInput";
import NumberInput from "../Common/Inputs/NumberInput";
import StringInput from "../Common/Inputs/StringInput";
import RemoveButton from "../Common/Buttons/RemoveButton";
import UpdateButton from "../Common/Buttons/UpdateButton";

const Item = () => {
  const dispatch = useDispatch();

  const [_file, setFile] = useState("");
  const [_name, setName] = useState("");
  const [_price, setPrice] = useState(0);
  const [_isFullPrice, setIsFullPrice] = useState();
  const [_link, setLink] = useState();

  useEffect(() => {
    dispatch(fetchProductItems());
    dispatch(fetchItems());
  }, [dispatch]);

  const [selectValue, setSelectValue] = useState(false);

  const productItems = useSelector(({ productitems }) => productitems);
  const items = useSelector(({ items }) => items);

  const groups = items.list.reduce(
    (item, { id, productItemId, name, price, imageUrl, isFullPrice, link }) => {
      if (!item[productItemId]) item[productItemId] = [];
      item[productItemId].push({ id, productItemId, name, price, imageUrl, isFullPrice, link });
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
                        (pi) => pi.id === parseInt(group[0])
                      )[0]?.name
                    }
                  </h3>
                  {group[1].map(
                    (
                      { id, productItemId, name, price, imageUrl, isFullPrice, link },
                      index
                    ) => (
                      <Accordion.Item key={id} eventKey={id}>
                        <Accordion.Header>{name}</Accordion.Header>
                        <Accordion.Body>
                          <form key={id} className={styles.form}>
                            <FileInput
                              item={{imageUrl: imageUrl, file: _file}}
                              labelValue={"Изображение"}
                              setValue={setFile}
                              isUpdate={true}
                            />
                            <DropdownInput
                              id={id}
                              value={productItemId}
                              labelValue={"Название продукта"}
                              setValue={setSelectValue}
                              options={productItems.list}
                            />
                            <StringInput
                              id={id}
                              value={name}
                              labelValue={"Название изделия"}
                              setValue={setName}
                            />
                            <div className={styles.price}>
                              <NumberInput
                                id={id}
                                value={price}
                                labelValue={"Цена"}
                                setValue={setPrice}
                              />
                              <CheckboxInput
                                id={id}
                                value={isFullPrice}
                                labelValue={"Выводить цену (от)"}
                                setValue={setIsFullPrice}
                              />
                            </div>
                            <StringInput
                              id={id}
                              value={link}
                              labelValue={"Ссылка"}
                              setValue={setLink}
                            />
                            <section>
                              <UpdateButton
                                data={{
                                  Id: id,
                                  ProductItemId: selectValue
                                    ? productItems.list.filter(
                                        (pi) => pi.name === selectValue
                                      )[0]?.id
                                    : productItemId,
                                  Name: _name || name,
                                  Price: _price || price,
                                  IsFullPrice:
                                    _isFullPrice === undefined
                                      ? isFullPrice
                                      : _isFullPrice,
                                  File: _file,
                                  Link: _link || link
                                }}
                                func={updateItem}
                                setFile={setFile}
                              />
                              <RemoveButton id={id} func={removeItem} />
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
