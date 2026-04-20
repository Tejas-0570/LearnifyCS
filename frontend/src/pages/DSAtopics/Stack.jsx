import { Box, Button, Typography, Tabs, Tab } from '@mui/material';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FaPlay, FaYoutube, FaLightbulb, FaCode, FaRobot } from 'react-icons/fa';
import { RiLoopLeftFill } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';
import { FaMinus } from 'react-icons/fa';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Shared components (same as Array) ───────────────────────────────────────
const SectionHeader = ({ icon, title, color = '#2563eb', bg = '#eff6ff' }) => (
  <Box display="flex" alignItems="center" gap={2} mb={3}>
    <Box sx={{ bgcolor: bg, borderRadius: 2, p: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {React.cloneElement(icon, { size: 20, color })}
    </Box>
    <Typography variant="h6" fontWeight={700} color="text.primary">{title}</Typography>
  </Box>
);

const problems = [
  { id: 1, title: 'Valid Parentheses',            difficulty: 'Easy',   tag: 'Stack',    locked: false },
  { id: 2, title: 'Min Stack',                    difficulty: 'Easy',   tag: 'Design',   locked: false },
  { id: 3, title: 'Implement Queue using Stacks', difficulty: 'Easy',   tag: 'Stack',    locked: false },
  { id: 4, title: 'Next Greater Element',         difficulty: 'Medium', tag: 'Monotonic',locked: true  },
  { id: 5, title: 'Largest Rectangle in Histogram',difficulty:'Hard',   tag: 'Stack',    locked: true  },
  { id: 6, title: 'Trapping Rain Water',          difficulty: 'Hard',   tag: 'Stack',    locked: true  },
];
const diffColor = { Easy: '#059669', Medium: '#d97706', Hard: '#dc2626' };
const diffBg    = { Easy: '#ecfdf5', Medium: '#fffbeb', Hard: '#fef2f2' };

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

// ─── Stack Component ──────────────────────────────────────────────────────────
const DSAStack = () => {
  const [stack, setStack]     = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [steps, setSteps]     = useState([]);
  const [aiText, setAiText]   = useState('');
  const [peeked, setPeeked]   = useState(false);

  const addStep = (msg) => setSteps(p => [...p, msg]);

  const handlePush = () => {
    if (inputVal.trim() === '') return;
    setStack(prev => [...prev, inputVal]);
    addStep(`PUSH(${inputVal}) → Added ${inputVal} to the top. Stack size: ${stack.length + 1}`);
    setAiText(`We pushed "${inputVal}" onto the stack. It goes to the TOP because Stack follows LIFO — Last In, First Out. The next POP will remove "${inputVal}" first.`);
    setInputVal('');
    setPeeked(false);
  };

  const handlePop = () => {
    if (stack.length === 0) { addStep('❌ Stack Underflow! Cannot pop from empty stack.'); return; }
    const top = stack[stack.length - 1];
    setStack(prev => prev.slice(0, -1));
    addStep(`POP() → Removed "${top}" from the top. Stack size: ${stack.length - 1}`);
    setAiText(`We popped "${top}" from the stack. This is LIFO in action — the last element pushed is the first to be removed. Think of a stack of plates.`);
    setPeeked(false);
  };

  const handlePeek = () => {
    if (stack.length === 0) { addStep('❌ Stack is empty — nothing to peek.'); return; }
    const top = stack[stack.length - 1];
    addStep(`PEEK() → Top element is "${top}" (not removed)`);
    setAiText(`Peek returns "${top}" without removing it. This is useful when you need to check the top element before deciding whether to pop.`);
    setPeeked(true);
  };

  const handleReset = () => { setStack([]); setSteps([]); setAiText(''); setPeeked(false); setInputVal(''); };

  const isEmpty = stack.length === 0;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>

      {/* ── VIDEO ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <SectionHeader icon={<FaYoutube />} title="Watch First — Understanding Stacks" color="#dc2626" bg="#fef2f2" />
        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 1fr' }, gap:2 }}>
          {[
            { title:'Stack Data Structure (Abdul Bari)', id:'F1F2imiOJfk', desc:'Stack operations, implementation and applications explained' },
            { title:'Stack Problems — Interview Guide', id:'O1KeUD0CQWA', desc:'Top stack interview questions with visual solutions' },
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
            <Typography variant="body2" fontWeight={700} color="#2563eb" mb={1}>What is a Stack?</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight:1.8 }}>
              A Stack is a linear data structure that follows the <strong>LIFO (Last In, First Out)</strong> principle.
              The element inserted last is the first one to be removed. Think of a stack of plates —
              you always add and remove from the top.
            </Typography>
          </Box>
          <Box sx={{ bgcolor:'#f8fafc', borderRadius:2, p:2 }}>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={1.5}>Real-world Examples</Typography>
            {['🍽️ Stack of plates — add/remove from top', '↩️ Browser back button — history stack', '↪️ Undo/Redo in text editors', '📞 Function call stack in programs', '🔄 Expression evaluation (brackets)'].map(e => (
              <Typography key={e} variant="body2" color="text.secondary" sx={{ mb:0.6 }}>{e}</Typography>
            ))}
          </Box>
        </Box>

        {/* Stack diagram */}
        <Box sx={{ bgcolor:'#f8fafc', borderRadius:2, p:2.5, mb:3, display:'flex', alignItems:'center', gap:4 }}>
          <Box>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={1.5}>Stack Structure</Typography>
            {[
              { label:'TOP → C', color:'#dbeafe', border:'#2563eb', isTop:true },
              { label:'       B', color:'#eff6ff', border:'#93c5fd', isTop:false },
              { label:'       A', color:'#eff6ff', border:'#93c5fd', isTop:false },
            ].map((l, i) => (
              <Box key={i} sx={{ border:`2px solid ${l.border}`, bgcolor:l.color, py:1, px:2, mb:0.5, borderRadius:1, minWidth:160, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <Typography variant="body2" fontWeight={l.isTop?700:400} color="#1e293b">{l.label}</Typography>
                {l.isTop && <Box sx={{ bgcolor:'#2563eb', borderRadius:1, px:1, py:0.2 }}><Typography sx={{ fontSize:10, color:'#fff', fontWeight:700 }}>TOP</Typography></Box>}
              </Box>
            ))}
            <Box sx={{ border:'2px solid #e2e8f0', py:0.5, px:2, borderRadius:1, minWidth:160, textAlign:'center' }}>
              <Typography variant="caption" color="text.secondary">BOTTOM</Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={2}>Operations</Typography>
            {[
              { op:'PUSH(x)', desc:'Add x to the top', color:'#059669', complexity:'O(1)' },
              { op:'POP()',   desc:'Remove from top',  color:'#dc2626', complexity:'O(1)' },
              { op:'PEEK()',  desc:'Read top element', color:'#d97706', complexity:'O(1)' },
              { op:'isEmpty',desc:'Check if empty',   color:'#7c3aed', complexity:'O(1)' },
            ].map(o => (
              <Box key={o.op} display="flex" alignItems="center" gap={2} mb={1}>
                <Box sx={{ bgcolor:`${o.color}18`, borderRadius:1, px:1, py:0.3, minWidth:80 }}>
                  <Typography sx={{ fontSize:11, fontWeight:700, color:o.color, fontFamily:'monospace' }}>{o.op}</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">{o.desc}</Typography>
                <Box sx={{ bgcolor:'#ecfdf5', borderRadius:1, px:0.8, py:0.2, ml:'auto' }}>
                  <Typography sx={{ fontSize:10, fontWeight:700, color:'#059669' }}>{o.complexity}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ borderRadius:2, overflow:'hidden' }}>
          <SyntaxHighlighter language="cpp" style={atomOneDark} customStyle={{ margin:0, fontSize:13, borderRadius:8 }}>
{`// Stack using array
int stack[100];
int top = -1;

void push(int x) { stack[++top] = x; }      // O(1)
int  pop()       { return stack[top--]; }     // O(1)
int  peek()      { return stack[top]; }       // O(1)
bool isEmpty()   { return top == -1; }        // O(1)

// Stack using STL
#include <stack>
stack<int> st;
st.push(10);    // push
st.pop();       // remove top
st.top();       // peek
st.empty();     // isEmpty`}
          </SyntaxHighlighter>
        </Box>
      </Box>

      {/* ── VISUALIZER + AI ── */}
      <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 340px' }, gap:3, mb:3 }}>

        <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, border:'1px solid #e2e8f0' }}>
          <SectionHeader icon={<FaPlay />} title="Interactive Stack Simulation" color="#2563eb" bg="#eff6ff" />

          {/* Controls */}
          <Box display="flex" gap={1.5} flexWrap="wrap" mb={3}>
            <Box sx={{ border:'1px solid #e2e8f0', borderRadius:2, px:1.5, py:0.8, display:'flex', alignItems:'center' }}>
              <input value={inputVal} onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handlePush()}
                placeholder="Enter value"
                style={{ border:'none', outline:'none', fontSize:14, width:100, background:'transparent' }} />
            </Box>
            <Button onClick={handlePush} variant="contained" startIcon={<IoMdAdd size={14} />}
              sx={{ textTransform:'none', bgcolor:'#2563eb', borderRadius:2, '&:hover':{ bgcolor:'#1d4ed8' } }}>
              Push
            </Button>
            <Button onClick={handlePop} variant="contained" disabled={isEmpty} startIcon={<FaMinus size={12} />}
              sx={{ textTransform:'none', bgcolor:'#dc2626', borderRadius:2, '&:hover':{ bgcolor:'#b91c1c' }, '&.Mui-disabled':{ bgcolor:'#fca5a5', color:'#fff' } }}>
              Pop
            </Button>
            <Button onClick={handlePeek} variant="outlined" disabled={isEmpty}
              sx={{ textTransform:'none', borderColor:'#d97706', color:'#d97706', borderRadius:2 }}>
              Peek
            </Button>
            <Button onClick={handleReset} variant="outlined"
              sx={{ textTransform:'none', borderColor:'#e2e8f0', color:'#64748b', borderRadius:2 }}>
              <RiLoopLeftFill />
            </Button>
          </Box>

          {/* Stack visualization */}
          <Box sx={{ display:'flex', gap:3 }}>
            {/* Visual stack */}
            <Box sx={{ flex:1, bgcolor:'#f8fafc', borderRadius:2, p:2.5, minHeight:320, display:'flex', flexDirection:'column' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>STACK VISUALIZATION</Typography>
                <Box sx={{ bgcolor:'#eff6ff', borderRadius:1, px:1, py:0.3 }}>
                  <Typography sx={{ fontSize:11, color:'#2563eb', fontWeight:700 }}>Size: {stack.length}</Typography>
                </Box>
              </Box>

              {/* Push arrow */}
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Box sx={{ flex:1, height:'1px', bgcolor:'#059669', opacity:0.4 }} />
                <Typography sx={{ fontSize:11, color:'#059669', fontWeight:700 }}>↓ PUSH</Typography>
              </Box>

              {/* Stack items */}
              <Box sx={{ flex:1, display:'flex', flexDirection:'column-reverse', gap:0.8, overflowY:'auto' }}>
                <AnimatePresence>
                  {isEmpty ? (
                    <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', height:80, border:'2px dashed #e2e8f0', borderRadius:2 }}>
                      <Typography variant="body2" color="text.secondary">Stack is empty</Typography>
                    </Box>
                  ) : (
                    stack.map((item, index) => {
                      const isTop = index === stack.length - 1;
                      return (
                        <motion.div key={`${item}-${index}`}
                          initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:30 }}
                          transition={{ duration:0.3 }}>
                          <Box sx={{
                            border:`2px solid ${isTop ? '#2563eb' : '#bfdbfe'}`,
                            bgcolor: isTop ? (peeked ? '#fffbeb' : '#eff6ff') : '#ffffff',
                            borderRadius:2, py:1.2, px:2,
                            display:'flex', alignItems:'center', justifyContent:'space-between',
                            boxShadow: isTop ? '0 2px 8px rgba(37,99,235,0.15)' : 'none',
                          }}>
                            <Typography fontWeight={isTop ? 700 : 500} color={isTop ? '#1d4ed8' : '#475569'} fontSize={16}>
                              {item}
                            </Typography>
                            {isTop && (
                              <Box sx={{ bgcolor: peeked ? '#fef3c7' : '#dbeafe', borderRadius:1, px:1, py:0.2 }}>
                                <Typography sx={{ fontSize:10, fontWeight:700, color: peeked ? '#92400e' : '#1d4ed8' }}>
                                  {peeked ? 'PEEK' : 'TOP'}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </motion.div>
                      );
                    })
                  )}
                </AnimatePresence>
              </Box>

              {/* Pop arrow */}
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <Box sx={{ flex:1, height:'1px', bgcolor:'#dc2626', opacity:0.4 }} />
                <Typography sx={{ fontSize:11, color:'#dc2626', fontWeight:700 }}>↑ POP</Typography>
              </Box>

              {/* Bottom label */}
              <Box sx={{ mt:1, border:'2px solid #e2e8f0', borderRadius:1, py:0.5, textAlign:'center' }}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>BOTTOM</Typography>
              </Box>
            </Box>

            {/* Call stack panel */}
            <Box sx={{ width:140 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={1}>CALL ORDER</Typography>
              {stack.length === 0 ? (
                <Typography variant="caption" color="text.secondary">Push items to see order</Typography>
              ) : [...stack].reverse().map((item, i) => (
                <Box key={i} sx={{ display:'flex', alignItems:'center', gap:1, mb:0.8 }}>
                  <Box sx={{ width:20, height:20, borderRadius:'50%', bgcolor: i===0?'#2563eb':'#e2e8f0', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Typography sx={{ fontSize:9, fontWeight:700, color: i===0?'#fff':'#64748b' }}>{i===0?'T':stack.length-i}</Typography>
                  </Box>
                  <Typography variant="caption" fontWeight={i===0?700:400} color={i===0?'#2563eb':'text.secondary'}>{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Step log */}
          <Box sx={{ bgcolor:'#f0f9ff', border:'1px solid #bae6fd', borderRadius:2, p:2, maxHeight:120, overflowY:'auto', mt:2 }}>
            {steps.length === 0
              ? <Typography variant="body2" color="text.secondary">Push, pop or peek to see operations logged here.</Typography>
              : steps.map((s, i) => (
                  <Typography key={i} variant="body2" sx={{ mb:0.4 }}>
                    <span style={{ color:'#2563eb', fontWeight:700 }}>Op {i+1}:</span> {s}
                  </Typography>
                ))
            }
          </Box>
        </Box>

        {/* Right panel */}
        <Box sx={{ display:'flex', flexDirection:'column', gap:2 }}>
          <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:2.5, border:'1px solid #e2e8f0', flex:1 }}>
            <Box display="flex" alignItems="center" gap={1.5} mb={2}>
              <Box sx={{ bgcolor:'#f5f3ff', borderRadius:2, p:1, display:'flex' }}><FaRobot size={18} color="#7c3aed" /></Box>
              <Box>
                <Typography variant="body2" fontWeight={700} color="text.primary">AI Explanation</Typography>
                <Typography variant="caption" color="text.secondary">What just happened and why</Typography>
              </Box>
            </Box>
            <Box sx={{ bgcolor:'#faf5ff', border:'1px solid #ede9fe', borderRadius:2, p:2, minHeight:120 }}>
              <Typography variant="body2" color={aiText?'#4c1d95':'text.secondary'} sx={{ lineHeight:1.7, fontStyle:aiText?'normal':'italic' }}>
                {aiText || 'Perform any stack operation and I\'ll explain the LIFO principle in action...'}
              </Typography>
            </Box>
            <Box sx={{ mt:2, p:1.5, bgcolor:'#fffbeb', border:'1px solid #fde68a', borderRadius:2 }}>
              <Typography variant="caption" color="#92400e" fontWeight={600}>
                💡 Pro tip: Push 3 items then pop — notice it removes in reverse order!
              </Typography>
            </Box>
          </Box>

          <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:2.5, border:'1px solid #e2e8f0' }}>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={1.5}>Complexity Analysis</Typography>
            {[['Push',  'O(1)','#059669'],['Pop', 'O(1)','#059669'],['Peek','O(1)','#059669'],['Search','O(n)','#d97706']].map(([op,t,c]) => (
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

      {/* ── PRACTICE PROBLEMS ── */}
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
            <Typography variant="body2" fontWeight={700} color="text.primary">Unlock all 6 problems + 200+ DSA questions</Typography>
            <Typography variant="caption" color="text.secondary">Company-wise sets · AI hints · Progress tracking</Typography>
          </Box>
          <Button variant="contained" sx={{ textTransform:'none', bgcolor:'#2563eb', borderRadius:2, fontWeight:700, px:2.5, '&:hover':{ bgcolor:'#1d4ed8' } }}>
            Upgrade — ₹49/mo
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DSAStack;