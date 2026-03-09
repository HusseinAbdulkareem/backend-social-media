import { useContext } from "react";
import Home from "./page/home/Home";
import Profile from "./page/profile/Profile";
import Login from "./page/login/Login";
import Register from "./page/register/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "./context/Context";
import Messanger from "./page/messanger/Messanger";

function App() {
  const { userToken } = useContext(Context);

  return (
    <div>
      <Routes>
        if (!userToken) {localStorage.removeItem("userToken")}
        <Route
          path="/"
          element={userToken ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:username"
          element={userToken ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/messanger"
          element={!userToken ? <Navigate to="/login" /> : <Messanger />}
        />
        <Route
          path="/login"
          element={userToken ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={userToken ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </div>
  );
}

export default App;
