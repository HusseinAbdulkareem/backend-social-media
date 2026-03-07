import "./register.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../hooks/useAxios";

export default function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordAgainRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (passwordRef.current.value !== passwordAgainRef.current.value) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }
    try {
      await axios.post("/auth/register", {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data;
      setError(typeof msg === "string" ? msg : "حدث خطأ، حاول مجدداً");
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Media</h3>
          <span className="loginDesc">
            Connect with friends and the world around you.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input ref={usernameRef} placeholder="Username" className="loginInput" />
            <input ref={emailRef} placeholder="Email" className="loginInput" />
            <input
              ref={passwordRef}
              placeholder="Password"
              type="password"
              className="loginInput"
            />
            <input
              ref={passwordAgainRef}
              placeholder="Password Again"
              type="password"
              className="loginInput"
            />
            {error && <span className="loginError">{error}</span>}
            <button className="loginButton" onClick={handleRegister}>
              Sign Up
            </button>
            <button
              className="loginRegisterButton"
              onClick={() => navigate("/login")}
            >
              Log into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
