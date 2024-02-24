import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "./contexts/AuthContext"

const Register = () => {
  const navigate = useNavigate()
  const { hashPassword, setCookie, setIsAuth, setSessionIdAtLogin, validateConfirmPassword, validateEmail, validateName, validatePassword } = useAuth()
  const [warnigBlank, setWarnigBlank] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email:'',
    password:'',
    confirmPassword: ''
  })

  const checkBlank = () => {
    if (formData.name == ''
    || formData.email == ''
    || formData.password == ''
    || formData.confirmPassword == ''
    ) {
      setWarnigBlank(true)
      return true
    } else {
      setWarnigBlank(false)
      return false
    }
  }

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const [validationMessage, setValidationMessage] = useState({
    name: '',
    email:'',
    password:'',
    confirmPassword: ''
  })

  const executeValidation = (e) => {
    const value = e.target.value
    switch (e.target.name){
      case 'name':
        setValidationMessage({
          ...validationMessage,
          name: validateName(value)
        })
        break;
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
      case 'confirmPassword':
        setValidationMessage({
          ...validationMessage,
          confirmPassword: validateConfirmPassword(value, formData.password)
        })
        break;
    }
  }

  const preSendForm = (e) => {
    e.preventDefault()
    if(checkBlank()) {
     return
    }else {
      if (validationMessage.name == ''
      && validationMessage.email == ''
      && validationMessage.password == ''
      && validationMessage.confirmPassword == '') {
        sendForm()
      }
    }
  }

  const sendForm = async () => {
    const response = await fetch('http://127.0.0.1:8080/register', {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        ...formData,
        password: hashPassword(formData.password)
      })
    })
    if (response.ok) {
      const res = await response.json()
      setCookie("session_id", res.session_id)
      setSessionIdAtLogin(res.session_id)
      setCookie("is_auth", 'yes')//こっちはcookieに保存するコード
      // setIsAuth(true)
      window.location.href = "/";
    } else if (response.status == 400) {
      const error = await response.text()
      error.includes("duplicate email")
        &&  setValidationMessage({
              ...validationMessage,
              email: '※すでに登録されているメールアドレスです。'
            })
    }
  }

  return (
    <>
      <div className="register-wrapper">
        <div className="authentication-logo-wrapper">
          <img className="authentication-logo-image" src="./han-il-jil-mun_logo.PNG" alt="application logo" />
        </div>
        <form onSubmit={preSendForm}>
          <div className={validationMessage.name == ''  ? 'input-text-content' : 'input-text-content-error'}>
            <input
              type="text"
              className='input-text'
              name='name'
              placeholder="ユーザーネーム"
              value={formData.name}
              onChange={handleFormData}
              onBlur={executeValidation}
            />
            {validationMessage.name != ''  &&
              <p className='validation-message'>{validationMessage.name}</p>
            }
          </div>
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
          <div className={validationMessage.confirmPassword == ''  ? 'input-text-content' : 'input-text-content-error'}>
            <input
              type="password"
              className='input-text'
              name='confirmPassword'
              placeholder="確認パスワード"
              value={formData.confirmPassword}
              onChange={handleFormData}
              onBlur={executeValidation}
            />
            {validationMessage.confirmPassword != ''  &&
              <p className='validation-message'>{validationMessage.confirmPassword}</p>
            }
          </div>
          
          <button type="submit" className="submit-button">送信</button>
          {warnigBlank && <p className='validation-message'>※全てのフォームを入力してください。</p>}
        </form>
      </div>
    </>
  )
}

export default Register