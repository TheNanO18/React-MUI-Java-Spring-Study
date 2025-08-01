import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Typography,
  Box,
  CssBaseline,
  Button,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import backgroundImage from '../assets/background.jpg';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  // 이 함수를 아래와 같이 수정합니다.
  const handleLogin = async () => {
    if (!id || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      // 1. Java 서버로 ID와 Password를 POST 방식으로 전송
      const response = await fetch('http://localhost:8080/login', { // <-- Java 서버의 로그인 API 엔드포인트
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }), // { "id": "입력값", "password": "입력값" } 형태의 JSON으로 변환
      });

      // 2. 서버 응답이 정상적인지 (HTTP Status 200-299) 확인
      if (response.ok) {
        // 3. 응답 본문을 JSON으로 파싱 (서버가 보내준 true 또는 false 값을 받음)
        const isLoginSuccessful = await response.json();

        // 4. 파싱한 값이 true이면 대시보드로 이동
        if (isLoginSuccessful === true) {
          navigate('/dashboard');
          login(); 
        } else {
          // 5. 값이 false이면 알림창 표시
          alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
      } else {
        // 서버에서 404, 500 등 에러 응답을 보냈을 경우
        alert('로그인에 실패했습니다. 서버 상태를 확인해주세요.');
      }
    } catch (error) {
      // 네트워크 오류 등 fetch 요청 자체가 실패했을 경우
      console.error('로그인 요청 중 오류 발생:', error);
      alert('서버에 연결할 수 없습니다. 네트워크를 확인해주세요.');
    }
  };

  return (
    <>
      <CssBaseline />
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '40px',
          boxSizing: 'border-box',
        }}
      >
        <Box
          width="100vw"
          height="100vh"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
          p={4}
          boxSizing="border-box"
        >
          {/* ... (이하 나머지 UI 코드는 동일) ... */}
          <Box
            position="fixed"
            left={0}
            top="50%"
            sx={{ transform: 'translateY(-50%)' }}
            height={1000}
            width={1000}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="transparent"
            p={2}
          >
            <img
              src="/bonobono.jpg"
              alt="Logo"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </Box>
  
          <Box
            flexShrink={0}
            mr={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
            width="200px"
          >
            <img src="/gora.png" alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </Box>
  
          <Box
            width="400px"
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
          >
            <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
              Log In
            </Typography>
            <TextField
              label="ID"
              required
              fullWidth
              margin="normal"
              value={id}
              onChange={(e) => setId(e.target.value)}
              sx={{
                '& .MuiInputBase-root': { backgroundColor: '#fff' },
                '& label': { color: '#1976d2' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#1976d2' },
                  '&:hover fieldset': { borderColor: '#1565c0' },
                  '&.Mui-focused fieldset': { borderColor: '#0d47a1' },
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              required
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiInputBase-root': { backgroundColor: '#fff' },
                '& label': { color: '#1976d2' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#1976d2' },
                  '&:hover fieldset': { borderColor: '#1565c0' },
                  '&.Mui-focused fieldset': { borderColor: '#0d47a1' },
                },
              }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              mt={1}
            >
              <Button
                sx={{
                  color: '#115293',
                  '&:hover': {
                    backgroundColor: '#ffffffff',
                  },
                }}
              >
                SIGN IN
              </Button>
  
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember ID"
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              sx={{ mt: 2 }}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default Login;