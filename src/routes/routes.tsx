import Weather from 'containers/Weather/Weather';
import { Navigate } from 'react-router-dom';

export interface RoutesProps {
  path: string;
  component: JSX.Element;
}

export const getRoutes: () => RoutesProps[] = () => [
  {
    path: '/',
    component: <Navigate to="/dashboard" />,
  },
  {
    path: '/dashboard',
    component:<Weather />,
  },
  {
    path: '/statistics',
    component: <></>,
  },
  {
    path: '/map',
    component: <></>,
  },
  {
    path: '/settings',
    component: <></>,
  },
    {
    path: '/*',
    component: <Navigate to="/dashboard" />,
  },
];


