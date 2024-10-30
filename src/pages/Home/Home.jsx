import React from 'react'
import { Footer } from '../../../components/Footer/Footer'
import { Header } from '../../../components/Header/Header'
import "./styles.scss"

export const Home = () => {
  return (
    <>
    <Header/>
    <div className="home">
        <h2>Hello</h2>
    </div>
    <Footer/>
    </>
  )
}
