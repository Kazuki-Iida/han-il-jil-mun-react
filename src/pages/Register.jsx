import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "./contexts/AuthContext"

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =useState({
    name: '',
    email:'',
    password:'',
    confirmPassword: ''
  })
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
  const validateFormData = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    switch (key){
      case 'name':
        const nameRegex = /^[a-zA-Z0-9]+$/;
        if (!nameRegex.test(value)) {
          setValidationMessage({
            ...validationMessage,
            name: '※有効なユーザーネームを入力してください。'
          });
        } else {
          setValidationMessage({
            ...validationMessage,
            name: ''
          });
        }
        break;
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
      case 'confirmPassword':
        if (value != formData.password) {
          setValidationMessage({
            ...validationMessage,
            confirmPassword: '※パスワードと同じ値を入力してください。'
          });
        } else {
          setValidationMessage({
            ...validationMessage,
            confirmPassword: ''
          });
        }
        break;
    }
  }

  const { setCookie, setSessionIdAtLogin, hashPassword } = useAuth()
  const sendForm = async (e) => {
    e.preventDefault()
    if (formData.name == '') {
      setValidationMessage({
        ...validationMessage,
        name: '※有効なユーザーネームを入力してください。'
      });
      // ここ違う
      validationMessage.name = '※有効なユーザーネームを入力してください。';
    }
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
    if (formData.confirmPassword != formData.password) {
      setValidationMessage({
        ...validationMessage,
        confirmPassword: '※パスワードと同じ値を入力してください。'
      });
      // ここ違う
      validationMessage.password = '※パスワードと同じ値を入力してください。';
    }
    if (validationMessage.name == ''
      && validationMessage.email == ''
      && validationMessage.password == ''
      && validationMessage.confirmPassword == '') {
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
        setCookie("session_id", res.session_id)//こっちはcookieに保存するコード
        setSessionIdAtLogin(res.session_id)
        navigate('/')
      } else if (response.status == 400) {
        const error = await response.text();
          console.log(error, "error")
          error.includes("duplicate email")
          &&  setValidationMessage({
                ...validationMessage,
                email: '※すでに登録されているメールアドレスです。'
              })
      } else if (response.status == 401) {
        setValidationMessage({
          ...validationMessage,
          password: '※パスワードが間違っています。'
        })
      } else if (response.status == 404) {
        setValidationMessage({
          ...validationMessage,
          email: 'ユーザーが見つかりません。'
        })
      }
    }
  }
  return (
    <>
      <div className="register-wrapper">
        <div className="authentication-logo-wrapper">
          <img className="authentication-logo-image" src="./han-il-jil-mun_logo.PNG" alt="application logo" />
        </div>
        <form onSubmit={sendForm}>
          <div className={validationMessage.name == ''  ? 'input-text-content' : 'input-text-content-error'}>
            <input
              type="text"
              className='input-text'
              name='name'
              placeholder="ユーザーネーム"
              value={formData.name}
              onChange={handleFormData}
              onBlur={validateFormData}
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
          <div className={validationMessage.confirmPassword == ''  ? 'input-text-content' : 'input-text-content-error'}>
            <input
              type="password"
              className='input-text'
              name='confirmPassword'
              placeholder="確認パスワード"
              value={formData.confirmPassword}
              onChange={handleFormData}
              onBlur={validateFormData}
            />
            {validationMessage.confirmPassword != ''  &&
              <p className='validation-message'>{validationMessage.confirmPassword}</p>
            }
          </div>
          
          <button type="submit" className="submit-button">送信</button>
        </form>
      </div>
    </>
  )
}

export default Login;