import {
  FC,
  Suspense,
  useMemo,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { getRoutes } from './routes';

const AppRouter: FC= () => {
  const routes = useMemo(
    () =>
      getRoutes(),
    []
  );

  return (
    <Routes>
      {routes.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<Suspense fallback={<>fallback</>}>{route.component}</Suspense>}
          >
          </Route>
        );
      })}
    </Routes>
  );
};

export default AppRouter;
