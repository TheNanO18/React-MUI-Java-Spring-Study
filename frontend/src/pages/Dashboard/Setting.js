import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import SaveIcon  from '@mui/icons-material/Save';
import PowerIcon from '@mui/icons-material/Power';

function Setting() {
  const [dbHost, setDbHost]         = useState('localhost:5432/postgres');
  const [dbUser, setDbUser]         = useState('postgres');
  const [dbPassword, setDbPassword] = useState('');

  const [loading, setLoading]     = useState(false);
  const [alertInfo, setAlertInfo] = useState({ show: false, severity: 'success', message: '' });

  const handleTestConnection = async () => {
    setLoading(true);
    setAlertInfo({ show: false });

    try {
      const response = await fetch('http://localhost:8080/api/settings/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: `jdbc:postgresql://${dbHost}`,
          username: dbUser,
          password: dbPassword,
        }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setAlertInfo({ show: true, severity: 'success', message: result.message });
      } else {
        setAlertInfo({ show: true, severity: 'error', message: result.message || '연결에 실패했습니다.' });
      }
    } catch (error) {
      console.error("Connection test failed:", error);
      setAlertInfo({ show: true, severity: 'error', message: '서버와 통신할 수 없습니다.' });
    } finally {
      setLoading(false);
    }
  };

  // handleSave 함수를 별도로 선언합니다.
  const handleSave = async () => {
    setLoading(true);
    setAlertInfo({ show: false });
    
    try {
      const saveResponse = await fetch('http://localhost:8080/api/settings/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: `jdbc:postgresql://${dbHost}`,
          username: dbUser,
          password: dbPassword,
        }),
      });

      const saveResult = await saveResponse.json();
      if (!saveResult.success) {
        throw new Error(saveResult.message);
      }

      setAlertInfo({ show: true, severity: 'info', message: '설정 저장 완료. 서버를 재시작합니다...' });

      await fetch('http://localhost:8080/actuator/restart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      setTimeout(() => {
        window.location.reload();
      }, 5000);

    } catch (error) {
      setAlertInfo({ show: true, severity: 'error', message: error.message || '작업에 실패했습니다.' });
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ 
        p: 4, 
        maxWidth: 600, 
        position: 'fixed',             // 요소를 화면에 고정
        top: 100,                      // 화면 상단에서 24px 떨어짐
        left: 100,                     // 화면 우측에서 24px 떨어짐
        zIndex: 1300,                  // 다른 요소들 위에 표시되도록 z-index 설정 (MUI Modal 기본값이 1300)
        backgroundColor: '#ffffffff'
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h5">데이터베이스 설정</Typography>

        <TextField
          label="데이터베이스 호스트/DB명 (예: localhost:5432/postgres)"
          fullWidth
          value={dbHost}
          onChange={(e) => setDbHost(e.target.value)}
        />
        <TextField
          label="User"
          fullWidth
          value={dbUser}
          onChange={(e) => setDbUser(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={dbPassword}
          onChange={(e) => setDbPassword(e.target.value)}
        />

        {alertInfo.show && (
          <Alert severity={alertInfo.severity}>{alertInfo.message}</Alert>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button 
            variant="outlined"
            startIcon={<PowerIcon />}
            loading={loading}
            onClick={handleTestConnection}
            sx={{ textTransform: 'none' }}
          >
            Connection Test
          </Button>
          <Button 
            variant="contained" 
            startIcon={<SaveIcon />} 
            onClick={handleSave} 
            sx={{ textTransform: 'none' }}
          >
            Save and Restart
          </Button>
        </Box>

        <Box sx={{ 
          position: 'fixed', // 요소를 화면에 고정
          top: 500,          // 화면 상단에서 24px 떨어짐
          left: 80,          // 화면 우측에서 24px 떨어짐
          zIndex: 1300       // 다른 요소들 위에 표시되도록 z-index 설정 (MUI Modal 기본값이 1300)
        }}
        >
          <h1 style={{ color: 'red' }}>Key Management 기간 설정 영역</h1>
        </Box>
      </Stack>
    </Paper>
  );
}

export default Setting;