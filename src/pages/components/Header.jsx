import { useEffect, useState } from 'react'
import { useAuth } from "../contexts/AuthContext"
import HeaderName from './HeaderName'


const Header = () => {
  const { logout } = useAuth();
  return (
    <>
      <div className="header">
        <div className="container">
          <div className="header-container">
            <div className="logo-wrapper">
              <img className="header-logo-image" src="./han-il-jil-mun_logo.PNG" alt="application logo" />
            </div>
            <button onClick={logout}>ログアウト</button>
            <HeaderName />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header;