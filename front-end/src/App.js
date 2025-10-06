import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Login from './components/Login';
import Register from './components/Register';
import { connectSocket, disconnectSocket } from './services/socket';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Connexion au WebSocket
    connectSocket(dispatch);

    return () => {
      disconnectSocket();
    };
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route 
            path="/login" 
            element={token ? <Navigate to="/" /> : <Login />} 
          />
          <Route 
            path="/register" 
            element={token ? <Navigate to="/" /> : <Register />} 
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;