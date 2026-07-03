import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../Sidebar";
import styles from "../Admin.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchProductItems } from "../../../app/productItemsSlice";
import { fetchItems, removeItem, updateItem } from "../../../app/itemsSlice";
import { Accordion, Spinner } from "react-bootstrap";
import CheckboxInput from "../Common/Inputs/CheckboxInput";
import DropdownInput from "../Common/Inputs/DropdownInput";
import FileInput from "../Common/Inputs/FileInput";
import NumberInput from "../Common/Inputs/NumberInput";
import StringInput from "../Common/Inputs/StringInput";
import RemoveButton from "../Common/Buttons/RemoveButton";
import UpdateButton from "../Common/Buttons/UpdateButton";

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const handleSearch = () => onSearch(value);

  return (
    <div className={styles.search_bar}>
      <input
        type="text"
        placeholder="Поиск по типу продукта..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button className={styles.search_button} onClick={handleSearch}>
        Найти
      </button>
      {value && (
        <button
          className={styles.search_button}
          onClick={() => { setValue(""); onSearch(""); }}
        >
          Сбросить
        </button>
      )}
    </div>
  );
};

const Item = () => {
  const dispatch = useDispatch();

  const [_file, setFile] = useState("");
  const [_name, setName] = useState("");
  const [_price, setPrice] = useState(0);
  const [_isFullPrice, setIsFullPrice] = useState();
  const [_link, setLink] = useState();
  const [selectValue, setSelectValue] = useState(false);
  const [activeSearch, setActiveSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const productItems = useSelector(({ productitems }) => productitems);
  const items = useSelector(({ items }) => items);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    Promise.all([
      dispatch(fetchProductItems()),
      dispatch(fetchItems()),
    ]).then(() => setReady(true));
  }, [dispatch]);

  const productItemsMap = useMemo(
    () => new Map(productItems.list.map((pi) => [pi.id, pi.name])),
    [productItems.list]
  );

  const groups = useMemo(
    () =>
      items.list.reduce(
        (item, { id, productItemId, name, price, imageUrl, isFullPrice, link }) => {
          if (!item[productItemId]) item[productItemId] = [];
          item[productItemId].push({ id, productItemId, name, price, imageUrl, isFullPrice, link });
          return item;
        },
        {}
      ),
    [items.list]
  );

  const sortedGroups = useMemo(
    () => Object.entries(groups).sort((a, b) => b[1].length - a[1].length),
    [groups]
  );

  const visibleGroups = useMemo(() => {
    if (!activeSearch.trim()) return sortedGroups.slice(0, 10);
    const query = activeSearch.trim().toLowerCase();
    return sortedGroups.filter(([productItemId]) =>
      productItemsMap.get(parseInt(productItemId))?.toLowerCase().includes(query)
    );
  }, [sortedGroups, activeSearch, productItemsMap]);

  const handleSearch = (query) => {
    setIsSearching(true);
    setActiveSearch(query);
  };

  useEffect(() => {
    if (!isSearching) return;
    const timer = setTimeout(() => setIsSearching(false), 400);
    return () => clearTimeout(timer);
  }, [isSearching]);

  const isLoading = !ready;

  return (
    <div className={styles.admin}>
      <Sidebar />
      <div className={styles.container}>
        <NavLink
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
          to={`/item/add`}
        >
          <button className={styles.add_button}>Добавить</button>
        </NavLink>
        {(isLoading || isSearching) && (
          <div className={styles.spinner_wrapper}>
            <Spinner animation="border" variant="light" role="status" />
          </div>
        )}
        {!isLoading && (
          <>
            <SearchBar onSearch={handleSearch} />
            <p className={styles.search_info}>
              {activeSearch
                ? `Результаты по "${activeSearch}": ${visibleGroups.length}`
                : `Топ-10 по количеству позиций (всего типов: ${sortedGroups.length})`}
            </p>
          </>
        )}
        <Accordion data-bs-theme="dark">
          {!isLoading && !isSearching &&
            visibleGroups.map((group, index) => {
              return (
                <div key={index}>
                  <h3 key={index} className={styles.group}>
                    {productItemsMap.get(parseInt(group[0]))}
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
