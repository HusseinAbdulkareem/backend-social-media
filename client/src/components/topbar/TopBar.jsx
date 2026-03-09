import React, { useContext, useState, useEffect, useRef } from "react";
import "./topbar.css";
import { BiSearch } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { CiChat2 } from "react-icons/ci";
import { IoNotifications } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "../../hooks/useAxios";

function TopBar() {
  const { userToken, removeUserToken } = useContext(Context);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) return;
    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(`/users/search?q=${query}`);
        setResults(res.data);
        setShowDropdown(true);
      } catch {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (!val.trim()) {
      setResults([]);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (username) => {
    setQuery("");
    setShowDropdown(false);
    navigate(`/profile/${username}`);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link
          to="/"
          style={{
            textDecoration: "none",
          }}
        >
          <span className="logo"> Social Media </span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar" ref={searchRef}>
          <BiSearch />
          <input
            type="text"
            placeholder="Search for friends..."
            className="searchInput"
            value={query}
            onChange={handleQueryChange}
            onFocus={() => results.length > 0 && setShowDropdown(true)}
          />
          {showDropdown && results.length > 0 && (
            <div className="searchDropdown">
              {results.map((user) => (
                <div
                  key={user._id}
                  className="searchResultItem"
                  onClick={() => handleSelect(user.username)}
                >
                  <img
                    src={
                      user.profilePicture ||
                      "https://i.fbcd.co/products/resized/resized-1500-1000/d4c961732ba6ec52c0bbde63c9cb9e5dd6593826ee788080599f68920224e27d.webp"
                    }
                    alt=""
                    className="searchResultImg"
                  />
                  <span>{user.username}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link
            style={{
              textDecoration: "none",
            }}
            to="/"
            className="topbarLink"
          >
            HomePage
          </Link>
          {/* <span className="topbarLink">Timeline</span> */}
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
