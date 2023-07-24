import React from 'react'
import ProductType from './ProductType'
import styles from './Admin.module.scss'
import Sidebar from './Sidebar'

export const AdminRouteTypes = () => {
  return (
    <div className={styles.admin}>
      <Sidebar />
      <ProductType/>
    </div>
  )
}
