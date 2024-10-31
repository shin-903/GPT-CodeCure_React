import React from 'react';
import { useForm } from 'react-hook-form';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, TextField, Button, Typography, Link } from '@mui/material';
import { signin } from '../api/user';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContext'; // コンテキストのフック

function SignIn() {
  // useFormを使ってフォームの管理をセットアップ
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setUserId } = useUserContext();


  // フォームが送信されたときの処理
  // const onSubmit = async (data) => {
  //   try {
  //     const res = await signin(data); // サインインリクエストが成功した場合に処理を続行
  //     alert("ログイン完了");
  //     navigate('/user'); // '/user' ページにナビゲート
  //   } catch (error) {
  //     alert("ログインに失敗しました");
  //   }
  // };

    // フォームが送信されたときの処理
  const onSubmit = async (data) => {
    try {
      const res = await signin(data); // サインインリクエストが成功した場合に処理を続行

      if (res.token) {
        alert("ログイン完了");
        setUserId(res.userId); // userIdを設定
        navigate('/user'); // '/user' ページにナビゲート
      } else {
       // 認証に失敗した場合の処理   alert("ログインに失敗しました: " + (res.error || "不明なエラー"));
        alert("ログインに失敗しました");

        navigate('/signin'); // ログインページにリダイレクト
      }
    } catch (error) {
      alert("エラーが発生しました。もう一度お試しください。");
    }
  };


  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      
      {/* Navigation bar 　上部のマージンを縮小　*/}
      <AppBar position="static" sx={{ bgcolor: '#000', borderBottom: '1px solid #444', width: '100%', marginTop: 0 }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Tabs value={1} textColor="inherit" indicatorColor="primary">
            <Tab label="Home" sx={{ color: '#fff' }} />
            <Tab label="Sign in" sx={{ color: '#fff', borderBottom: '2px solid #7F00FF' }} />
            <Tab label="Sign up" sx={{ color: '#fff' }} />
          </Tabs>
        </Toolbar>
      </AppBar>

      {/* Form Container */}
      <Container component="main" maxWidth="sm" sx={{ bgcolor: '#121212', padding: '2rem', borderRadius: '8px', border: '2px solid #7F00FF', mt: 30 }}>
        <Typography component="h1" variant="h5" sx={{ color: '#fff', textAlign: 'center', mb: 2 }}>
          Sign In
        </Typography>

        {/* Form Handling */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email"
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff' } }}
            sx={{ input: { color: '#fff' }, '& fieldset': { borderColor: '#7F00FF' }, '&:hover fieldset': { borderColor: '#7F00FF' } }}
          />

          {/* Password Field */}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long' } })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff' } }}
            sx={{ input: { color: '#fff' }, '& fieldset': { borderColor: '#7F00FF' }, '&:hover fieldset': { borderColor: '#7F00FF' } }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: '#7F00FF',
              '&:hover': { bgcolor: '#4C0099' },
              borderRadius: '5px',
            }}
          >
            Sign In
          </Button>
        </form>
      </Container>

      {/* Sign Up Link 　未完成　*/}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#fff' }}>
          Don't have an account?{' '}
          <Link href="/signup" variant="body2" sx={{ color: '#7F00FF' }}>
            Sign Up
          </Link>
        </Typography>
      </Box>

      
    </Box>
  );
}

export default SignIn;
