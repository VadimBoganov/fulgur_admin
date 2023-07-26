import React from "react";
import styles from "../../Admin.module.scss";
import { useDispatch } from "react-redux";
import { removeProduct } from "../../../../app/productsSlice";

const RemoveButton = (props) => {
  const dispatch = useDispatch();

  return (
    <button
      className={styles.removeBtn}
      onClick={(e) => {
        e.preventDefault();
        dispatch(removeProduct(props.data));
      }}
    >
      Удалить
    </button>
  );
};

export default RemoveButton;
