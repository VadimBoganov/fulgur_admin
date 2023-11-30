import React from "react";

const FileInput = ({item, setValue, labelValue}) => {
  const hash = require("object-hash");
  const hashValue = hash({
    item: item,
    labelValue: labelValue,
    setValue: setValue,
  });
  return (
    <>
      <label htmlFor={hashValue}>{labelValue}:</label>
      <input
        id={hashValue}
        type="file"
        onChange={(e) => setValue(e.target.files[0])}
      />
      {item.ImageUrl && <img src={item.ImageUrl} alt="file" />}
      {item.file && (
        <>
          <span style={{ margin: "auto" }}>Заменить на:</span>
          <img src={URL.createObjectURL(item.file)} alt="file" />
        </>
      )}
    </>
  );
};

export default FileInput;
