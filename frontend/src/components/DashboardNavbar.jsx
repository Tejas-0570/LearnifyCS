import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ProfilePopup from './ProfilePopup';

// Icons (inline SVG so no extra imports)
const DSAIcon = () => (
  <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
    <rect x="2" y="8" width="6" height="6" rx="1" fill="currentColor" opacity=".9" />
    <rect x="11" y="4" width="6" height="6" rx="1" fill="currentColor" opacity=".7" />
    <rect x="20" y="8" width="6" height="6" rx="1" fill="currentColor" opacity=".9" />
    <line x1="8" y1="11" x2="11" y2="7" stroke="currentColor" strokeWidth="1.5" />
    <line x1="17" y1="7" x2="20" y2="11" stroke="currentColor" strokeWidth="1.5" />
    <rect x="2" y="18" width="6" height="6" rx="1" fill="currentColor" opacity=".5" />
    <rect x="20" y="18" width="6" height="6" rx="1" fill="currentColor" opacity=".5" />
    <line x1="5" y1="14" x2="5" y2="18" stroke="currentColor" strokeWidth="1.5" />
    <line x1="23" y1="14" x2="23" y2="18" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const OSIcon = () => (
  <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.8" fill="none" />
    <circle cx="14" cy="14" r="4" fill="currentColor" opacity=".8" />
    <line x1="14" y1="4" x2="14" y2="8" stroke="currentColor" strokeWidth="1.8" />
    <line x1="14" y1="20" x2="14" y2="24" stroke="currentColor" strokeWidth="1.8" />
    <line x1="4" y1="14" x2="8" y2="14" stroke="currentColor" strokeWidth="1.8" />
    <line x1="20" y1="14" x2="24" y2="14" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);
const DBMSIcon = () => (
  <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
    <ellipse cx="14" cy="7" rx="9" ry="3.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
    <path d="M5 7v5c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5V7" stroke="currentColor" strokeWidth="1.8" fill="none" />
    <path d="M5 12v5c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5v-5" stroke="currentColor" strokeWidth="1.8" fill="none" />
  </svg>
);
const CNIcon = () => (
  <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
    <circle cx="7" cy="14" r="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
    <circle cx="21" cy="7" r="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
    <circle cx="21" cy="21" r="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
    <circle cx="14" cy="14" r="2.5" fill="currentColor" opacity=".6" />
    <line x1="10" y1="14" x2="11.5" y2="14" stroke="currentColor" strokeWidth="1.5" />
    <line x1="16.5" y1="14" x2="18" y2="14" stroke="currentColor" strokeWidth="1.5" />
    <line x1="14" y1="11.5" x2="19" y2="9" stroke="currentColor" strokeWidth="1.5" />
    <line x1="14" y1="16.5" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const CodeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

// ─── Nav items config ─────────────────────────────────────────────────────────
const navItems = [
  {
    label: 'Dashboard',
    path: '/home',
    icon: null, // no icon for dashboard
    active: true,
    comingSoon: false,
    color: '#2563eb',
  },
  {
    label: 'DSA Lab',
    path: '/dsa',
    icon: <DSAIcon />,
    active: true,
    comingSoon: false,
    color: '#2563eb',
  },
  {
    label: 'OS Lab',
    path: '/os',
    icon: <OSIcon />,
    active: false,
    comingSoon: true,
    color: '#7c3aed',
  },
  {
    label: 'DBMS Lab',
    path: '/dbms',
    icon: <DBMSIcon />,
    active: false,
    comingSoon: true,
    color: '#0891b2',
  },
  {
    label: 'CN Lab',
    path: '/cn',
    icon: <CNIcon />,
    active: false,
    comingSoon: true,
    color: '#059669',
  },
  {
    label: 'Code Editor',
    path: '/editor',
    icon: <CodeIcon />,
    active: false,
    comingSoon: true,
    color: '#dc2626',
  },
];

const DashboardNavbar = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 6);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <Box
      sx={{
        position: 'sticky', top: 0, zIndex: 100,
        bgcolor: scrolled ? 'rgba(255,255,255,0.98)' : '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.25s ease',
      }}
    >
      <Box
        sx={{
          maxWidth: 1280, mx: 'auto', px: 3,
          height: 58, display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        {/* ── Left: Brand ── */}
        <Box
          display="flex" alignItems="center" gap={1.5}
          sx={{ cursor: 'pointer', flexShrink: 0 }}
          onClick={() => navigate('/home')}
        >
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#2563eb' }} />
          <Typography fontWeight={800} color="#1e293b" sx={{ fontSize: 16, letterSpacing: '-0.3px' }}>
            LearnifyCS
          </Typography>
        </Box>

        {/* ── Center: Nav links ── */}
        <Box display="flex" alignItems="center" gap={0.5} sx={{ overflowX: 'auto', '&::-webkit-scrollbar':{ display:'none' } }}>
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Box
                key={item.label}
                onClick={() => item.active && navigate(item.path)}
                sx={{
                  position: 'relative',
                  display: 'flex', alignItems: 'center', gap: 0.8,
                  px: 1.5, py: 0.8,
                  borderRadius: 2,
                  cursor: item.active ? 'pointer' : 'not-allowed',
                  bgcolor: active ? `${item.color}12` : 'transparent',
                  color: active ? item.color : item.active ? '#64748b' : '#94a3b8',
                  transition: 'all 0.18s ease',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                  '&:hover': item.active ? {
                    bgcolor: `${item.color}10`,
                    color: item.color,
                  } : {},
                }}
              >
                {/* Icon */}
                {item.icon && (
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
                    {item.icon}
                  </Box>
                )}

                {/* Label */}
                <Typography
                  variant="body2"
                  fontWeight={active ? 700 : 500}
                  sx={{ fontSize: 13, color: 'inherit' }}
                >
                  {item.label}
                </Typography>

                {/* Coming soon badge */}
                {item.comingSoon && (
                  <Box sx={{
                    bgcolor: '#f1f5f9', borderRadius: 99, px: 0.8, py: 0.15,
                  }}>
                    <Typography sx={{ fontSize: 9, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.3px' }}>
                      SOON
                    </Typography>
                  </Box>
                )}

                {/* Active underline */}
                {active && (
                  <Box sx={{
                    position: 'absolute', bottom: 0, left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60%', height: 2,
                    bgcolor: item.color, borderRadius: 99,
                  }} />
                )}
              </Box>
            );
          })}
        </Box>

        {/* ── Right: ProfilePopup ── */}
        <ProfilePopup size={34} fontSize={12} />
      </Box>
    </Box>
  );
};

export default DashboardNavbar;