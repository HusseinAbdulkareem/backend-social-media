import "./sidebar.css";
import {
  FaRss,
  FaComments,
  FaPlayCircle,
  FaUsers,
  FaBookmark,
  FaQuestionCircle,
  FaBriefcase,
  FaCalendarAlt,
  FaSchool,
  FaUser,
} from "react-icons/fa";

import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Sidebar() {
  const { userToken, removeUserToken } = useContext(Context);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link
            style={{
              textDecoration: "none",
            }}
            to={`/profile/${userToken?.username}`}
          >
            <li className="sidebarListItem">
              <FaUser className="sidebarIcon" />

              <span className="sidebarListItemText">Profile</span>
            </li>
          </Link>
          <Link
            style={{
              textDecoration: "none",
            }}
            to={"/"}
          >
            <li className="sidebarListItem">
              <FaRss className="sidebarIcon" />

              <span className="sidebarListItemText">Feed</span>
            </li>
          </Link>
          <li className="sidebarListItem">
            <FaComments className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <FaPlayCircle className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <FaUsers className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <FaBookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <FaQuestionCircle className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <FaBriefcase className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <FaCalendarAlt className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <FaSchool className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        {/* <button className="sidebarButton">Show More</button> */}
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          <h1 className="closeFrined">Close Friend</h1>

          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
