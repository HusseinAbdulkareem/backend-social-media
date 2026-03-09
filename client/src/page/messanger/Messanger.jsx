import React from "react";
import "./messanger.css";
import TopBar from "../../components/topbar/TopBar";
function Messanger() {
  return (
    <>
      <TopBar />

      <div className="messanger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
            />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">Chat Box</div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">Online</div>
        </div>
      </div>
    </>
  );
}

export default Messanger;
