import React from 'react'
import './Header.css'
import Shoori from '../../icons/Shoori.svg' 

export default function Header() {
  return (
    <div className='header'>
        <div className='schoolName'>دبیرستان حاج اکبر شعوری</div>
        <div className='schoolIcon'> <img src={Shoori} alt="" /></div>
        <div className='rightImage'></div>
    </div>
  )
}
