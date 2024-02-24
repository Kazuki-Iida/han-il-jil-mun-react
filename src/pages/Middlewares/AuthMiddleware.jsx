import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext"

const AuthMiddleware = () => {
  const { isAuth } = useAuth()

  return (
    <>
      {console.log(isAuth, "AuthMiddleware")}
      { isAuth ? <Outlet /> : <Navigate to="/login" state={{ replace: true }} /> }
    </>
  )
}

export default AuthMiddleware