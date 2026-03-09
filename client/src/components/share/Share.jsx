import { useContext, useRef, useState } from "react";
import "./share.css";
import { FaPhotoVideo, FaTags, FaMapMarkerAlt, FaSmile } from "react-icons/fa";
import { Context } from "../../context/Context";
import axios from "../../hooks/useAxios";
import { MdCancel } from "react-icons/md";
export default function Share() {
  const { userToken } = useContext(Context);

  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: userToken._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (Err) {
        console.log(Err);
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              userToken?.profilePicture ||
              "https://i.fbcd.co/products/resized/resized-1500-1000/d4c961732ba6ec52c0bbde63c9cb9e5dd6593826ee788080599f68920224e27d.webp"
            }
            alt=""
          />
          <input
            placeholder={`What's in your mind ${userToken?.username}?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} className="shareImg" alt="" />
            <MdCancel
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}

        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <FaPhotoVideo className="shareIcon" style={{ color: "tomato" }} />
              <span className="shareOptionText">Photo or Video</span>
              <input
                className="shareInputImg"
                type="file"
                name="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <FaTags className="shareIcon" style={{ color: "blue" }} />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <FaMapMarkerAlt
                className="shareIcon"
                style={{ color: "green" }}
              />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <FaSmile className="shareIcon" style={{ color: "goldenrod" }} />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
