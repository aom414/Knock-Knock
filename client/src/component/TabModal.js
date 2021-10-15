import React, { useState, useEffect, useRef, useCallback } from 'react';
import './TabModal.css'
import { Link } from "react-router-dom";
//알고리즘 문제별 유형?
//dp
//quick merge 
//

function TabModal( {openModalFunc,openModalFunc2} ){
 const[showTabModal, setshowTabModal ] = useState(false) 
 console.log('showTabmodal은123',showTabModal)
   
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
      //  useEffect(() => {
      //     window.addEventListener("click", handleClickOutside);
      //   return () => {
      //   window.removeEventListener("click", handleClickOutside);
      //  };
      //  }, []);
   

    return (
             showTabModal === false ?
            <div className='ModalContainer1'  >
            <img onClick={openModal} src='https://i.ibb.co/s1wfvjz/Kakao-Talk-Photo-2021-10-14-17-44-47.png'/>
            </div>
          : <div className='ModalContainer2'  >
   
            <div className='tablist' onClick={openModalFunc}>로그인</div>

            {/* <Link to="/signup"> */}
            <div className='tablist' onClick={openModalFunc2}>회원가입</div>
            {/* </Link> */}
            </div >
         
       
    )
}
export default TabModal;