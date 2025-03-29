import React from 'react'
import Slider from '../../Components/Home/Slider'
import SchoolHistory from '../../Components/Home/SchoolHistory'
import Akbar from '../../Components/Home/akbar'
import GenralContent from '../../Components/Home/GenralContent'
import CardSlider from '../../Components/Home/CardSlider'


export default function Home() {
  return (
    <div>
      <div className='HomeBackgrond'></div>
    <Slider/>
    <SchoolHistory/>
    <Akbar/>
    
    <div className='card-slider'>
    <CardSlider/>
    </div>

    <GenralContent/>

    </div>
  )
}
