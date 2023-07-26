import React from "react";
import styles from '../../Admin.module.scss'
import { addProduct } from "../../../../app/productsSlice";
import { useDispatch } from "react-redux";

const AddButton = (props) => {
  const dispatch = useDispatch();

  return (
    <button
      type="submit"
      className={styles.button}
      onClick={(e) => {
        e.preventDefault();
        dispatch(addProduct(props.data));
      }}
    >
      Добавить
    </button>
  );
};

export default AddButton;
