import React from 'react';
import { Typography, CircularProgress, Box, Button, ButtonGroup } from '@mui/material';
import { useUsers } from '../../hooks/useUsers';
import UserTable from '../../components/UserTable';

function UserManagement() {
  // 훅에서 data, page, setPage 등을 받아옵니다.
  const { data, loading, page, setPage } = useUsers();

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
        User Info
      </Typography>
      {/* UserTable에는 실제 데이터 목록인 data.content를 넘겨줍니다. */}
      <UserTable users={data.content || []} />

      {/* 페이지 이동 버튼 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <ButtonGroup variant="contained">
          <Button disabled={page === 0} onClick={() => setPage(page - 1)}>
            이전
          </Button>
          <Button disabled={page >= data.totalPages - 1} onClick={() => setPage(page + 1)}>
            다음
          </Button>
        </ButtonGroup>
      </Box>
      <Typography align="center" sx={{ mt: 1 }}>
        Page {page + 1} of {data.totalPages}
      </Typography>
    </div>
  );
}

export default UserManagement;