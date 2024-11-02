import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, Grid, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';


function NewPostPage() {
  const [submittedContent, setSubmittedContent] = useState('');
  
  // react-hook-form の設定
  const { register, handleSubmit, formState: { errors } } = useForm();

  // フォームの送信処理
  const onSubmit = (data) => {
    setSubmittedContent(data.postContent);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(submittedContent);
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
          <Tabs value={1} textColor="inherit" indicatorColor="primary">
            <Tab label="Home" component={Link} to="/" sx={{ color: '#fff', mr: 8 }} />
            <Tab label="New" component={Link} to="/new/post" sx={{ color: '#fff', mr: 8 }} />
            <Tab label="Profile" component={Link} to="/user" sx={{ color: '#fff' }} />                                
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* Left side: New Post Form (Small) */}
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: '#1c1c1c', p: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                  New Post
                </Typography>
                
                {/* フォームの部分 */}
                <form onSubmit={handleSubmit(onSubmit)}>
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
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Grid>

          {/* Right side: Submitted Post Preview and ChatGPT Response (Larger) */}
          <Grid item xs={12} md={8}>
            {/* ChatGPT Response Section (Larger Box) */}
            <Card sx={{ bgcolor: '#1c1c1c', p: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#7F00FF', mb: 2 }}>
                  ChatGPTにメッセージを送信する
                </Typography>
                <Box sx={{ bgcolor: '#333', p: 2, borderRadius: 1, minHeight: '300px', maxHeight: '400px', overflowY: 'auto' }}>
                  <Typography sx={{ color: '#fff' }}>{submittedContent}</Typography>
                </Box>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <Button variant="contained" sx={{ bgcolor: '#7F00FF' }} onClick={handleSubmit}>
                  SUBMIT &gt;
                </Button>
              </Box>
            </Card>

            {/* ChatGPT Response Preview Section (Larger Box) */}
            <Card sx={{ bgcolor: '#1c1c1c', mt: 4, p: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                  ChatGPT
                </Typography>
                <Box sx={{ bgcolor: '#333', p: 2, borderRadius: 1, minHeight: '300px', maxHeight: '400px', overflowY: 'auto' }}>
                  <Typography sx={{ color: '#fff' }}>{submittedContent}</Typography>
                </Box>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <Button variant="contained" sx={{ bgcolor: '#7F00FF' }} onClick={handleCopy}>
                  COPY &gt;
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default NewPostPage;
