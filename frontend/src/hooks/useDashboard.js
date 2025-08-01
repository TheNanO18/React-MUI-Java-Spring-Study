import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 아이콘들을 가져옵니다.
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';

export function useDashboard() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/dashboard' },
    { text: 'User Management', icon: <PeopleIcon />, path: '/dashboard/users' },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return {
    open,
    handleDrawerOpen,
    handleDrawerClose,
    menuItems,
    handleMenuClick,
  };
}