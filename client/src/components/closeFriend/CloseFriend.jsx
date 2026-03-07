import "./closeFriend.css";

export default function CloseFriend({ user }) {
  return (
    <>
      <li className="sidebarFriend">
        <div className="sidebarFriendImgWrapper">
          <img
            className="sidebarFriendImg"
            src={
              // user.profilePicture
              "https://i.fbcd.co/products/resized/resized-1500-1000/d4c961732ba6ec52c0bbde63c9cb9e5dd6593826ee788080599f68920224e27d.webp"
            }
            alt={user?.username}
          />
          <span className="sidebarFriendOnline" />
        </div>
        <span className="sidebarFriendName">{user?.username}</span>
      </li>
    </>
  );
}
