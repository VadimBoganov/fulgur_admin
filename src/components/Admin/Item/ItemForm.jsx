import React, { useState } from "react";
import styles from "../Admin.module.scss";

const ItemForm = (props) => {
  const [file, setFile] = useState("");

  return (
    <form className={styles.form}>
        <label>Изображение:</label>
      <input
        type="file"
        onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))}
      />
      {file && <img src={file} alt="file" />}
      <label>Название продукта:</label>
      <select name="product items">
        <option value="Пос-61">Пос-61</option>
        <option value="Пос-60">Пос-60</option>
        <option value="Пос-62">Пос-62</option>
        <option value="Пос-30">Пос-30</option>
      </select>
      <label>Название:</label>
      <input type="text" placeholder="Написать..." autoComplete="off" />
      <label>Цена (от):</label>
      <input type="number" placeholder="Ввести..." min="0" />
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
