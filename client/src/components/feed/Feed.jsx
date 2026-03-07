import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useEffect, useState, useContext } from "react";
import axios from "../../hooks/useAxios";
import { Context } from "../../context/Context";

export default function Feed({ username }) {
  const [posts, setPost] = useState([]);
  const { userToken } = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response;
        if (username) {
          response = await axios.get(`/posts/profile/${username}`);
        } else {
          response = await axios.get(`/posts/timeline/${userToken?._id}`);
        }
        setPost(
          response.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          }),
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [username, userToken?._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {!username || username === userToken?.username ? <Share /> : null}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
