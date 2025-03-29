import React, { useContext } from 'react'
import { Context } from '../../Context'

export default function NavbarItems({value,scroll}) {
  const {bottumref}=useContext(Context)
  const {akbarref}=useContext(Context)
  const {teachersref}=useContext(Context)
  const scrollHandler=()=>{
    if(scroll=="end"){
      bottumref.current.scrollIntoView({behavior:'smooth'})
    }
    
    if(scroll=='hestori'){
      akbarref.current.scrollIntoView({behavior:'smooth'})
    }
    if(scroll=='teachers'){
      teachersref.current.scrollIntoView({behavior:'smooth'})
    }

  }
  return (
    <div className='navbaritems' onClick={()=>{scrollHandler()}}>
        {value}
    </div>
  )
}
