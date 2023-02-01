import React from "react";
import axios from "axios";
import Logo from "../../img/CodeUs-1.png";
import "./LogoSearch.css";
import { searchUser } from "../../Api/UserRequest";
// import {UilSearch} from '@iconscout/react-unicons'
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import User from "../../Components/User/User";

const LogoSearch = () => {
  const [query, setQuery] = useState("");
  const [seachedUser, setSearchedUser] = useState(null);

  const handleSearch = async () => {
    if (query !== "") {
      const response = await searchUser(query);
      console.log(response, "response");
      setSearchedUser(response.data);
    }
  };
  return (
    <div className="searchBox">
      <div className="LogoSearch">
        <img className="logo" src={Logo} alt="" />
        <div className="Search">
          <input
            type="text"
            placeholder="#Explore"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="s-icon" onClick={handleSearch}>
          <BsSearch />
        </div>
      </div>
      {seachedUser ? (
        <div className="searchResultBox">
          <div className="top">
            <p>Search result</p>
            <AiOutlineClose
              onClick={() => {
                setSearchedUser(null);
                setQuery("");
              }}
            />
          </div>
          <div className="boader">
            {seachedUser[0] ? (
              <>
                {seachedUser.map((user) => {
                  return <User person={user} />;
                  
                })}
              </>
            ) : (
              <>
                <p>No result</p>
              </>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LogoSearch;
