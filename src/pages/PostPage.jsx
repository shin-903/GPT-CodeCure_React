import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, Typography, Button, Card, CardContent, Chip } from '@mui/material';
import { getPost } from '../api/user';
import { useParams } from 'react-router-dom';


const PostPage = () => {
  
  const handleDelete = () => {
    console.log('Post deletion triggered');
  };

  const { id } = useParams(); // URLパラメータからidを取得

  const [post, setPost] = useState(null);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  // 日付をJSTに変換する関数
  const formatDateToJST = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Tokyo'
    };
    return new Intl.DateTimeFormat('ja-JP', options).format(date);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const result = await getPost(id);
      if (result.error) {
        setError(result.error);
      } else {
        setPost(result.post);
        setTags(result.tags);
      }
    };

    fetchPost();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!post) return <div>Loading...</div>; // postがnullの場合にローディングメッセージを表示

  return (
    <Box sx={{ bgcolor: '#000', minHeight: '100vh', color: '#fff', pb: 8 }}>
      {/* AppBar with Tabs */}
      <AppBar position="static" sx={{ bgcolor: '#000', borderBottom: '1px solid #444' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Tabs value={0} textColor="inherit" indicatorColor="primary">
            <Tab label="Home" sx={{ color: '#fff' }} />
            <Tab label="New" sx={{ color: '#fff' }} />
            <Tab label="Account" sx={{ color: '#fff' }} />
          </Tabs>
        </Toolbar>
      </AppBar>

      {/* Post Card */}
      <Container sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ width: '600px', p: 2, bgcolor: '#1c1c1c', borderRadius: '8px', border: '2px solid #7F00FF' }}>
          <CardContent>
            <Typography variant="subtitle2" sx={{ color: '#aaa', mb: 1 }}>
            {formatDateToJST(post.created_at)}
            </Typography>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
              {post.title}
            </Typography>
            <Typography variant="body1" sx={{ color: '#fff', mb: 2 }}>
              {post.content}
            </Typography>
            {/* タグの表示 */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip label="Tag" sx={{ bgcolor: '#e0e0e0' }} />
              <Chip label="Tag" sx={{ bgcolor: '#e0e0e0' }} />
              <Chip label="Tag" sx={{ bgcolor: '#e0e0e0' }} />
            </Box>
          </CardContent>
        </Card>
      </Container>

      {/* Fixed Delete Button Section */}
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%', bgcolor: '#000', py: 2, borderTop: '1px solid #444', textAlign: 'center' }}>
        <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
          Do you delete the Post?
        </Typography>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          DELETE
        </Button>
      </Box>
    </Box>
  );
}

export default PostPage;
