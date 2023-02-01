import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getUser } from "../../Api/UserRequest";

const Conversation = ({ data, currentUserId, online }) => {
  const [userData, setUserData] = useState(null); //this is the user that we area chatting with vishnu
  const FOLDER=process.env.REACT_APP_PHASE === "testing"? process.env.REACT_APP_DOMAIN_URL_TESTING : process.env.REACT_APP_DOMAIN_URL
  
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId); //this is to find the other user that vishnu is talking

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);
  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={
              userData?.profilePicture
                ? FOLDER + userData.profilePicture
                : FOLDER + "defaultProfile.jpg"
            }
            alt=""
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {userData?.firstname} {userData?.lastname}
            </span>
            <span>{online ? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
