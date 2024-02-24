import { Link } from 'react-router-dom'

const Post = ({post}) => {
  return (
    <>
      <div className="post-container">
        <div className="post-title">
          <h3><Link to={`/posts/${post.id}/`}>{post.title}</Link></h3>
        </div>
        <div className="post-body">
          <p>{post.body}</p>
        </div>
        <div className="post-footer">
          <p>{post.user_name}</p>
          <p>{post.category_name}</p>
        </div>
      </div>
    </>
  )
}

export default Post;