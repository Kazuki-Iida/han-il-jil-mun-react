import { useEffect, useState } from 'react'
import HeaderName from './HeaderName'

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="container">
          <div className="header-container">
            <div className="logo-wrapper">
              <img className="header-logo-image" src="./han-il-jil-mun_logo.PNG" alt="application logo" />
            </div>
            <HeaderName />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header;