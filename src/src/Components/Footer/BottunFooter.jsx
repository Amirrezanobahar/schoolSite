import React, { useContext } from 'react'
import shadImage from '../../icons/shad.png'
import telegram from '../../icons/telegram.svg'
import Ita from '../../icons/Ita.svg'
import Whatsap from '../../icons/Whatsap.svg'
import { Context } from '../../Context'
export default function BottunFooter() {
  const {bottumref}=useContext(Context)
  return (
    <div className='ButtonFooter' ref={bottumref}>
      <div className='foter-text'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان را</div>
      <div className='social'>
        <p>شبکه های اجتماعی </p>
        <div className='socialImages'>
          <div><img src={shadImage} alt="" /></div>
          <div><img src={telegram} alt="" /></div>
          <div><img src={Ita} alt="" /></div>
          <div><img src={Whatsap} alt="" /></div>
        </div>
      </div>
      <div className='gogorioCS'>
        <div>            کاری از تیم حرفه ای <span>gogorioCS</span></div>
        <div><img src={telegram} alt="" /></div>
      </div>

    </div>
  )
}
