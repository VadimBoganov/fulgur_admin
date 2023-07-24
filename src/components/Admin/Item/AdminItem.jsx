import React from 'react'
import Item from './Item'
import Sidebar from '../Sidebar'
import styles from '../Admin.module.scss'

const AdminItem = () => {
  return (
    <div className={styles.admin}>
      <Sidebar />
      <Item/>
    </div>
  )
}

export default AdminItem