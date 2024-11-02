import React from 'react';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, Card, CardContent, Typography, Avatar, Grid, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
  const posts = [
    { title: 'Title', date: 'Updated today' },
    { title: 'Title', date: 'Updated yesterday' },
    { title: 'Title', date: 'Updated 2 days ago' },
    { title: 'Title', date: 'Updated today' },
    { title: 'Title', date: 'Updated yesterday' },
    { title: 'Title', date: 'Updated 2 days ago' },
    { title: 'Title', date: 'Updated today' },
    { title: 'Title', date: 'Updated 2 days ago' },
  ];

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
              <Tab label="Home" sx={{ color: '#fff', mr:8 }} />
              <Tab label="New" sx={{ color: '#fff', mr:8 }} />
              <Tab label="Account" sx={{ color: '#fff' }} />
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
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ display: 'flex', alignItems: 'center', bgcolor: '#1c1c1c', p: 2 }}> {/* カードの色を変更 */}
                {/* <Avatar sx={{ bgcolor: '#7F00FF', mr: 2 }}>A</Avatar> 　アバター表示　*/}
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ color: '#fff' }}> {/* 投稿内容の文字色を変更 */}
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="#aaa"> {/* 投稿日時の文字色を変更 */}
                    {post.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;