import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { HeaderIcon } from './UsersComponents';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const login = (userId,userName) => {
    // 로그인 처리 로직
    setIsLoggedIn(true);
    setUserId(userId);
    setUserName(userName.replace(/"/g, ''));
  };

  const logout = () => {
    // 로그아웃 처리 로직
    setIsLoggedIn(false);
    setUserId(null);
    setUserName(null);
  };

  const updateUserName = (userName) => {
    setUserName(userName);
  };

  const updateUserId = (userId) => {
    setUserId(userId);
  }

  const deleteUser = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, setUserId, userName, setUserName, login, logout, updateUserName, updateUserId, deleteUser }}>
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
