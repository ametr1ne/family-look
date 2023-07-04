import { createContext, useState } from "react";
export const AuthContext = createContext(null);

const AuthProvider = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  return <div>AuthProvider</div>;
};

export default AuthProvider;
