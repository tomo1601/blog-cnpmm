import PostInProfile from "./PostInProfile";

const UserPost =({posts})=> {

  return (
    <div className="posts">
      {posts.map((p, _id) =>(
        <PostInProfile post={p} key={_id}/>
      ))}
    </div>
  );
}
export default UserPost