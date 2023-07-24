import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.scss'

const Sidebar = () => {
  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>Categories</div>
      <nav>
        <ul className={styles.menu}>
          <li>
            <NavLink className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
                to={`/admin/1`}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
                to={`/admin/2`}>
              Product Types
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.footer}>
        <a className={styles.link} href='/'>
          Help
        </a>
        <a className={styles.link} href='/'>
          Terms & Conditions
        </a>
      </div>
    </section>
  )
}

export default Sidebar