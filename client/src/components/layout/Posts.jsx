import Post from "./Post";

export default function Posts({posts}) {
  return (
    <div className="posts">
      {posts.map((p, _id) =>(
        <Post post={p} key={_id}/>
      ))}
    </div>
  );
}