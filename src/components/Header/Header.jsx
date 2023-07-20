import React from 'react'
import styles from "./Header.module.scss"
import Logo from './Logo'
import Cart from './Cart'
import Search from './Search'

const Header = () => {
  return (
    <div className={styles.header}>
      <Logo/>
      <Search/>
      <Cart/>
    </div>
  )
}

export default Header