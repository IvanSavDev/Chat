import React, { useState } from 'react';
import AuthContext from '../context/AuthContext';

export default function AuthProvider({ children }) {
  const isLogged = !!localStorage.getItem('userId');

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
