import { Box, Button, Typography, Paper } from '@mui/material';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FaPlay, FaYoutube, FaLightbulb, FaCode, FaRobot } from 'react-icons/fa';
import { RiLoopLeftFill } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';
import { FaMinus } from 'react-icons/fa';
import { FaArrowDownLong, FaArrowRightLong } from 'react-icons/fa6';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SectionHeader = ({ icon, title, color = '#2563eb', bg = '#eff6ff' }) => (
  <Box display="flex" alignItems="center" gap={2} mb={3}>
    <Box sx={{ bgcolor:bg, borderRadius:2, p:1.2, display:'flex', alignItems:'center', justifyContent:'center' }}>
      {React.cloneElement(icon, { size:20, color })}
    </Box>
    <Typography variant="h6" fontWeight={700} color="text.primary">{title}</Typography>
  </Box>
);

const problems = [
  { id:1, title:'Implement Stack using Queues',   difficulty:'Easy',   tag:'Design',   locked:false },
  { id:2, title:'Number of Recent Calls',         difficulty:'Easy',   tag:'Queue',    locked:false },
  { id:3, title:'First Unique Character',         difficulty:'Easy',   tag:'Queue',    locked:false },
  { id:4, title:'Sliding Window Maximum',         difficulty:'Hard',   tag:'Deque',    locked:true  },
  { id:5, title:'Rotting Oranges',                difficulty:'Medium', tag:'BFS',      locked:true  },
  { id:6, title:'Design Circular Queue',          difficulty:'Medium', tag:'Design',   locked:true  },
];
const diffColor = { Easy:'#059669', Medium:'#d97706', Hard:'#dc2626' };
const diffBg    = { Easy:'#ecfdf5', Medium:'#fffbeb', Hard:'#fef2f2' };

const ProblemCard = ({ p }) => (
  <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', p:2, border:'1px solid #e2e8f0', borderRadius:2, bgcolor:'#ffffff', opacity:p.locked?0.6:1, transition:'all 0.18s', '&:hover':{ borderColor:'#2563eb', boxShadow:'0 2px 12px rgba(37,99,235,0.08)' } }}>
    <Box display="flex" alignItems="center" gap={2}>
      <Typography variant="caption" color="text.secondary" sx={{ minWidth:24, fontWeight:600 }}>{p.id}.</Typography>
      <Box>
        <Typography variant="body2" fontWeight={600} color={p.locked?'text.secondary':'text.primary'}>{p.title}</Typography>
        <Box sx={{ bgcolor:'#f1f5f9', borderRadius:1, px:0.8, py:0.2, display:'inline-block', mt:0.4 }}>
          <Typography sx={{ fontSize:10, color:'#64748b', fontWeight:600 }}>{p.tag}</Typography>
        </Box>
      </Box>
    </Box>
    <Box display="flex" alignItems="center" gap={1.5}>
      <Box sx={{ bgcolor:diffBg[p.difficulty], borderRadius:99, px:1.2, py:0.3 }}>
        <Typography sx={{ fontSize:11, fontWeight:700, color:diffColor[p.difficulty] }}>{p.difficulty}</Typography>
      </Box>
      {p.locked
        ? <Box sx={{ bgcolor:'#f1f5f9', borderRadius:1, px:1.5, py:0.6 }}><Typography sx={{ fontSize:11, color:'#94a3b8', fontWeight:600 }}>🔒 Pro</Typography></Box>
        : <Button size="small" variant="outlined" sx={{ textTransform:'none', fontSize:12, borderColor:'#2563eb', color:'#2563eb', borderRadius:1.5, py:0.3, px:1.5, minWidth:0 }}>Solve</Button>
      }
    </Box>
  </Box>
);

