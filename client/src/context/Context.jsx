import React, { createContext, useEffect, useState } from "react";
export const Context = createContext(null);
export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken;
  });
  const [userToken, setUserToken] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

    if (userToken) {
      localStorage.setItem("user", JSON.stringify(userToken));
    } else {
      localStorage.removeItem("user");
    }
  }, [token, userToken]);

  const removeToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const removeUserToken = () => {
    setUserToken(null);
    localStorage.removeItem("user");
  };

  const value = {
    token,
    setToken,
    userToken,
    setUserToken,
    removeToken,
    removeUserToken,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
