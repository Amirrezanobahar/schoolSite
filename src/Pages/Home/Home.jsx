import React from 'react'
import SchoolHistory from '../../Components/Home/SchoolHistory'
import Akbar from '../../Components/Home/akbar'
import GenralContent from '../../Components/Home/GenralContent'
import CardSlider from '../../Components/Home/CardSlider'
import EventSlider from './EventSlider'


export default function Home() {
  return (
    <div>
      <div className='HomeBackgrond'></div>
      <EventSlider/>
    <SchoolHistory/>
    <Akbar/>
    
    <div className='card-slider'>
    <CardSlider/>

    </div>
    

    <GenralContent/>
    <div className='rightImage'></div>


    </div>
  )
}
