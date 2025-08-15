// src/App.jsx

import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SocketProvider } from './Contexts/SocketContext';
import AppRouter from './Routes'; // Import router chính

function App() {
  return (
    // SocketProvider nên bọc lấy AppRouter
    <SocketProvider>
      <AppRouter />
      {/* DevTools chỉ hiện trong development */}
      {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </SocketProvider>
  );
}

export default App;