const DSAQueue = () => {
  const [queue, setQueue]   = useState([]);
  const [input, setInput]   = useState('');
  const [steps, setSteps]   = useState([]);
  const [aiText, setAiText] = useState('');
  const [opCount, setOpCount] = useState({ enq:0, deq:0 });

  const addStep = (msg) => setSteps(p => [...p, msg]);

  const handleEnqueue = () => {
    if (input === '' || isNaN(input)) return;
    const val = Number(input);
    setQueue(prev => [...prev, val]);
    setOpCount(p => ({ ...p, enq: p.enq+1 }));
    addStep(`ENQUEUE(${val}) → Added ${val} to the REAR. Queue size: ${queue.length + 1}`);
    setAiText(`We enqueued ${val} at the REAR of the queue. FIFO means it will be the LAST to leave — elements ahead of it must be dequeued first.`);
    setInput('');
  };

  const handleDequeue = () => {
    if (queue.length === 0) { addStep('❌ Queue Underflow! Cannot dequeue from empty queue.'); return; }
    const front = queue[0];
    setQueue(prev => prev.slice(1));
    setOpCount(p => ({ ...p, deq: p.deq+1 }));
    addStep(`DEQUEUE() → Removed ${front} from the FRONT. Queue size: ${queue.length - 1}`);
    setAiText(`We dequeued ${front} from the FRONT. This is FIFO — First In, First Out. Think of a ticket counter: whoever arrives first gets served first.`);
  };

  const handleReset = () => { setQueue([]); setSteps([]); setAiText(''); setOpCount({ enq:0, deq:0 }); setInput(''); };

  return (
    <Box sx={{ maxWidth:1200, mx:'auto' }}>

      {/* ── VIDEO ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <SectionHeader icon={<FaYoutube />} title="Watch First — Understanding Queues" color="#dc2626" bg="#fef2f2" />
        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 1fr' }, gap:2 }}>
          {[
            { title:'Queue Data Structure Explained', id:'zp6pBNbUB2U', desc:'Queue operations, types and real-world applications' },
            { title:'Queue Interview Questions',      id:'XuCbpDp4Hn0', desc:'Common queue problems asked in product company interviews' },
          ].map(v => (
            <Box key={v.id} sx={{ borderRadius:2, overflow:'hidden', border:'1px solid #e2e8f0' }}>
              <Box sx={{ position:'relative', paddingTop:'56.25%', bgcolor:'#000' }}>
                <iframe style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', border:'none' }}
                  src={`https://www.youtube.com/embed/${v.id}`} title={v.title} allowFullScreen />
              </Box>
              <Box sx={{ p:1.5, bgcolor:'#f8fafc' }}>
                <Typography variant="body2" fontWeight={600} color="text.primary">{v.title}</Typography>
                <Typography variant="caption" color="text.secondary">{v.desc}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── THEORY ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <SectionHeader icon={<FaLightbulb />} title="Theory & Concepts" color="#d97706" bg="#fffbeb" />
        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 1fr' }, gap:3, mb:3 }}>
          <Box>
            <Typography variant="body2" fontWeight={700} color="#059669" mb={1}>What is a Queue?</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight:1.8 }}>
              A Queue is a linear data structure following <strong>FIFO (First In, First Out)</strong>.
              Elements are added at the REAR and removed from the FRONT. It's like a real queue at a ticket counter —
              first person in line gets served first.
            </Typography>
          </Box>
          <Box sx={{ bgcolor:'#f8fafc', borderRadius:2, p:2 }}>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={1.5}>Real-world Examples</Typography>
            {['🎫 Ticket counter — first in, first served', '🖨️ Printer job queue', '📱 CPU task scheduling', '🌐 Network packet transmission', '🎮 Multiplayer game matchmaking'].map(e => (
              <Typography key={e} variant="body2" color="text.secondary" sx={{ mb:0.6 }}>{e}</Typography>
            ))}
          </Box>
        </Box>

        {/* Queue diagram */}
        <Box sx={{ bgcolor:'#f8fafc', borderRadius:2, p:2.5, mb:3 }}>
          <Typography variant="body2" fontWeight={700} color="text.primary" mb={2}>Queue Structure</Typography>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography sx={{ fontSize:11, color:'#059669', fontWeight:700 }}>ENQUEUE</Typography>
              <FaArrowRightLong color="#059669" />
            </Box>
            {['A (Front)','B','C','D (Rear)'].map((label, i) => (
              <Box key={i} sx={{ border:`2px solid ${i===0?'#059669':i===3?'#dc2626':'#2563eb'}`, bgcolor: i===0?'#ecfdf5':i===3?'#fef2f2':'#eff6ff', py:1, px:1.5, borderRadius:1, textAlign:'center' }}>
                <Typography variant="body2" fontWeight={i===0||i===3?700:400} color={i===0?'#059669':i===3?'#dc2626':'#2563eb'} sx={{ whiteSpace:'nowrap', fontSize:12 }}>{label}</Typography>
              </Box>
            ))}
            <Box display="flex" flexDirection="column" alignItems="center">
              <FaArrowRightLong color="#dc2626" />
              <Typography sx={{ fontSize:11, color:'#dc2626', fontWeight:700 }}>DEQUEUE</Typography>
            </Box>
          </Box>
          <Typography variant="caption" color="text.secondary">Elements enter at REAR and exit from FRONT — FIFO principle</Typography>
        </Box>

        <Box sx={{ borderRadius:2, overflow:'hidden' }}>
          <SyntaxHighlighter language="cpp" style={atomOneDark} customStyle={{ margin:0, fontSize:13, borderRadius:8 }}>
{`// Queue using STL
#include <queue>
queue<int> q;

q.push(10);    // ENQUEUE at rear — O(1)
q.pop();       // DEQUEUE from front — O(1)
q.front();     // peek at front — O(1)
q.back();      // peek at rear — O(1)
q.empty();     // check if empty — O(1)
q.size();      // number of elements — O(1)`}
          </SyntaxHighlighter>
        </Box>
      </Box>

      {/* ── VISUALIZER + AI ── */}
      <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 340px' }, gap:3, mb:3 }}>
        <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, border:'1px solid #e2e8f0' }}>
          <SectionHeader icon={<FaPlay />} title="Interactive Queue Simulation" color="#2563eb" bg="#eff6ff" />

          <Box display="flex" gap={1.5} flexWrap="wrap" mb={3}>
            <Box sx={{ border:'1px solid #e2e8f0', borderRadius:2, px:1.5, py:0.8, display:'flex', alignItems:'center' }}>
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key==='Enter' && handleEnqueue()}
                placeholder="Enter number" type="number"
                style={{ border:'none', outline:'none', fontSize:14, width:110, background:'transparent' }} />
            </Box>
            <Button onClick={handleEnqueue} variant="contained" startIcon={<IoMdAdd size={14} />}
              sx={{ textTransform:'none', bgcolor:'#059669', borderRadius:2, '&:hover':{ bgcolor:'#047857' } }}>
              Enqueue
            </Button>
            <Button onClick={handleDequeue} variant="contained" disabled={queue.length===0} startIcon={<FaMinus size={12} />}
              sx={{ textTransform:'none', bgcolor:'#dc2626', borderRadius:2, '&:hover':{ bgcolor:'#b91c1c' }, '&.Mui-disabled':{ bgcolor:'#fca5a5', color:'#fff' } }}>
              Dequeue
            </Button>
            <Button onClick={handleReset} variant="outlined"
              sx={{ textTransform:'none', borderColor:'#e2e8f0', color:'#64748b', borderRadius:2 }}>
              <RiLoopLeftFill />
            </Button>
          </Box>

          {/* Stats */}
          <Box display="flex" gap={2} mb={2.5}>
            {[
              { label:'Queue Size', value:queue.length, color:'#2563eb' },
              { label:'Enqueued',   value:opCount.enq,  color:'#059669' },
              { label:'Dequeued',   value:opCount.deq,  color:'#dc2626' },
            ].map(s => (
              <Box key={s.label} sx={{ flex:1, bgcolor:'#f8fafc', borderRadius:2, p:1.5, textAlign:'center', border:'1px solid #e2e8f0' }}>
                <Typography variant="caption" color="text.secondary" display="block">{s.label}</Typography>
                <Typography variant="h6" fontWeight={700} sx={{ color:s.color }}>{s.value}</Typography>
              </Box>
            ))}
          </Box>

          {/* Queue visualization */}
          <Box sx={{ bgcolor:'#f8fafc', borderRadius:2, p:2.5, mb:2, minHeight:160 }}>
            {/* FRONT/REAR labels + pointers */}
            {queue.length > 0 && (
              <Box display="flex" justifyContent="space-between" mb={1} >
                <Typography sx={{ fontSize:11, color:'#059669', fontWeight:700 }}>← DEQUEUE (FRONT)</Typography>
                <Typography sx={{ fontSize:11, color:'#dc2626', fontWeight:700 }}>ENQUEUE (REAR) →</Typography>
              </Box>
            )}

            <Box sx={{ overflowX:'auto', pb:1 }}>
              <Box display="flex" alignItems="center" gap={1.5} sx={{ minWidth:'max-content', py:2 }}>
                {queue.length === 0 ? (
                  <Box sx={{ width:'100%', minWidth:300, border:'2px dashed #e2e8f0', borderRadius:2, py:3, textAlign:'center' }}>
                    <Typography variant="body2" color="text.secondary">Queue is empty — enqueue elements to visualize</Typography>
                  </Box>
                ) : (
                  <AnimatePresence initial={false}>
                    {queue.map((item, index) => {
                      const isFront = index === 0;
                      const isRear  = index === queue.length - 1;
                      return (
                        <motion.div key={`${item}-${index}`}
                          initial={{ x:60, opacity:0 }} animate={{ x:0, opacity:1 }} exit={{ x:-60, opacity:0 }}
                          transition={{ duration:0.35 }}>
                          <Box sx={{ position:'relative', textAlign:'center' }}>
                            {/* Front pointer */}
                            {isFront && (
                              <Box sx={{ position:'absolute', top:-36, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center' }}>
                                <Typography sx={{ fontSize:10, color:'#059669', fontWeight:700, whiteSpace:'nowrap' }}>FRONT</Typography>
                                <FaArrowDownLong color="#059669" size={12} />
                              </Box>
                            )}
                            <Paper elevation={isFront||isRear?3:1} sx={{
                              minWidth:64, py:1.5, px:2,
                              bgcolor: isFront?'#ecfdf5' : isRear?'#fef2f2' : '#eff6ff',
                              border:`2px solid ${isFront?'#059669':isRear?'#dc2626':'#bfdbfe'}`,
                              borderRadius:2, textAlign:'center',
                            }}>
                              <Typography fontWeight={700} fontSize={18}
                                color={isFront?'#059669':isRear?'#dc2626':'#2563eb'}>
                                {item}
                              </Typography>
                            </Paper>
                            {/* Rear pointer */}
                            {isRear && queue.length > 1 && (
                              <Box sx={{ position:'absolute', bottom:-36, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center' }}>
                                <FaArrowDownLong color="#dc2626" size={12} style={{ transform:'rotate(180deg)' }} />
                                <Typography sx={{ fontSize:10, color:'#dc2626', fontWeight:700, whiteSpace:'nowrap' }}>REAR</Typography>
                              </Box>
                            )}
                          </Box>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
              </Box>
            </Box>
          </Box>

          {/* Step log */}
          <Box sx={{ bgcolor:'#f0f9ff', border:'1px solid #bae6fd', borderRadius:2, p:2, maxHeight:120, overflowY:'auto' }}>
            {steps.length === 0
              ? <Typography variant="body2" color="text.secondary">Enqueue or dequeue to see operations here.</Typography>
              : steps.map((s, i) => (
                  <Typography key={i} variant="body2" sx={{ mb:0.4 }}>
                    <span style={{ color:'#059669', fontWeight:700 }}>Op {i+1}:</span> {s}
                  </Typography>
                ))
            }
          </Box>
        </Box>

        {/* Right */}
        <Box sx={{ display:'flex', flexDirection:'column', gap:2 }}>
          <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:2.5, border:'1px solid #e2e8f0', flex:1 }}>
            <Box display="flex" alignItems="center" gap={1.5} mb={2}>
              <Box sx={{ bgcolor:'#f5f3ff', borderRadius:2, p:1, display:'flex' }}><FaRobot size={18} color="#7c3aed" /></Box>
              <Box>
                <Typography variant="body2" fontWeight={700} color="text.primary">AI Explanation</Typography>
                <Typography variant="caption" color="text.secondary">FIFO explained simply</Typography>
              </Box>
            </Box>
            <Box sx={{ bgcolor:'#faf5ff', border:'1px solid #ede9fe', borderRadius:2, p:2, minHeight:120 }}>
              <Typography variant="body2" color={aiText?'#4c1d95':'text.secondary'} sx={{ lineHeight:1.7, fontStyle:aiText?'normal':'italic' }}>
                {aiText || 'Enqueue or dequeue elements and I\'ll explain what\'s happening with FIFO...'}
              </Typography>
            </Box>
            <Box sx={{ mt:2, p:1.5, bgcolor:'#fffbeb', border:'1px solid #fde68a', borderRadius:2 }}>
              <Typography variant="caption" color="#92400e" fontWeight={600}>
                💡 Enqueue 1,2,3 then dequeue — notice 1 leaves first!
              </Typography>
            </Box>
          </Box>

          <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:2.5, border:'1px solid #e2e8f0' }}>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={1.5}>Complexity Analysis</Typography>
            {[['Enqueue','O(1)','#059669'],['Dequeue','O(1)','#059669'],['Front/Rear','O(1)','#059669'],['Search','O(n)','#d97706']].map(([op,t,c]) => (
              <Box key={op} display="flex" justifyContent="space-between" alignItems="center" py={0.8} sx={{ borderBottom:'1px solid #f1f5f9' }}>
                <Typography variant="body2" fontWeight={600} color="text.primary">{op}</Typography>
                <Box sx={{ bgcolor:`${c}18`, border:`1px solid ${c}44`, borderRadius:1, px:1, py:0.2 }}>
                  <Typography sx={{ fontSize:11, fontWeight:700, color:c }}>{t}</Typography>
                </Box>
              </Box>
            ))}
            <Box sx={{ mt:1.5, bgcolor:'#f0fdf4', borderRadius:1.5, p:1.2 }}>
              <Typography variant="caption" color="#166534" fontWeight={600}>Space: O(n)</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── PRACTICE ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <SectionHeader icon={<FaCode />} title="Practice Problems" color="#059669" bg="#ecfdf5" />
          <Box sx={{ bgcolor:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:99, px:2, py:0.5 }}>
            <Typography sx={{ fontSize:12, fontWeight:700, color:'#2563eb' }}>3 Free · 3 Pro 🔒</Typography>
          </Box>
        </Box>
        <Box sx={{ display:'flex', flexDirection:'column', gap:1.5 }}>
          {problems.map(p => <ProblemCard key={p.id} p={p} />)}
        </Box>
        <Box sx={{ mt:3, p:2, background:'linear-gradient(135deg, #eff6ff, #f5f3ff)', borderRadius:2, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <Box>
            <Typography variant="body2" fontWeight={700} color="text.primary">Unlock all problems + 200+ DSA questions</Typography>
            <Typography variant="caption" color="text.secondary">Company-wise · AI hints · Progress tracking</Typography>
          </Box>
          <Button variant="contained" sx={{ textTransform:'none', bgcolor:'#2563eb', borderRadius:2, fontWeight:700, px:2.5 }}>
            Upgrade — ₹49/mo
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DSAQueue;