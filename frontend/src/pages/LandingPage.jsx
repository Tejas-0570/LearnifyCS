import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaRocket } from 'react-icons/fa';

// ─── SVG Icons for Lab Cards ──────────────────────────────────────────────────
const IconDSA = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="2" y="8" width="6" height="6" rx="1" fill="#2563eb" opacity=".9" />
    <rect x="11" y="4" width="6" height="6" rx="1" fill="#2563eb" opacity=".7" />
    <rect x="20" y="8" width="6" height="6" rx="1" fill="#2563eb" opacity=".9" />
    <line x1="8" y1="11" x2="11" y2="7" stroke="#2563eb" strokeWidth="1.5" />
    <line x1="17" y1="7" x2="20" y2="11" stroke="#2563eb" strokeWidth="1.5" />
    <rect x="2" y="18" width="6" height="6" rx="1" fill="#2563eb" opacity=".5" />
    <rect x="20" y="18" width="6" height="6" rx="1" fill="#2563eb" opacity=".5" />
    <line x1="5" y1="14" x2="5" y2="18" stroke="#2563eb" strokeWidth="1.5" />
    <line x1="23" y1="14" x2="23" y2="18" stroke="#2563eb" strokeWidth="1.5" />
  </svg>
);
const IconOS = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="10" stroke="#7c3aed" strokeWidth="1.8" fill="none" />
    <circle cx="14" cy="14" r="4" fill="#7c3aed" opacity=".8" />
    <line x1="14" y1="4" x2="14" y2="8" stroke="#7c3aed" strokeWidth="1.8" />
    <line x1="14" y1="20" x2="14" y2="24" stroke="#7c3aed" strokeWidth="1.8" />
    <line x1="4" y1="14" x2="8" y2="14" stroke="#7c3aed" strokeWidth="1.8" />
    <line x1="20" y1="14" x2="24" y2="14" stroke="#7c3aed" strokeWidth="1.8" />
  </svg>
);
const IconDBMS = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <ellipse cx="14" cy="7" rx="9" ry="3.5" stroke="#0891b2" strokeWidth="1.8" fill="none" />
    <path d="M5 7v5c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5V7" stroke="#0891b2" strokeWidth="1.8" fill="none" />
    <path d="M5 12v5c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5v-5" stroke="#0891b2" strokeWidth="1.8" fill="none" />
  </svg>
);
const IconCN = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="7" cy="14" r="3" stroke="#059669" strokeWidth="1.8" fill="none" />
    <circle cx="21" cy="7" r="3" stroke="#059669" strokeWidth="1.8" fill="none" />
    <circle cx="21" cy="21" r="3" stroke="#059669" strokeWidth="1.8" fill="none" />
    <circle cx="14" cy="14" r="2.5" fill="#059669" opacity=".6" />
    <line x1="10" y1="14" x2="11.5" y2="14" stroke="#059669" strokeWidth="1.5" />
    <line x1="16.5" y1="14" x2="18" y2="14" stroke="#059669" strokeWidth="1.5" />
    <line x1="14" y1="11.5" x2="19" y2="9" stroke="#059669" strokeWidth="1.5" />
    <line x1="14" y1="16.5" x2="19" y2="19" stroke="#059669" strokeWidth="1.5" />
  </svg>
);

