import { useEffect, useState } from 'react'
import { useLocation, Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import HeaderName from './HeaderName'


const Header = () => {
  const { logout } = useAuth()
  const location = useLocation()
  // ログイン画面と登録画面では非表示
  // if(location.pathname === "/login" || location.pathname === "/register") {
  //   return null
  // }

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="header-container">
            <div className="logo-wrapper">
              <img className="header-logo-image" src="./han-il-jil-mun_logo.PNG" alt="application logo" />
            </div>
            <button onClick={logout}>ログアウト</button>
            <Link to="/login">ログイン</Link>
            <Link to="/register">ユーザー登録</Link>
            <Link to="/posts/create">投稿作成</Link>
            <HeaderName />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header;