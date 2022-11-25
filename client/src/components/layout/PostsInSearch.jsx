import PostInSearch from "./PostInSearch";

const PostsInSearch = ({posts})=> {
  return (
    <div className="posts">
      {posts.map((p, _id) =>(
        <PostInSearch post={p} key={_id}/>
      ))}
    </div>
  );
}
export default PostsInSearch