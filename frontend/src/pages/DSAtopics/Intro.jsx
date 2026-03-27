import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useAuth } from '../context/Authcontext';
import ProfilePopup from '../../components/ProfilePopup';

// Icons
import { FaBrain, FaRocket, FaGraduationCap, FaRegEye,
         FaList, FaHashtag, FaSearch, FaCloud,
         FaShieldAlt, FaServer } from 'react-icons/fa';
import { FaPlay, FaCode, FaPuzzlePiece, FaRobot,
         FaGamepad, FaLeaf, FaArrowRotateLeft } from 'react-icons/fa6';
import { BsStack } from 'react-icons/bs';
import { TbBinaryTreeFilled, TbCaretUpDownFilled } from 'react-icons/tb';
import { GoGraph } from 'react-icons/go';
import { GrOptimize } from 'react-icons/gr';
import { MdDataArray } from 'react-icons/md';
import { FaLink } from 'react-icons/fa';
import { HiMiniSquare3Stack3D } from 'react-icons/hi2';
import { PiQueueDuotone, PiSortAscendingDuotone, PiGraphBold } from 'react-icons/pi';
import { TbDatabaseSearch } from 'react-icons/tb';

// ─── Scroll Fade ──────────────────────────────────────────────────────────────
const useFadeIn = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
};

