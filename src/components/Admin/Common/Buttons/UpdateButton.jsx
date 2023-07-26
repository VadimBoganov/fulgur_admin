import React from "react";
import styles from "../../Admin.module.scss";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../../app/productsSlice";

const UpdateButton = (props) => {
  const dispatch = useDispatch();

  return (
    <button
      className={styles.button}
      onClick={(e) => {
        e.preventDefault();
        dispatch(updateProduct(props.data));
      }}
    >
      Обновить
    </button>
  );
};

export default UpdateButton;
