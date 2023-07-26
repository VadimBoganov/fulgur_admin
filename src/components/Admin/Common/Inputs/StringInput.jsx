import React, { useState } from "react";

const StringInput = (props) => {
  const [value, setValue] = useState("");

  return (
    <>
      <label htmlFor={props.id}>{props.name}:</label>
      <input
        key={props.id}
        id={props.id}
        type="text"
        placeholder="Написать..."
        autoComplete="off"
        value={value}
        onChange={(e) => {
          const data = e.target.value;
          setValue(data);
          props.func(data);
        }}
      />
    </>
  );
};

export default StringInput;
