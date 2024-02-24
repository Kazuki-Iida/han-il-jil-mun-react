import { useEffect, useState } from 'react'
import Post from './Post'

const HomeIndex = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8080/posts/', {
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => setPosts(data))
    .catch(error => {
      console.log("投稿の取得に失敗しました")
  })
  },[])
  
  return (
    <>
      <div className="home-index">
        <div className="home-index-container">
            {
              posts.map(post => <Post post={post} key={post.id} />)
            }
        </div>
      </div>
    </>
  )
}

export default HomeIndex