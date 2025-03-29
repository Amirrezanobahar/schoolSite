import { useRef, useState } from 'react'
import Header from './Components/Header/Header'
import Navbar from './Components/Header/Navbar'
import './fonts/font.css'
import './app.css'
import './Pages/Home/Home.css'
import Footer from './Components/Footer/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import { Context } from './Context'

function App() {
const bottumref=useRef();
const akbarref=useRef();
const teachersref=useRef();
  return (
<Context.Provider value={{bottumref,akbarref,teachersref}}>
  <BrowserRouter>

    <Header/>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home />} />
    </Routes>
    <Footer/>
  </BrowserRouter>
  </Context.Provider>
  )
}

export default App
