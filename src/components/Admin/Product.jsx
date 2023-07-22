import { React, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, fetchProducts } from "../../app/productsSlice";
import styles from "./Admin.module.scss";
import ProductForm from "./ProductForm";

const Product = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const { list } = useSelector(({ products }) => products);

  const [addVal, setAddVal] = useState("");

  const inputRef = useRef(null);

  return (
    <div className={styles.container}>
      {list.map(({ Id, Name }) => (
        <ProductForm key={Id} id={Id} name={Name} />
      ))}
      <div className={styles.add_form}>
        <form>
          <label>Add:</label>
          <input
            type="text"
            ref={inputRef}
            placeholder="type..."
            autoComplete="off"
            value={addVal}
            onChange={(e) => setAddVal(e.target.value)}
          />
          <button
            className={styles.button}
            onClick={() => {
              dispatch(addProduct([{ Name: inputRef.current.value }]));
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
