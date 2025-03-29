import React from 'react'
import NavbarItems from './NavbarItems'

export default function () {
  return (
    <div className='navbar'>
        <NavbarItems value="اخبار و اطلاعیه ها"/>
        <NavbarItems scroll={"teachers"} value="پرسنل و دبیران"/>
        <NavbarItems scroll={"end"} value="ارتباط با ما"  />
        <NavbarItems scroll={"hestori"}  value=" تاریخچه"/>
        
    </div>
  )
}
