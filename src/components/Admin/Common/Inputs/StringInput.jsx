import React from "react";

const StringInput = ({ id, value, setValue, labelValue}) => {
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
        type="text"
        placeholder={value}
        autoComplete="off"
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default StringInput;
