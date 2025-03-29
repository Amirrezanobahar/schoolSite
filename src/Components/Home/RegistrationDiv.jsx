import React from 'react'
import { Link } from 'react-router-dom'

export default function RegistrationDiv() {
  return (
    <div className='RegistrationDiv'>
      <h1>دبیرستان شعوری </h1>
      <p>مرکز رشد و شکوفایی استعداد ها و اندیشه ها</p>
      <Link to='/register'>
      <button style={{padding:'10px',backgroundColor:'green' , border:'none' , borderRadius:'6px',cursor:'pointer'}}>ثبت نام</button>
      </Link>
       </div>
       
  )
}
