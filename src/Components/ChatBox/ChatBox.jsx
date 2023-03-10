import React, { useEffect, useState } from "react";
import "./ChatBox.css";
import { addMessage, getMessages } from "../../Api/MessageRequest";
import { getUser } from "../../Api/UserRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { useRef } from "react";

const ChatBox = ({ chat, currentUser, setSentMessage, recieveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();
  const FOLDER=process.env.REACT_APP_PHASE === "testing"? process.env.REACT_APP_PUBLIC_FOLDER_TESTING : process.env.REACT_APP_PUBLIC_FOLDER
  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);
  //fetching data for header
  useEffect(() => {
   
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
    
  }, [chat, currentUser]);
  //   fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
        console.log(data,'data');
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);
  useEffect(()=>{
    console.log(currentUser,'current user');
  },[])
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };
  const handleSend = async (e) => {
    e.preventDefault();
    console.log(currentUser,'current user 2');
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    //send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
    //send messages to socket server
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSentMessage({ ...message, receiverId });
  };
  // always scrol to the last message
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:"smooth"})
  },[messages])

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? FOLDER +
                          userData.profilePicture
                        :FOLDER +
                          "defaultProfile.jpg"
                    }
                    alt=""
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.8rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            </div>
            {/* chatbox messageds */}
            <div className="chat-body">
              {messages.map((message) => (
                
                <>
                  <div
                    ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat sender */}
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a Chat to start Conversation..
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
