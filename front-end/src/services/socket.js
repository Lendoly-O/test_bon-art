import { io } from 'socket.io-client';
import { productUpdatedViaSocket } from '../store/slices/productsSlice';

let socket = null;

export const connectSocket = (dispatch) => {
  const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
  
  socket = io(SOCKET_URL, {
    transports: ['websocket'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
  });

  socket.on('connect', () => {
    console.log('WebSocket connecté');
  });

  socket.on('product:update', (data) => {
    console.log('Mise à jour produit reçue:', data);
    dispatch(productUpdatedViaSocket(data));
  });

  socket.on('disconnect', () => {
    console.log('WebSocket déconnecté');
  });

  socket.on('error', (error) => {
    console.error('Erreur WebSocket:', error);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const emitProductCreated = (product) => {
  if (socket) {
    socket.emit('product:created', product);
  }
};

export const emitProductUpdated = (product) => {
  if (socket) {
    socket.emit('product:updated', product);
  }
};

export const emitProductDeleted = (productId) => {
  if (socket) {
    socket.emit('product:deleted', productId);
  }
};

export default socket;