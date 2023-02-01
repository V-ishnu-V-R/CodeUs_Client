import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createComment, getComment } from "../../Api/CommentRequest";
import './Comment.css'



const Comment = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    try {
      const fetchComments = async () => {
        const response = await getComment(data._id);
        
        console.log(
          response.data,
          "this is the response when clicking the comments"
        );
        setComments(response.data);
      };
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createComment(data._id, comment);
      console.log(response, "this is th response");
      const newObj = {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
      };
      response.data.userId = newObj;
      setComments((pre) => {
        return [...pre, response.data];
      });
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="commentdata">
        {comments.map((value, index) => {
            console.log(value.comment,"this is the comment");
          return (
            <p>
              <b>
                {value.userId.firstname} {value.userId.lastname}
              </b>
              :{value.comment}
              
            </p>
            
          );
        })}
      </div>
      <div className="comment">
        <form action="" onSubmit={handleSubmit}>
          <input
            className="writeComment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Write Your Comments Here"
            style={{ color: "var(--phone)" }}
          ></input>
          <button className="commentButton" type="submit">
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default Comment;
