import { createContext, useEffect, useState } from "react";
import axiosClient from "../config/axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);

  const checkAuth = async () => {
    axiosClient
      .get("/auth/check-auth")
      .then((data) => {
        setIsAuth(data.data.isAuth);
        if (data.data.isAuth) {
          setDecodedToken(data.data.decodedToken);
        } else {
          setDecodedToken(null);
        }
      })
      .catch((error) => {
        setIsAuth(false);
        setDecodedToken(null);
      });
  };
  useEffect(() => {
    checkAuth();
  }, []);
  const data = {
    isAuth,
    setIsAuth,
    decodedToken,
    setDecodedToken,
    checkAuth,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };