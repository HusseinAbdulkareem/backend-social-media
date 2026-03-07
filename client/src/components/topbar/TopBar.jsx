import React, { useContext } from "react";
import "./topbar.css";
import { BiSearch } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { CiChat2 } from "react-icons/ci";
import { IoNotifications } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

function TopBar() {
  const { userToken, removeUserToken } = useContext(Context);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link
          to="/"
          style={{
            textDecoration: "none",
          }}
        >
          <span className="logo"> Programmer : Hussein Abdulkareem</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <BiSearch />
          <input
            type="text"
            placeholder="Search for friends, posts or videos"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <BsPerson />
            <span className="topbarIconBadge">1</span>
          </div>

          <div className="topbarIconItem">
            <CiChat2 />
            <span className="topbarIconBadge">2</span>
          </div>

          <div className="topbarIconItem">
            <IoNotifications />
            <span className="topbarIconBadge">3</span>
          </div>
        </div>
        <button className="topbarLogoutBtn" onClick={removeUserToken}>
          تسجيل خروج
        </button>
        <Link to={`/profile/${userToken?.username}`}>
          <img
            src={
              userToken?.profilePicture ||
              "https://i.fbcd.co/products/resized/resized-1500-1000/d4c961732ba6ec52c0bbde63c9cb9e5dd6593826ee788080599f68920224e27d.webp"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}

export default TopBar;
