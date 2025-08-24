import React from 'react';
import { Outlet } from 'react-router-dom';
import { useUI } from '../../Hooks/useUI';
import Header from './Header';
import Sidebar from './Sidebar';
import ToastContainer from '../UI/ToastContainer';

const DashboardLayout = () => {
  const { isSidebarOpen } = useUI();

  return (
    <div className="dashboard-layout flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Sidebar />
      {/* Main content area with dynamic left margin to account for fixed sidebar */}
      <div 
        className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-72' : 'ml-16'
        }`}
      >
        <Header />
        <main className="flex-1 p-4 overflow-x-hidden overflow-y-auto md:p-6">
          {/* Outlet sẽ render nội dung của các trang con */}
          <Outlet />
        </main>
      </div>
      
      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;