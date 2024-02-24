import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext"

const GuestMiddleware = () => {
  const { isAuth } = useAuth()

  return (
    <>
    {console.log(isAuth, "GuestMiddleware")}
      {isAuth ? <Navigate to="/" state={{ replace: true }} /> : <Outlet />}
    </>
  )
}

export default GuestMiddleware