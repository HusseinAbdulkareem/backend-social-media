import React from "react";
import "./messanger.css";
import TopBar from "../../components/topbar/TopBar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";

function Messanger() {
  return (
    <>
      <TopBar />

      <div className="messanger">
        {/* LEFT — conversations list */}
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <h3>Messages</h3>
            <input
              type="text"
              placeholder="Search for friends..."
              className="chatMenuInput"
            />
            <div className="chatMenuConversations">
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
            </div>
          </div>
        </div>

        {/* CENTER — chat box */}
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message own={true} />
              <Message />
            </div>
            <div className="chatBoxBottom">
              <textarea
                placeholder="Write a message..."
                className="chatMessageInput"
              ></textarea>
              <button className="chatSubmitButton">➤</button>
            </div>
          </div>
        </div>

        {/* RIGHT — online friends */}
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <h4>Online Now</h4>
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messanger;
