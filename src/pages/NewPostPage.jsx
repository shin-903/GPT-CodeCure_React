import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, Grid, TextField, Button, Typography, Card, CardContent } from '@mui/material';

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
      {/* AppBar with Tabs */}
      <AppBar position="static" sx={{ bgcolor: '#000', borderBottom: '1px solid #444' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Tabs value={1} textColor="inherit" indicatorColor="primary">
            <Tab label="Home" sx={{ color: '#fff' }} />
            <Tab label="New" sx={{ color: '#fff', borderBottom: '2px solid #7F00FF' }} />
            <Tab label="Account" sx={{ color: '#fff' }} />
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
