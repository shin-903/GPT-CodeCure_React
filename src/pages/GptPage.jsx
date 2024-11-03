import React, { useState } from 'react';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { gptResponse } from '../api/user'; // user.js から関数をインポート

function GptPage() {
  const [gptResponseData, setGptResponse] = useState('');
  const [question, setQuestion] = useState('');

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    const response = await gptResponse(question); // APIリクエストを送信
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
          <Tabs value={1} textColor="inherit" indicatorColor="primary">
            <Tab label="Home" component={Link} to="/" sx={{ color: '#fff', mr: 8 }} />
            <Tab label="Gpt" component={Link} to="/gpt" sx={{ color: '#fff', mr: 8 }} />
            <Tab label="New" component={Link} to="/new/post" sx={{ color: '#fff', mr: 8 }} />
            <Tab label="Profile" component={Link} to="/user" sx={{ color: '#fff' }} />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        {/* GPTへの質問送信フィード */}
        <Card sx={{ bgcolor: '#1c1c1c', p: 2, width: '48%', height: '100%' }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#7F00FF', mb: 2 }}>
              ChatGPTに質問を送信する
            </Typography>
            <form onSubmit={handleQuestionSubmit}>
              <TextField
                variant="outlined"
                multiline
                rows={5}
                fullWidth
                placeholder="Ask your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
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
                  SEND &gt;
                </Button>
                <Button component={Link} to="/new/post" variant="contained" sx={{ bgcolor: '#7F00FF' }}>
                  New Post
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>

        {/* ChatGPTのレスポンス表示フィード */}
        <Card sx={{ bgcolor: '#1c1c1c', p: 2, width: '48%', height: '100%' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
              ChatGPTのレスポンス
            </Typography>
            <Box sx={{ bgcolor: '#333', p: 2, borderRadius: 1, flex: '1', overflowY: 'auto' }}>
              <Typography sx={{ color: '#fff' }}>{gptResponseData}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <Button variant="contained" sx={{ bgcolor: '#7F00FF' }} onClick={handleCopy}>
                COPY &gt;
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default GptPage;
