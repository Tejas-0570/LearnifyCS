import { useState } from 'react';
import LabNavbar from '../../components/LabNavbar';
import Sidebar from '../../components/Sidebar';
import ChatbotPopup from '../../components/ChatbotPopup';
import { Box } from '@mui/material';
import { IoChatbubblesSharp } from 'react-icons/io5';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MdDataArray } from 'react-icons/md';
import { FaLink, FaHashtag } from 'react-icons/fa';
import { HiMiniSquare3Stack3D } from 'react-icons/hi2';
import { PiQueueDuotone, PiSortAscendingDuotone, PiGraphBold } from 'react-icons/pi';
import { TbBinaryTreeFilled, TbDatabaseSearch } from 'react-icons/tb';

// ── Introduction removed — it lives at /dsa as a standalone page now ──────────
const DSAItems = [
  { label: 'Arrays',      icon: <MdDataArray />,            path: 'array'       },
  { label: 'Linked List', icon: <FaLink />,                 path: 'linked-list' },
  { label: 'Stack',       icon: <HiMiniSquare3Stack3D />,   path: 'stack'       },
  { label: 'Queue',       icon: <PiQueueDuotone />,         path: 'queue'       },
  { label: 'Sorting',     icon: <PiSortAscendingDuotone />, path: 'sorting'     },
  { label: 'Trees',       icon: <TbBinaryTreeFilled />,     path: 'trees'       },
  { label: 'Graphs',      icon: <PiGraphBold />,            path: 'graphs'      },
  { label: 'Searching',   icon: <TbDatabaseSearch />,       path: 'searching'   },
  { label: 'Hashing',     icon: <FaHashtag />,              path: 'hashing'     },
];

const DSALayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();

  const currentPath = location.pathname.split('/')[2] || '';
  const activeIndex = DSAItems.findIndex(item => item.path === currentPath);

  const toggleChat = () => setIsChatOpen(prev => !prev);

  return (
    <Box height="100vh" display="flex" flexDirection="column">

      {/* ── Top Navbar ── */}
      <Box position="fixed" top={0} left={0} right={0} zIndex={1100}>
        <LabNavbar
          title="DSA Lab"
          breadcrumbs={[
            { label: 'Dashboard', link: '/home' },
            { label: 'DSA Lab',   link: '/dsa'  },
            { label: DSAItems[activeIndex]?.label || '' },
          ]}
        />
      </Box>

      {/* ── Sidebar + Content ── */}
      <Box display="flex" flexGrow={1} mt="58px">

        {/* Fixed Sidebar */}
        <Box
          position="fixed"
          top="58px"
          bottom={0}
          width="240px"
          zIndex={1000}
        >
          <Sidebar
            title="DSA Topics"
            items={DSAItems}
            activeIndex={activeIndex}
            onItemClick={(index) => {
              navigate(`/dsa/${DSAItems[index].path}`);
            }}
          />
        </Box>

        {/* Main content area */}
        <Box
          flexGrow={1}
          ml="240px"
          p={3}
          sx={{
            height: 'calc(100vh - 58px)',
            overflowY: 'auto',
            bgcolor: '#f5f6f7',
            '&::-webkit-scrollbar': { width: 6 },
            '&::-webkit-scrollbar-thumb': { bgcolor: '#e2e8f0', borderRadius: 99 },
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {/* ── Floating Chat Button ── */}
      <Box
        onClick={toggleChat}
        sx={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          zIndex: 1200,
          cursor: 'pointer',
          animation: 'float 2.5s ease-in-out infinite',
          '@keyframes float': {
            '0%,100%': { transform: 'translateY(0)'    },
            '50%':      { transform: 'translateY(-8px)' },
          },
        }}
      >
        <Box
          sx={{
            width: 52, height: 52,
            bgcolor: '#2563eb',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(37,99,235,0.4)',
            transition: 'opacity 0.15s',
            '&:hover': { opacity: 0.9 },
          }}
        >
          <IoChatbubblesSharp style={{ fontSize: 24, color: '#ffffff' }} />
        </Box>
      </Box>

      {isChatOpen && <ChatbotPopup onClose={toggleChat} />}
    </Box>
  );
};

export default DSALayout;