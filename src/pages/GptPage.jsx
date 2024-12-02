import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { gptResponse } from '../api/user'; // user.js から関数をインポート
import { useUserContext } from '../UserContext'; // コンテキストのフック

function GptPage() {
  const [gptResponseData, setGptResponse] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false); // ローディング状態を管理


  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ローディング開始
    setGptResponse(<Typography sx={{ color: '#89CFF0' }}>Thinking...</Typography>); // レスポンス欄に思考中メッセージを設定

    const response = await gptResponse(question); // APIリクエストを送信
    if (response.response) {
      setGptResponse(response.response); // GPTからのレスポンスを設定
      
    }

    setLoading(false); // ローディング終了
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(gptResponseData);
  };

  const navigate = useNavigate();
  const { userId, isAuthenticated } = useUserContext(); // UserContextからuserIdと認証状態を取得

//   useEffect(() => {
//     if (!userId && !isAuthenticated) {
//       navigate("/signin");
//     }
//   }, [userId, isAuthenticated, navigate]);

  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ bgcolor: '#000', py: 2, pl: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ color: '#fff', fontSize: '1.8rem', mr: 1 }}>
          GPT
        </Typography>
        <Typography variant="h5" sx={{ color: '#89CFF0', fontSize: '1.8rem', mt: 1 }}>
          CodeCure
        </Typography>
      </Box>

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
        <Card sx={{ bgcolor: '#1c1c1c', p: 2, width: '48%', height: '600px', mr: 5, mt: 5 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#7F00FF', mb: 2, fontSize: '1rem' }}>
              Send a question to ChatGPT
            </Typography>
            <form onSubmit={handleQuestionSubmit}>
              <TextField
                variant="outlined"
                multiline
                rows={19}
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
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, mb: 2 }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  sx={{ bgcolor: '#7F00FF', mr: 2 }} 
                  disabled={loading} // ローディング中はボタンを無効化
                >
                  SEND &gt;
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>

        {/* ChatGPTのレスポンス表示フィード */}
        <Card sx={{ bgcolor: '#1c1c1c', p: 2, width: '48%', height: '600px', mt: 5 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2, fontSize: '1rem' }}>
              ChatGPT
            </Typography>
            <Box sx={{ bgcolor: '#333', p: 2, borderRadius: 1, flex: '1', overflowY: 'auto' }}>
              <Typography sx={{ color: '#fff' }}>{gptResponseData}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, mb: 2 }}>
              <Button variant="contained" sx={{ bgcolor: '#7F00FF', mr: 2 }} onClick={handleCopy}>
                COPY &gt;
              </Button>
              <Button component={Link} to="/new/post" variant="contained" sx={{ bgcolor: '#7F00FF' }}>
                New Post
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default GptPage;
