import React from 'react';
import {
  Typography, CircularProgress, Box, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { useDynamicTables } from '../../hooks/useDynamicTables';
import DynamicTable from '../../components/DynamicTable';

function DynamicParshing() {
  const { tableList, setSelectedTable, tableData, dataLoading, selectedTable } = useDynamicTables();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'Green', flexShrink: 0 }}>
        테이블 데이터 조회
      </Typography>

      <FormControl fullWidth sx={{ mb: 2, flexShrink: 0 }}>
        <InputLabel id="table-select-label" sx={{ color: 'yellow' }}>테이블 선택</InputLabel>
        <Select
          labelId="table-select-label"
          value={selectedTable}
          label="테이블 선택"
          onChange={(e) => setSelectedTable(e.target.value)}
          sx={{
            // 선택된 값의 텍스트 색상
            color: 'cyan',
            // 테두리 색상
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'gray',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'cyan',
            },
            // 드롭다운 화살표 아이콘 색상
            '.MuiSvgIcon-root': {
              color: 'white',
            },
          }}
          // 드롭다운 메뉴 자체에 대한 스타일
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#333',
                color: 'white',
                '& .MuiMenuItem-root:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              },
            },
          }}
        >
          {tableList.map((tableName) => (
            <MenuItem key={tableName} value={tableName}>
              {tableName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ flexGrow: 1, width: '100%' }}>
        {dataLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <DynamicTable data={tableData.content || []} />
        )}
      </Box>
    </Box>
  );
}

export default DynamicParshing;