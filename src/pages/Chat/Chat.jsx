import "./Chat.css";
import React from "react";
import LogoSearch from "../../Components/LogoSearch/LogoSearch";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { userChats } from "../../Api/ChatRequest";
import Conversation from "../../Components/Convsersation/Conversation";
import { Link } from "react-router-dom";
import { ImHome } from "react-icons/im";

import { MdNotificationsActive } from "react-icons/md";

import { IoSettingsSharp } from "react-icons/io5";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import ChatBox from "../../Components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import { useRef } from "react";

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData); //this user has all the details of th user

  const [chats, setChats] = useState([]); //it has all the chats from the database
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sentMessage, setSentMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  const socket = useRef();
  //send message to socker server
  useEffect(() => {
    console.log('working socket',sentMessage);
    if (sentMessage !== null) {
      socket.current.emit("send-message", sentMessage);
    }
  }, [sentMessage]);

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      console.log(onlineUsers, "this is the online users");
    });
  }, [user]);
  //Reecirve message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setRecieveMessage(data);
    });
  }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        console.log(data, "this is the datat from chta.jsx");

        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  return (
    <div className="Chat">
      {/* Leftside */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* RightSide */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <div className="navIcons">
            <Link to="../home" style={{ color: "white" }}>
              {" "}
              <ImHome size={32} />{" "}
            </Link>

            <IoSettingsSharp size={32} />
            <MdNotificationsActive size={32} />
            <Link to="../chat" style={{ color: "white" }}>
              {" "}
              <BsFillChatLeftTextFill size={31} />
            </Link>
          </div>
        </div>
        <div>
          {/* chat body */}
          <ChatBox
            chat={currentChat}
            currentUser={user._id}
            setSentMessage={setSentMessage}
            recieveMessage={recieveMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
