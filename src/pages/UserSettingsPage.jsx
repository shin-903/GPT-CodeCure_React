import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../UserContext';
import { updateUser, deleteUser } from "../api/user";

function UserSettingsPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { userId, isAuthenticated } = useUserContext();

  useEffect(() => {
    if (!userId && !isAuthenticated) {
      navigate("/signin");
    }
  }, [userId, isAuthenticated, navigate]);

  // ユーザー情報の更新処理
  const onSubmit = async (data) => {
    try {
      const result = await updateUser(userId, data);
      if (result.error) {
        alert(result.error);
      } else {
        alert("ユーザー情報が更新されました。");
        navigate("/user");
      }
    } catch (error) {
      console.error("更新エラー:", error);
      alert("更新に失敗しました。");
    }
  };

  // アカウント削除処理
  const handleDelete = async () => {
    const confirmDelete = window.confirm("アカウントを本当に削除しますか？");
    if (confirmDelete) {
      try {
        const result = await deleteUser(userId);
        if (result.error) {
          alert(result.error);
        } else {
          alert("アカウントが削除されました。");
          navigate("/signin");
        }
      } catch (error) {
        console.error("削除エラー:", error);
        alert("削除に失敗しました。");
      }
    }
  };

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
          <Tabs>
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
                WebkitTextFillColor: '#fff',
                WebkitBoxShadow: '0 0 0px 1000px #121212 inset',
                transition: 'background-color 5000s ease-in-out 0s'
              }}}
            />
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
                WebkitTextFillColor: '#fff',
                WebkitBoxShadow: '0 0 0px 1000px #121212 inset',
                transition: 'background-color 5000s ease-in-out 0s'
              }}}
            />
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
        </Container>

        {/* 右側のアカウント削除ボタン */}
        {/* <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', ml: 10, mt: 10 }}>
          <Typography variant="body1" sx={{ color: '#fff', mb: 2 }}>
            Do you delete the account?
          </Typography>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            DELETE
          </Button>
        </Box> */}
      </Container>
    </Box>
  );
}

export default UserSettingsPage;
