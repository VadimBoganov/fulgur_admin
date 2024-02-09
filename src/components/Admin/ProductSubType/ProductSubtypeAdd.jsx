import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../Sidebar'
import { NavLink } from 'react-router-dom'
import styles from "../Admin.module.scss";
import {addProductSubtype} from '../../../app/productSubtypeSlice'
import AddButton from '../Common/Buttons/AddButton';

const ProductSubtypeAdd = () => {
    const {list} = useSelector(({producttypes}) => producttypes)
    const [value, setValue] = useState('')
    const [selectValue, setSelectValue] = useState(list[0].Name)

    function validate() {
      if (value.length === 0){
        alert('Имя не может быть пустым.')
        return false
      }
  
      return true
    }

  return (
    <div className={styles.admin}>
      <Sidebar />
      <div className={styles.container}>
        <form className={styles.form}>
          <label htmlFor="addProductSubtype">Название продукции:</label>
          <select
            id="addProductSubtype"
            name="product sub types"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            {list &&
              list.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
          </select>
          <label htmlFor="productSubtypeName">Название:</label>
          <input
            id="productSubtypeName"
            type="text"
            placeholder="Написать..."
            autoComplete="off"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            to={`/admin/productsubtype`}
          >
            <AddButton
              data={{ProductTypeId: list.filter((item) => item.name === selectValue)[0]?.id,
              Name: value}}
              func={addProductSubtype}
              validate={validate}
            />
          </NavLink>
        </form>
      </div>
    </div>
  )
}

export default ProductSubtypeAdd