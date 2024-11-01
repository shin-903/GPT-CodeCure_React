// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 認証状態を追加
  const [user, setUser] = useState({ name: '', email: '' });

// ログイン関数
const login = (id, user) => {
    setUser(user);             // ユーザー情報を設定
    // console.log("設定されたユーザー:", user); // (デバック用)
    setUserId(id);             // ユーザーIDを設定
    setIsAuthenticated(true);   // 認証状態を更新
  };
  

  return (
    <UserContext.Provider value={{ userId, setUserId, isAuthenticated, login, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// カスタムフックでUserContextの値を取得
export const useUserContext = () => useContext(UserContext);


