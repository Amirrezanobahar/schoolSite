import React from 'react'
import './Header.css'
import Shoori from '../../icons/Shoori.svg' 
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='header'>
      <Link to ='/' style={{ textDecoration: 'none'}}>
      <div className='schoolName'>دبیرستان حاج اکبر شعوری</div></Link>
      
        <div className='schoolIcon'> <img src={Shoori} alt="" /></div>
    </div>
  )
}
