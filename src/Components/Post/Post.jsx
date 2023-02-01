import React from "react";
import "./Post.css";
import NotLike from "../../img/notlike.png";
import Like from "../../img/red-heart.png";

import Share from "../../img/share.png";
import { BsFillHeartFill } from "react-icons/bs";
import {AiOutlineClose} from "react-icons/ai"
import { FaRegComment } from "react-icons/fa";
import { RiShareCircleLine } from "react-icons/ri";
import { BsHeart } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useState } from "react";
import { likePost } from "../../Api/PostReques";
import Comment from "../Comment/Comment";
import { useEffect } from "react";
import { getUser } from "../../Api/UserRequest";
import { format } from "timeago.js";

const Post = ({ data }) => {
  
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [username, setUsername] = useState(null);
  const [fullname,setFullName]=useState(null)
  useEffect(() => {
    const fetchUser = async () => {
      const username = await getUser(data.userId);
       setFullName(username.data.firstname+ " " + username.data.lastname)
      setUsername(username.data.firstname + " " + username.data.lastname);
    };
    fetchUser();
  }, []);

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  const [show, setShow] = useState(false);
  return (
    <div className="Post">
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}} >
          <div>
        <p style={{margin:"0"}} > <b>{fullname}</b></p>
        <p style={{fontSize:"12px"}} >{format(data.createdAt)}</p>

          </div>
        <AiOutlineClose/>

        </div>
       
        
        <p style={{margin:"5px", fontSize:"15px" }} >{data.desc}</p>
      </div>
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="PostReact">
        {liked ? (
          <BsFillHeartFill
            color="red"
            size={22}
            style={{ padding: "0.5rem", cursor: "pointer" }}
            onClick={handleLike}
          />
        ) : (
          <BsHeart
            color="white"
            size={22}
            style={{ padding: "0.5rem", cursor: "pointer" }}
            onClick={handleLike}
          />
        )}
        {/* <img src={data.liked?Like:NotLike} alt="" /> */}
        <FaRegComment
          color="white"
          style={{ padding: "0.5rem" }}
          size={22}
          onClick={() => setShow((prev) => !prev)}
        />
        {/* <img src={Comment} alt="" /> */}
        {/* <RiShareCircleLine
          color="white"
          style={{ padding: "0.5rem" }}
          size={22}
        /> */}
        {/* <img src={Share} alt="" /> */}
      </div>
      <span
        style={{ color: "white", fontSize: "12px", paddingBottom: "0.5rem" }}
      >
        {likes} Likes
      </span>
     
      <div className="detail">
        <span>
         
          <b>{data.name}</b> 
        </span>
        
      </div>
      <span style={{cursor:"pointer",paddingTop:"1rem"}} onClick={()=>setShow((prev)=> !prev)} ><b>Comments</b></span>
      {show && (
        <div>
          <Comment data={data} />
        </div>
      )}
    </div>
  );
};

export default Post;
