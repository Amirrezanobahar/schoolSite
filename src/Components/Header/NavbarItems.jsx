import React, { useContext } from 'react';
import { Context } from '../../Context';


export default function NavbarItems({ value, scroll }) {
  const { bottumref,akbarref, cardsliderref } = useContext(Context);

  const scrollHandler = () => {
    if (scroll === "relation" && bottumref.current) {
      bottumref.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    if (scroll === 'hestori' && akbarref.current) {
      akbarref.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    if (scroll === 'teachers' && cardsliderref.current) {
      cardsliderref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='navbaritems' onClick={scrollHandler}>
      {value}
    </div>
  );
}