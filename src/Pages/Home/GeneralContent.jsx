import React, { useContext } from 'react'
import GeneralContentItems from './GeneralContentItems'
import { Context } from '../../Context'

export default function GeneralContent() {
  return (
    
    <div className='general-content' >
        <div >
        <GeneralContentItems number="15"  content="تعداد کلاس‌ها" unit="باب" />
        <GeneralContentItems number="2100"  content="مساحت مدرسه" unit="مترمربع" />
        <GeneralContentItems number="30"  content="میانگین دانش آموزان هر کلاس" unit="نفر" />

        </div>
        <div>
        <GeneralContentItems number="75"  content="پذیرفته‌شدگان آزمون نمونه دولتی"  unit="نفر"/>
        <GeneralContentItems number="39"  content="پذیرفته‌شدگان آزمون تیزهوشان" unit="نفر" />
        <GeneralContentItems number="100"  content="قبولین هر پایه در سالتحصیلی" unit="درصد" />


        </div>
    </div>
  )
}
