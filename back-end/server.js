const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const Product = require('./models/Product');

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'API de gestion de produits' });
});

// WebSocket - Gestion des connexions
io.on('connection', (socket) => {
  console.log('Nouveau client connecté:', socket.id);

  // Écouter les changements de produits
  socket.on('product:created', (product) => {
    io.emit('product:update', { action: 'created', product });
  });

  socket.on('product:updated', (product) => {
    io.emit('product:update', { action: 'updated', product });
  });

  socket.on('product:deleted', (productId) => {
    io.emit('product:update', { action: 'deleted', productId });
  });

  socket.on('disconnect', () => {
    console.log('Client déconnecté:', socket.id);
  });
});

// Middleware de gestion des erreurs
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = { app, io };
