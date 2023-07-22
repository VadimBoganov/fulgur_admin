import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../app/productsSlice";
import styles from "./Admin.module.scss";

const Product = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const { list } = useSelector(({ products }) => products);

  const [val, setVal] = useState({});

  const onClick = () => {
    alert(val);
  };

  const onChange = (e) => {
    setVal(e.target.value);
  };

  return (
    <>
      {list.map(({ Id, Name }) => (
        <div key={Id} className={styles.container}>
          <div className={styles.form}>
            <form key={Id}>
              <label htmlFor={Id}> {Name}:</label>
              <input
                id={Id}
                type="text"
                placeholder="type..."
                autoComplete="off"
                value={val[Id]}
                onChange={onChange}
              />
              <button key={Id} className={styles.button} onClick={onClick}>
                Update
              </button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default Product;
