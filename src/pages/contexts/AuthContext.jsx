import { createContext, useContext, useState } from "react";
import { useCookies } from 'react-cookie'
import CryptoJS from "crypto-js"; 

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [cookies, defaultSetCookie, removeCookie] = useCookies(['']);
  const isAuth = () => {
    fetch('http://127.0.0.1:8080/isauth/', {
      headers: {
        session_id: cookies["session_id"],
      },
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.isauth) {
        return true
      } else {
        return false
      }
    })
    .catch(error => {
      console.log("失敗しました");
      return false
  })};

  const [sessionIdAtLogin, setSessionIdAtLogin] = useState()
  const [currentUser, setCurrentUser] = useState();
  const getCurrentUser = () => {
    if (sessionIdAtLogin) {
      fetch('http://127.0.0.1:8080/users/current/', {
        headers: {
          session_id: sessionIdAtLogin
        },
        method: 'GET',
      })
      .then(res => res.json())
      .then(user => {
        setCurrentUser(user)
      })
      .catch(error => {
        console.log("ログインユーザーの取得に失敗しました");
      })
    } else {
      fetch('http://127.0.0.1:8080/users/current/', {
        headers: {
          session_id: cookies["session_id"]
        },
        method: 'GET',
      })
      .then(res => res.json())
      .then(user => {
        setCurrentUser(user)
      })
      .catch(error => {
        console.log("ログインユーザーの取得に失敗しました");
      })
    }
  }

  const fetchCurrentUser = () => {
    if (!currentUser) {
      getCurrentUser()
    }
    return currentUser
  }

  const setCookie = (name, value) => {
    defaultSetCookie(name, value, {
      path: '/' 
    });
  }

  
  const hashPassword = (password) => {

    // CryptoJS.SHA256でハッシュ化
    const hashed = CryptoJS.SHA256(password).toString();
  
    return hashed;
  }
  
  const value = {
    isAuth,
    getCurrentUser,
    setCookie,
    fetchCurrentUser,
    setSessionIdAtLogin,
    hashPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
};
export default AuthProvider;