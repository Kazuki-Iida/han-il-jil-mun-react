

const Post = ({post}) => {
  return (
    <>
      <div className="post-container">
        <div className="post-title">
          <h3>{post.title}</h3>
        </div>
        <div className="post-body">
          <p>{post.body}</p>
        </div>
      </div>
    </>
  )
}

export default Post;