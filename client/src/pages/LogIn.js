import React, {useState} from "react";
import { Link ,useHistory} from "react-router-dom";
import axios from 'axios'
import "./LogIn.css";

axios.defaults.withCredentials = true;

export default function LogIn({ handleResponseSuccess, openModalFunc, handleAccessToken,isAuthenticated,handleUserinfo }) {
  const history = useHistory();
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const handleInputValue = (key) => (e) => {
        setLoginInfo({ ...loginInfo, [key]: e.target.value })
    }

    const handleLogin = () => {
        const {email, password} = loginInfo

        if(email === '' || password === '') {
            alert("이메일과 비밀번호를 모두 입력하세요")
        }
        else {
            axios.post("http://ec2-54-180-141-64.ap-northeast-2.compute.amazonaws.com/login",
            {email, password},
            {"content-type": "application/json", withCredentials: true}
            )

            .then((res) => {
              
               console.log('toooooooooookkkkken',res.data.data)
               openModalFunc()
              handleAccessToken(res.data.data.accessToken) // 토큰 넣어줌 
              handleUserinfo(res.data.data.payload)
              alert("로그인이 완료되었습니다")
              history.push('/')
              
            }).catch(err=>{
              alert('잘못된 아이디이거나,비밀번호 입니다.')
            })
        }
    }

    return (
      
          <div className="modal" >
            <div >
              <div className="loginModal">
                <span className="close" onClick={openModalFunc}>
                  &times;
                </span>
                <div className="modalContents">
                <img className="Knock_logo" src="https://i.ibb.co/XLgjjZ8/Knock-Knock-logo.png" />
                  <input
                    name="email"
                    className="loginId"
                    type="email"
                    placeholder="아이디"
                    onChange={handleInputValue("email")}
                  />
                  <input
                    name="password"
                    className="loginPw"
                    type="password"
                    placeholder="비밀번호"
                    onChange={handleInputValue("password")}
                  />
                  <div className="loginMid">
                    <label className="autoLogin" for="hint">
                      {" "}
                      <input type="checkbox" id="hint" /> 로그인 유지하기
                    </label>
                    <div className="autoLogin">아이디/비밀번호 찾기</div>
                  </div>
                  <button className="loginBtn" onClick={handleLogin}>
                    {" "}
                    로그인{" "}
                  </button>
                  <div className="loginEnd">
                    <div className="loginLine">
                     <Link to="/signup">회원이 아니신가요?</Link> 
                    </div>
                  </div>
                </div>
                <div className="logo_box">
                </div>
              </div>
            </div>
          </div>
    );
  }