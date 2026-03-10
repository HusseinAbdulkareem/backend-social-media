import React, { useEffect, useState } from "react";
import "./conversation.css";
import axios from "../../hooks/useAxios";

function Conversation({ conversation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== user?._id);
    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data);
      } catch (Err) {
        console.log(Err);
      }
    };
    getUser();
  }, [conversation]);
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
      {/* <div className="conversationInfo">
        <span className="conversationLastMsg">Hey, what's up? </span>
      </div>
      <span className="conversationBadge">2</span> */}
    </div>
  );
}

export default Conversation;
