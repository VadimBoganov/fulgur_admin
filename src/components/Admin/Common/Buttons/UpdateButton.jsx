import React from "react";
import styles from "../../Admin.module.scss";
import { useDispatch } from "react-redux";

const UpdateButton = ({data, func, setFile}) => {
  const dispatch = useDispatch();

  return (
    <button
      className={styles.button}
      onClick={(e) => {
        e.preventDefault();
        dispatch(func(data));
        setFile(null)
      }}
    >
      Обновить
    </button>
  );
};

export default UpdateButton;
