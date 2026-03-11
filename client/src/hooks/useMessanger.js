import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Context } from "../context/Context";
import axios from "./useAxios";

export function useMessanger() {
  const { userToken } = useContext(Context);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef();
  const scrollRef = useRef();
  const currentChatRef = useRef(currentChat);

  useEffect(() => {
    currentChatRef.current = currentChat;
  }, [currentChat]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");

    socket.current.on("connect", () => {
      socket.current.emit("addUser", userToken._id);
    });

    socket.current.on("getUsers", (users) => {
      console.log(users);
    });

    socket.current.on("getMessage", (data) => {
      const msg = {
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      };
      if (currentChatRef.current?.members.includes(data.senderId)) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.current.off("connect");
      socket.current.off("getUsers");
      socket.current.off("getMessage");
    };
  }, [userToken._id]);

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
      } catch (err) {
        console.log(err);
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

    const receiverId = currentChat.members.find(
      (member) => member !== userToken._id,
    );

    socket.current.emit("sendMessage", {
      userId: userToken._id,
      receiverId,
      text: newMessage,
    });

    try {
      const response = await axios.post("/messages", message);
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return {
    conversations,
    currentChat,
    setCurrentChat,
    messages,
    newMessage,
    setNewMessage,
    handleSendMessage,
    scrollRef,
    userToken,
  };
}
