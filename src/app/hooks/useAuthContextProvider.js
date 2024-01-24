import { useContext } from "react";
import { isJwtExpired } from "jwt-check-expiration";
import { AuthContext } from "../context/AuthContext";

export default function useAuthContextProvider() {
  const { usersAuthToken, setUsersAuthToken } = useContext(AuthContext);
  function updateStoredAuthToken(token) {
    // exit function when token is empty or not  provided
    if (!token) return;

    // check if token is not expired before storing to localStoarge and updating state
    if (!isJwtExpired(token)) {
      localStorage.setItem("token", token);
      // update state
      setUsersAuthToken(token);
    } else {
      // if expired, delete any stored token
      localStorage.removeItem("token");
      setUsersAuthToken("");
    }
  }

  function logout() {
    setUsersAuthToken("");
    localStorage.removeItem("token");
  }

  return { usersAuthToken, updateStoredAuthToken, logout };
}
