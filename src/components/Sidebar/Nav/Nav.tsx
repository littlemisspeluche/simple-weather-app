import { FC, ReactElement } from 'react';
import { Link, useMatch } from 'react-router-dom';
import { motion } from 'framer-motion';

import { LinkWrapper, NavWrapper } from './styles';
import { NavItem } from '../types';

const NavLink: FC<{ children: ReactElement; to: string; title: string; }> = ({ children, to, title }) => {
  const match = useMatch({
    path: to,
    end: false,
  });

  return (
    <LinkWrapper active={!!match}>
      {match && (
        <motion.div
          className="link-bg"
          layoutId="nav-bg"
          initial={false}
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 60,
            bounce: 0,
          }}
        />
      )}
      <Link to={to} className="link">
        {children}
      </Link>
    </LinkWrapper>
  );
};

const Nav: FC<{ items: NavItem[] }> = ({ items }) => {
  return (
    <NavWrapper layout="position" initial={false}>
      {items.map((item) => (
        <div key={item.route.substring(1)} id={item.route.substring(1)}>
          <NavLink to={item.route} title={item.title}>
            <>
              {item.icon}
              <span className="link-title">{item.title}</span>
            </>
          </NavLink>
        </div>
      ))}
    </NavWrapper>
  );
};

export default Nav;
