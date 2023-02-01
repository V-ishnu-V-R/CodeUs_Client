import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import { Link, useParams } from "react-router-dom";
import "./ProfileCard.css";
import { useState } from "react";
import { getUser } from "../../Api/UserRequest.js";

const ProfileCard = ({ location }) => {
  const params = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic =  process.env.REACT_APP_PHASE === "testing"? process.env.REACT_APP_PUBLIC_FOLDER_TESTING  : process.env.REACT_APP_PUBLIC_FOLDER
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    
    if (params.id && params.id !== user._id) {
      getUser(params.id).then((response) => {
        setProfile(response.data);
       
        
      });
    }
  },[params]);

  useEffect(() => {
    setProfile(user);
  }, [user]);

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            profile?.coverPicture
              ? serverPublic + profile?.coverPicture
              : serverPublic + "defaultCover.jpg"
          }
          alt=""
        />
        <img
          src={
            profile?.profilePicture
              ? serverPublic + profile?.profilePicture
              : serverPublic + "defaultProfile.jpg"
          }
          alt=""
        />
      </div>
      <div className="ProfileName">
        <span>
          {profile?.firstname} {profile?.lastname}{" "}
        </span>
        <span>{profile?.worksAt ? profile?.worksAt : "About Info"} </span>
      </div>
      <div className="FollowStatus">
        <hr />
        <div>
          <div className="Follow">
            <span>{profile?.following.length} </span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="Follow">
            <span>{profile?.followers.length} </span>
            <span>Followers</span>
          </div>
          {location === "profilePage" && (
            <>
              <div className="vl"> </div>
              <div className="Follow">
                <span>
                  {
                    posts.filter((posts) => posts.userId === profile?._id)
                      .length
                  }
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          {" "}
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/profile/${user._id}`}
          >
            
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
