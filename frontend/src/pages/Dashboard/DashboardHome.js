import React, { useState } from 'react';
import { Box } from '@mui/material';
import dayjs from 'dayjs'; // dayjs 임포트

// MUI Date Picker 관련 컴포넌트 임포트
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

function DashboardHome() {
  // 달력의 선택된 날짜를 관리하기 위한 state
  const [value, setValue] = useState(dayjs()); // 오늘 날짜로 초기화

  return (
    <div>
      <Box 
        position="fixed"
        right={0}
        top="50%"
        sx={{ transform: 'translateY(-50%)' }}
        height={1000}
        width={1000}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="gray"
        p={2}
      >
        {/* DateCalendar는 반드시 LocalizationProvider로 감싸야 합니다. */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar 
            value={value} 
            onChange={(newValue) => setValue(newValue)} 
            sx={{
              transform: 'scale(1.5) translateY(-20%)', // 1.2배 확대
              transformOrigin: 'top right', // 오른쪽 위를 기준으로 확대
            }}
          />
        </LocalizationProvider>
      </Box>
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
        bgcolor="green"
        p={2}
      >
        <h4>
          특정 기간 나타내주는 데이터
        </h4>
      </Box>
    </div>
  );
}

export default DashboardHome;