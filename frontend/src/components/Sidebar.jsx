import { Box, Typography, Tooltip } from '@mui/material';

const Sidebar = ({ title, items = [], activeIndex = 0, onItemClick }) => {
  return (
    <Box
      sx={{
        width: '240px',
        minWidth: '240px',
        height: '100%',
        bgcolor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        pt: 2.5,
        pb: 3,
      }}
    >
      {/* ── Section title ── */}
      <Box px={2.5} mb={1.5}>
        <Typography
          variant="caption"
          fontWeight={700}
          sx={{
            color: '#94a3b8',
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            fontSize: 10.5,
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* ── Nav items ── */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 1.5 }}>
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <Box
              key={item.label}
              onClick={() => onItemClick?.(index)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 1.5,
                py: 1,
                mb: 0.5,
                borderRadius: 2,
                cursor: 'pointer',
                position: 'relative',
                bgcolor: isActive ? '#eff6ff' : 'transparent',
                transition: 'all 0.16s ease',
                '&:hover': {
                  bgcolor: isActive ? '#eff6ff' : '#f8fafc',
                },
              }}
            >
              {/* Active left bar */}
              {isActive && (
                <Box sx={{
                  position: 'absolute',
                  left: 0, top: '20%', bottom: '20%',
                  width: 3, borderRadius: 99,
                  bgcolor: '#2563eb',
                }} />
              )}

              {/* Icon */}
              <Box sx={{
                fontSize: 16,
                color: isActive ? '#2563eb' : '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'color 0.16s',
              }}>
                {item.icon}
              </Box>

              {/* Label */}
              <Typography
                variant="body2"
                fontWeight={isActive ? 700 : 500}
                sx={{
                  color: isActive ? '#2563eb' : '#475569',
                  transition: 'color 0.16s',
                  lineHeight: 1.2,
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* ── Bottom: back to dashboard ── */}
      <Box px={2.5} pt={2} sx={{ borderTop: '1px solid #f1f5f9' }}>
        <Box
          component="a"
          href="/home"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
            color: '#94a3b8',
            fontSize: 12,
            fontWeight: 500,
            transition: 'color 0.15s',
            '&:hover': { color: '#2563eb' },
          }}
        >
          <Box sx={{ fontSize: 13 }}>←</Box>
          <Typography variant="caption" fontWeight={500} sx={{ color: 'inherit' }}>
            Back to Dashboard
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;