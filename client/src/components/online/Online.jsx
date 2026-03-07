import React from "react";
import "./online.css";
import { Users } from "../../dummyData";
function Online({ user }) {
  return (
    <div className="online">
      <li className="rightBarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            src={user.profilePicture}
            alt={user.username}
            className="rightbarProfileImg"
          />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </li>
    </div>
  );
}

export default Online;
