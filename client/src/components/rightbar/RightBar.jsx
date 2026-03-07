import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { MdAdd } from "react-icons/md";
import { IoRemove } from "react-icons/io5";
function HomeRightbar() {
  return (
    <>
      <div className="birthdayContainer">
        <img className="birthdayImg" src="assets/gift.png" alt="" />
        <span className="birthdayText">
          <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
        </span>
      </div>
      <img className="rightbarAd" src="assets/ad.png" alt="" />
      <h4 className="rightbarTitle">Online Friends</h4>
      <ul className="rightbarFriendList">
        {Users.map((u) => (
          <Online key={u.id} user={u} />
        ))}
      </ul>
    </>
  );
}

function ProfileRightbar({ user, friends }) {
  const { userToken } = useContext(Context);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    if (!user || !userToken) return;
    setFollowed(user.followers?.includes(userToken._id));
  }, [user, userToken]);

  const handleFollowClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: userToken._id,
        });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: userToken._id,
        });
      }
      setFollowed(!followed);
    } catch (Err) {
      console.log(Err);
    }
  };

  return (
    <>
      {userToken?.username !== user?.username && (
        <button className="rightbarFollowButton" onClick={handleFollowClick}>
          {followed ? "Unfollow" : "Follow"}{" "}
          {followed ? <IoRemove /> : <MdAdd />}
        </button>
      )}

      <h4 className="rightbarTitle">User information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user?.city || "N/A"}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user?.from || "N/A"}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">
            {user?.relationship || "N/A"}
          </span>
        </div>
      </div>
      <h4 className="rightbarTitle">User friends</h4>
      <div className="rightbarFollowings">
        {friends.map((friend) => (
          <Link
            style={{ textDecoration: "none" }}
            to={`/profile/${friend.username}`}
            key={friend._id}
          >
            <div className="rightbarFollowing">
              <img
                src={
                  friend.profilePicture ||
                  "https://i.fbcd.co/products/resized/resized-1500-1000/d4c961732ba6ec52c0bbde63c9cb9e5dd6593826ee788080599f68920224e27d.webp"
                }
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (!user?._id) return;
    const getFriends = async () => {
      try {
        const response = await axios.get(`/users/friends/` + user._id);
        setFriends(response.data);
      } catch (Err) {
        console.log(Err);
      }
    };
    getFriends();
  }, [user?._id]);

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? (
          <ProfileRightbar user={user} friends={friends} />
        ) : (
          <HomeRightbar />
        )}
      </div>
    </div>
  );
}
