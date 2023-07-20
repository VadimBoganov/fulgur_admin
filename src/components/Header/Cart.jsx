import React from 'react'
import styles from "./Cart.module.scss"
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'

const Cart = () => {
  return (
    <Link to = {ROUTES.CART} className={styles.cart}>
        <div className={styles.cart} style={{backgroundImage: `url(../images/cart.png)`}}/>
        <span className={styles.count}>2</span>
    </Link>
  )
}

export default Cart