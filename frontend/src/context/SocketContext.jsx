import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const newSocket = io('http://localhost:3000', {
      withCredentials: true,
      transports: ['websocket'],
      reconnection: true,
    });

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    newSocket.on('connect', handleConnect);
    newSocket.on('disconnect', handleDisconnect);
    setSocket(newSocket);

    return () => {
      newSocket.off('connect', handleConnect);
      newSocket.off('disconnect', handleDisconnect);
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (eventName, payload) => {
    if (socket && socket.connected) {
      socket.emit(eventName, payload);
    }
  };

  const receiveMessage = (eventName, callback) => {
    if (!socket) return () => {};

    socket.on(eventName, callback);

    return () => socket.off(eventName, callback);
  };

  const value = useMemo(
    () => ({
      socket,
      isConnected,
      sendMessage,
      receiveMessage,
      messages,
      setMessages,
    }),
    [socket, messages]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used inside a SocketProvider');
  }
  return context;
};

export default SocketContext;
