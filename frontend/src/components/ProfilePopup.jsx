import { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/context/Authcontext';
import { FiLogOut } from 'react-icons/fi';
import { MdOutlineDashboard } from 'react-icons/md';

// ─── Reusable ProfilePopup ────────────────────────────────────────────────────
// Props:
//   size      — avatar circle size in px (default 34)
//   fontSize  — initials font size (default 12)
const ProfilePopup = ({ size = 34, fontSize = 12 }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Smart initials — first letter of each word e.g. "Tejas Waydande" → "TW"
  const initials = user?.name
    ? user.name.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate('/auth/login');
  };

  const handleDashboard = () => {
    setOpen(false);
    navigate('/home');
  };

  return (
    <Box ref={ref} sx={{ position: 'relative', flexShrink: 0 }}>

      {/* ── Avatar button ── */}
      <Box
        onClick={() => setOpen(prev => !prev)}
        sx={{
          width: size, height: size,
          borderRadius: '50%',
          bgcolor: open ? '#1d4ed8' : '#2563eb',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: open ? '0 0 0 3px #bfdbfe' : 'none',
          transition: 'all 0.15s ease',
          userSelect: 'none',
          '&:hover': { bgcolor: '#1d4ed8', boxShadow: '0 0 0 3px #bfdbfe' },
        }}
      >
        <Typography fontWeight={700} sx={{ fontSize }}>
          {initials}
        </Typography>
      </Box>

      {/* ── Dropdown popup ── */}
      {open && (
        <Box
          sx={{
            position: 'absolute',
            top: `calc(100% + 10px)`,
            right: 0,
            width: 240,
            bgcolor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            overflow: 'hidden',
            zIndex: 9999,
            animation: 'fadeDown 0.18s ease',
            '@keyframes fadeDown': {
              from: { opacity: 0, transform: 'translateY(-6px)' },
              to:   { opacity: 1, transform: 'translateY(0)'     },
            },
          }}
        >
          {/* User info header */}
          <Box sx={{
            px: 2.5, py: 2.5,
            bgcolor: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
          }}>
            {/* Big avatar */}
            <Box sx={{
              width: 46, height: 46, borderRadius: '50%',
              bgcolor: '#2563eb', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              mb: 1.5,
            }}>
              <Typography fontWeight={700} fontSize={17}>{initials}</Typography>
            </Box>
            <Typography variant="body2" fontWeight={700} color="text.primary" sx={{ lineHeight: 1.4 }}>
              {user?.name || 'User'}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12 }}>
              {user?.email || ''}
            </Typography>
          </Box>

          {/* Actions */}
          <Box sx={{ py: 0.8 }}>

            {/* Dashboard */}
            <Box
              onClick={handleDashboard}
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                px: 2.5, py: 1.2, cursor: 'pointer',
                '&:hover': { bgcolor: '#f8fafc' },
                transition: 'background 0.15s',
              }}
            >
              <MdOutlineDashboard size={16} color="#64748b" />
              <Typography variant="body2" fontWeight={500} color="#374151">
                Dashboard
              </Typography>
            </Box>

            {/* Divider */}
            <Box sx={{ height: '1px', bgcolor: '#f1f5f9', mx: 2, my: 0.5 }} />

            {/* Logout */}
            <Box
              onClick={handleLogout}
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                px: 2.5, py: 1.2, cursor: 'pointer',
                '&:hover': { bgcolor: '#fef2f2' },
                transition: 'background 0.15s',
              }}
            >
              <FiLogOut size={15} color="#ef4444" />
              <Typography variant="body2" fontWeight={500} color="#ef4444">
                Log out
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProfilePopup;