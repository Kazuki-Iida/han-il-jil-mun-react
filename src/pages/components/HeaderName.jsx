import { useAuth } from "../contexts/AuthContext"

const HeaderName = () => {
  const { fetchCurrentUser } = useAuth()
  const currentUser = fetchCurrentUser()
  
  return (
    <div className="menu-icon-wrapper">
      {
        currentUser && <p>{currentUser.name}</p>
      }
    </div>
  )
}

export default HeaderName