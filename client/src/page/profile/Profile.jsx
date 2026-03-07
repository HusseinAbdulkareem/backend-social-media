import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/SideBar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../hooks/useAxios";
export default function Profile() {
  const [user, setUser] = useState({});
  const { username } = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users?username=${username}`);
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user?.coverPicture ||
                  "https://www.redsparrowdigital.com/assets/images/posts/11-benefits-of-hiring-social-media-agency.webp"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user?.profilePicture ||
                  "https://i.fbcd.co/products/resized/resized-1500-1000/d4c961732ba6ec52c0bbde63c9cb9e5dd6593826ee788080599f68920224e27d.webp"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user?.username}</h4>
              <span className="profileInfoDesc">
                {user?.desc || "Hello my friends!"}
              </span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
