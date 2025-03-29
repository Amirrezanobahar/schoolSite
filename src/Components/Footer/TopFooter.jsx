import React from 'react'
import PhoneIcon from '../../icons/phone.svg'
import location from '../../icons/location.svg'
import arow from '../../icons/arow.svg'
export default function TopFooter() {
    return (
        <div>
            <div className='relation'>
                <div className='relation-divs'><h1>راه های ارتباطی با <span>مدرسه حاج اکبر شعوری</span></h1></div>
                <div className='relation-divs'><div className='arow-img'><img src={arow} alt="" /></div></div>
                <div className='relation-divs'><div className='loc-img'><img src={location} alt="location" /></div><p>خسروشاه خیابان امام مدرسه امام</p></div>
                <div className='relation-divs'><div className='phone-img'><img src={PhoneIcon} alt="PhoneIcon" /></div><p> 32445750 | 041 </p></div>
            </div>
        </div>
    )
}
