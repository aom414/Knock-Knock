import React, { useState } from 'react';
import './TabModal2.css'
import { Link } from "react-router-dom";
function TabModal2( {handleLogout} ){
 const[showTabModal, setshowTabModal ] = useState(false) 
 const openModal = (e) => {
  e.stopPropagation()
  setshowTabModal(!showTabModal)
  
}
 
 
 const handleClickOutside = ({ target }) => {
  // console.log('modalEl은',modalEl)
   console.log('showTabmodal은',showTabModal)
   console.log('target은',target)
   //console.log('포함?',modalEl.current.contains(target))
   if (showTabModal){
     
    setshowTabModal(!showTabModal);
    console.log('hi33333333!!',showTabModal)
   }
   console.log('여기선?!!',showTabModal)
 };
 window.addEventListener("click", handleClickOutside);
    return (
       
             showTabModal === false ?
            <div className='ModalContainer1' >
            <img onClick={openModal} src='https://i.ibb.co/s1wfvjz/Kakao-Talk-Photo-2021-10-14-17-44-47.png'/>
            </div>
          : <div className='ModalContainer2'onClick={openModal}>
            <Link to="/mypage">
            <div className='tablist'>마이페이지</div>
            </Link>
            <div className='tablist' onClick={handleLogout}>로그아웃</div>
            </div >
         
       
    )
}
export default TabModal2;