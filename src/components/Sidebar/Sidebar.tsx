import { FC, useMemo } from 'react';

import { getNavList } from './SidebarRoutes';
import Nav from './Nav/Nav';

const Sidebar: FC<{ isHidden: boolean; menuToggle: () => void; }> = ({ isHidden, menuToggle }) => {
  const navList = useMemo(() => {
    return getNavList();
  }, []);

  return (
    <div className={`sidebar h-[100%] flex flex-col h-[100%] pt-[2rem] ${isHidden ? 'hidden-sidebar' : ''}`} onClick={() => menuToggle()}>
      <Nav items={navList} />
    </div>
  );
}

export default Sidebar;
