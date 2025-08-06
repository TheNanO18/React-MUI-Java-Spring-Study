import React, { useMemo, useCallback } from 'react';
import { Typography,
         CircularProgress,
         Box,
         FormControl,
         InputLabel,
         Select,
         MenuItem,
         Button,
         Checkbox }         from '@mui/material';
import { useDynamicTables } from '../../hooks/useDynamicTables';
import { useDataSender }    from '../../hooks/useDataSender';
import DynamicTable         from '../../components/DynamicTable';
import SendIcon             from '@mui/icons-material/Send';

function DynamicParshing() {
  const { 
    tableList, 
    listLoading, 
    selectedTable, 
    setSelectedTable, 
    tableData, 
    dataLoading, 
    selectionModel,
    setSelectionModel,
    paginationModel,
    setPaginationModel,
  } = useDynamicTables();

  const { isSending, sendData } = useDataSender();

  const idField = useMemo(() => {
    if (!tableData?.content || tableData.content.length === 0) return '';
    return Object.keys(tableData.content[0])[0];
  }, [tableData]);

  const handleSendClick = () => {
    const currentData = tableData?.content || [];
    if (currentData.length === 0 || selectionModel.length === 0) {
      alert("전송할 데이터를 선택해주세요.");
      return;
    }
    
    const selectedRows = currentData.filter(row =>
      selectionModel.includes(row[idField])
    );
    
    sendData(selectedRows, 'http://localhost:8080/api/data/send');
  };

  const baseColumns = useMemo(() => {
    if (!tableData?.content || tableData.content.length === 0) return [];
    return Object.keys(tableData.content[0])
      .map((key) => ({
        field: key,
        headerName: key.toUpperCase(),
        flex: 1,
      }));
  }, [tableData]);

  const handleToggleSelection = useCallback((id) => {
    setSelectionModel(prevSelection => {
      const newSelection = new Set(prevSelection);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return Array.from(newSelection);
    });
  }, [setSelectionModel]);

  const handleSelectAllClick = useCallback((event) => {
    if (event.target.checked) {
      const allRowIdsOnPage = tableData.content.map((row) => row[idField]);
      setSelectionModel(allRowIdsOnPage);
      return;
    }
    setSelectionModel([]);
  }, [tableData, idField, setSelectionModel]);

  const columnsWithSelection = useMemo(() => {
    if (!idField) return [];

    const currentPageIds        = new Set(tableData?.content?.map(row => row[idField]) || []);
    const selectedOnCurrentPage = selectionModel.filter(id => currentPageIds.has(id));

    return [
      {
        field: 'selection',
        headerName: '',
        width: 60,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderHeader: () => (
          <Checkbox
            indeterminate={
              selectedOnCurrentPage.length > 0 &&
              selectedOnCurrentPage.length < currentPageIds.size
            }
            checked={
              currentPageIds.size > 0 &&
              selectedOnCurrentPage.length === currentPageIds.size
            }
            onChange={handleSelectAllClick}
            sx={{ color: 'white' }}
          />
        ),
        renderCell: (params) => (
          <Checkbox
            checked={selectionModel.includes(params.id)}
            onChange={() => handleToggleSelection(params.id)}
            sx={{ color: 'white' }}
          />
        ),
      },
      ...baseColumns,
    ];
  }, [selectionModel, baseColumns, tableData, idField, handleSelectAllClick, handleToggleSelection]);

  const rowCount = tableData?.totalElements || 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
        테이블 데이터 조회
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexShrink: 0 }}>
        <FormControl fullWidth sx={{
        '& .MuiInputLabel-root': {
          color: 'rgba(255, 255, 255, 1)',
        },

        '& .MuiInputLabel-root.Mui-focused': {
          color: 'white',
        },

        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        },

        '& .MuiSelect-select': {
          color: 'white',
        },

        '& .MuiSelect-icon': {
          color: 'white',
        }
      }}>
          <InputLabel id="table-select-label" sx={{ color: 'white' }}>테이블 선택</InputLabel>
          <Select
            labelId="table-select-label"
            value={selectedTable}
            label="테이블 선택"
            onChange={(e) => setSelectedTable(e.target.value)}
            disabled={listLoading}
          >
            {tableList.map((tableName) => (
              <MenuItem key={tableName} value={tableName}>
                {tableName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button 
          variant="contained" 
          endIcon={<SendIcon />} 
          sx={{ height: '56px', flexShrink: 0 }}
          onClick={handleSendClick}
          disabled={isSending || selectionModel.length === 0}
        >
          {isSending ? 'Sending...' : 'Send'}
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, width: '100%' }}>
        {dataLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (tableData && tableData.content && idField) ? (
          <DynamicTable 
            data={tableData.content}
            columns={columnsWithSelection}
            idField={idField}
            rowCount={rowCount}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        ) : !selectedTable ? (
          <Typography variant="h4" sx={{ textAlign: 'center', mt: 4, color: 'red' }}>
            조회할 테이블을 선택해주세요.
          </Typography>
        ) : (
           <Typography variant="h4" sx={{ textAlign: 'center', mt: 4, color: 'red' }}>
             표시할 데이터가 없습니다.
           </Typography>
        )}
      </Box>
    </Box>
  );
}

export default DynamicParshing;
