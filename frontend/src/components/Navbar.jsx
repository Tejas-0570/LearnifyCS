import { Box, Typography, Link as MuiLink } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { HiAcademicCap } from 'react-icons/hi';

const navItems = [
  { name: 'Home', href: '/home' },
  { name: 'DSA Lab', href: '/dsa' },
  { name: 'OS Lab', href: '/os' },
  { name: 'DBMS Lab', href: '/dbms' },
  { name: 'CN Lab', href: '/cn' },
  { name: 'Run Code', href: '/run' },
  { name: 'Chatbot', href: '/chatbot' },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <Box
      component="nav"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="1rem 10rem"
      bgcolor="#ffffff"
      boxShadow="0 2px 4px rgba(0,0,0,0.05)"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      {/* Logo */}
      <Box display="flex" alignItems="center" gap="0.5rem">
        <img src="/src/assets/logo/LearnifyCSLogo.svg" alt="logo" width="28" height="28" />
        <Typography variant="h6" fontWeight={800} color="#1e293b" sx={{ letterSpacing: '-0.3px' }}>
          LearnifyCS
        </Typography>
      </Box>


      {/* Navigation Links */}
      <Box display="flex" gap="2rem">
        {navItems.map((item) => (
          <MuiLink
            key={item.name}
            href={item.href}
            underline="none"
            color={location.pathname === item.href ? '#2563eb' : '#000000'}
            fontWeight={location.pathname === item.href ? 'bold' : 'normal'}
            sx={{
              transition: 'color 0.3s',
              '&:hover': { color: '#3b82f6' },
            }}
          >
            {item.name}
          </MuiLink>
        ))}
      </Box>
    </Box>
  );
};

export default Navbar;

