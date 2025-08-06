import { useState }    from 'react';
import { useNavigate } from 'react-router-dom';

// 아이콘들을 가져옵니다.
import HomeIcon        from '@mui/icons-material/Home';
import PeopleIcon      from '@mui/icons-material/People';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import SwapHorizIcon   from '@mui/icons-material/SwapHoriz';
import AutorenewIcon   from '@mui/icons-material/Autorenew';

export function useDashboard() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const topMenuItems = [
    { text: 'Home',             icon: <HomeIcon />,      path: '/dashboard' },
    { text: 'User Management',  icon: <PeopleIcon />,    path: '/dashboard/users' },
    { text: 'Dynamic Parshing', icon: <SwapHorizIcon />, path: '/dashboard/dynamicparshing' },
    { text: 'Encyption',        icon: <SwapHorizIcon />, path: '/dashboard/encryption' },
    { text: 'Decryption',       icon: <AutorenewIcon />, path: '/dashboard/decryption' },
  ];

   const bottomMenuItems = [
    { text: 'Setting', icon: <Brightness5Icon />, path: '/dashboard/setting' },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return {
    open,
    handleDrawerOpen,
    handleDrawerClose,
    topMenuItems,
    bottomMenuItems,
    handleMenuClick,
  };
}