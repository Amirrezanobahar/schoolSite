import React from 'react'
import shoori from '../../icons/shoori.svg'
import shooriBlack from '../../icons/shooriBlack.svg'

export default function     GenralContent() {
    return (
        <div className='GenralContent'>
            <div className='row'>
                <div className='content'>
                    <div className='text-in-content'><img src={shooriBlack} alt="" /><h1>15</h1><span>مساحت</span></div>
                </div>
                <div className='content'>
                    <div className='text-in-content'><img src={shooriBlack} alt="" /><h1>2100
                    </h1><span>مساحت مدرسه</span></div>
                </div>
                <div className='content'>
                    <div className='text-in-content'><img src={shooriBlack} alt="" /><h1>30</h1><span>تعداد دانش اموزان هر کلاس</span></div>
                </div>
            </div>
            <div className='row'>
                <div className='content'>
                    <div className='text-in-content'><img src={shooriBlack} alt="" /><h1>75 </h1><span>پذیرفته شدگان کنکور</span></div>
                </div>
                <div className='content'>
                    <div className='text-in-content'><img src={shooriBlack} alt="" /><h1> 12</h1><span>رتبه زیر 2000</span></div>
                </div>
                <div className='content'>
                    <div className='text-in-content'><img src={shooriBlack} alt="" /><h1> 100</h1><span>قبولی هر پایه</span></div>
                </div>
            </div>
        </div>
    )
}
