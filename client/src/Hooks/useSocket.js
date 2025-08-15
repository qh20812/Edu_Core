import { useContext } from 'react';
import { SocketContext } from '../Contexts/SocketContext';

/**
 * Custom hook để truy cập Socket context
 * Tương tự như useAuth, cung cấp interface nhất quán để sử dụng socket
 */
export const useSocket = () => {
  const context = useContext(SocketContext);
  
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  
  return context;
};

export default useSocket;