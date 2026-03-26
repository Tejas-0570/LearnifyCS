import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Box
      component="nav"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        bgcolor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid #e2e8f0' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, md: 4 },
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* ── Brand ── */}
        <Box
          display="flex"
          alignItems="center"
          gap={1.2}
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <Box
            sx={{
              width: 32, height: 32,
              borderRadius: 1.5,
              bgcolor: '#2563eb',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: 16, lineHeight: 1 }}>
              L
            </Typography>
          </Box>
          <Typography
            variant="h6"
            fontWeight={800}
            color="#1e293b"
            sx={{ letterSpacing: '-0.3px' }}
          >
            LearnifyCS
          </Typography>
        </Box>

        {/* ── Center Nav Links ── */}
        <Box
          display={{ xs: 'none', md: 'flex' }}
          alignItems="center"
          gap={0.5}
        >
          {[
            { label: 'Features',   href: '#features'  },
            { label: 'Labs',       href: '#labs'       },
            { label: 'About',      href: '#about'      },
          ].map((item) => (
            <Box
              key={item.label}
              component="a"
              href={item.href}
              sx={{
                px: 1.8, py: 0.8,
                borderRadius: 2,
                fontSize: 14,
                fontWeight: 500,
                color: '#475569',
                textDecoration: 'none',
                transition: 'all 0.18s ease',
                '&:hover': {
                  color: '#2563eb',
                  bgcolor: '#eff6ff',
                },
              }}
            >
              {item.label}
            </Box>
          ))}
        </Box>

        {/* ── Right CTAs ── */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <Button
            onClick={() => navigate('/auth/login')}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              fontSize: 14,
              color: '#475569',
              px: 2,
              borderRadius: 2,
              '&:hover': { bgcolor: '#f1f5f9', color: '#1e293b' },
            }}
          >
            Log in
          </Button>
          <Button
            onClick={() => navigate('/auth/login')}
            variant="contained"
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              fontSize: 14,
              px: 2.5,
              py: 0.9,
              borderRadius: 2.5,
              bgcolor: '#2563eb',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#1d4ed8',
                boxShadow: '0 4px 14px rgba(37,99,235,0.35)',
              },
            }}
          >
            Get Started →
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;