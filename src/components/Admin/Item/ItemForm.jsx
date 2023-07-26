import React, { useState } from "react";
import styles from "../Admin.module.scss";

const ItemForm = (props) => {
  const [file, setFile] = useState("");

  return (
    <form className={styles.form}>
        <label htmlFor="file">Изображение:</label>
      <input
      id="file"
        type="file"
        onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))}
      />
      {file && <img src={file} alt="file" />}
      <label htmlFor="addItem">Название продукта:</label>
      <select id="addItem" name="product items">
        <option value="Пос-61">Пос-61</option>
        <option value="Пос-60">Пос-60</option>
        <option value="Пос-62">Пос-62</option>
        <option value="Пос-30">Пос-30</option>
      </select>
      <label htmlFor="productName">Название:</label>
      <input id="productName" type="text" placeholder="Написать..." autoComplete="off" />
      <label htmlFor="price">Цена (от):</label>
      <input id="price" type="number" placeholder="Ввести..." min="0" />
      <button
        className={styles.button}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Добавить
      </button>
    </form>
  );
};

export default ItemForm;
