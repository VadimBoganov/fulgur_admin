import { React, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../app/productsSlice";
import styles from "./Admin.module.scss";
import ProductForm from "./ProductForm";

const Product = (props) => {
  const dispatch = useDispatch();
  
  const [addVal, setAddVal] = useState("");

  const inputRef = useRef(null);
  return (    
    <div className={styles.container}>
      {props.prods && props.prods.map(({ Id, Name }) => (
        <ProductForm key={Id} id={Id} name={Name} />
      ))}
      <div className={styles.add_form}>
        <form>
          <label htmlFor="add">Add:</label>
          <input
            id="add"
            type="text"
            ref={inputRef}
            placeholder="type..."
            autoComplete="off"
            value={addVal}
            onChange={(e) => setAddVal(e.target.value)}
          />
          <button
            className={styles.button}
            onClick={(e) => {
              e.preventDefault();
              dispatch(addProduct([{ Name: inputRef.current.value }]));
              setAddVal('')
            }}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Product;
