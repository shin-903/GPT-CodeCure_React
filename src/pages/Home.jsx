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
      {/* AppBar with Tabs */}
      <AppBar position="static" sx={{ bgcolor: '#000', borderBottom: '1px solid #444' }}>
        <Toolbar>
          <Tabs value={0} textColor="inherit" indicatorColor="primary" sx={{ flexGrow: 1 }}>
            <Tab label="Home" sx={{ color: '#fff' }} />
            <Tab label="New" sx={{ color: '#fff' }} />
            <Tab label="Account" sx={{ color: '#fff' }} />
          </Tabs>
          <Typography sx={{ ml: 'auto', color: '#fff' }}>Log out</Typography>
        </Toolbar>
      </AppBar>

      {/* Search Bar */}
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
              <Card sx={{ display: 'flex', alignItems: 'center', bgcolor: '#F5EBF7', p: 2 }}>
                <Avatar sx={{ bgcolor: '#7F00FF', mr: 2 }}>A</Avatar>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
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