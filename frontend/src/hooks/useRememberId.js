import { useState, useEffect } from 'react';

export function useRememberId() {
  const [id, setId] = useState('');
  const [rememberId, setRememberId] = useState(false);

  // 컴포넌트가 처음 로드될 때 저장된 ID 불러오기
  useEffect(() => {
    const rememberedId = localStorage.getItem('rememberedId');
    if (rememberedId) {
      setId(rememberedId);
      setRememberId(true);
    }
  }, []);

  // 체크박스 클릭 이벤트 처리
  const handleRememberIdChange = (event) => {
    const isChecked = event.target.checked;
    setRememberId(isChecked);
    if (!isChecked) {
      localStorage.removeItem('rememberedId');
    } else {
      localStorage.setItem('rememberedId', id);
    }
  };

  // ID 입력창 변경 이벤트 처리
  const handleIdChange = (event) => {
    const newId = event.target.value;
    setId(newId);
    if (rememberId) {
      localStorage.setItem('rememberedId', newId);
    }
  };

  // 필요한 값과 함수들을 객체로 묶어서 반환
  return { id, setId, rememberId, handleRememberIdChange, handleIdChange };
}