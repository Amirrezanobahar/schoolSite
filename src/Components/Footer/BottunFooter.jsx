import React, { useContext } from 'react'
import shadImage from '../../icons/shad.png'
import telegram from '../../icons/telegram.svg'
import Ita from '../../icons/Ita.svg'
import Whatsap from '../../icons/Whatsap.svg'
import phone from './../../icons/phoneIcon.svg'
import { Context } from '../../Context'
export default function BottunFooter() {

  const telegramClick = () => {
    window.open('https://t.me/your_telegram_link', '_blank'); // لینک تلگرام شما
  };

  const phoneClick = () => {
    window.location.href = 'tel:09011499975'; // باز کردن صفحه شماره‌ها
  };



  const { bottumref } = useContext(Context)
  const telegramclick = () => {
    window.open('https://t.me/jooje88', '_blank')
  }
  const shadclick = () => {
    window.open('https://shad.ir/amirrezanobahar', '_blank')
  }
  return (
    <div className='ButtonFooter' ref={bottumref}>
      <div className='foter-text'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان را</div>
      <div className='social'>
        <p>شبکه های اجتماعی </p>
        <div className='socialImages'>
          <div><img src={shadImage} alt="" onClick={shadclick} /></div>
          <div><img src={telegram} alt="" onClick={telegramClick} /></div>
          <div><img src={Ita} alt="" /></div>
          <div><img src={Whatsap} alt="" /></div>
        </div>
      </div>
      <div className='gogorioCS'>
        <div>
          <div>کاری از <span>amirreza nobahar</span> </div>
          <div><img src={telegram} alt="Telegram" onClick={telegramClick} /></div><br />
        </div>
        <div>
          <div>شماره تماس <span>9975 149 0901</span> </div>
          <div><img src={phone} alt="phone" onClick={phoneClick} /></div>
        </div>


      </div>



    </div>
  )
}
