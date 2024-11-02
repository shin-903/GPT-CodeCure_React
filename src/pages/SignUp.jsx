import React from 'react';
import { useForm } from 'react-hook-form';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, TextField, Button, Typography } from '@mui/material';
import { signup } from '../api/user';
import { useNavigate, Link } from 'react-router-dom';

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
      
      {/* Header Title */}
      <Box sx={{ bgcolor: '#000', py: 2, pl: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ color: '#fff', fontSize: '1.8rem', mr: 1, mt:1, ml:1 }}>
          GPT
        </Typography>
        <Typography variant="h5" sx={{ color: '#89CFF0', fontSize: '1.8rem', mt:1 }}>
          CodeCure
        </Typography>
      </Box>

      {/* Navigation bar 上部のマージンを縮小*/}
      <AppBar position="static" sx={{ bgcolor: '#000', borderBottom: '1px solid #444', width: '100%' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Tabs value={2} textColor="inherit" indicatorColor="primary">
            <Tab label="Home" component={Link} to="/" sx={{ color: '#fff', mr: 8 }} />
            <Tab label="Sign in" component={Link} to="/signin" sx={{ color: '#fff', mr: 8 }} />
            <Tab label="Sign up" component={Link} to="/signup" sx={{ color: '#fff' }} />
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
            ,'&:hover fieldset': { borderColor: '#7F00FF' }, '& input:-webkit-autofill': {
              WebkitTextFillColor: '#fff', // オートフィル時の文字色を白に設定
              WebkitBoxShadow: '0 0 0px 1000px #121212 inset', // 背景色を暗めに設定
              transition: 'background-color 5000s ease-in-out 0s'
            }}}
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
            ,'&:hover fieldset': { borderColor: '#7F00FF' }, '& input:-webkit-autofill': {
              WebkitTextFillColor: '#fff', // オートフィル時の文字色を白に設定
              WebkitBoxShadow: '0 0 0px 1000px #121212 inset', // 背景色を暗めに設定
              transition: 'background-color 5000s ease-in-out 0s'
            }}}
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
          <Link to="/signin" style={{ color: '#7F00FF', textDecoration: 'none' }} variant="body2">
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default SignUp;

