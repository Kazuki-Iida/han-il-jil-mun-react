import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./contexts/AuthContext"

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email:'',
    password:'',
  })
  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const [validationMessage, setValidationMessage] = useState({
    email:'',
    password:''
  })
  const validateFormData = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    switch (key){
      case 'email':
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (!emailRegex.test(value)) {
          setValidationMessage({
            ...validationMessage,
            email: '※有効なメールアドレスを入力してください。'
          });
        } else {
          setValidationMessage({
            ...validationMessage,
            email: ''
          });
        }
        break;
      case 'password':
        if (value == '') {
          setValidationMessage({
            ...validationMessage,
            password: '※パスワードを入力してください。'
          });
        } else {
          setValidationMessage({
            ...validationMessage,
            password: ''
          });
        }
        break;
    }
  }

  const { setCookie, setSessionIdAtLogin, hashPassword } = useAuth()
  const sendForm = async (e) => {
    e.preventDefault()
    if (formData.email == '') {
      setValidationMessage({
        ...validationMessage,
        email: '※有効なメールアドレスを入力してください。'
      });
      // ここ違う
      validationMessage.email = '※有効なメールアドレスを入力してください。';
    }
    if (formData.password == '') {
      setValidationMessage({
        ...validationMessage,
        password: '※パスワードを入力してください。'
      });
      // ここ違う
      validationMessage.password = '※パスワードを入力してください。';
    }
    if (validationMessage.email == '' && validationMessage.password == '') {
      const response = await fetch('http://127.0.0.1:8080/login', {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          ...formData,
          password: hashPassword(formData.password)
        })
      })
      if (response.ok) {
        const res = await response.json()
        // sessionStorage.setItem("session_id", res.session_id);//こっちはセッションストレージに保存するコード
        setCookie("session_id", res.session_id)//こっちはcookieに保存するコード
        setSessionIdAtLogin(res.session_id)
        navigate('/')
      } else if (response.status == 401) {
        setValidationMessage({
          ...validationMessage,
          password: '※パスワードが間違っています。'
        });
      } else if (response.status == 404) {
        setValidationMessage({
          ...validationMessage,
          email: 'ユーザーが見つかりません。'
        });
      }
    }
  }
  return (
    <>
      <div className="login-wrapper">
        <div className="authentication-logo-wrapper">
          <img className="authentication-logo-image" src="./han-il-jil-mun_logo.PNG" alt="application logo" />
        </div>
        <form onSubmit={sendForm}>
          <div className={validationMessage.email == ''  ? 'input-text-content' : 'input-text-content-error'}>
            <input
              type="text"
              className='input-text'
              name='email'
              placeholder="メールアドレス"
              value={formData.email}
              onChange={handleFormData}
              onBlur={validateFormData}
            />
            {validationMessage.email != ''  &&
              <p className='validation-message'>{validationMessage.email}</p>
            }
          </div>
          <div className={validationMessage.password == ''  ? 'input-text-content' : 'input-text-content-error'}>
            <input
              type="password"
              className='input-text'
              name='password'
              placeholder="パスワード"
              value={formData.password}
              onChange={handleFormData}
              onBlur={validateFormData}
            />
            {validationMessage.password != ''  &&
              <p className='validation-message'>{validationMessage.password}</p>
            }
          </div>
          <button type="submit" className="submit-button">送信</button>
        </form>
      </div>
    </>
  )
}

export default Login;