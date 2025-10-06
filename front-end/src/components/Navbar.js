import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import Logo from './Logo';
import PhoneIcon from '@mui/icons-material/Phone';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'white',
        color: '#1A1A1A',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Box 
          component={Link} 
          to="/" 
          sx={{ 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Logo width={160} height={50} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<PhoneIcon />}
            sx={{
              borderColor: '#1A1A1A',
              color: '#1A1A1A',
              '&:hover': {
                borderColor: '#E30613',
                color: '#E30613',
              },
            }}
          >
            09 70 70 52 58
          </Button>

          {token ? (
            <>
              <Typography variant="body2" sx={{ color: '#666666' }}>
                Bonjour, {user?.username}
              </Typography>
              <Button
                variant="outlined"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{
                  borderColor: '#1A1A1A',
                  color: '#1A1A1A',
                  '&:hover': {
                    borderColor: '#E30613',
                    backgroundColor: '#E30613',
                    color: 'white',
                  },
                }}
              >
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                component={Link}
                to="/login"
                startIcon={<LoginIcon />}
                sx={{
                  borderColor: '#1A1A1A',
                  color: '#1A1A1A',
                  '&:hover': {
                    borderColor: '#E30613',
                    color: '#E30613',
                  },
                }}
              >
                Connexion
              </Button>
              <Button
                variant="contained"
                component={Link}
                to="/register"
                sx={{
                  backgroundColor: '#E30613',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#B30510',
                  },
                }}
              >
                Inscription
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;