import React from "react";
import "./conversation.css";

function Conversation() {
  return (
    <div className="conversation">
      <div className="conversationImgWrapper">
        <img
          src="https://i.fbcd.co/products/resized/resized-1500-1000/d4c961732ba6ec52c0bbde63c9cb9e5dd6593826ee788080599f68920224e27d.webp"
          alt=""
          className="conversationImg"
        />
        <span className="conversationOnlineDot"></span>
      </div>
      <div className="conversationInfo">
        <span className="conversationName">Hussein</span>
        <span className="conversationLastMsg">Hey, what's up? </span>
      </div>
      <span className="conversationBadge">2</span>
    </div>
  );
}

export default Conversation;
