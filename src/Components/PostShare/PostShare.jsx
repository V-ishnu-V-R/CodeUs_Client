import React, { useState, useRef } from "react";
import ProfileImage from "../../img/profileImg.jpg";
import "./PostShare.css";

import { MdOutlinePhotoCamera } from "react-icons/md";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../Actions/UploadAction";
import { toast } from "react-hot-toast";

const PostShare = () => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const desc = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };
  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (image) {
      if (
        !(
          image.type === "image/jpeg" ||
          image.type === "image/png" ||
          image.type === "image/webp" ||
          image.type === "image/jpg"
        )
      ) {
        return toast("oops! only support jpeg,png,jpg and webp", {
          icon: "🙄",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
      const data = new FormData();

      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost));
    reset();
  };
  return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.jpg"
        }
        alt=""
      />
      <div>
        <input
          ref={desc}
          required
          type="text"
          placeholder="What did you code today"
        />
        <div className="PostOptions">
          <div className="option" onClick={() => imageRef.current.click()}>
            <MdOutlinePhotoCamera style={{ fontSize: "25px" }} />
            <span style={{ padding: "4px" }}>Photo</span>
          </div>
          <div className="option">
            <UilPlayCircle />
            <span style={{ padding: "4px" }}>Video</span>
          </div>
          <div className="option">
            <UilLocationPoint />
            <span style={{ padding: "4px" }}>Location</span>
          </div>
          <div className="option">
            <UilSchedule />
            <span style={{ padding: "4px" }}>Schedule</span>
          </div>
          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {" "}
            {loading ? "Uploading.." : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && ( //if the image is available it shows the X button and next line is img tag to show the post
          <div className="PreviewImage">
            <UilTimes onClick={() => setImage(null)} />

            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
