import { useState, createContext, useEffect } from "react";

const UserContext = createContext("email");

export const UserProvider = ({ children }) => {
  const [usr, setUsr] = useState();

  useEffect(() => {
    let email = localStorage.getItem("user");
    if (email) {
      setUsr(email);
    }
  }, []);

  return (
    <UserContext.Provider value={{ usr, setUsr }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
