import React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import ReCAPTCHA from 'react-google-recaptcha'
import './register.css'
import axios from 'axios'

import { EyeOutline, EyeSlashOutline } from 'react-iconic';
import { Link } from 'react-router-dom'


export default function Form() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState(null)
  const [age, setAge] = useState('')

  const schema = yup.object().shape({
    name: yup.string().required("فیلد نام اجباری    ").matches(/^[\u0600-\u06FF\s]{3,25}$/gm),
    email: yup.string().email("ایمیل نا معتبر است").required("ایمیل اجباری"),
    phone: yup.string().required("شماره تلفن اجباری").matches(/^09\d{9}$/gm),
    age: yup.number().positive().min(18).max(112).required("سن  18 باشد"),
    password: yup.string().min(8).max(15).required("").matches(/[a-z]+/).matches(/[A-Z]+/).matches(/\d+/),
    confirmPassword: yup.string().oneOf([yup.ref("password"),]).required()
  })

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })


  const handleFormSubmit = async (e) => {
    // if(errors){
    // errors.then(res=>JSON.stringify(res)).then(res=>console.log(res))
    // }
    // e.preventDefault()
    const formData = {
      name,
      email,
      age,
      phone,
      password,
      confirmPassword: password2
    }

    // try {

    //   const response = await axios.post('https://fsosiety.liara.run/v1/user/register', formData)
    //   console.log(response.data);

    //   response.status === 200 ? alert('ثبت نام موفق') : console.log(response);


    // } catch (err) {

    //   console.log('error=  ' + err);
    //   alert('ثبت نام ناموفق')
    //   // window.onload()

    // }

    try {
      const response = await axios.post('https://fsosiety.liara.run/v1/user/register', formData);
      console.log('Response Data:', response.data); // لاگ داده‌های پاسخ
      console.log('Status Code:', response.status); // لاگ وضعیت پاسخ
      if (response.status === 200) {
        alert('ثبت نام موفق');
        window.location.href = '/login';
      } else {
        console.log('Unexpected status code:', response.status);
      }
    } catch (err) {
      if (err.response) {
        // سرور پاسخ داده، اما با یک وضعیت خطا
        alert(err.response.data.message);
        console.log('Status Code:', err.response.status);
      } else if (err.request) {
        // درخواست ارسال شد، اما پاسخی دریافت نشد
        console.log('No response received:', err.request);
      } else {
        // خطای دیگر
        console.log('Error:', err.message);
      }
      alert('ثبت نام ناموفق');
    }

  }

  const [password, setpassword] = useState('')
  const [visable, setVisable] = useState(false)

  const changeVisibilityIcon = () => {
    visable ? setVisable(false) : setVisable(true)

  }
  const [password2, setpassword2] = useState('')
  const [visable2, setVisable2] = useState(false)

  const changeVisibilityIcon2 = () => {
    visable2 ? setVisable2(false) : setVisable2(true)

  }

  const [capVal, setcapVal] = useState(null)

  return (

    <div className='container'>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h1>فرم ثبت نام</h1>
        <Link to='/login'>
        <p>حساب کاربری دارید <a href="#">ورود کنید</a></p>
        </Link>
        <div>
          <label htmlFor=""> نام</label>
          <input type="text" placeholder='نام...' {...register("name")} onChange={(e) => { setName(e.target.value) }} />
          {errors.name && <p className='error'>فیلد نام اجباری و حروف فارسی مجاز است"</p>}

        </div>


        <div>
          <label htmlFor="">ایمیل</label>
          <input type="text" placeholder='ایمیل...' {...register("email")} onChange={(e) => { setEmail(e.target.value) }} />
          {errors.email && <p className='error'>ایمیل معتبر نیست</p>}

        </div>

        <div>
          <label htmlFor="">تلفن همرار</label>
          <input type="number" placeholder='شماره...' {...register("phone")} onChange={(e) => { setPhone(e.target.value) }} />
          {errors.phone && <p className='error'>شماره تلفن معتبر نیست</p>}

        </div>

        <div>
          <label htmlFor="">سن</label>
          <input type="number" placeholder='سن...'  {...register("age")} onChange={(e) => { setAge(e.target.value) }} />
          {errors.age && <p className='error'>لطفا سن را به درستی وارد کنید</p>}
        </div>

        <div>
          <label htmlFor="">رمز عبور</label>
          <input type={visable ? 'text' : 'password'} placeholder='رمز عبور...' {...register("password")} value={password} onChange={(e) => { setpassword(e.target.value) }} />
          {errors.password && <p className='error'>پسوورد باید شامل حروف بزرگ و کوچک و حداقل یک کاراکتر باشد</p>}
          <span className='passwordVisable' onClick={changeVisibilityIcon}> {visable ? <EyeOutline /> : <EyeSlashOutline size={24} />} </span>
        </div>
        <div>
          <label htmlFor="">تکرار رمز عبور</label>
          <input type={visable2 ? 'text' : 'password'} placeholder=' تکرار رمز عبور...' {...register("confirmPassword")} value={password2} onChange={(e) => { setpassword2(e.target.value) }} />
          {errors.confirmPassword && <p className='error'>مطابقت ندارد</p>}
          <span className='passwordVisable' onClick={changeVisibilityIcon2}> {visable2 ? <EyeOutline /> : <EyeSlashOutline size={24} />} </span>
        </div>


        {/* <ReCAPTCHA className='recaptcha'
          sitekey="6LezZ_MqAAAAAD22uxRxj_K05qeQUn02B4qhru92"
          onChange={(val) => setcapVal(val)}
        /> */}

        <input type="submit" value={'ثبت نام'} className='submit' />
      </form>
    </div>



  )
}
