import React, { useContext, useEffect, useRef, useState } from "react";
import "./messanger.css";
import TopBar from "../../components/topbar/TopBar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { Context } from "../../context/Context";
import axios from "../../hooks/useAxios";

function Messanger() {
  const { userToken } = useContext(Context);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    const getConversation = async () => {
      const response = await axios.get("/conversations/" + userToken._id);
      setConversations(response.data);
    };
    getConversation();
  }, [userToken._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get("/messages/" + currentChat?._id);
        setMessages(response.data);
      } catch (Err) {
        console.log(Err);
      }
    };

    if (currentChat) {
      getMessages();
    }
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const message = {
      sender: userToken._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const response = await axios.post("/messages", message);
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TopBar />

      <div className="messanger">
        {/*   conversations list */}
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <h3>Messages</h3>
            <input
              type="text"
              placeholder="Search for friends..."
              className="chatMenuInput"
            />
            <div className="chatMenuConversations">
              {conversations.map((c) => (
                <div key={c._id} className="" onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* chat box */}
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef} key={m._id}>
                      <Message
                        key={m._id}
                        message={m}
                        own={m.sender === userToken._id}
                      />
                    </div>
                  ))}
                </div>

                <div className="chatBoxBottom">
                  <textarea
                    placeholder="Write a message..."
                    className="chatMessageInput"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  ></textarea>
                  <button
                    className="chatSubmitButton"
                    onClick={handleSendMessage}
                  >
                    ➤
                  </button>
                </div>
              </>
            ) : (
              <div className="noConversationText">
                <svg
                  className="noConversationIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  width="48"
                  height="48"
                >
                  <path
                    d="M12 3C6.48 3 2 6.58 2 11c0 2.08 1.06 3.97 2.83 5.39-.19.61-.73 2.01-.83 2.29-.13.37.28.68.63.54.27-.11 1.98-.8 2.7-1.09C8.97 18.54 10.45 19 12 19c5.52 0 10-3.58 10-8s-4.48-8-10-8zm0 14c-1.38 0-2.68-.35-3.81-.97l-.61-.34-.67.27c-.52.21-1.37.53-1.97.75.19-.54.47-1.36.56-1.63l.22-.66-.55-.44C3.35 13.13 3 12.09 3 11c0-3.87 4.03-7 9-7s9 3.13 9 7-4.03 7-9 7z"
                    fill="#bbb"
                  />
                </svg>
                <span> Open a conversation to start chatting </span>
              </div>
            )}
          </div>
        </div>

        {/*  online friends */}
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
