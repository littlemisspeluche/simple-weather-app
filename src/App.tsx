import React, { useState } from 'react';
import 'reflect-metadata';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppWrapper } from 'styles';

import { useIOC } from 'features/feature-ioc/hooks';
import AppRouter from 'routes/AppRouter';
import { useWindowWidth } from 'hooks/useWindowWidth';
import AppProvider from 'context/context';
import Sidebar from 'components/Sidebar/Sidebar';
import MainErrorBoundary from 'components/ErrorBoundary/MainErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      suspense: true,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isIOCReady = useIOC();

  const sidebarToggle = () => {
    if (windowWidth >= 640) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  useWindowWidth((width) => {
    setWindowWidth(width);

    if (windowWidth < 640) {
      setIsSidebarOpen(false);
    }
  });

  if (!isIOCReady) {
    return <>Loading...</>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <AppProvider>
          <div className='flex h-[100%]'>
            <div className={`h-[100%] bg-[#F0F0F0] opacity-[0.8] block max-w-[13rem] pt-[2.5rem] fixed ${!isSidebarOpen ? 'max-w-[4rem]' : ''}`}>
              <Sidebar
                isHidden={!isSidebarOpen}
                menuToggle={sidebarToggle}
              />
            </div>
            <main className={`w-[100%] overflow-y-scroll ${isSidebarOpen ? "ml-[11.5rem]" : "ml-[3.5rem]"}`}>
              <ErrorBoundary FallbackComponent={MainErrorBoundary}>
                <AppRouter />
              </ErrorBoundary>
            </main>
          </div>
        </AppProvider>
      </AppWrapper>
    </QueryClientProvider>
  );
}

export default App;
