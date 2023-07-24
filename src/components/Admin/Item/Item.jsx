import React from "react";
import styles from "../Admin.module.scss";
import ItemForm from "./ItemForm";

const Item = () => {
  return (<div className={styles.container}>
    <ItemForm/>
  </div>)
};

export default Item;
