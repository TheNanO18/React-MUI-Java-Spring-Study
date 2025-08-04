import * as React from 'react';
import { Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

// DataGrid에 커스텀 스타일을 적용한 새로운 컴포넌트 생성
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  backgroundColor: '#282c34',
  color: 'white',
  border: 0,
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'rgba(0, 3, 168, 0.2)',
    color: 'rgba(255, 255, 255, 0.7)',
    borderBottom: '1px solid rgba(255, 0, 0, 0.12)',
  },
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: 'rgba(0, 3, 168, 0.2)',
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  '& .MuiCheckbox-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiTablePagination-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
}));

function DynamicTable({ data }) {
  if (!data || data.length === 0) {
    return <Typography sx={{color: "red"}}>표시할 데이터가 없습니다.</Typography>;
  }

  const columns = Object.keys(data[0]).map((key) => ({
    field: key,
    headerName: key.toUpperCase(),
    flex: 1, // 너비를 유연하게 조절
  }));

  const idField = columns[0].field;

  return (
    <Paper sx={{ height: '100%', width: '100%' }}>
      <StyledDataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row[idField]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
      />
    </Paper>
  );
}

export default DynamicTable;