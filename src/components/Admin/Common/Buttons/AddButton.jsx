import React from "react";
import styles from '../../Admin.module.scss'
import { useDispatch } from "react-redux";

const AddButton = ({ data, func, validate }) => {
  const dispatch = useDispatch();

  return (
    <button
      className={styles.button}
      onClick={(e) => { 
        validate() ? dispatch(func(data)) : e.preventDefault()
      }}
    >
      Добавить
    </button>
  );
};

export default AddButton;
