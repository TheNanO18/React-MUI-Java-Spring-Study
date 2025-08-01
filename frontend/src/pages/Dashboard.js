import React from 'react';
import { Typography, Container, Box } from '@mui/material';

function Dashboard() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom>
          대시보드
        </Typography>
        <Typography variant="h4" color='red'>
          로그인 성공
        </Typography>
      </Box>
    </Container>
  );
}

export default Dashboard;
