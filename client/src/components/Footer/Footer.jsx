import React from 'react';
import s from './FooterStyle.module.css';
import { SiLinkedin } from 'react-icons/si';

export default function Footer(){
     return(
          <div className={`${s.footer} ${s.footerBg}`}>
               <div className={`${s.container} ${s.footerDiv}`}>
                    <div className={s.footerInfo}>
                         <p>Proyecto API <span>Countries</span></p>
                         <p>Felipe Di Liscia - Henry</p>
                    </div>
                    <div className={s.footerLink}>                     
                         <a href="https://www.linkedin.com/in/felipe-di-liscia-2531691b0/">
                              <SiLinkedin/>
                         </a>
                    </div>
               </div>
          </div>
     )
};