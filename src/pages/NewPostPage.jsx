import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { gptResponse } from '../api/user'; // user.js から関数をインポート

function NewPostPage() {
  const [submittedContent, setSubmittedContent] = useState('');
  const [gptResponseData, setGptResponse] = useState('');

  // react-hook-form の設定
  const { register, handleSubmit, formState: { errors } } = useForm();

  // フォームの送信処理
  const onSubmitPost = async (data) => {
    setSubmittedContent(data.postContent);
    const response = await gptResponse(data.postContent); // APIリクエストを送信
    if (response.response) {
      setGptResponse(response.response); // GPTからのレスポンスを設定
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(gptResponseData);
  };

  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column' }}>
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
          <Tabs value={2} textColor="inherit" indicatorColor="primary">
            <Tab label="Home" component={Link} to="/" sx={{ color: '#fff', mr: 8 }} />
            <Tab label="Gpt" component={Link} to="/gpt" sx={{ color: '#fff', mr: 8 }} />
            <Tab label="New" component={Link} to="/new/post" sx={{ color: '#fff', mr: 8 }} />
            <Tab label="Profile" component={Link} to="/user" sx={{ color: '#fff' }} />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ bgcolor: '#1c1c1c', p: 2, width: '100%', maxWidth: 600 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
              Create New Post
            </Typography>

            <form onSubmit={handleSubmit(onSubmitPost)}>
              <TextField
                variant="outlined"
                multiline
                rows={5}
                fullWidth
                placeholder="Write your post here..."
                {...register('postContent', { required: 'This field is required' })}
                error={!!errors.postContent}
                helperText={errors.postContent?.message}
                sx={{
                  bgcolor: '#333',
                  color: '#fff',
                  textarea: { color: '#fff' },
                  input: { color: '#fff' },
                  borderColor: '#444',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#444',
                    },
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <Button type="submit" variant="contained" sx={{ bgcolor: '#7F00FF' }}>
                  POST &gt;
                </Button>
                <Button component={Link} to="/gpt" variant="contained" sx={{ bgcolor: '#7F00FF' }}>
                  Go to GPT Page
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default NewPostPage;
