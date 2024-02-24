import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "./contexts/AuthContext"

const CreatePost = () => {
  const navigate = useNavigate();
  const { hashPassword, setCookie, validateEmail, validatePassword } = useAuth()
  const [warnigBlank, setWarnigBlank] = useState(false)

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

  const checkBlank = () => {
    if (formData.email == ''
    || formData.password == ''
    ) {
      setWarnigBlank(true)
      return true
    } else {
      setWarnigBlank(false)
      return false
    }
  }

  const executeValidation = (e) => {
    const value = e.target.value
    switch (e.target.name){
      case 'email':
        setValidationMessage({
          ...validationMessage,
          email: validateEmail(value)
        })
        break;
      case 'password':
        setValidationMessage({
          ...validationMessage,
          password: validatePassword(value)
        })
        break;
    }
  }

  const preSendForm = (e) => {
    e.preventDefault()
    if(checkBlank()) {
     return
    }else {
      if (validationMessage.email == ''
      && validationMessage.password == '') {
        sendForm()
      }
    }
  }
  // ログイン直後にログイン画面に行けてしまうエラーあり。sessionIdAtLoginあたりに問題あり
  const sendForm = async () => {
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
      window.location.href = "/";
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
  
  return (
    <>
      <div className="login-wrapper">
        <div className="authentication-logo-wrapper">
          <img className="authentication-logo-image" src="./han-il-jil-mun_logo.PNG" alt="application logo" />
        </div>
        <form onSubmit={preSendForm}>
          <div className={validationMessage.email == ''  ? 'input-text-content' : 'input-text-content-error'}>
            <input
              type="text"
              className='input-text'
              name='email'
              placeholder="メールアドレス"
              value={formData.email}
              onChange={handleFormData}
              onBlur={executeValidation}
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
              onBlur={executeValidation}
            />
            {validationMessage.password != ''  &&
              <p className='validation-message'>{validationMessage.password}</p>
            }
          </div>
          <button type="submit" className="submit-button">送信</button>
          {warnigBlank && <p className='validation-message'>※全てのフォームを入力してください。</p>}
        </form>
      </div>
    </>
  )
}

export default CreatePost