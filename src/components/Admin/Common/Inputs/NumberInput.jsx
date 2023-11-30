import React from "react";

const NumberInput = ({ id, value, setValue, labelValue}) => {
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
        type="number"
        placeholder={value}
        min="0"
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default NumberInput;
