import React, { useEffect, useState } from "react";
import "./conversation.css";
import axios from "../../hooks/useAxios";

function Conversation({ conversation, currentUserId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUserId);
    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data);
      } catch (Err) {
        console.log(Err);
      }
    };
    getUser();
  }, [conversation, currentUserId]);
  return (
    <div className="conversation">
      <div className="conversationImgWrapper">
        <img
          src={
            user?.profilePicture ||
            "https://i.fbcd.co/products/resized/resized-1500-1000/d4c961732ba6ec52c0bbde63c9cb9e5dd6593826ee788080599f68920224e27d.webp"
          }
          alt=""
          className="conversationImg"
        />
        <span className="conversationOnlineDot"></span>
      </div>
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}

export default Conversation;
