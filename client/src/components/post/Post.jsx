import "./Post.css";
import { FaEllipsisV, FaThumbsUp, FaComment, FaShare } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { MdPerson } from "react-icons/md";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "../../hooks/useAxios";
export default function Post({ post }) {
  const { userToken } = useContext(Context);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(userToken?._id));
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users?userId=${post.userId}`);
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      await axios.put("/posts/" + post._id + "/like", {
        userId: userToken._id,
      });
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } catch (Err) {
      console.log(Err);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        {/* Header */}
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user?.username}`}>
              <img
                className="postProfileImg"
                src={
                  user
                    ? user.profilePicture
                    : <MdPerson /> ||
                      "https://i.fbcd.co/products/resized/resized-1500-1000/d4c961732ba6ec52c0bbde63c9cb9e5dd6593826ee788080599f68920224e27d.webp"
                }
                alt={user?.username}
              />
            </Link>

            <div className="postUserInfo">
              <span className="postUsername">{user?.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
          </div>
          <div className="postTopRight">
            <FaEllipsisV size={15} />
          </div>
        </div>

        {/* Body */}
        <div className="postCenter">
          {
            <span className="postText">
              {post.desc || "Not found description"}
            </span>
          }
          {post.img && (
            <img className="postImg" src={`/images/${post.img}`} alt="post" />
          )}
        </div>

        {/* Stats */}
        <div className="postStats">
          <span className="postLikeCounter">
            <FaThumbsUp size={14} color="#1877f2" />
            {like}
          </span>
          <span className="postCommentText">{post.comment} comments</span>
        </div>

        {/* Actions */}
        <div className="postBottom">
          <div
            className={`postAction${isLiked ? " liked" : ""}`}
            onClick={likeHandler}
          >
            <FaThumbsUp className="postActionIcon" />
            Like
          </div>
          <div className="postAction">
            <FaComment className="postActionIcon" />
            Comment
          </div>
          <div className="postAction">
            <FaShare className="postActionIcon" />
            Share
          </div>
        </div>
      </div>
    </div>
  );
}
