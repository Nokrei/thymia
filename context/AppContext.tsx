"use client";
import { createContext, useState, useEffect } from "react";

type contextType = {
  user: string;
  setUser: any;
  successCount: number;
  setSuccessCount: any;
};

const obj: contextType = {
  user: "",
  setUser: {},
  successCount: 0,
  setSuccessCount: {},
};

const AppContext = createContext(obj);

export const GlobalProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState("");
  const [successCount, setSuccessCount] = useState(0);

  return (
    <AppContext.Provider
      value={{ user, setUser, successCount, setSuccessCount }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
