import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import Header from './components/Header'

const ShowPost = () => {
  const { post_id } = useParams()
  const [post, setPost] = useState([])

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/posts/${post_id}/`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => setPost(data))
    .catch(error => {
      console.log("投稿の取得に失敗しました")
  })
  },[])
  

  return (
    <>
      <Header />
      <div className="post-container">
        <div className="post-title">
          <h3>{post.title}</h3>
        </div>
        <div className="post-body">
          <p>{post.body}</p>
        </div>
        <div className="post-footer">
          <p>{post.user_name}</p>
          <p>{post.category_name}</p>
        </div>
        <Link to="/">戻る</Link>
      </div>
    </>
  )
}

export default ShowPost;