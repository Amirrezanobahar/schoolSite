import React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import ReCAPTCHA from 'react-google-recaptcha'
import './register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { EyeOutline, EyeSlashOutline } from 'react-iconic';
import { Link } from 'react-router-dom'







export default function Form() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')

    const schema = yup.object().shape({
        name: yup.string().required("فیلد نام اجباری").matches(/^[a-zA-Zآ-یء-ي\s\-']{3,20}$/gm),
        email: yup.string().email("ایمیل نا معتبر است").required("ایمیل اجباری"),
        age: yup.number().positive().min(18).max(112).required("سن  18 باشد"),
        password: yup.string().min(8).max(15).required("اییب یبر").matches(/[a-z]+/).matches(/[A-Z]+/).matches(/\d+/),
        confirmPassword: yup.string().oneOf([yup.ref("password"),]).required()
    })

    const { register, formState: { errors } } = useForm({ resolver: yupResolver(schema) })


    const handleFormSubmit = async (e) => {

        e.preventDefault()
        const formData = {
            email,
            password,
        }

        try {
            // ارسال درخواست به سرور برای لاگین
            const response = await axios.post('https://fsosiety.liara.run/v1/user/login', formData);
          
            // بررسی پاسخ سرور
            if (response.status === 200 && response.data.accessUser) {
              const token = response.data.accessUser;
              const userName = response.data.userName;
          
              // ذخیره توکن در localStorage
              localStorage.setItem('token', token);
          
              // نمایش پیام خوش‌آمدگویی و انتقال به صفحه اصلی
              alert(`${userName} خوش آمدید`);
              navigate('/');
            } else {
              // اگر پاسخ سرور نامعتبر باشد
              throw new Error('پاسخ سرور نامعتبر است');
            }
          } catch (err) {
            // مدیریت خطاها
            console.error('خطا در ورود:', err);
          
            // نمایش پیام خطا به کاربر
            if (err.response) {
              // اگر سرور پاسخ داده، اما با خطا
              const errorMessage = err.response.data.message || 'خطا در ورود به سیستم';
              alert(errorMessage);
            } else if (err.request) {
              // اگر درخواست ارسال شد، اما پاسخی دریافت نشد
              alert('خطا در ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید.');
            } else {
              // خطاهای دیگر
              alert('خطای غیرمنتظره رخ داده است.');
            }
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
            <form onSubmit={handleFormSubmit}>
                <h1>فرم ثبت نام</h1>
                <Link to='/register'>
                <p>حساب کاربری ندارید <a href="#">ثبت نام کنید </a></p>
                </Link>



                <div>
                    <label htmlFor="">ایمیل</label>
                    <input type="text" placeholder='ایمیل...' {...register("email")} onChange={(e) => { setEmail(e.target.value) }} />
                    {errors.email && <p className='error'>ایمیل معتبر نیست</p>}

                </div>



                <div>
                    <label htmlFor="">رمز عبور</label>
                    <input type={visable ? 'text' : 'password'} placeholder='رمز عبور...' {...register("password")} value={password} onChange={(e) => { setpassword(e.target.value) }} />
                    {errors.password && <p className='error'>پسوورد باید شامل حروف بزرگ و کوچک و حداقل یک کاراکتر باشد</p>}
                    <span className='passwordVisable' onClick={changeVisibilityIcon}> {visable ? <EyeOutline /> : <EyeSlashOutline size={24} />} </span>
                </div>

                {/* <ReCAPTCHA className='recaptcha'
                    sitekey="6LezZ_MqAAAAAD22uxRxj_K05qeQUn02B4qhru92"
                    onChange={(val) => setcapVal(val)}
                /> */}

                <input type="submit" value={'ورود'} className='submit'  />
            </form>
        </div>
//disabled={!capVal}


    )
}
