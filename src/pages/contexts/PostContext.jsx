import { createContext, useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'

const PostContext = createContext()

export const usePost = () => {
  return useContext(PostContext)
}

const PostProvider = ({ children }) => {
  const navigate = useNavigate();

  const value = {
  }

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  )
}

export default PostProvider