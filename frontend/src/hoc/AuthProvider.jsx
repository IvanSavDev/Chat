import AuthContext from '../context/AuthContext';
import { useState } from 'react';

export default function AuthProvider({ children }) {
  const isLogged = localStorage.getItem('userId') ? true : false;

  const [loggedIn, setLoggedIn] = useState(isLogged);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
