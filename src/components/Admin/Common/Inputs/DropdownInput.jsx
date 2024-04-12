import React from "react";

const DropdownInput = ({id, value, setValue, labelValue, options }) => {
  const hash = require("object-hash");
  const hashValue = hash({
    id: id,
    value: value,
    label: labelValue,
    setValue: setValue,
    options: options
  });
  
  return (
    <>
      <label htmlFor={hashValue}>{labelValue}:</label>
      <select
        id={hashValue}
        value={options.filter((o) => o.id === value)[0]?.name}
        onChange={(e) => setValue(e.target.value)}
      >
        {options &&
          options.map(({ id, name }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
      </select>
    </>
  );
};

export default DropdownInput;
