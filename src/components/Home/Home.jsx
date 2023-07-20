import React from 'react'
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Sidebar from "../Sidebar/Sidebar"

const Home = () => {
  return (
    <>
      <Header/>
      <div className="container">
        <Sidebar/>
      </div>
      <Footer/>
    </>
  )
}

export default Home
