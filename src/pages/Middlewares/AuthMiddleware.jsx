import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext"

const AuthMiddleware = () => {
  const { isAuth } = useAuth()
  const [isAuthenticated, setIsAuthenticated] = useState();
  useEffect(() => {
    const checkAuth = async () => {
      const isauth = await isAuth()
      setIsAuthenticated(isauth)
    }
    checkAuth()
  }, [])

  return (
    <>
      {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
    </>
  )
}

export default AuthMiddleware