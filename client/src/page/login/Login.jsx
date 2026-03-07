import "./login.css";
import { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../hooks/useAxios";
import { Context } from "../../context/Context";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUserToken } = useContext(Context);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      setUserToken(res.data);
      navigate("/");
    } catch (err) {
      const msg = err.response?.data;
      setError(typeof msg === "string" ? msg : "حدث خطأ، حاول مجدداً");
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Media </h3>
          <span className="loginDesc">
            Connect with friends and the world around you .
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input ref={emailRef} placeholder="Email" className="loginInput" />
            <input
              ref={passwordRef}
              placeholder="Password"
              type="password"
              className="loginInput"
            />
            {error && <span className="loginError">{error}</span>}
            <button className="loginButton" onClick={handleLogin}>
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button
              className="loginRegisterButton"
              onClick={() => navigate("/register")}
            >
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
