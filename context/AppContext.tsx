"use client";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactElement,
} from "react";

// TODO: get rid of anys
type ContextType = {
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
  successCount: number;
  setSuccessCount: Dispatch<SetStateAction<number>>;
};

const AppContext = createContext<ContextType>({
  user: "",
  setUser: () => null,
  successCount: 0,
  setSuccessCount: () => null,
});

type Props = {
  children: ReactElement;
};

// isChecking === true, user === false
// isChecking === true, user === true
// isChecking === false, user === true
// isChecking === false, user === false

// if (isChecking) return <p>Loading...</p>;

// if (!isChecking && !user) Router.push("/");

// return <p>Welcome {user}</p>;

export const GlobalProvider = ({ children }: Props) => {
  const [user, setUser] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
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
