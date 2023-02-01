import React from "react";
import { useState } from "react";
import Logo from "../../img/CodeUs-1.png";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-hot-toast'

import { logIn, signUp, reset } from "../../Actions/AuthAction";
import { useEffect } from "react";
import Alert from "../../Components/Alert/Alert";
// const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const usernameRegex = /^[a-zA-Z0-9]{3,}$/;

const Auth = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.authReducer);

  const [isSignUp, setIsSignUp] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });
  const [confirmPass, setConfirmPass] = useState(true);

  // const handleChange = (e) => {
  //   dispatch(reset());
  //   setData({ ...data, [e.target.name]: e.target.value });
  //   setValidationMessage("");
  // };
  const handleChange = (e) => {
    dispatch(reset());
    const name = e.target.name;
    const value = e.target.value;
    setData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
    setValidationMessage("");
  };
  const validate = () => {
    if (!usernameRegex.test(data.username)) {
      setValidationMessage(
        "Enter a valid username no special character no whitespace"
      );
      return false;
    }

    if (data.password.length < 5) {
      setValidationMessage("Password minimum length is 5");
      return false;
    }

    if (isSignUp && data.confirmpass !== data.password) {
      setValidationMessage("password doesn't matching");
      return false;
    }

    return true;
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(reset());
  //   if (isSignUp) {
  //     data.password === data.confirmpass
  //       ? dispatch(signUp(data))
  //       : setConfirmPass(false);
  //   } else {
  //     dispatch(logIn(data));
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(reset());

    if (!isSignUp && validate()) {
        toast(`Hi ${data.username}. Welcome Back!`,{
          icon : "🥳",
          style:{
              borderRadius : "10px",
              background : "#333",
              color: "#fff"
          }
      })
      return dispatch(logIn(data));
    }
    if (validate()) {
      toast(`Hi ${data.username}. Welcome to Codeus!`,{
                            icon : "🥳",
                            style:{
                                borderRadius : "10px",
                                background : "#333",
                                color: "#fff"
                            }
                        })
      return dispatch(signUp(data));
    }
  };
  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
    setValidationMessage("");
  };
  useEffect(() => {
    dispatch(reset());
  }, []);

  return (
    <div className="Auth">
      {/* Left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>CODEus</h1>
          <h6>A place fot the Programmers</h6>
        </div>
      </div>
      {/* Right Side */}
      <div className="a-right">
        <form className="infoForm authForm" action="" onSubmit={handleSubmit}>
          <h3> {isSignUp ? "SignUp" : "Log In"} </h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="infoInput"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                placeholder=" Confirm Password"
                name="confirmpass"
                className="infoInput"
                onChange={handleChange}
              />
            )}
          </div>
          {/* <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            * Password is not same
          </span> */}
          {validationMessage && (
            <Alert
              message={validationMessage}
              handleCloseAlert={() => setValidationMessage("")}
            />
          )}

          {error && (
            <Alert
              message={message}
              handleCloseAlert={() => dispatch(reset())}
            />
          )}
          <div>
            <span
              style={{ fontSize: "12px", color: "black", cursor: "pointer" }}
              onClick={() => {
                setIsSignUp((prev) => !prev); //this is for the signup and login to render when clickin the text.
                resetForm();
              }}
            >
              {isSignUp
                ? "Already have an account. Login!"
                : "Don't have an Account? SignUp here !"}
            </span>
          </div>

          <button
            className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading.." : isSignUp ? "Sign up" : "Log In"}{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
