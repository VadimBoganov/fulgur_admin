import React from "react";
import styles from '../../Admin.module.scss'

const CheckboxInput = ({ id, value,  setValue, labelValue }) => {
  const hash = require("object-hash");
  const hashValue = hash({
    id: id,
    value: value,
    label: labelValue,
    setValue: setValue,
  });

  return (
    <>
      <label htmlFor={hashValue}>{labelValue}:</label>
      <input
        id={hashValue}
        type="checkbox"
        defaultChecked={value}
        className={styles.checkbox}
        onChange={(e) => setValue(e.target.checked)}
      />
    </>
  );
};

export default CheckboxInput;
