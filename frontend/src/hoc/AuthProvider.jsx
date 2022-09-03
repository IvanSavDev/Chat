import React, { useMemo, useState } from 'react';
import AuthContext from '../context/AuthContext';

export default function AuthProvider({ children }) {
  const isLogged = !!localStorage.getItem('userId');

  const [loggedIn, setLoggedIn] = useState(isLogged);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const authorizationInfo = useMemo(() => ({ loggedIn, logIn, logOut }), [logIn, logOut, loggedIn]);

  return (
    <AuthContext.Provider value={authorizationInfo}>
      {children}
    </AuthContext.Provider>
  );
}
