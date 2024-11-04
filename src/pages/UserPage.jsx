// import React from 'react';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, Card, CardContent, Typography, Avatar, Grid, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useEffect, useState } from 'react';
import { getUser } from "../api/user";
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../UserContext'; // コンテキストのフック



function UserPage() {

  const navigate = useNavigate();

  // 認証状態の管理
  const { posts, user, userId, isAuthenticated } = useUserContext(); // UserContextからuserIdと認証状態,user情報を取得

  // 日付をJSTに変換する関数
  const formatDateToJST = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Tokyo'
    };
    return new Intl.DateTimeFormat('ja-JP', options).format(date);
  };

  // ログアウト処理
  const logout = () => {
    localStorage.removeItem('token'); // ローカルストレージからトークンを削除
    navigate('/signin'); // サインインページにリダイレクト
  };

  useEffect(() => {
    // 未認証の場合はサインインページにリダイレクト
    if (!userId && !isAuthenticated) {
      navigate("/signin");
    }
  }, [userId, isAuthenticated, navigate]);

  console.log(user);



  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', color: '#fff' }}>
      
      {/* Header Title */}
      <Box sx={{ bgcolor: '#000', py: 2, pl: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ color: '#fff', fontSize: '1.8rem', mr: 1, mt:1, ml:1 }}>
          GPT
        </Typography>
        <Typography variant="h5" sx={{ color: '#89CFF0', fontSize: '1.8rem', mt:1 }}>
          CodeCure
        </Typography>
      </Box>

      {/* AppBar with Tabs */}
      <AppBar position="static" sx={{ bgcolor: '#000', borderBottom: '1px solid #444' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Tabs value={3} textColor="inherit" indicatorColor="primary">
            <Tab label="Home" component={Link} to="/" sx={{ color: '#fff', mr: 8 }} />
            <Tab label="Gpt" component={Link} to="/gpt" sx={{ color: '#fff', mr: 8 }} />
            <Tab label="New" component={Link} to="/new/post" sx={{ color: '#fff', mr: 8 }} />
            <Tab label="Profile" component={Link} to="/user" sx={{ color: '#fff' }} />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container sx={{ display: 'flex', mt: 4 }}>
        {/* 左側のサイドバー */}
        <Box sx={{ width: '300px', bgcolor: '#1c1c1c', borderRadius: '8px', p: 3 ,mb: 20 }}>
          <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
            {user?.name || 'Guest'}
          </Typography>
          <Typography variant="body2" sx={{ color: '#aaa', mb: 3 }}>
            {user?.email || 'No email available'}
          </Typography>

          <Divider sx={{ bgcolor: '#444' }} />

          <List> {/* logout機能　未完成 */}
            {/* Settingsリンク */}
            <ListItem button component={Link} to="/user/edit">
              <ListItemIcon>
                <SettingsIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Settings" sx={{ color: '#fff' }} />
            </ListItem>
            {/* Logoutリンク */}
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Log out" sx={{ color: '#fff' }} />
            </ListItem>
          </List>
        </Box>

        {/* logout時のトークン削除 */}
        {/* const logout = () => {
          localStorage.removeItem('token');
          navigate('/login');
        }; */}
        

        {/* 右側の投稿リスト */}
        <Grid container spacing={3} sx={{ ml: 6 ,mb: 20 }}>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ display: 'flex', alignItems: 'center', bgcolor: '#1c1c1c', p: 2 }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      component={Link}
                      to={`/post/${post.id}`} // post.idに基づく動的なリンク
                      sx={{ color: '#fff', textDecoration: 'none' }} 
                    >
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="#aaa">
                      {formatDateToJST(post.created_at)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{
                  color: '#aaa',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '70vh', // 画面中央に配置
                }}
              >
                No posts available
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default UserPage;