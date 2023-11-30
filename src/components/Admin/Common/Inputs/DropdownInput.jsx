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
        defaultValue={options.filter((o) => o.Id === value)[0]?.Name}
        onChange={(e) => setValue(e.target.value)}
      >
        {options &&
          options.map(({ Id, Name }) => (
            <option key={Id} value={Name}>
              {Name}
            </option>
          ))}
      </select>
    </>
  );
};

export default DropdownInput;
