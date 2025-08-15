import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n';

// Import QueryClient và Provider
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './Lib/queryClient'; // Đảm bảo import đúng queryClient

// Import các Provider khác
import { AuthProvider } from './Contexts/AuthContext.jsx';
import { UIProvider } from './Contexts/UIContext.jsx';
// SocketProvider không cần ở đây nữa vì đã có trong App.jsx

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* QueryClientProvider phải là Provider ngoài cùng */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UIProvider>
          {/* SocketProvider đã được đặt trong App.jsx, không cần ở đây */}
          <App />
        </UIProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);