// ─── 3D Code Particles Canvas (hero right side) ───────────────────────────────
const CodeParticles3D = () => {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;

    const particles = Array.from({ length: 42 }, (_, i) => ({
      angle:     (i / 42) * Math.PI * 2,
      radius:    55 + (i % 5) * 20,
      speed:     0.005 + (i % 6) * 0.002,
      size:      1.2 + (i % 3) * 0.9,
      color:     ['#2563eb','#3b82f6','#60a5fa','#93c5fd','#1d4ed8'][i % 5],
      yFlatten:  0.28 + (i % 4) * 0.07,
      yOffset:   (i % 9 - 4) * 11,
    }));

    const symbols = [
      { sym: '{',   bx: -56, by:  0,   size: 62, color: '#2563eb', bs: 0.85, ba: 11, ph: 0         },
      { sym: '}',   bx:  56, by:  0,   size: 62, color: '#2563eb', bs: 0.85, ba: 11, ph: Math.PI   },
      { sym: '//',  bx:   0, by: -76,  size: 18, color: '#3b82f6', bs: 1.1,  ba:  7, ph: 0.5       },
      { sym: '=>',  bx:   0, by:  72,  size: 17, color: '#3b82f6', bs: 0.8,  ba:  6, ph: 1.2       },
      { sym: '[]',  bx:  94, by: -38,  size: 16, color: '#60a5fa', bs: 1.2,  ba:  8, ph: 2.0       },
      { sym: '()',  bx: -96, by:  32,  size: 16, color: '#60a5fa', bs: 0.75, ba:  8, ph: 0.8       },
      { sym: ';;',  bx:  80, by:  54,  size: 14, color: '#93c5fd', bs: 1.0,  ba:  6, ph: 1.6       },
      { sym: '</>',  bx: -74, by: -52, size: 14, color: '#93c5fd', bs: 0.9,  ba:  7, ph: 2.4       },
    ];

    const nodes3d = Array.from({ length: 14 }, (_, i) => ({
      x:  (Math.random() - 0.5) * 280,
      y:  (Math.random() - 0.5) * 200,
      z:  (Math.random() - 0.5) * 140,
      r:  2.5 + Math.random() * 3.5,
      sp: 0.003 + Math.random() * 0.004,
      color: ['#bfdbfe','#93c5fd','#60a5fa','#dbeafe'][i % 4],
    }));

    function draw() {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 0.012;
      const cx = W / 2, cy = H / 2;

      // orbiting particles
      particles.forEach(p => {
        p.angle += p.speed;
        const px = cx + Math.cos(p.angle) * p.radius;
        const py = cy + Math.sin(p.angle) * p.radius * p.yFlatten + p.yOffset;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // connecting lines
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        const pix = cx + Math.cos(pi.angle) * pi.radius;
        const piy = cy + Math.sin(pi.angle) * pi.radius * pi.yFlatten + pi.yOffset;
        for (let j = i + 1; j < i + 4 && j < particles.length; j++) {
          const pj  = particles[j];
          const pjx = cx + Math.cos(pj.angle) * pj.radius;
          const pjy = cy + Math.sin(pj.angle) * pj.radius * pj.yFlatten + pj.yOffset;
          const d   = Math.hypot(pjx - pix, pjy - piy);
          if (d < 65) {
            ctx.beginPath();
            ctx.moveTo(pix, piy); ctx.lineTo(pjx, pjy);
            ctx.strokeStyle = `rgba(96,165,250,${0.16 * (1 - d / 65)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 3D mini-nodes
      nodes3d.forEach(n => {
        n.y += Math.sin(t * n.sp * 60) * 0.12;
        const fov = 380, z = n.z + 220, scale = fov / z;
        const sx = cx + n.x * scale, sy = cy + n.y * scale;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(1, n.r * scale), 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = 0.25 + scale * 0.18;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // floating symbols
      symbols.forEach(s => {
        const sy = cy + s.by + Math.sin(t * s.bs + s.ph) * s.ba;
        const sx = cx + s.bx;
        if (s.size > 30) {
          const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 48);
          g.addColorStop(0, 'rgba(37,99,235,0.08)');
          g.addColorStop(1, 'rgba(37,99,235,0)');
          ctx.beginPath(); ctx.arc(sx, sy, 48, 0, Math.PI * 2);
          ctx.fillStyle = g; ctx.fill();
        }
        ctx.font = `700 ${s.size}px 'Courier New', Courier, monospace`;
        ctx.fillStyle   = s.color;
        ctx.globalAlpha = s.size > 30 ? 0.9 : 0.62;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(s.sym, sx, sy);
        ctx.globalAlpha = 1;
      });

      animRef.current = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
};

// ─── Scroll Fade Hook ─────────────────────────────────────────────────────────
const useFadeIn = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
};

// ─── FadeIn Wrapper Component ─────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, direction = 'up' }) => {
  const { ref, visible } = useFadeIn();
  const translateMap = { up: 'translateY(36px)', left: 'translateX(-36px)', right: 'translateX(36px)', none: 'none' };

  return (
    <Box
      ref={ref}
      sx={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'none' : translateMap[direction],
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </Box>
  );
};

// ─── Lab Card ─────────────────────────────────────────────────────────────────
const labs = [
  {
    title: 'Data Structures & Algorithms',
    desc:  'Visualize arrays, trees, graphs and sorting algorithms with step-by-step interactive animations.',
    icon:  <IconDSA />,
    color: '#2563eb', lightBg: '#eff6ff', borderColor: '#bfdbfe',
    href:  '/dsa', tag: 'Active',
  },
  {
    title: 'Operating Systems',
    desc:  'Explore CPU scheduling, memory management and deadlock detection through live simulations.',
    icon:  <IconOS />,
    color: '#7c3aed', lightBg: '#f5f3ff', borderColor: '#ddd6fe',
    href:  '/os', tag: 'Coming Soon',
  },
  {
    title: 'Database Management',
    desc:  'Understand ER models, SQL queries, ACID properties and transactions hands-on.',
    icon:  <IconDBMS />,
    color: '#0891b2', lightBg: '#ecfeff', borderColor: '#a5f3fc',
    href:  '/dbms', tag: 'Coming Soon',
  },
  {
    title: 'Computer Networks',
    desc:  'Learn OSI model, TCP/IP, routing algorithms and error detection interactively.',
    icon:  <IconCN />,
    color: '#059669', lightBg: '#ecfdf5', borderColor: '#a7f3d0',
    href:  '/cn', tag: 'Coming Soon',
  },
];

const stats = [
  { value: '10+', label: 'DSA Visualizers',      sub: 'interactive animations'  },
  { value: '20+', label: 'Algorithms',            sub: 'step-by-step animated'   },
  { value: '4',   label: 'CS Modules',            sub: 'DSA, OS, DBMS, CN'       },
  { value: '100%', label: 'Visual Learning',      sub: 'not just theory'         },
];

const features = [
  { icon: '⚡', title: 'Step-by-step Visualizations', desc: 'Watch every algorithm execute live — see exactly what happens at each step with animated state changes.' },
  { icon: '🤖', title: 'AI-Powered Chatbot',          desc: 'Ask topic-aware questions anytime. The chatbot knows which concept you\'re studying and responds in context.' },
  { icon: '📊', title: 'Complexity Analysis',         desc: 'Every topic includes time and space complexity breakdowns alongside visual comparisons.' },
  { icon: '🎯', title: 'Practice Problems',           desc: 'Curated problems for each topic to reinforce what you\'ve learned with hands-on coding practice.' },
];

// ─── Landing Page ─────────────────────────────────────────────────────────────
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#ffffff', overflowX: 'hidden' }}>
      <Navbar />

      {/* ══ HERO ═══════════════════════════════════════════════════════════════ */}
      <Box
        id="features"
        sx={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #f5f3ff 45%, #ecfeff 100%)',
          borderBottom: '1px solid #e2e8f0',
          minHeight: 580,
          display: 'flex', alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 4 }, width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>

            {/* Left — text */}
            <Box sx={{ flex: '0 0 52%', py: 8 }}>
              {/* pill badge */}
              <Box
                sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 1,
                  bgcolor: '#dbeafe', borderRadius: 99, px: 2, py: 0.6, mb: 3,
                }}
              >
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#2563eb' }} />
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1d4ed8' }}>
                  Interactive CS Learning Platform
                </Typography>
              </Box>

              <Typography
                variant="h2"
                fontWeight={800}
                color="#0f172a"
                mb={2}
                sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, lineHeight: 1.15, letterSpacing: '-1px' }}
              >
                Master Computer Science <br />
                with{' '}
                <Box component="span" sx={{ color: '#2563eb' }}>
                  Interactive Labs
                </Box>
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                mb={4.5}
                sx={{ fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 480 }}
              >
                Learn DSA, OS, DBMS and Computer Networks through hands-on visualizations,
                step-by-step algorithm animations, and an AI-powered chatbot — not just passive reading.
              </Typography>

              <Box display="flex" gap={2} flexWrap="wrap">
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/auth/login')}
                  sx={{
                    textTransform: 'none', fontWeight: 700, fontSize: '1rem',
                    px: 4, py: 1.4, borderRadius: 3,
                    bgcolor: '#2563eb', boxShadow: '0 4px 18px rgba(37,99,235,0.35)',
                    '&:hover': { bgcolor: '#1d4ed8', boxShadow: '0 6px 24px rgba(37,99,235,0.45)' },
                  }}
                >
                  Start Learning Free →
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/dsa')}
                  sx={{
                    textTransform: 'none', fontWeight: 600, fontSize: '1rem',
                    px: 4, py: 1.4, borderRadius: 3,
                    borderColor: '#cbd5e1', color: '#475569',
                    '&:hover': { borderColor: '#2563eb', color: '#2563eb', bgcolor: '#eff6ff' },
                  }}
                >
                  View DSA Lab
                </Button>
              </Box>
            </Box>

            {/* Right — 3D Canvas */}
            <Box sx={{ flex: '0 0 44%', height: 400, borderRadius: 4, overflow: 'hidden', minWidth: 280 }}>
              <CodeParticles3D />
            </Box>

          </Box>
        </Box>
      </Box>

      {/* ══ STATS ══════════════════════════════════════════════════════════════ */}
      <Box id="about" sx={{ borderBottom: '1px solid #e2e8f0', py: 5 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 4 } }}>
          <FadeIn>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 3 }}>
              {stats.map((s) => (
                <Box key={s.label} textAlign="center">
                  <Typography variant="h4" fontWeight={800} color="#2563eb" sx={{ letterSpacing: '-0.5px' }}>
                    {s.value}
                  </Typography>
                  <Typography variant="body2" fontWeight={600} color="text.primary" mt={0.3}>
                    {s.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {s.sub}
                  </Typography>
                </Box>
              ))}
            </Box>
          </FadeIn>
        </Box>
      </Box>

      {/* ══ LABS ═══════════════════════════════════════════════════════════════ */}
      <Box id="labs" sx={{ py: 10, bgcolor: '#f8fafc' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 4 } }}>
          <FadeIn>
            <Box textAlign="center" mb={6}>
              <Typography variant="h3" fontWeight={800} color="#0f172a" mb={1.5} sx={{ letterSpacing: '-0.5px' }}>
                Explore Our Interactive Labs
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.05rem', maxWidth: 540, mx: 'auto', lineHeight: 1.7 }}>
                Experience computer science concepts through immersive, hands-on learning environments
              </Typography>
            </Box>
          </FadeIn>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2.5 }}>
            {labs.map((lab, i) => (
              <FadeIn key={lab.title} delay={i * 0.1} direction="up">
                <Box
                  onClick={() => navigate(lab.href)}
                  sx={{
                    bgcolor: '#ffffff',
                    border: '1.5px solid',
                    borderColor: lab.borderColor,
                    borderRadius: 3,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.22s ease',
                    height: '100%',
                    '&:hover': {
                      borderColor: lab.color,
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 28px ${lab.color}22`,
                    },
                  }}
                >
                  <Box sx={{ bgcolor: lab.lightBg, px: 2.5, pt: 2.5, pb: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Box sx={{ width: 50, height: 50, borderRadius: 2.5, bgcolor: `${lab.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {lab.icon}
                    </Box>
                    <Box sx={{ bgcolor: lab.tag === 'Active' ? '#dcfce7' : '#f1f5f9', px: 1.2, py: 0.5, borderRadius: 5 }}>
                      <Typography sx={{ fontSize: 10, fontWeight: 700, color: lab.tag === 'Active' ? '#166534' : '#64748b', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                        {lab.tag}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ px: 2.5, pt: 1.5, pb: 2.5 }}>
                    <Typography variant="body1" fontWeight={700} color="text.primary" mb={1} sx={{ lineHeight: 1.35 }}>
                      {lab.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                      {lab.desc}
                    </Typography>
                  </Box>
                </Box>
              </FadeIn>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ══ FEATURES ═══════════════════════════════════════════════════════════ */}
      <Box sx={{ py: 10, bgcolor: '#ffffff' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 4 } }}>
          <FadeIn>
            <Box textAlign="center" mb={6}>
              <Typography variant="h3" fontWeight={800} color="#0f172a" mb={1.5} sx={{ letterSpacing: '-0.5px' }}>
                Why LearnifyCS?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.05rem', maxWidth: 480, mx: 'auto', lineHeight: 1.7 }}>
                We built what we wished existed when we were learning CS
              </Typography>
            </Box>
          </FadeIn>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 3 }}>
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.1} direction="up">
                <Box sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#f8fafc', height: '100%' }}>
                  <Typography sx={{ fontSize: 28, mb: 1.5 }}>{f.icon}</Typography>
                  <Typography variant="body1" fontWeight={700} color="text.primary" mb={1}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                    {f.desc}
                  </Typography>
                </Box>
              </FadeIn>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ══ CTA BANNER ═════════════════════════════════════════════════════════ */}
      <Box sx={{ py: 10, background: 'linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)', borderTop: '1px solid #e2e8f0' }}>
        <Box sx={{ maxWidth: 700, mx: 'auto', px: 3, textAlign: 'center' }}>
          <FadeIn direction="up">
            <Typography variant="h3" fontWeight={800} color="#0f172a" mb={2} sx={{ letterSpacing: '-0.5px' }}>
              Ready to Start Your <br />Learning Journey?
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={5} sx={{ fontSize: '1.05rem', lineHeight: 1.75 }}>
              Join students mastering computer science concepts through interactive, visual learning — for free.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/auth/login')}
              sx={{
                textTransform: 'none', fontWeight: 700, fontSize: '1.05rem',
                px: 5, py: 1.6, borderRadius: 3,
                bgcolor: '#2563eb', boxShadow: '0 4px 18px rgba(37,99,235,0.35)',
                '&:hover': { bgcolor: '#1d4ed8', boxShadow: '0 6px 28px rgba(37,99,235,0.45)' },
              }}
            >
              Get Started Now &nbsp;
              <FaRocket size={18} style={{ marginLeft: 6 }} />
            </Button>
          </FadeIn>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default LandingPage;