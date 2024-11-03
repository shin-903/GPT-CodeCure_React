import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, TextField, Button, Typography, Card } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../UserContext'; // コンテキストのフック


function UserSettingsPage() {
  // react-hook-form の設定
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  // フォームの送信処理　未完成
  const onSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  // アカウント削除処理  未完成
  const handleDelete = () => {
    console.log('Account deletion triggered');
  };

  const navigate = useNavigate();
  // 認証状態の管理
  const { posts, user, userId, isAuthenticated } = useUserContext(); // UserContextからuserIdと認証状態,user情報を取得

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
          <Tabs >
            <Tab label="Home" component={Link} to="/" sx={{ color: '#fff', mr: 8 }} />
            <Tab label="Gpt" component={Link} to="/gpt" sx={{ color: '#fff', mr: 8 }} />
            <Tab label="New" component={Link} to="/new/post" sx={{ color: '#fff', mr: 8 }} />
            <Tab label="Profile" component={Link} to="/user" sx={{ color: '#fff' }} />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        {/* 左側のユーザー編集フォーム */}
        <Container component="main" maxWidth="sm" sx={{ bgcolor: '#121212', padding: '2rem', borderRadius: '8px', border: '2px solid #7F00FF', mt: 15 }}>

        {/* <Card sx={{ width: '500px', p: 3, border: '2px solid #7F00FF', borderRadius: '10px' }}> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              {...register('name', { required: 'Name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{ input: { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' }, '& label': { color: '#fff' }, '& fieldset': { borderColor: '#7F00FF' }, '&:hover fieldset': { borderColor: '#7F00FF' } }}
              />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ input: { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' }, '& label': { color: '#fff' }, '& fieldset': { borderColor: '#7F00FF' }
              ,'&:hover fieldset': { borderColor: '#7F00FF' }, '& input:-webkit-autofill': {
                WebkitTextFillColor: '#fff', // オートフィル時の文字色を白に設定
                WebkitBoxShadow: '0 0 0px 1000px #121212 inset', // 背景色を暗めに設定
                transition: 'background-color 5000s ease-in-out 0s'
              }}}            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long' } })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ input: { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' }, '& label': { color: '#fff' }, '& fieldset': { borderColor: '#7F00FF' }
              ,'&:hover fieldset': { borderColor: '#7F00FF' }, '& input:-webkit-autofill': {
                WebkitTextFillColor: '#fff', // オートフィル時の文字色を白に設定
                WebkitBoxShadow: '0 0 0px 1000px #121212 inset', // 背景色を暗めに設定
                transition: 'background-color 5000s ease-in-out 0s'
              }}}            />
            <TextField
              fullWidth
              label="Password confirmation"
              type="password"
              variant="outlined"
              margin="normal"
              {...register('passwordConfirmation', { required: 'Please confirm your password', validate: value => value === watch('password') || 'Passwords do not match' })}
              error={!!errors.passwordConfirmation}
              helperText={errors.passwordConfirmation?.message}
              sx={{ input: { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' }, '& label': { color: '#fff' }, '& fieldset': { borderColor: '#7F00FF' }, '&:hover fieldset': { borderColor: '#7F00FF' } }}
              />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, bgcolor: '#7F00FF', color: '#fff' }}>
              SAVE CHANGES
            </Button>
          </form>
        {/* </Card> */}
        </Container>

        {/* 右側のアカウント削除ボタン */}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', ml: 10, mt: 10 }}>
          <Typography variant="body1" sx={{ color: '#fff', mb: 2 }}>
            Do you delete the account?
          </Typography>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            DELETE
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default UserSettingsPage;
