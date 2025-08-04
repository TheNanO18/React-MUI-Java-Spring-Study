import { useState, useEffect } from 'react';

export function useDynamicTables() {
  const [tableList, setTableList] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. 처음 로드될 때 테이블 목록을 가져옵니다.
  useEffect(() => {
    fetch('http://localhost:8080/api/tables')
      .then((res) => res.json())
      .then((data) => setTableList(data));
  }, []);

  // 2. `selectedTable`이 변경될 때마다 해당 테이블의 데이터를 가져옵니다.
  useEffect(() => {
    if (!selectedTable) {
      setTableData([]);
      return;
    }
    setLoading(true);
    fetch(`http://localhost:8080/api/tables/${selectedTable}`)
      .then((res) => res.json())
      .then((data) => {
        setTableData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("테이블 데이터 로딩 실패:", error);
        setLoading(false);
      });
  }, [selectedTable]);

  return { tableList, setSelectedTable, tableData, loading, selectedTable };
}