import React from "react";
import { UilPen } from "@iconscout/react-unicons";
import "./InfoCard.css";
import { useState } from "react";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import * as UserApi from "../../Api/UserRequest.js";
import { useEffect } from "react";
import { logOut } from "../../Actions/AuthAction";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
        console.log(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser?.data);
        console.log(profileUser);
      }
    };
    fetchProfileUser();
  }, [params]);
  const handleLogOut = () => {
    dispatch(logOut());
  };
  const navigate = useNavigate();
  const handleChat = async (data) => {
    await UserApi.createChat(data);
    navigate("/chat");
  };

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => {
                setModalOpened(true);
              }}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="info">
        <span>
          <b>Status </b>
          <span> {profileUser.relationship} </span>
        </span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
          <span> {profileUser.livesin} </span>
        </span>
      </div>
      <div className="info">
        <span>
          <b>Work at </b>
          <span> {profileUser.worksAt} </span>
        </span>
      </div>
      {params.id === user._id ? (
        <button className="button logout-button" onClick={handleLogOut}>
          Logout
        </button>
      ) : (
        <span
          className="button chat-button"
          onClick={() => {
            const data = {
              senderId: user._id,
              receiverId: params.id,
            };
            handleChat(data);
          }}
        >
          Message
        </span>
        // <span className="button chat-button" onClick={handleLogOut}>
        //   Message
        // </span>
      )}
    </div>
  );
};

export default InfoCard;
