import React from 'react'
import gogorioCS from '../../Images/gogorioCS.png'

export default function GeneralContentItems({number,content,unit}) {
  return (
    <div className='general-content-items' >
        <div>
        <img src={gogorioCS} alt="" />
        </div>
        <h1>{number}</h1>
        <p>{unit}</p>
        <p>{content}</p>
    </div>
  )
}
