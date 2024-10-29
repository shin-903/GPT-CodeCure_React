import React from 'react';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, Card, CardContent, Typography, Avatar, Grid, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

function UserPage() {
  // サンプルデータ
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
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Tabs value={2} textColor="inherit" indicatorColor="primary">
            <Tab label="Home" sx={{ color: '#fff' }} />
            <Tab label="New" sx={{ color: '#fff' }} />
            <Tab label="Account" sx={{ color: '#fff', borderBottom: '2px solid #7F00FF' }} />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container sx={{ display: 'flex', mt: 4 }}>
        {/* 左側のサイドバー */}
        <Box sx={{ width: '250px', bgcolor: '#1c1c1c', borderRadius: '8px', p: 3 }}>
          <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
            John Doue
          </Typography>
          <Typography variant="body2" sx={{ color: '#aaa', mb: 3 }}>
            jdoe@acme.com
          </Typography>

          <Divider sx={{ bgcolor: '#444' }} />

          <List>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Settings" sx={{ color: '#fff' }} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LogoutIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Log out" sx={{ color: '#fff' }} />
            </ListItem>
          </List>
        </Box>

        {/* 右側の投稿リスト */}
        <Grid container spacing={3} sx={{ ml: 4 }}>
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
}

export default UserPage;