const FadeIn = ({ children, delay = 0, direction = 'up' }) => {
  const { ref, visible } = useFadeIn();
  const map = { up:'translateY(30px)', left:'translateX(-30px)', right:'translateX(30px)', none:'none' };
  return (
    <Box ref={ref} sx={{ opacity:visible?1:0, transform:visible?'none':map[direction], transition:`opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>
      {children}
    </Box>
  );
};

// ─── Standalone Navbar ────────────────────────────────────────────────────────
const IntroNavbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <Box sx={{
      position:'sticky', top:0, zIndex:100,
      bgcolor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.9)',
      borderBottom: scrolled ? '1px solid #e2e8f0' : '1px solid transparent',
      boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
      backdropFilter:'blur(10px)',
      transition:'all 0.25s ease',
    }}>
      <Box sx={{ maxWidth:1200, mx:'auto', px:3, height:60, display:'flex', alignItems:'center', justifyContent:'space-between' }}>

        {/* Brand */}
        <Box display="flex" alignItems="center" gap={1.2} sx={{ cursor:'pointer' }} onClick={() => navigate('/home')}>
          <Box sx={{ width:10, height:10, borderRadius:'50%', bgcolor:'#2563eb' }} />
          <Typography variant="h6" fontWeight={800} color="#1e293b" sx={{ letterSpacing:'-0.3px' }}>
            LearnifyCS
          </Typography>
        </Box>

        {/* Breadcrumb */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2" color="text.secondary"
            sx={{ cursor:'pointer', '&:hover':{ color:'#2563eb' } }}
            onClick={() => navigate('/home')}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">›</Typography>
          <Typography variant="body2" fontWeight={600} color="#2563eb">DSA Lab</Typography>
        </Box>

        {/* ProfilePopup replaces direct logout avatar */}
        <ProfilePopup size={34} fontSize={12} />
      </Box>
    </Box>
  );
};

// ─── Topics ───────────────────────────────────────────────────────────────────
const topics = [
  { label:'Arrays',      icon:<MdDataArray />,           path:'/dsa/array',       color:'#2563eb', bg:'#eff6ff',  border:'#bfdbfe', desc:'Traversal, insertion, search'        },
  { label:'Linked List', icon:<FaLink />,                path:'/dsa/linked-list', color:'#7c3aed', bg:'#f5f3ff',  border:'#ddd6fe', desc:'Singly, doubly, head & tail ops'     },
  { label:'Stack',       icon:<HiMiniSquare3Stack3D />,  path:'/dsa/stack',       color:'#0891b2', bg:'#ecfeff',  border:'#a5f3fc', desc:'LIFO with push / pop animation'      },
  { label:'Queue',       icon:<PiQueueDuotone />,        path:'/dsa/queue',       color:'#059669', bg:'#ecfdf5',  border:'#a7f3d0', desc:'FIFO with front & rear pointers'     },
  { label:'Sorting',     icon:<PiSortAscendingDuotone />,path:'/dsa/sorting',     color:'#d97706', bg:'#fffbeb',  border:'#fde68a', desc:'6 algorithms, bar chart visualizer'  },
  { label:'Trees',       icon:<TbBinaryTreeFilled />,    path:'/dsa/trees',       color:'#dc2626', bg:'#fef2f2',  border:'#fecaca', desc:'BST insert, delete, SVG render'      },
  { label:'Graphs',      icon:<PiGraphBold />,           path:'/dsa/graphs',      color:'#7c3aed', bg:'#f5f3ff',  border:'#ddd6fe', desc:'BFS, DFS, Dijkstra step-by-step'     },
  { label:'Searching',   icon:<TbDatabaseSearch />,      path:'/dsa/searching',   color:'#0891b2', bg:'#ecfeff',  border:'#a5f3fc', desc:'Linear & Binary search animated'     },
  { label:'Hashing',     icon:<FaHashtag />,             path:'/dsa/hashing',     color:'#059669', bg:'#ecfdf5',  border:'#a7f3d0', desc:'Chaining, linear & quadratic probe'  },
];

// ─── DSAIntro ─────────────────────────────────────────────────────────────────
const DSAIntro = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  return (
    <Box sx={{ minHeight:'100vh', bgcolor:'#f8fafc' }}>
      <IntroNavbar />

      {/* ── HERO ── */}
      <Box sx={{ background:'linear-gradient(135deg, #eff6ff 0%, #f5f3ff 50%, #ecfeff 100%)', borderBottom:'1px solid #e2e8f0', py:{ xs:7, md:10 }, px:3, textAlign:'center' }}>
        <Box sx={{ maxWidth:780, mx:'auto' }}>
          <Box sx={{ display:'inline-flex', alignItems:'center', gap:1, bgcolor:'#dbeafe', borderRadius:99, px:2, py:0.6, mb:3 }}>
            <Box sx={{ width:7, height:7, borderRadius:'50%', bgcolor:'#2563eb' }} />
            <Typography sx={{ fontSize:13, fontWeight:600, color:'#1d4ed8' }}>DSA Lab — 9 Topics · 10+ Visualizations</Typography>
          </Box>
          <Typography variant="h3" fontWeight={800} color="#0f172a" mb={2} sx={{ fontSize:{ xs:'2rem', md:'2.8rem' }, lineHeight:1.15, letterSpacing:'-0.8px' }}>
            Introduction to Data Structures <br />& Algorithms
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={5} sx={{ fontSize:'1.05rem', lineHeight:1.75, maxWidth:560, mx:'auto' }}>
            Master the foundation of efficient problem-solving through step-by-step visual animations — not just passive theory.
          </Typography>
          <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
            <Button variant="contained" onClick={() => navigate('/dsa/array')}
              sx={{ textTransform:'none', fontWeight:700, fontSize:'1rem', px:4, py:1.4, borderRadius:3, bgcolor:'#2563eb', boxShadow:'none', '&:hover':{ bgcolor:'#1d4ed8', boxShadow:'0 4px 16px rgba(37,99,235,0.35)' } }}>
              <FaPlay style={{ marginRight:8 }} /> Start Learning — Arrays
            </Button>
            <Button variant="outlined" onClick={() => navigate('/home')}
              sx={{ textTransform:'none', fontWeight:600, fontSize:'1rem', px:4, py:1.4, borderRadius:3, borderColor:'#cbd5e1', color:'#475569', '&:hover':{ borderColor:'#2563eb', color:'#2563eb', bgcolor:'#eff6ff' } }}>
              ← Back to Dashboard
            </Button>
          </Box>
        </Box>
      </Box>

      {/* ── WHAT IS DSA ── */}
      <Box sx={{ maxWidth:1200, mx:'auto', px:3, py:7 }}>
        <FadeIn>
          <Box display="flex" alignItems="center" gap={2} mb={4}>
            <Box sx={{ bgcolor:'#eff6ff', borderRadius:2.5, p:1.5, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <FaBrain size={22} color="#2563eb" />
            </Box>
            <Typography variant="h5" fontWeight={700} color="text.primary">What is Data Structures & Algorithms?</Typography>
          </Box>
        </FadeIn>
        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 1fr' }, gap:3 }}>
          <FadeIn delay={0.05} direction="left">
            <Box sx={{ bgcolor:'#ffffff', border:'1px solid #e2e8f0', borderRadius:3, p:3, height:'100%' }}>
              <Typography variant="body1" fontWeight={700} color="#2563eb" mb={1.5}>Data Structures</Typography>
              <Typography variant="body2" color="text.secondary" mb={2} sx={{ lineHeight:1.7 }}>Specialized formats for organizing, processing and storing data in memory. They provide efficient ways to access and modify data based on specific requirements.</Typography>
              <Box sx={{ bgcolor:'#eff6ff', borderRadius:2, p:2 }}>
                <Typography variant="body2" fontWeight={600} color="#1d4ed8" mb={1}>Examples:</Typography>
                {['Arrays — Sequential data storage','Trees — Hierarchical organization','Graphs — Network relationships','Hash Tables — Fast data retrieval'].map(e => (
                  <Typography key={e} variant="body2" color="#1e40af" sx={{ mb:0.4, display:'flex', alignItems:'center', gap:1 }}>
                    <Box sx={{ width:5, height:5, borderRadius:'50%', bgcolor:'#2563eb', flexShrink:0 }} />{e}
                  </Typography>
                ))}
              </Box>
            </Box>
          </FadeIn>
          <FadeIn delay={0.1} direction="right">
            <Box sx={{ bgcolor:'#ffffff', border:'1px solid #e2e8f0', borderRadius:3, p:3, height:'100%' }}>
              <Typography variant="body1" fontWeight={700} color="#059669" mb={1.5}>Algorithms</Typography>
              <Typography variant="body2" color="text.secondary" mb={2} sx={{ lineHeight:1.7 }}>Step-by-step procedures for solving computational problems. They define the logical sequence of operations to transform input into desired output efficiently.</Typography>
              <Box sx={{ bgcolor:'#ecfdf5', borderRadius:2, p:2 }}>
                <Typography variant="body2" fontWeight={600} color="#047857" mb={1}>Key Types:</Typography>
                {['Sorting — Organizing data in order','Searching — Finding specific elements','Graph Traversal — Exploring networks','Dynamic Programming — Optimization'].map(e => (
                  <Typography key={e} variant="body2" color="#065f46" sx={{ mb:0.4, display:'flex', alignItems:'center', gap:1 }}>
                    <Box sx={{ width:5, height:5, borderRadius:'50%', bgcolor:'#059669', flexShrink:0 }} />{e}
                  </Typography>
                ))}
              </Box>
            </Box>
          </FadeIn>
        </Box>
      </Box>

      {/* ── TOPICS GRID ── */}
      <Box sx={{ bgcolor:'#ffffff', borderTop:'1px solid #e2e8f0', borderBottom:'1px solid #e2e8f0', py:7, px:3 }}>
        <Box sx={{ maxWidth:1200, mx:'auto' }}>
          <FadeIn>
            <Box textAlign="center" mb={5}>
              <Typography variant="h5" fontWeight={700} color="text.primary" mb={0.8}>9 Topics — Choose Where to Start</Typography>
              <Typography variant="body2" color="text.secondary">Each topic has theory, interactive visualizer, complexity analysis and practice problems</Typography>
            </Box>
          </FadeIn>
          <Box sx={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:2 }}>
            {topics.map((t, i) => (
              <FadeIn key={t.label} delay={i * 0.06} direction="up">
                <Box onMouseEnter={() => setHovered(t.label)} onMouseLeave={() => setHovered(null)} onClick={() => navigate(t.path)}
                  sx={{ bgcolor:'#ffffff', border:'1.5px solid', borderColor:hovered===t.label?t.color:t.border, borderRadius:3, p:2.5, cursor:'pointer', transition:'all 0.2s ease', transform:hovered===t.label?'translateY(-3px)':'none', boxShadow:hovered===t.label?`0 6px 20px ${t.color}20`:'none' }}>
                  <Box sx={{ width:42, height:42, borderRadius:2, bgcolor:t.bg, color:t.color, fontSize:20, display:'flex', alignItems:'center', justifyContent:'center', mb:1.5 }}>{t.icon}</Box>
                  <Typography variant="body1" fontWeight={700} color="text.primary" mb={0.5}>{t.label}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight:1.5 }}>{t.desc}</Typography>
                </Box>
              </FadeIn>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ── WHY LEARN DSA ── */}
      <Box sx={{ maxWidth:1200, mx:'auto', px:3, py:7 }}>
        <FadeIn>
          <Box display="flex" alignItems="center" gap={2} mb={4}>
            <Box sx={{ bgcolor:'#ecfdf5', borderRadius:2.5, p:1.5, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <FaRocket size={22} color="#059669" />
            </Box>
            <Typography variant="h5" fontWeight={700} color="text.primary">Why Learn DSA?</Typography>
          </Box>
        </FadeIn>
        <Box sx={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:3, mb:4 }}>
          {[
            { icon:<GrOptimize size={26} color="#2563eb"/>, bg:'#eff6ff', title:'System Optimization', desc:'Build efficient, scalable applications that perform under load.' },
            { icon:<FaPuzzlePiece size={24} color="#7c3aed"/>, bg:'#f5f3ff', title:'Problem Solving', desc:'Develop logical thinking for complex computational challenges.' },
            { icon:<FaCloud size={24} color="#d97706"/>, bg:'#fffbeb', title:'Career Essential', desc:'Critical for technical interviews at top tech companies.' },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={i*0.1} direction="up">
              <Box sx={{ bgcolor:'#ffffff', border:'1px solid #e2e8f0', borderRadius:3, p:3, textAlign:'center', height:'100%' }}>
                <Box sx={{ width:52, height:52, borderRadius:'50%', bgcolor:item.bg, display:'flex', alignItems:'center', justifyContent:'center', mx:'auto', mb:2 }}>{item.icon}</Box>
                <Typography variant="body1" fontWeight={700} color="text.primary" mb={1}>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight:1.65 }}>{item.desc}</Typography>
              </Box>
            </FadeIn>
          ))}
        </Box>
        <FadeIn delay={0.1}>
          <Box sx={{ background:'linear-gradient(135deg, #eff6ff, #f5f3ff)', borderRadius:3, p:3 }}>
            <Typography variant="body1" fontWeight={700} color="text.primary" mb={2}>Required in every CS career path:</Typography>
            <Box sx={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))', gap:2 }}>
              {[
                { icon:<FaServer color="#2563eb" size={18}/>, label:'Backend Dev'    },
                { icon:<FaRobot color="#059669" size={18}/>,  label:'AI / ML'        },
                { icon:<FaGamepad color="#7c3aed" size={18}/>,label:'Game Dev'       },
                { icon:<FaShieldAlt color="#dc2626" size={18}/>,label:'Cybersecurity'},
              ].map(c => (
                <Box key={c.label} sx={{ bgcolor:'#ffffff', borderRadius:2, py:1.5, px:2, display:'flex', flexDirection:'column', alignItems:'center', gap:0.8 }}>
                  {c.icon}
                  <Typography variant="caption" fontWeight={600} color="text.secondary">{c.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </FadeIn>
      </Box>

      {/* ── WHAT YOU'LL LEARN ── */}
      <Box sx={{ bgcolor:'#ffffff', borderTop:'1px solid #e2e8f0', borderBottom:'1px solid #e2e8f0', py:7, px:3 }}>
        <Box sx={{ maxWidth:1200, mx:'auto' }}>
          <FadeIn>
            <Box display="flex" alignItems="center" gap={2} mb={4}>
              <Box sx={{ bgcolor:'#f5f3ff', borderRadius:2.5, p:1.5, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <FaGraduationCap size={22} color="#7c3aed" />
              </Box>
              <Typography variant="h5" fontWeight={700} color="text.primary">What You'll Learn</Typography>
            </Box>
          </FadeIn>
          <Box sx={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:2.5, mb:4 }}>
            {[
              { icon:<FaList size={22} color="#2563eb"/>,            bg:'#eff6ff', title:'Arrays & Linked Lists',  desc:'Linear data structures, memory allocation, pointer manipulation'    },
              { icon:<BsStack size={22} color="#059669"/>,           bg:'#ecfdf5', title:'Stacks & Queues',        desc:'LIFO and FIFO principles with real-world application examples'      },
              { icon:<TbBinaryTreeFilled size={22} color="#d97706"/>, bg:'#fffbeb', title:'Trees & Graphs',        desc:'Hierarchical and network structures with traversal algorithms'       },
              { icon:<TbCaretUpDownFilled size={22} color="#7c3aed"/>,bg:'#f5f3ff', title:'Sorting Techniques',    desc:'Bubble, Quick, Merge Sort — bar chart visualizer with pause/resume'  },
              { icon:<FaSearch size={22} color="#dc2626"/>,          bg:'#fef2f2', title:'Searching Algorithms',   desc:'Linear and Binary search with step-by-step highlighted animation'    },
              { icon:<FaHashtag size={22} color="#0891b2"/>,         bg:'#ecfeff', title:'Hashing',                desc:'Hash tables, collision handling, load factor and probing strategies'  },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i*0.07} direction="up">
                <Box sx={{ bgcolor:item.bg, borderRadius:3, p:2.5 }}>
                  <Box display="flex" alignItems="center" gap={1.5} mb={1}>{item.icon}<Typography variant="body2" fontWeight={700} color="text.primary">{item.title}</Typography></Box>
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight:1.6 }}>{item.desc}</Typography>
                </Box>
              </FadeIn>
            ))}
          </Box>
          <FadeIn delay={0.1}>
            <Box sx={{ background:'linear-gradient(135deg, #eff6ff, #f5f3ff)', borderRadius:3, p:3 }}>
              <Typography variant="body1" fontWeight={700} color="text.primary" mb={2}>Advanced Algorithmic Patterns:</Typography>
              <Box sx={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:2 }}>
                {[
                  { icon:<FaLeaf color="#2563eb" size={18}/>,           label:'Greedy Algorithms',   sub:'Optimal local choices' },
                  { icon:<GoGraph color="#059669" size={18}/>,           label:'Dynamic Programming', sub:'Optimization problems' },
                  { icon:<FaArrowRotateLeft color="#7c3aed" size={18}/>, label:'Backtracking',        sub:'Explore all solutions'  },
                ].map(p => (
                  <Box key={p.label} sx={{ bgcolor:'#ffffff', borderRadius:2, p:2, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:0.8 }}>
                    {p.icon}
                    <Typography variant="body2" fontWeight={700} color="text.primary">{p.label}</Typography>
                    <Typography variant="caption" color="text.secondary">{p.sub}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </FadeIn>
        </Box>
      </Box>

      {/* ── LEARNING GOALS ── */}
      <Box sx={{ bgcolor:'#2563eb', py:7, px:3 }}>
        <Box sx={{ maxWidth:1200, mx:'auto' }}>
          <FadeIn>
            <Typography variant="h5" fontWeight={700} color="#ffffff" mb={4} textAlign="center">Learning Goals & Interactive Features</Typography>
          </FadeIn>
          <Box sx={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:2.5 }}>
            {[
              { icon:<FaRegEye size={24} color="#ffffff"/>,  title:'Visual Learning',   desc:'Understand through animated visualizations, not just text'  },
              { icon:<FaPlay size={20} color="#ffffff"/>,    title:'Algorithm Tracing', desc:'Trace every step with live index, value and comparison data' },
              { icon:<FaCode size={22} color="#ffffff"/>,    title:'Code Examples',     desc:'Clean syntax-highlighted code snippets for every topic'      },
              { icon:<FaRobot size={22} color="#ffffff"/>,   title:'AI Assistant',      desc:'Chatbot knows your current topic and answers in context'     },
            ].map((f, i) => (
              <FadeIn key={f.title} delay={i*0.08} direction="up">
                <Box sx={{ bgcolor:'rgba(255,255,255,0.12)', borderRadius:3, p:2.5 }}>
                  <Box mb={1.5}>{f.icon}</Box>
                  <Typography variant="body1" fontWeight={700} color="#ffffff" mb={0.8}>{f.title}</Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.8)" sx={{ lineHeight:1.6 }}>{f.desc}</Typography>
                </Box>
              </FadeIn>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ── CTA ── */}
      <Box sx={{ py:8, px:3, textAlign:'center', bgcolor:'#f8fafc' }}>
        <FadeIn direction="up">
          <Typography variant="h5" fontWeight={700} color="text.primary" mb={1.5}>Ready to start your DSA journey?</Typography>
          <Typography variant="body1" color="text.secondary" mb={4} sx={{ maxWidth:440, mx:'auto', lineHeight:1.7 }}>Begin with Arrays — the most fundamental data structure in computer science.</Typography>
          <Button variant="contained" size="large" onClick={() => navigate('/dsa/array')}
            sx={{ textTransform:'none', fontWeight:700, fontSize:'1.05rem', px:5, py:1.6, borderRadius:3, bgcolor:'#2563eb', boxShadow:'none', '&:hover':{ bgcolor:'#1d4ed8', boxShadow:'0 4px 18px rgba(37,99,235,0.35)' } }}>
            <FaPlay style={{ marginRight:8 }} /> Start Learning — Arrays
          </Button>
        </FadeIn>
      </Box>
    </Box>
  );
};

export default DSAIntro;