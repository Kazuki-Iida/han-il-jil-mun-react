import { createContext, useContext, useState, useEffect } from "react"
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import CryptoJS from "crypto-js"

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [cookies, defaultSetCookie, removeCookie] = useCookies([''])
  const [isAuth, setIsAuth] = useState(false)
  const [currentUser, setCurrentUser] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthInCookie = cookies["is_auth"]
    isAuthInCookie == 'yes' && setIsAuth(true)
  }, [])

  const getCurrentUser = async () => {
    if (cookies["session_id"]) {
      const response = await fetch('http://127.0.0.1:8080/users/current/', {
        headers: {
          session_id: cookies["session_id"]
        },
        method: 'GET',
      })
      if (response.ok && response.status == 200) {
        const data = await response.json()
        setCurrentUser(data)
      } else {
        console.log("ログインユーザーの取得に失敗しました");
      }
    }
  }

  const hashPassword = (password) => {
    // CryptoJS.SHA256でハッシュ化
    const hashed = CryptoJS.SHA256(password).toString()
  
    return hashed;
  }

  const logout = async () => {
    if (cookies["session_id"]) {
     const response = await fetch('http://127.0.0.1:8080/logout', {
      headers: {
        session_id: cookies["session_id"],
      },
      method: 'GET',
      })
      if (response.ok) {
        removeCookie("session_id")
        removeCookie("is_auth")
        setCurrentUser(undefined)
        setIsAuth(false)
        navigate('/')
      } else {
        console.log("ログアウトに失敗しました")
      }
    }
  }

  const setCookie = (name, value) => {
    defaultSetCookie(name, value, {
      path: '/' 
    })
  }

  const updateIsAuth = async () => {
    const response = await fetch('http://127.0.0.1:8080/isauth', {
      headers: {
        session_id: cookies["session_id"],
      },
      method: 'GET',
    })
    if (response.ok) {
      const data = await response.json()
      return data.isauth
    } else {
      return false
    }
  }

  const validateConfirmPassword = (value, password) => {
    if (value != password) {
      return '※パスワードと同じ値を入力してください。'
    } else {
      return ''
    }
  }

  const validateEmail = (value) => {
      const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
      if (!emailRegex.test(value)) {
        return '※有効なメールアドレスを入力してください。'
      } else {
        return ''
      }
  }

  const validateName = (value) => {
    const nameRegex = /^[a-zA-Z0-9]+$/
      if (!nameRegex.test(value)) {
        return '※有効なユーザーネームを入力してください。'
      } else {
        return ''
      }
  }

  const validatePassword = (value) => {
    if (value == '') {
      return '※パスワードを入力してください。'
    } else {
      return ''
    }
  }

  const value = {
    currentUser,
    getCurrentUser,
    hashPassword,
    isAuth,
    logout,
    setCookie,
    setIsAuth,
    validateConfirmPassword,
    validateEmail,
    validateName,
    validatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider