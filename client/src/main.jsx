import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n'; // File cấu hình đa ngôn ngữ của bạn

// 1. Import các Provider
import { AuthProvider } from './Contexts/AuthContext.jsx';
import { UIProvider } from './Contexts/UIContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Bọc App bằng các Provider */}
    <AuthProvider>
      <UIProvider>
        <App />
      </UIProvider>
    </AuthProvider>
  </StrictMode>,
);