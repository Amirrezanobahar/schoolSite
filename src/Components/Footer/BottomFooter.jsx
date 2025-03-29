import React, { useContext } from 'react'
import shadIcon from '../../images/icons/Shad.svg'
import telegramIcon from '../../images/icons/telegram.svg'
import rubickaIcon from '../../images/icons/rubicka.svg'
import eitaIcon from '../../images/icons/eita.svg'
import { Context } from '../../Context'

export default function BottomFooter() {
 const {bottomDiv} = useContext(Context)
    return (
        <div className='bottom-footer' ref={bottomDiv}>
            <div className='footer-text'>

            </div>
            <div className='social'>
                <div>
                    <p>شبکه های اجتماعی  </p>
                    <div>
                        <img className='social-footer-icon' src={shadIcon} alt="" />
                        <img className='social-footer-icon' src={telegramIcon} alt="" />
                        <img className='social-footer-icon' src={rubickaIcon} alt="" />
                        <img className='social-footer-icon' src={eitaIcon} alt="" />

                    </div>
                </div>
            </div>
            <div className='gogorioCS'>

            </div>


        </div>
    )
}
