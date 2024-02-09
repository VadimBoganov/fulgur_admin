import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Admin.module.scss";
import { fetchProductItems } from "../../../app/productItemsSlice";
import Sidebar from "../Sidebar";
import { NavLink } from "react-router-dom";
import { addItem } from "../../../app/itemsSlice";
import FileInput from "../Common/Inputs/FileInput";
import StringInput from "../Common/Inputs/StringInput";
import DropdownInput from "../Common/Inputs/DropdownInput";
import NumberInput from "../Common/Inputs/NumberInput";
import CheckboxInput from "../Common/Inputs/CheckboxInput";
import AddButton from "../Common/Buttons/AddButton";

const ItemAdd = () => {
  const dispatch = useDispatch();

  const [file, setFile] = useState();
  const [value, setValue] = useState("");
  const [price, setPrice] = useState();
  const [isFullPrice, setIsFullPrice] = useState();

  useEffect(() => {
    dispatch(fetchProductItems());
  }, [dispatch]);

  const productItems = useSelector(({ productitems }) => productitems);

  const [selectValue, setSelectValue] = useState(null);

  function validate() {
    if (file === undefined) {
      alert('File cannot be empty')
      return false
    }

    if (value.length === 0){
      alert('Name cannot be empty')
      return false
    }

    if (price === undefined) {
      alert('Price cannot be empty')
      return false
    }

    return true
  }

  return (
    <div className={styles.admin}>
      <Sidebar />
      <div className={styles.container}>
        <form className={styles.form}>
          <FileInput
            labelValue={"Изображение"}
            setValue={setFile}
          />
          <DropdownInput
            labelValue={"Название продукта"}
            setValue={setSelectValue}
            options={productItems.list}
          />
          <StringInput
            value={value}
            labelValue={"Название изделия"}
            setValue={setValue}
          />
          <div className={styles.price}>
            <NumberInput
              value={price}
              labelValue={"Цена"}
              setValue={setPrice}
            />
            <CheckboxInput
              value={isFullPrice}
              labelValue={"Выводить цену (от)"}
              setValue={setIsFullPrice}
            />
          </div>
          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            to={`/admin/item`}
          >
            <AddButton
              data={{ProductItemId: selectValue === null ? productItems.list[0]?.id : productItems.list.filter((item) => item.name === selectValue)[0]?.Id,
                Name: value,
                Price: price,
                File: file,
                IsFullPrice: isFullPrice}}
              func={addItem}
              validate={validate}                
            />
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default ItemAdd;
