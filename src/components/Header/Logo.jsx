import React from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from "../../utils/routes" 

const Logo = () => {
  return (
    <div>
        <Link to ={ROUTES.HOME}>
            <img src='../images/logo1_inv.png' alt='фулгур' height='60' width='170'/>
        </Link>
    </div>
  )
}

export default Logo