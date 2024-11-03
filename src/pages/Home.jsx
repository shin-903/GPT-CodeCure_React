import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, Card, CardContent, Typography, Avatar, Grid, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { getPosts } from '../api/user';

const Home = () => {
  
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

  const [posts, setPosts] = useState([]); // postsの状態を追加
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getPosts();
      if (result.error) {
        setError(result.error);
      } else {
        setPosts(result.posts);
      }
    };

    fetchPosts();
  }, []);

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

      {/* AppBar with Tabs  login状況によって変更　*/}
      <AppBar position="static" sx={{ bgcolor: '#000', borderBottom: '1px solid #444' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Tabs value={0} textColor="inherit" indicatorColor="primary">
              <Tab label="Home" component={Link} to="/" sx={{ color: '#fff', mr: 8 }} />
              <Tab label="Gpt" component={Link} to="/gpt" sx={{ color: '#fff', mr: 8 }} />
              <Tab label="New" component={Link} to="/new/post" sx={{ color: '#fff', mr: 8 }} />
              <Tab label="Profile" component={Link} to="/user" sx={{ color: '#fff' }} />
            </Tabs>
          </Box>
          {/* <Typography sx={{ ml: 'auto', color: '#fff' }}>Log out</Typography> */}
        </Toolbar>
      </AppBar>

      {/* Search Bar 　未完成　*/}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#333', borderRadius: '4px', padding: '0 8px' }}>
          <InputBase placeholder="Search tag" sx={{ color: '#fff', pl: 1 }} />
          <IconButton type="submit" sx={{ p: 1, color: '#fff' }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Post List */}
      <Box sx={{ mt: 4, mb: 20 }}> {/* Boxで全体をラップし、上下のマージンを設定 */}
        <Container>
          {posts.length === 0 ? ( // 投稿がない場合のメッセージ
            <Typography variant="h6" align="center" sx={{ color: '#aaa', mt: 4 }}>
              No posts available
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {posts.map((post, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ display: 'flex', alignItems: 'center', bgcolor: '#1c1c1c', p: 2 }}>
                    {/* <Avatar sx={{ bgcolor: '#7F00FF', mr: 2 }}>A</Avatar>  アバター表示 */}
                    <CardContent>
                      <Typography
                        variant="h6"
                        component={Link}
                        to={`/post/${post.id}`} // post.idに基づく動的なリンク
                        sx={{ color: '#fff', textDecoration: 'none' }} 
                      >                        
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="#aaa">
                        {formatDateToJST(post.created_at)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Home;