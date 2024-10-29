import React from 'react';
import { useForm } from 'react-hook-form';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, TextField, Button, Typography, Link } from '@mui/material';

function SignIn() {
  // useFormを使ってフォームの管理をセットアップ
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // フォームが送信されたときの処理
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      
      {/* Navigation bar */}
      <AppBar position="static" sx={{ bgcolor: '#000', borderBottom: '1px solid #444', width: '100%' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Tabs value={1} textColor="inherit" indicatorColor="primary">
            <Tab label="Home" sx={{ color: '#fff' }} />
            <Tab label="Sign in" sx={{ color: '#fff', borderBottom: '2px solid #7F00FF' }} />
            <Tab label="Sign up" sx={{ color: '#fff' }} />
          </Tabs>
        </Toolbar>
      </AppBar>

      {/* Form Container */}
      <Container component="main" maxWidth="sm" sx={{ bgcolor: '#121212', padding: '2rem', borderRadius: '8px', border: '2px solid #7F00FF', mt: 4 }}>
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

      {/* Sign Up Link */}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#fff' }}>
          Don't have an account?{' '}
          <Link href="#" variant="body2" sx={{ color: '#7F00FF' }}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default SignIn;
