import React, { createContext, useEffect, useState, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../Hooks/useAuth';

// Create Socket Context
const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [notifications, setNotifications] = useState([]);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const socketInstance = useRef(null); // Sử dụng ref để giữ instance của socket

  // --- Bọc hàm disconnect trong useCallback ---
  const disconnectSocket = useCallback(() => {
    if (socketInstance.current) {
      console.log('🔌 Disconnecting socket...');
      socketInstance.current.disconnect();
      socketInstance.current = null;
      setSocket(null);
      setIsConnected(false);
      setOnlineUsers(new Set());
    }
  }, []);

  // --- Bọc hàm initialize trong useCallback, chỉ phụ thuộc vào token ---
  const initializeSocket = useCallback(() => {
    // Chỉ khởi tạo nếu có token và chưa có socket
    if (token && !socketInstance.current) {
        try {
            console.log('🔌 Initializing socket connection...');
            
            const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
            
            const newSocket = io(socketUrl, {
              auth: { token },
              transports: ['websocket', 'polling'],
              autoConnect: true,
              reconnection: true,
              reconnectionAttempts: maxReconnectAttempts,
              reconnectionDelay: 1000,
              reconnectionDelayMax: 5000,
            });

            // Gán vào ref ngay lập tức
            socketInstance.current = newSocket;
            setSocket(newSocket);

            // ... (toàn bộ các hàm newSocket.on(...) giữ nguyên như cũ)
            newSocket.on('connect', () => {
              console.log('✅ Socket connected:', newSocket.id);
              setIsConnected(true);
              reconnectAttempts.current = 0;
            });
      
            newSocket.on('disconnect', (reason) => {
              console.log('❌ Socket disconnected:', reason);
              setIsConnected(false);
            });
      
            newSocket.on('connect_error', (error) => {
              console.error('🔥 Socket connection error:', error);
              setIsConnected(false);
              
              reconnectAttempts.current += 1;
              if (reconnectAttempts.current >= maxReconnectAttempts) {
                console.error('Max reconnection attempts reached');
                newSocket.disconnect();
              }
            });

            newSocket.on('user-status-changed', ({ userId, status }) => {
                setOnlineUsers(prev => {
                  const newSet = new Set(prev);
                  if (status === 'online') {
                    newSet.add(userId);
                  } else {
                    newSet.delete(userId);
                  }
                  return newSet;
                });
              });
        
              newSocket.on('notification', (notification) => {
                console.log('📬 New notification:', notification);
                setNotifications(prev => [notification, ...prev]);
                
                if (Notification.permission === 'granted') {
                  new Notification(notification.title || 'New Notification', {
                    body: notification.message,
                    icon: '/favicon.ico'
                  });
                }
              });
        
              newSocket.on('system-announcement', (announcement) => {
                console.log('📢 System announcement:', announcement);
                setNotifications(prev => [{
                  ...announcement,
                  type: 'system',
                  isSystemAnnouncement: true
                }, ...prev]);
              });
        
              newSocket.on('data-update', ({ type, data }) => {
                console.log('🔄 Data update:', type, data);
                window.dispatchEvent(new CustomEvent('data-update', {
                  detail: { type, data }
                }));
              });
        
              newSocket.on('private-message', (message) => {
                console.log('💬 Private message:', message);
                window.dispatchEvent(new CustomEvent('private-message', {
                  detail: message
                }));
              });
        
              newSocket.on('room-message', (message) => {
                console.log('👥 Room message:', message);
                window.dispatchEvent(new CustomEvent('room-message', {
                  detail: message
                }));
              });

          } catch (error) {
            console.error('Error initializing socket:', error);
          }
    }
  }, [token]);

  // --- useEffect chính chỉ phụ thuộc vào user và các hàm đã được memoize ---
  useEffect(() => {
    if (user && token) {
      initializeSocket();
    } else {
      disconnectSocket();
    }

    // Hàm cleanup sẽ được gọi khi user thay đổi (đăng xuất)
    return () => {
      disconnectSocket();
    };
  }, [user, token, initializeSocket, disconnectSocket]);

  // ... (các hàm tiện ích khác giữ nguyên)

  const contextValue = {
    socket,
    isConnected,
    onlineUsers: Array.from(onlineUsers),
    notifications,
    
    // Utility functions
    joinRoom: (roomId) => {
      if (socket && isConnected) socket.emit('join-room', roomId);
    },
    leaveRoom: (roomId) => {
      if (socket && isConnected) socket.emit('leave-room', roomId);
    },
    sendPrivateMessage: (recipientId, message, type = 'text') => {
      if (socket && isConnected) socket.emit('private-message', { recipientId, message, type });
    },
    sendRoomMessage: (roomId, message, type = 'text') => {
      if (socket && isConnected) socket.emit('room-message', { roomId, message, type });
    },
    markNotificationRead: (notificationId) => {
      if (socket && isConnected) socket.emit('mark-notification-read', { notificationId });
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    },
    clearNotifications: () => setNotifications([]),
    getUnreadNotificationsCount: () => notifications.filter(notif => !notif.read).length,
    isUserOnline: (userId) => onlineUsers.has(userId),
    
    // Connection management
    reconnect: initializeSocket,
    disconnect: disconnectSocket,
    
    // Stats
    reconnectAttempts: reconnectAttempts.current,
    maxReconnectAttempts
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext };