import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProfilePopup from './ProfilePopup';

const LabNavbar = ({ title, breadcrumbs = [] }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Box sx={{
      bgcolor: scrolled ? 'rgba(255,255,255,0.97)' : '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.25s ease',
    }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" px={4} sx={{ height: 58 }}>

        {/* ── Left: Brand + divider + breadcrumbs ── */}
        <Box display="flex" alignItems="center" gap={2}>
          <Box display="flex" alignItems="center" gap={1.2} sx={{ cursor:'pointer', flexShrink:0 }} onClick={() => navigate('/home')}>
            <Box sx={{ width:8, height:8, borderRadius:'50%', bgcolor:'#2563eb' }} />
            <Typography variant="body1" fontWeight={800} color="#1e293b" sx={{ letterSpacing:'-0.3px', whiteSpace:'nowrap' }}>
              LearnifyCS
            </Typography>
          </Box>

          <Box sx={{ width:'1px', height:16, bgcolor:'#e2e8f0', flexShrink:0 }} />

          {/* Manual horizontal breadcrumbs */}
          <Box display="flex" alignItems="center" gap={0.8} sx={{ flexWrap:'nowrap' }}>
            {breadcrumbs.map((item, index) => (
              <Box key={index} display="flex" alignItems="center" gap={0.8}>
                {index > 0 && (
                  <Typography sx={{ fontSize:12, color:'#cbd5e1', lineHeight:1 }}>›</Typography>
                )}
                {item.link ? (
                  <Typography variant="body2" fontWeight={500}
                    onClick={() => navigate(item.link)}
                    sx={{ color:'#64748b', cursor:'pointer', whiteSpace:'nowrap', transition:'color 0.15s', '&:hover':{ color:'#2563eb' } }}>
                    {item.label}
                  </Typography>
                ) : (
                  <Typography variant="body2" fontWeight={700} sx={{ color:'#2563eb', whiteSpace:'nowrap' }}>
                    {item.label}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── Right: Lab pill + ProfilePopup ── */}
        <Box display="flex" alignItems="center" gap={2} sx={{ flexShrink:0 }}>
          <Box sx={{ bgcolor:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:99, px:1.8, py:0.5 }}>
            <Typography sx={{ fontSize:12, fontWeight:700, color:'#2563eb', letterSpacing:'0.3px', whiteSpace:'nowrap' }}>
              {title}
            </Typography>
          </Box>

          {/* ProfilePopup — same as Dashboard and DSAIntro */}
          <ProfilePopup size={32} fontSize={11} />
        </Box>
      </Box>
    </Box>
  );
};

export default LabNavbar;