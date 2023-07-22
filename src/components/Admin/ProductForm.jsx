import { React, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Admin.module.scss";
import { removeProduct, updateProduct } from "../../app/productsSlice";

const ProductForm = (props) => {
  const dispatch = useDispatch();
  const [val, setVal] = useState("");

  return (
    <div className={styles.form}>
      <form>
        <label>{props.name}:</label>
        <input
          type="text"
          placeholder="type..."
          autoComplete="off"
          value={val.id}
          onChange={(e) => setVal(e.target.value)}
        />
        <button
          className={styles.removeBtn}
          onClick={() => dispatch(removeProduct(props.id))}
        >
          Remove
        </button>
        <button
          className={styles.button}
          onClick={(e) => {
            const data = {
              id: props.id,
              name: val,
            };
            dispatch(updateProduct(data));
          }}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
