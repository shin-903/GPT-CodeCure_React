import React from 'react';
import { useForm } from 'react-hook-form';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, TextField, Button, Typography, Link } from '@mui/material';
import { signup } from '../api/user';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  // useFormを使ってフォームの管理をセットアップ
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // フォームが送信されたときの処理  bad requestのエラー処理未完成
  const onSubmit = async (data) => {
    try {
      const res = await signup(data); // サインアップリクエストが成功した場合に処理を続行
      alert("登録完了");
      navigate('/signin'); // '/signin' ページにナビゲート
    } catch (error) {
      alert("登録に失敗しました");
    }
  };

  
  // , justifyContent: 'center', alignItems: 'center'
  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      
      {/* Navigation bar 上部のマージンを縮小*/}
      <AppBar position="static" sx={{ bgcolor: '#000', borderBottom: '1px solid #444', width: '100%' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Tabs value={2} textColor="inherit" indicatorColor="primary">
            <Tab label="Home" sx={{ color: '#fff' }} />
            <Tab label="Sign in" sx={{ color: '#fff' }} />
            <Tab label="Sign up" sx={{ color: '#fff', borderBottom: '2px solid #7F00FF' }} />
          </Tabs>
        </Toolbar>
      </AppBar>

      {/* Form Container */}
      <Container component="main" maxWidth="sm" sx={{ bgcolor: '#121212', padding: '2rem', borderRadius: '8px', border: '2px solid #7F00FF', mt: 20 }}>
        <Typography component="h1" variant="h5" sx={{ color: '#fff', textAlign: 'center', mb: 2 }}>
          Sign Up
        </Typography>

        {/* Form Handling */}
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {/* Name Field */}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Name"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
            sx={{ input: { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' }, '& label': { color: '#fff' }, '& fieldset': { borderColor: '#7F00FF' }, '&:hover fieldset': { borderColor: '#7F00FF' } }}
          />

          {/* Email Field */}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email"
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            autoComplete="off" // オートフィルを無効に設定
            sx={{ input: { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' }, '& label': { color: '#fff' }, '& fieldset': { borderColor: '#7F00FF' }
            , '&:hover fieldset': { borderColor: '#7F00FF' }}}
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
            autoComplete="new-password" // オートフィルを無効に設定
            sx={{ input: { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' }, '& label': { color: '#fff' }, '& fieldset': { borderColor: '#7F00FF' }
            , '&:hover fieldset': { borderColor: '#7F00FF' }}}
          />

          {/* Password Confirmation Field */}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password confirmation"
            type="password"
            {...register('passwordConfirmation', {
              required: 'Please confirm your password',
              validate: (value) => value === watch('password') || 'Passwords do not match',
            })}
            error={!!errors.passwordConfirmation}
            helperText={errors.passwordConfirmation ? errors.passwordConfirmation.message : ''}
            sx={{ input: { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' }, '& label': { color: '#fff' }, '& fieldset': { borderColor: '#7F00FF' }, '&:hover fieldset': { borderColor: '#7F00FF' } }}
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
            Sign Up
          </Button>
        </form>
      </Container>

      {/* Sign In Link  未完成　*/}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#fff' }}>
          Have an account?{' '}
          <Link href="/signin" variant="body2" sx={{ color: '#7F00FF' }}>
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default SignUp;

