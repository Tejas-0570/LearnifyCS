import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, LinearProgress } from '@mui/material';
import { useAuth } from '../pages/context/Authcontext';
import ProfilePopup from '../components/ProfilePopup';

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IconDSA = ({ color }) => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <rect x="2" y="8" width="6" height="6" rx="1" fill={color} opacity=".9" />
    <rect x="11" y="4" width="6" height="6" rx="1" fill={color} opacity=".7" />
    <rect x="20" y="8" width="6" height="6" rx="1" fill={color} opacity=".9" />
    <line x1="8" y1="11" x2="11" y2="7" stroke={color} strokeWidth="1.5" />
    <line x1="17" y1="7" x2="20" y2="11" stroke={color} strokeWidth="1.5" />
    <rect x="2" y="18" width="6" height="6" rx="1" fill={color} opacity=".5" />
    <rect x="20" y="18" width="6" height="6" rx="1" fill={color} opacity=".5" />
    <line x1="5" y1="14" x2="5" y2="18" stroke={color} strokeWidth="1.5" />
    <line x1="23" y1="14" x2="23" y2="18" stroke={color} strokeWidth="1.5" />
  </svg>
);
const IconOS = ({ color }) => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="10" stroke={color} strokeWidth="1.8" fill="none" />
    <circle cx="14" cy="14" r="4" fill={color} opacity=".8" />
    <line x1="14" y1="4" x2="14" y2="8" stroke={color} strokeWidth="1.8" />
    <line x1="14" y1="20" x2="14" y2="24" stroke={color} strokeWidth="1.8" />
    <line x1="4" y1="14" x2="8" y2="14" stroke={color} strokeWidth="1.8" />
    <line x1="20" y1="14" x2="24" y2="14" stroke={color} strokeWidth="1.8" />
  </svg>
);
const IconDBMS = ({ color }) => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <ellipse cx="14" cy="7" rx="9" ry="3.5" stroke={color} strokeWidth="1.8" fill="none" />
    <path d="M5 7v5c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5V7" stroke={color} strokeWidth="1.8" fill="none" />
    <path d="M5 12v5c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5v-5" stroke={color} strokeWidth="1.8" fill="none" />
  </svg>
);
const IconCN = ({ color }) => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <circle cx="7" cy="14" r="3" stroke={color} strokeWidth="1.8" fill="none" />
    <circle cx="21" cy="7" r="3" stroke={color} strokeWidth="1.8" fill="none" />
    <circle cx="21" cy="21" r="3" stroke={color} strokeWidth="1.8" fill="none" />
    <circle cx="14" cy="14" r="2.5" fill={color} opacity=".6" />
    <line x1="10" y1="14" x2="11.5" y2="14" stroke={color} strokeWidth="1.5" />
    <line x1="16.5" y1="14" x2="18" y2="14" stroke={color} strokeWidth="1.5" />
    <line x1="14" y1="11.5" x2="19" y2="9" stroke={color} strokeWidth="1.5" />
    <line x1="14" y1="16.5" x2="19" y2="19" stroke={color} strokeWidth="1.5" />
  </svg>
);

