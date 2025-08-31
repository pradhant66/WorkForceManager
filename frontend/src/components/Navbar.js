import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if screen width is below 1000px
  const isMobile = useMediaQuery('(max-width:1000px)');

  const isActive = path => currentPath === path;

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    const interval = setInterval(checkLoginStatus, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const drawerContent = (
  <Box sx={{ width: 250, background: '#111', height: '100%', color: 'white' }} role="presentation">
      <List>
        <ListItem button component={Link} to="/" selected={isActive('/')} onClick={handleDrawerToggle} sx={{ '&.Mui-selected, &:hover': { backgroundColor: 'rgba(255, 214, 0, 0.08)' } }}>
          <ListItemText primary="Home" sx={{ color: isActive('/') ? '#ffd600' : 'white' }} />
        </ListItem>
        <ListItem button component={Link} to="/dashboard" selected={isActive('/dashboard')} onClick={handleDrawerToggle} sx={{ '&.Mui-selected, &:hover': { backgroundColor: 'rgba(255, 214, 0, 0.08)' } }}>
          <ListItemText primary="Dashboard" sx={{ color: isActive('/dashboard') ? '#ffd600' : 'white' }} />
        </ListItem>
        <ListItem button component={Link} to="/employees" selected={isActive('/employees')} onClick={handleDrawerToggle} sx={{ '&.Mui-selected, &:hover': { backgroundColor: 'rgba(255, 214, 0, 0.08)' } }}>
          <ListItemText primary="Employees" sx={{ color: isActive('/employees') ? '#ffd600' : 'white' }} />
        </ListItem>
        <ListItem button component={Link} to="/departments" selected={isActive('/departments')} onClick={handleDrawerToggle} sx={{ '&.Mui-selected, &:hover': { backgroundColor: 'rgba(255, 214, 0, 0.08)' } }}>
          <ListItemText primary="Departments" sx={{ color: isActive('/departments') ? '#ffd600' : 'white' }} />
        </ListItem>
        <ListItem button component={Link} to="/profile" selected={isActive('/profile')} onClick={handleDrawerToggle} sx={{ '&.Mui-selected, &:hover': { backgroundColor: 'rgba(255, 214, 0, 0.08)' } }}>
          <ListItemText primary="Profile" sx={{ color: isActive('/profile') ? '#ffd600' : 'white' }} />
        </ListItem>
        <ListItem button component={Link} to="/login" selected={isActive('/login')} onClick={handleDrawerToggle} sx={{ '&.Mui-selected, &:hover': { backgroundColor: 'rgba(255, 214, 0, 0.08)' } }}>
          <ListItemText
            primary={isLoggedIn ? 'Logout' : 'Login'}
            sx={{ color: isLoggedIn ? '#ff5252' : isActive('/login') ? '#ffd600' : 'white' }}
            onClick={isLoggedIn ? handleLogout : null}
          />
        </ListItem>
        <ListItem button component={Link} to="/register" selected={isActive('/register')} onClick={handleDrawerToggle} sx={{ '&.Mui-selected, &:hover': { backgroundColor: 'rgba(255, 214, 0, 0.08)' } }}>
          <ListItemText primary="Register" sx={{ color: isActive('/register') ? '#ffd600' : 'white' }} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
  <AppBar position="static" sx={{ background: '#111', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', padding: '0.5rem 0' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: '#fff',
              fontSize: '1.7rem',
              fontWeight: 700,
              letterSpacing: '1px',
              textShadow: '1px 1px 8px rgba(0,0,0,0.3)'
            }}
          >
            Employee Management System
          </Typography>

          {/* Render drawer icon for mobile view */}
          {isMobile ? (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          ) : (
            // Render full menu for desktop view
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Button
                component={Link}
                to="/"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: isActive('/') ? '#ffd600' : '#fff',
                  background: isActive('/') ? 'rgba(255, 214, 0, 0.08)' : 'transparent',
                  borderRadius: '8px',
                  transition: 'background 0.2s',
                  '&:hover': {
                    background: 'rgba(255, 214, 0, 0.12)',
                    color: '#ffd600',
                  },
                }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/dashboard"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: isActive('/dashboard') ? '#ffd600' : '#fff',
                  background: isActive('/dashboard') ? 'rgba(255, 214, 0, 0.08)' : 'transparent',
                  borderRadius: '8px',
                  transition: 'background 0.2s',
                  '&:hover': {
                    background: 'rgba(255, 214, 0, 0.12)',
                    color: '#ffd600',
                  },
                }}
              >
                Dashboard
              </Button>
              <Button
                component={Link}
                to="/employees"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: isActive('/employees') ? '#ffd600' : '#fff',
                  background: isActive('/employees') ? 'rgba(255, 214, 0, 0.08)' : 'transparent',
                  borderRadius: '8px',
                  transition: 'background 0.2s',
                  '&:hover': {
                    background: 'rgba(255, 214, 0, 0.12)',
                    color: '#ffd600',
                  },
                }}
              >
                Employees
              </Button>
              <Button
                component={Link}
                to="/departments"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: isActive('/departments') ? '#ffd600' : '#fff',
                  background: isActive('/departments') ? 'rgba(255, 214, 0, 0.08)' : 'transparent',
                  borderRadius: '8px',
                  transition: 'background 0.2s',
                  '&:hover': {
                    background: 'rgba(255, 214, 0, 0.12)',
                    color: '#ffd600',
                  },
                }}
              >
                Departments
              </Button>
              <Button
                component={Link}
                to="/profile"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: isActive('/profile') ? '#ffd600' : '#fff',
                  background: isActive('/profile') ? 'rgba(255, 214, 0, 0.08)' : 'transparent',
                  borderRadius: '8px',
                  transition: 'background 0.2s',
                  '&:hover': {
                    background: 'rgba(255, 214, 0, 0.12)',
                    color: '#ffd600',
                  },
                }}
              >
                Profile
              </Button>
              {/* Conditional Login/Logout Button */}
              {isLoggedIn ? (
                <Button
                  onClick={handleLogout}
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: '#ff5252',
                    background: 'rgba(255, 82, 82, 0.08)',
                    borderRadius: '8px',
                    transition: 'background 0.2s',
                    '&:hover': {
                      background: 'rgba(255, 82, 82, 0.15)',
                      color: '#fff',
                    },
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: isActive('/login') ? '#ffd600' : '#fff',
                    background: isActive('/login') ? 'rgba(255, 214, 0, 0.08)' : 'transparent',
                    borderRadius: '8px',
                    transition: 'background 0.2s',
                    '&:hover': {
                      background: 'rgba(255, 214, 0, 0.12)',
                      color: '#ffd600',
                    },
                  }}
                >
                  Login
                </Button>
              )}
              <Button
                component={Link}
                to="/register"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: isActive('/register') ? '#ffd600' : '#fff',
                  background: isActive('/register') ? 'rgba(255, 214, 0, 0.08)' : 'transparent',
                  borderRadius: '8px',
                  transition: 'background 0.2s',
                  '&:hover': {
                    background: 'rgba(255, 214, 0, 0.12)',
                    color: '#ffd600',
                  },
                }}
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile view */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
