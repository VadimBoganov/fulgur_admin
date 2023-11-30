import React from "react";
import styles from "../../Admin.module.scss";
import { useDispatch } from "react-redux";

const RemoveButton = ({id, func}) => {
  const dispatch = useDispatch();

  return (
    <button
      className={styles.remove_button}
      onClick={(e) => {
        e.preventDefault();
        dispatch(func(id));
      }}
    >
      Удалить
    </button>
  );
};

export default RemoveButton;