// ─── 3D Code Particles Canvas ─────────────────────────────────────────────────
const CodeParticles3D = () => {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    let t = 0;
    const particles = Array.from({ length: 38 }, (_, i) => ({
      angle: (i / 38) * Math.PI * 2, radius: 60 + (i % 4) * 22,
      speed: 0.006 + (i % 5) * 0.0025, size: 1.5 + (i % 3) * 0.8,
      color: ['#2563eb','#3b82f6','#60a5fa','#93c5fd','#1d4ed8'][i % 5],
      yFlatten: 0.32 + (i % 3) * 0.06, yOffset: (i % 7 - 3) * 12,
    }));
    const symbols = [
      { sym: '{',   baseX: -52, baseY: 0,   size: 58, color: '#2563eb', bobSpeed: 0.9,  bobAmp: 10, phase: 0        },
      { sym: '}',   baseX:  52, baseY: 0,   size: 58, color: '#2563eb', bobSpeed: 0.9,  bobAmp: 10, phase: Math.PI  },
      { sym: '//',  baseX:  0,  baseY: -72, size: 17, color: '#3b82f6', bobSpeed: 1.1,  bobAmp: 7,  phase: 0.5      },
      { sym: '=>',  baseX:  0,  baseY:  68, size: 16, color: '#3b82f6', bobSpeed: 0.8,  bobAmp: 6,  phase: 1.2      },
      { sym: '[]',  baseX:  88, baseY: -36, size: 15, color: '#60a5fa', bobSpeed: 1.2,  bobAmp: 8,  phase: 2.0      },
      { sym: '()',  baseX: -90, baseY:  30, size: 15, color: '#60a5fa', bobSpeed: 0.75, bobAmp: 8,  phase: 0.8      },
      { sym: ';;',  baseX:  76, baseY:  50, size: 13, color: '#93c5fd', bobSpeed: 1.0,  bobAmp: 6,  phase: 1.6      },
      { sym: '</>', baseX: -70, baseY: -48, size: 13, color: '#93c5fd', bobSpeed: 0.85, bobAmp: 7,  phase: 2.4      },
    ];
    const nodes3d = Array.from({ length: 12 }, (_, i) => ({
      x: (Math.random()-0.5)*260, y: (Math.random()-0.5)*180, z: (Math.random()-0.5)*120,
      r: 3+Math.random()*3, rotX: Math.random()*0.004,
      color: ['#bfdbfe','#93c5fd','#60a5fa'][i%3],
    }));
    function drawFrame() {
      const W=canvas.width, H=canvas.height;
      ctx.clearRect(0,0,W,H); t+=0.013;
      const cx=W/2, cy=H/2;
      particles.forEach(p => {
        p.angle+=p.speed;
        const px=cx+Math.cos(p.angle)*p.radius, py=cy+Math.sin(p.angle)*p.radius*p.yFlatten+p.yOffset;
        ctx.beginPath(); ctx.arc(px,py,p.size,0,Math.PI*2);
        ctx.fillStyle=p.color; ctx.globalAlpha=0.55; ctx.fill(); ctx.globalAlpha=1;
      });
      for(let i=0;i<particles.length;i++){
        const pi=particles[i], pix=cx+Math.cos(pi.angle)*pi.radius, piy=cy+Math.sin(pi.angle)*pi.radius*pi.yFlatten+pi.yOffset;
        for(let j=i+1;j<i+4&&j<particles.length;j++){
          const pj=particles[j], pjx=cx+Math.cos(pj.angle)*pj.radius, pjy=cy+Math.sin(pj.angle)*pj.radius*pj.yFlatten+pj.yOffset;
          const d=Math.hypot(pjx-pix,pjy-piy);
          if(d<60){ctx.beginPath();ctx.moveTo(pix,piy);ctx.lineTo(pjx,pjy);ctx.strokeStyle=`rgba(96,165,250,${0.18*(1-d/60)})`;ctx.lineWidth=0.8;ctx.stroke();}
        }
      }
      nodes3d.forEach(n=>{
        n.y+=Math.sin(t*n.rotX*80)*0.15;
        const fov=350,z=n.z+200,scale=fov/z,sx=cx+n.x*scale,sy=cy+n.y*scale;
        ctx.beginPath();ctx.arc(sx,sy,Math.max(1,n.r*scale),0,Math.PI*2);
        ctx.fillStyle=n.color;ctx.globalAlpha=0.3+scale*0.2;ctx.fill();ctx.globalAlpha=1;
      });
      symbols.forEach(s=>{
        const sy=cy+s.baseY+Math.sin(t*s.bobSpeed+s.phase)*s.bobAmp, sx=cx+s.baseX;
        if(s.size>30){const g=ctx.createRadialGradient(sx,sy,0,sx,sy,45);g.addColorStop(0,'rgba(37,99,235,0.10)');g.addColorStop(1,'rgba(37,99,235,0)');ctx.beginPath();ctx.arc(sx,sy,45,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();}
        ctx.font=`700 ${s.size}px 'Courier New',Courier,monospace`;
        ctx.fillStyle=s.color;ctx.globalAlpha=s.size>30?0.88:0.65;
        ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(s.sym,sx,sy);ctx.globalAlpha=1;
      });
      animRef.current=requestAnimationFrame(drawFrame);
    }
    drawFrame();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize',resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ width:'100%', height:'100%', display:'block' }} />;
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const modules = [
  { id:'dsa', label:'Data Structures & Algorithms', short:'DSA', desc:'Visualize arrays, trees, graphs, sorting and more through step-by-step interactive animations.', path:'/dsa', active:true, progress:82, topics:10, color:'#2563eb', lightBg:'#eff6ff', borderColor:'#bfdbfe', badgeLabel:'Featured', badgeBg:'#dbeafe', badgeColor:'#1d4ed8', Icon:IconDSA, highlights:['BFS / DFS / Dijkstra','6 Sorting Algorithms','Hash Table Visualizer'] },
  { id:'os',  label:'Operating Systems',            short:'OS',   desc:'Explore CPU scheduling, memory management, deadlock detection and process synchronization.',      path:'/os',   active:false, progress:0, topics:7,  color:'#7c3aed', lightBg:'#f5f3ff', borderColor:'#ddd6fe', badgeLabel:'Coming Soon', badgeBg:'#ede9fe', badgeColor:'#6d28d9', Icon:IconOS,   highlights:["CPU Scheduling","Banker's Algorithm","Disk Scheduling"] },
  { id:'dbms',label:'Database Management',          short:'DBMS', desc:'Understand ER models, relational algebra, SQL queries, ACID properties and transactions.',         path:'/dbms', active:false, progress:0, topics:6,  color:'#0891b2', lightBg:'#ecfeff', borderColor:'#a5f3fc', badgeLabel:'Coming Soon', badgeBg:'#cffafe', badgeColor:'#0e7490', Icon:IconDBMS, highlights:['ER Diagrams','SQL Queries','ACID Properties'] },
  { id:'cn',  label:'Computer Networks',            short:'CN',   desc:'Learn OSI model, TCP/IP, routing algorithms, error detection and wireless networks.',              path:'/cn',   active:false, progress:0, topics:6,  color:'#059669', lightBg:'#ecfdf5', borderColor:'#a7f3d0', badgeLabel:'Coming Soon', badgeBg:'#d1fae5', badgeColor:'#047857', Icon:IconCN,   highlights:['OSI / TCP-IP Model','Routing Algorithms','Error Detection'] },
];

const quickTopics = [
  { label:'Arrays',      path:'/dsa/array',       color:'#2563eb' },
  { label:'Linked List', path:'/dsa/linked-list',  color:'#7c3aed' },
  { label:'Stack',       path:'/dsa/stack',        color:'#0891b2' },
  { label:'Queue',       path:'/dsa/queue',        color:'#059669' },
  { label:'Sorting',     path:'/dsa/sorting',      color:'#d97706' },
  { label:'Trees',       path:'/dsa/trees',        color:'#dc2626' },
  { label:'Graphs',      path:'/dsa/graphs',       color:'#7c3aed' },
  { label:'Searching',   path:'/dsa/searching',    color:'#0891b2' },
  { label:'Hashing',     path:'/dsa/hashing',      color:'#059669' },
];

const stats = [
  { value:'10',  label:'Topics Available', sub:'in DSA module'        },
  { value:'10+', label:'Visualizations',   sub:'interactive demos'    },
  { value:'20+', label:'Algorithms',       sub:'animated step-by-step'},
];

// ─── Dashboard ────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();                          // ← real auth
  const [greeting, setGreeting]         = useState('Good morning');
  const [hovered, setHovered]           = useState(null);
  const [hoveredTopic, setHoveredTopic] = useState(null);

  // Dynamic greeting
  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 12 && h < 17) setGreeting('Good afternoon');
    else if (h >= 17)      setGreeting('Good evening');
  }, []);

  // First name only for greeting
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <Box sx={{ minHeight:'100vh', bgcolor:'#f8fafc' }}>

      {/* ── Navbar ── */}
      <Box sx={{
        position:'sticky', top:0, zIndex:100,
        bgcolor:'rgba(255,255,255,0.95)',
        borderBottom:'1px solid #e2e8f0',
        backdropFilter:'blur(10px)',
      }}>
        <Box sx={{
          maxWidth:1200, mx:'auto', px:3,
          height:60, display:'flex',
          alignItems:'center', justifyContent:'space-between',
        }}>
          <Box display="flex" alignItems="center" gap={1.2}>
            <Box sx={{ width:10, height:10, borderRadius:'50%', bgcolor:'#2563eb' }} />
            <Typography variant="h6" fontWeight={800} color="#1e293b" sx={{ letterSpacing:'-0.3px' }}>
              LearnifyCS
            </Typography>
          </Box>

          {/* ProfilePopup replaces static avatar */}
          <ProfilePopup size={36} fontSize={13} />
        </Box>
      </Box>

      {/* ── Hero ── */}
      <Box sx={{
        background:'linear-gradient(135deg, #eff6ff 0%, #f5f3ff 50%, #ecfeff 100%)',
        borderBottom:'1px solid #e2e8f0',
        py:0, px:3, overflow:'hidden', minHeight:340,
      }}>
        <Box sx={{ maxWidth:1200, mx:'auto', display:'flex', alignItems:'center', minHeight:340, gap:4 }}>
          <Box sx={{ flex:'0 0 55%', py:5 }}>
            <Typography variant="body2" color="text.secondary" fontWeight={500} mb={0.8}>
              {greeting}, {firstName} 👋
            </Typography>
            <Typography variant="h4" fontWeight={800} color="#0f172a" mb={1.5} sx={{ letterSpacing:'-0.5px', lineHeight:1.2 }}>
              Your Learning Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4} sx={{ maxWidth:460, lineHeight:1.7 }}>
              Master computer science concepts through interactive visualizations — not just theory.
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              {stats.map(s => (
                <Box key={s.label} sx={{ bgcolor:'#ffffff', border:'1px solid #e2e8f0', borderRadius:3, px:2.5, py:1.5, display:'flex', flexDirection:'column', gap:0.3, boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
                  <Typography variant="h5" fontWeight={800} color="#2563eb" sx={{ letterSpacing:'-0.5px' }}>{s.value}</Typography>
                  <Typography variant="body2" fontWeight={600} color="text.primary">{s.label}</Typography>
                  <Typography variant="caption" color="text.secondary">{s.sub}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ flex:'0 0 42%', height:320, borderRadius:4, overflow:'hidden', position:'relative' }}>
            <CodeParticles3D />
          </Box>
        </Box>
      </Box>

      {/* ── Module Cards ── */}
      <Box sx={{ maxWidth:1200, mx:'auto', px:3, pt:5 }}>
        <Box mb={3}>
          <Typography variant="h5" fontWeight={700} color="text.primary" mb={0.5}>Explore Modules</Typography>
          <Typography variant="body2" color="text.secondary">Choose a subject to start learning</Typography>
        </Box>
        <Box sx={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:2.5 }}>
          {modules.map(mod => {
            const isHov = hovered === mod.id;
            return (
              <Box key={mod.id}
                onMouseEnter={() => setHovered(mod.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => mod.active && navigate(mod.path)}
                sx={{ bgcolor:'#ffffff', borderRadius:3, border:'1.5px solid', borderColor: isHov&&mod.active ? mod.color : mod.borderColor, overflow:'hidden', cursor:mod.active?'pointer':'default', opacity:mod.active?1:0.72, transition:'all 0.22s ease', transform:isHov&&mod.active?'translateY(-4px)':'none', boxShadow:isHov&&mod.active?`0 8px 28px ${mod.color}22`:'0 2px 8px rgba(0,0,0,0.06)' }}
              >
                <Box sx={{ bgcolor:mod.lightBg, px:2.5, pt:2.5, pb:2, display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
                  <Box sx={{ width:50, height:50, borderRadius:2.5, bgcolor:`${mod.color}18`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <mod.Icon color={mod.color} />
                  </Box>
                  <Box sx={{ bgcolor:mod.badgeBg, px:1.2, py:0.5, borderRadius:5 }}>
                    <Typography sx={{ fontSize:10, fontWeight:700, color:mod.badgeColor, letterSpacing:'0.4px', textTransform:'uppercase' }}>{mod.badgeLabel}</Typography>
                  </Box>
                </Box>
                <Box sx={{ px:2.5, pt:1.2, pb:2.5 }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.8}>
                    <Typography sx={{ fontSize:11, fontWeight:700, color:mod.color, letterSpacing:'0.5px', textTransform:'uppercase' }}>{mod.short}</Typography>
                    <Typography variant="caption" color="text.secondary">{mod.topics} topics</Typography>
                  </Box>
                  <Typography variant="body1" fontWeight={700} color="text.primary" mb={1} sx={{ lineHeight:1.35 }}>{mod.label}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={2} sx={{ lineHeight:1.65 }}>{mod.desc}</Typography>
                  <Box display="flex" flexWrap="wrap" gap={0.8} mb={2}>
                    {mod.highlights.map(h => (
                      <Box key={h} sx={{ bgcolor:mod.lightBg, border:`1px solid ${mod.borderColor}`, borderRadius:1.5, px:1, py:0.4 }}>
                        <Typography sx={{ fontSize:11, fontWeight:600, color:mod.color }}>{h}</Typography>
                      </Box>
                    ))}
                  </Box>
                  {mod.active && (
                    <Box mb={2}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.8}>
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>Module progress</Typography>
                        <Typography variant="caption" fontWeight={700} sx={{ color:mod.color }}>{mod.progress}%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={mod.progress} sx={{ height:6, borderRadius:99, bgcolor:'#e2e8f0', '& .MuiLinearProgress-bar':{ bgcolor:mod.color, borderRadius:99 } }} />
                    </Box>
                  )}
                  <Button variant="contained" fullWidth disabled={!mod.active}
                    onClick={e => { e.stopPropagation(); mod.active && navigate(mod.path); }}
                    sx={{ textTransform:'none', fontWeight:700, fontSize:14, borderRadius:2.5, py:1.1, boxShadow:'none', bgcolor:mod.active?mod.color:'#9ca3af', '&:hover':{ bgcolor:mod.active?mod.color:'#9ca3af', opacity:0.88, boxShadow:'none' }, '&.Mui-disabled':{ bgcolor:'#9ca3af', color:'#ffffff' } }}
                  >
                    {mod.active ? 'Enter Lab →' : 'Coming Soon'}
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* ── Quick Access ── */}
      <Box sx={{ maxWidth:1200, mx:'auto', px:3, pt:5 }}>
        <Box mb={3}>
          <Typography variant="h5" fontWeight={700} color="text.primary" mb={0.5}>Quick Access — DSA Topics</Typography>
          <Typography variant="body2" color="text.secondary">Jump directly to any topic</Typography>
        </Box>
        <Box display="flex" flexWrap="wrap" gap={1.2}>
          {quickTopics.map(t => (
            <Box key={t.label}
              onMouseEnter={() => setHoveredTopic(t.label)}
              onMouseLeave={() => setHoveredTopic(null)}
              onClick={() => navigate(t.path)}
              sx={{ px:2.2, py:1, border:'1.5px solid', borderColor:hoveredTopic===t.label?t.color:`${t.color}44`, borderRadius:99, bgcolor:hoveredTopic===t.label?t.color:'#ffffff', cursor:'pointer', transition:'all 0.18s ease' }}
            >
              <Typography variant="body2" fontWeight={600} sx={{ color:hoveredTopic===t.label?'#ffffff':'text.primary' }}>{t.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Footer ── */}
      <Box sx={{ maxWidth:1200, mx:'auto', px:3, pt:6, pb:4, mt:6, borderTop:'1px solid #e2e8f0', textAlign:'center' }}>
        <Typography variant="caption" color="text.secondary">LearnifyCS — Built for learners, by learners</Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;