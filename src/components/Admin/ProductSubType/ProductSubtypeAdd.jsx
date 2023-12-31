import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../Sidebar'
import { NavLink } from 'react-router-dom'
import styles from "../Admin.module.scss";
import {addProductSubtype} from '../../../app/productSubtypeSlice'
import { fetchUsers } from '../../../app/usersSlice';

const ProductSubtypeAdd = () => {
    const dispatch = useDispatch()
    const {list} = useSelector(({producttypes}) => producttypes)
    const [value, setValue] = useState('')
    const [selectValue, setSelectValue] = useState(list[0].Name)

    useEffect(() => {
      dispatch(fetchUsers())
    },[dispatch])

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
              list.map(({ Id, Name }) => (
                <option key={Id} value={Name}>
                  {Name}
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
            <button
              className={styles.button}
              onClick={() => {
                const prodType = list.filter((item) => item.Name === selectValue)[0]
                dispatch(addProductSubtype({ProductTypeId: prodType.Id, Name: value }));
                setValue("");
              }}
            >
              Добавить
            </button>
          </NavLink>
        </form>
      </div>
    </div>
  )
}

export default ProductSubtypeAdd