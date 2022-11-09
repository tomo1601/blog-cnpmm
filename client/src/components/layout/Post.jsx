import { Link } from "react-router-dom";

export default function Post({post}) {
  
  const handleView = async (id) => {
    /* await PostService.updateViews(id); */
  }
  return (
    <div className="post">
      {post.thumbnailUrl &&
        (<img
          className="postImg"
          src={post.thumbnailUrl}
          alt=""
        />)
      }
      <div className="postInfo">
        <div className="postCats">
          {/* <Link to={`/?cat=${c.name}`} className="link" key={c._id}>
            <span className="postCat">{c.name}</span>
          </Link> */}
          <span className="postCat">{post.categoryId.title}</span>
          <span className="postCat">{post.views}</span>  
        </div>
        <Link to={`/post/${post._id}`} className="link" onClick={() =>handleView(post._id)}>
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">{new  Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.description}
      </p>
    </div>
  );
}