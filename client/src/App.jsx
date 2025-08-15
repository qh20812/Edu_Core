import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './Lib/queryClient';
import AppRouter from './Routes'; // Import router chính

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      {/* DevTools chỉ hiện trong development */}
      {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;