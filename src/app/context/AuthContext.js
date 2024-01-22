"use client";

import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [usersAuthToken, setUsersAuthToken] = useState("");
  return (
    <AuthContext.Provider value={{ usersAuthToken, setUsersAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}
