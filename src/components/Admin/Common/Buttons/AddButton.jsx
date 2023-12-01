import React from "react";
import styles from '../../Admin.module.scss'
import { useDispatch } from "react-redux";

const AddButton = ({data, func, validate}) => {
  const dispatch = useDispatch();

  return (
    <button
      className={styles.button}
      onClick={(e) => {
        e.preventDefault();
        validate() && dispatch(func(data));
      }}
    >
      Добавить
    </button>
  );
};

export default AddButton;
