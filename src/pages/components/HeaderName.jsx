import { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"

const HeaderName = () => {
  const { currentUser, getCurrentUser } = useAuth()

  useEffect(() => {
    currentUser || getCurrentUser()
  }, [])
  
  return (
    <div className="menu-icon-wrapper">
      {currentUser && <p>{currentUser.name}</p>}
    </div>
  )
}

export default HeaderName