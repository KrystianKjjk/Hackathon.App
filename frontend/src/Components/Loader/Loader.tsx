import React from "react";
import style from './Loader.module.css';

export default function Loader() {
  return (
      <div className={style.loader}>
         <div className={style.scene}>
            <div className={style.objects}>
               <div className={style.square}>
                  <div className={style.circle}>
                     <div className={style.triangle}>
                     </div>
                  </div>
               </div>
            </div>
            <div className={style.wizard}>
               <div className={style.body}>
                  <div className={style.rightArm}>
                     <div className={style.rightHand}>
                     </div>
                  </div>
                  <div className={style.leftArm}>
                     <div className={style.leftHand}>
                     </div>
                  </div>
                  <div className={style.head}>
                     <div className={style.beard}></div>
                     <div className={style.face}>
                         <div className={style.adds}></div>
                     </div>
                     <div className={style.hat}>
                         <div className={style.hatOutOfTheHat}></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
)}