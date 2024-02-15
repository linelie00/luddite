import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (id,bookmarks) => {
    // 로그인 처리 로직
    setIsLoggedIn(true);
  };

  const logout = () => {
    // 로그아웃 처리 로직
    setIsLoggedIn(false);
    localStorage.setItem('bookmarks', null);
    localStorage.removeItem('userId');
    localStorage.removeItem('bookmarks');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return auth;
};
