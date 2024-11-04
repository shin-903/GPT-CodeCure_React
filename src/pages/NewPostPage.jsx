import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, TextField, Button, Typography, Card, CardContent, Select, MenuItem, Chip } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { createPost } from '../api/user'; // createPost関数をインポート
import { useUserContext } from '../UserContext'; // コンテキストのフック
import { marked } from 'marked'; // マークダウンをHTMLに変換するためのライブラリ
import DOMPurify from 'dompurify'; // XSS対策のためのDOMPurifyをインポート

function NewPostPage() {
  const [tags, setTags] = useState([]);

  // react-hook-form の設定
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();
  const { userId, isAuthenticated } = useUserContext(); // UserContextからuserIdと認証状態を取得

  useEffect(() => {
    if (!userId && !isAuthenticated) {
      navigate("/signin");
    }
  }, [userId, isAuthenticated, navigate]);

  const availableTags = [
    { id: 1, name: 'Ruby' },
    { id: 2, name: 'Rails' },
    { id: 3, name: 'JavaScript' },
    { id: 4, name: 'React' },
    { id: 5, name: 'Docker' },
    { id: 6, name: 'SQL' },
    { id: 7, name: 'Python' },
    { id: 8, name: 'CSS' },
    { id: 9, name: 'HTML' },
    { id: 10, name: 'AWS' },
    { id: 11, name: 'Git' },
  ];

  const handleTagAdd = (event) => {
    const value = event.target.value;
    if (value && !tags.includes(value)) {
      setTags([...tags, value]);
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // フォームの送信処理
  const onSubmitPost = async (data) => {
    const postData = {
      title: data.postTitle,
      content: DOMPurify.sanitize(marked(data.postContent)), // マークダウンをサニタイズ
      userId: userId,
      tagIds: tags.map(tag => availableTags.find(t => t.name === tag)?.id) // タグ名からIDを取得
    };

    // APIリクエストを送信
    const response = await createPost(postData);
    if (response.error) {
      console.error(response.error);
    } else {
      console.log('Post created successfully:', response.post);
      navigate('/'); // ホームにリダイレクト
    }
  };

  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ bgcolor: '#000', py: 2, pl: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ color: '#fff', fontSize: '1.8rem', mr: 1, mt: 1, ml: 1 }}>
          GPT
        </Typography>
        <Typography variant="h5" sx={{ color: '#89CFF0', fontSize: '1.8rem', mt: 1 }}>
          CodeCure
        </Typography>
      </Box>

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
        <Card sx={{ bgcolor: '#1c1c1c', p: 2, width: '100%', maxWidth: 600, mb: 5 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2, fontSize: '1rem' }}>
              Create New Post
            </Typography>

            <form onSubmit={handleSubmit(onSubmitPost)}>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Post Title"
                {...register('postTitle', { required: 'This field is required' })}
                error={!!errors.postTitle}
                helperText={errors.postTitle?.message}
                sx={{
                  bgcolor: '#333',
                  color: '#fff',
                  mb: 2,
                  input: { color: '#fff' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#444',
                    },
                  },
                }}
              />

              <TextField
                variant="outlined"
                multiline
                rows={16}
                fullWidth
                placeholder="Write your post here..."
                {...register('postContent', { required: 'This field is required' })}
                error={!!errors.postContent}
                helperText={errors.postContent?.message}
                sx={{
                  bgcolor: '#333',
                  color: '#fff',
                  mb: 2,
                  textarea: { color: '#fff' },
                  input: { color: '#fff' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#444',
                    },
                  },
                }}
              />

              <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <Typography sx={{ color: '#fff', mb: 1 }}>Select Tags:</Typography>
                <Select
                  variant="outlined"
                  fullWidth
                  onChange={handleTagAdd}
                  sx={{
                    bgcolor: '#333',
                    color: '#fff',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#444',
                      },
                    },
                  }}
                >
                  {availableTags.map(tag => (
                    <MenuItem key={tag.id} value={tag.name}>{tag.name}</MenuItem>
                  ))}
                </Select>
                <Box sx={{ mt: 1 }}>
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => handleTagRemove(tag)}
                      sx={{ margin: '2px', bgcolor: '#7F00FF', color: '#fff' }}
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <Button type="submit" variant="contained" sx={{ bgcolor: '#7F00FF', mr: 2 }}>
                  POST &gt;
                </Button>
                <Button component={Link} to="/gpt" variant="contained" sx={{ bgcolor: '#7F00FF' }}>
                  Chat GPT
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
