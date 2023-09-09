import { AiOutlineDashboard } from 'react-icons/ai';
import { IoIosStats, IoIosSettings } from 'react-icons/io';
import { BiMap } from 'react-icons/bi';

import { NavItem } from './types';

const getNavList = (): NavItem[] => {
  return [
    {
      route: '/dashboard',
      title: 'Dashboard',
      icon: <AiOutlineDashboard size="20px" />,
    },
    {
      route: '/statistics',
      title: 'Statistics',
      icon: <IoIosStats size="20px" />,
    },
    {
      route: '/map',
      title: 'Map',
      icon: <BiMap size="20px" />,
    },
    {
      route: '/settings',
      title: 'Settings',
      icon: <IoIosSettings size="20px" />,
    },
  ];
};

export { getNavList };

