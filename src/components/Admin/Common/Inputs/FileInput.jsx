import React from "react";

const FileInput = ({ item, setValue, labelValue, isUpdate }) => {
  const hash = require("object-hash");
  const hashValue = hash({
    item: item,
    labelValue: labelValue,
    setValue: setValue,
    isUpdate: isUpdate
  });
  
  return (
    <>
      <label htmlFor={hashValue}>{labelValue}:</label>
      <input
        id={hashValue}
        type="file"
        onChange={(e) => setValue(e.target.files[0])}
      />
      {isUpdate ? <>
        {item?.imageUrl && <img src={typeof (item?.imageUrl) === typeof ("") ? item.imageUrl : URL.createObjectURL(item.imageUrl)} alt="file" />}
        {item?.file && (
          <>
            <span style={{ margin: "auto" }}>Заменить на:</span>
            <img src={URL.createObjectURL(item?.file)} alt="file" />
          </>
        )}</> :
        <>{item?.file && <img src={URL.createObjectURL(item?.file)} alt="file" />}</>}
    </>
  );
};

export default FileInput;
