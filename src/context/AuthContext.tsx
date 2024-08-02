import React, { createContext, useState, useContext, useEffect } from "react";

import { Dispatch, SetStateAction } from "react";

type User = {
  email: string;
  password: string;
  token: string;
  name: string;
  id: string;
  user: string;
  data: {
    token: string;
    user: {
      email: string;
      id: string;
      name: string;
    };
  };
};

export interface AuthContextProps {
  authenticated: boolean;
  userDetails: User | null;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  setUserDetails: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextProps>({
  authenticated: true,
  userDetails: null,
  setAuthenticated: () => {},
    setUserDetails: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [authenticated, setAuthenticated] = useState(true);
  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem("userData") || "{}");
    const apiToken = store?.data?.token;
    if (!apiToken) {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
      setUserDetails(store);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ authenticated, userDetails, setAuthenticated, setUserDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};
