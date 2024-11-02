// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUser } from "./api/user";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 認証状態を追加
  const [user, setUser] = useState({ name: '', email: '' });
  const [posts, setPosts] = useState([]); // postsの状態を追加


  // 投稿を取得するためにログイン関数を非同期関数に変更
//   const login = async (id, user) => {
//     setUser(user);
//     setUserId(id);
//     setIsAuthenticated(true);

//   try {
//     // getUser関数を使用してユーザー情報と投稿を取得
//     const result = await getUser(id);
//     if (result.user) {
//       setUser(result.user);
//       setPosts(result.user.posts); // 取得した投稿をセット
//     } else {
//       console.error("ユーザー情報の取得に失敗しました");
//     }
//   } catch (error) {
//     console.error("投稿の取得中にエラーが発生しました:", error);
//   }
// };

// ログイン関数（ユーザーIDとユーザー情報を設定し、認証状態を更新）
const login = async (id, user) => {
    setUser(user);
    setUserId(id);
    setIsAuthenticated(true);
  };

  // isAuthenticatedとuserIdの変更を監視し、user情報とpostsを取得 (userIdが確実に設定された状態でgetUserを実行)
  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && userId) {
        try {
          const result = await getUser(userId);
          if (result.user) {
            setUser(result.user);
            setPosts(result.posts); // 取得した投稿をセット
            console.log("ユーザー情報の取得に成功しました");
          } else {
            console.error("ユーザー情報の取得に失敗しました");
          }
        } catch (error) {
          console.error("投稿の取得中にエラーが発生しました:", error);
        }
      }
    };

    fetchUserData();
  }, [isAuthenticated, userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId, isAuthenticated, login, user, setUser, posts, setPosts }}>
      {children}
    </UserContext.Provider>
  );
};

// カスタムフックでUserContextの値を取得
export const useUserContext = () => useContext(UserContext);


