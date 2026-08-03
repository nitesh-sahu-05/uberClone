const { Server } = require('socket.io');
const userModel = require('./model/user.model');
const captainModel = require('./model/captain.model');

let io = null;
const connectedSockets = new Map();
const socketUserMap = new Map();
const socketCaptainMap = new Map();

function initializeSocket(httpServer) {
  if (io) {
    return io;
  }

  io = new Server(httpServer, {
    cors: {
      origin: ['http://localhost:5173', 'http://localhost:5174'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    connectedSockets.set(socket.id, socket);

    socket.on('register-user', async (userId) => {
      if (!userId) return;
      console.log(`Registering user with ID: ${userId} for socket: ${socket.id}`);
      socketUserMap.set(socket.id, userId);
      socket.join(`user:${userId}`);
      await userModel.findByIdAndUpdate(userId, { socketId: socket.id }).catch(() => {});
      socket.emit('user-connected', { success: true, socketId: socket.id });
    });

    socket.on('register-captain', async (captainId) => {
      if (!captainId) return;
        console.log(`Registering captain with ID: ${captainId} for socket: ${socket.id}`);
      socketCaptainMap.set(socket.id, captainId);
      socket.join(`captain:${captainId}`);
      await captainModel.findByIdAndUpdate(captainId, { socketId: socket.id }).catch(() => {});
      socket.emit('captain-connected', { success: true, socketId: socket.id });
    });

    socket.on('update-location-captain', async (data) => {
      try {
        if (!data || !data.userId || !data.location) {
          return;
        }

        const { userId, location } = data;

        if (typeof location !== 'object' || Array.isArray(location)) {
          return;
        }

        const { lat, lng } = location;

        if (typeof lat !== 'number' || typeof lng !== 'number' || !Number.isFinite(lat) || !Number.isFinite(lng)) {
          return;
        }

        await captainModel.findByIdAndUpdate(userId, { location })
      } catch (error) {
        console.error('Invalid captain location update:', error);
      }
    })

    socket.on('disconnect', async () => {
        console.log(`Socket disconnected: ${socket.id}`);
      const userId = socketUserMap.get(socket.id);
      const captainId = socketCaptainMap.get(socket.id);

      if (userId) {
        await userModel.findByIdAndUpdate(userId, { socketId: null }).catch(() => {});
        socketUserMap.delete(socket.id);
      }

      if (captainId) {
        await captainModel.findByIdAndUpdate(captainId, { socketId: null }).catch(() => {});
        socketCaptainMap.delete(socket.id);
      }

      connectedSockets.delete(socket.id);
    });
  });

  return io;
}

function sendMessageToSocketid(socketId, eventName, data) {
  if (!io) {
    return false;
  }

  const socket = io.sockets.sockets.get(socketId) || connectedSockets.get(socketId);

  if (!socket) {
    return false;
  }

  socket.emit(eventName, data);
  return true;
}

function connectUserAndCaptain(userId, captainId, eventName, data) {
  if (!io) {
    return false;
  }

  io.to(`user:${userId}`).emit(eventName, data);
  io.to(`captain:${captainId}`).emit(eventName, data);
  return true;
}

module.exports = {
  initializeSocket,
  sendMessageToSocketid,
  connectUserAndCaptain,
};
