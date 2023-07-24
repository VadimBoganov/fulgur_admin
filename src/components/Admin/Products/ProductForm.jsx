import { React, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../Admin.module.scss";
import { removeProduct, updateProduct } from "../../../app/productsSlice";

const ProductForm = (props) => {
  const dispatch = useDispatch();
  const [val, setVal] = useState("");

  return (
    <form className={styles.form}>
      <label htmlFor={props.id}>{props.name}:</label>
      <input
        id={props.id}
        type="text"
        placeholder="type..."
        autoComplete="off"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <button
        className={styles.button}
        onClick={(e) => {
          e.preventDefault();
          const data = {
            id: props.id,
            name: val,
          };
          dispatch(updateProduct(data));
          setVal("");
        }}
      >
        Update
      </button>
      <button
        className={styles.removeBtn}
        onClick={(e) => {
          e.preventDefault();
          dispatch(removeProduct(props.id));
        }}
      >
        Remove
      </button>
    </form>
  );
};

export default ProductForm;
