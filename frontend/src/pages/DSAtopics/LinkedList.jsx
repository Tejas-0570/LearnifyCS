import { Box, Button, Typography } from '@mui/material';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FaPlay, FaYoutube, FaLightbulb, FaCode, FaRobot, FaSearch } from 'react-icons/fa';
import { RiLoopLeftFill } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { FaArrowRightLong } from 'react-icons/fa6';
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
  { id:1, title:'Reverse a Linked List',          difficulty:'Easy',   tag:'Linked List', locked:false },
  { id:2, title:'Detect Cycle in Linked List',    difficulty:'Easy',   tag:'Two Pointer', locked:false },
  { id:3, title:'Middle of Linked List',          difficulty:'Easy',   tag:'Two Pointer', locked:false },
  { id:4, title:'Merge Two Sorted Lists',         difficulty:'Medium', tag:'Linked List', locked:true  },
  { id:5, title:'LRU Cache',                      difficulty:'Medium', tag:'Design',      locked:true  },
  { id:6, title:'Merge K Sorted Lists',           difficulty:'Hard',   tag:'Heap',        locked:true  },
];
const diffColor = { Easy:'#059669', Medium:'#d97706', Hard:'#dc2626' };
const diffBg    = { Easy:'#ecfdf5', Medium:'#fffbeb', Hard:'#fef2f2' };

const ProblemCard = ({ p }) => (
  <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', p:2, border:'1px solid #e2e8f0', borderRadius:2, bgcolor:'#ffffff', opacity:p.locked?0.6:1, transition:'all 0.18s', '&:hover':{ borderColor:'#7c3aed', boxShadow:'0 2px 12px rgba(124,58,237,0.08)' } }}>
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
        : <Button size="small" variant="outlined" sx={{ textTransform:'none', fontSize:12, borderColor:'#7c3aed', color:'#7c3aed', borderRadius:1.5, py:0.3, px:1.5, minWidth:0 }}>Solve</Button>
      }
    </Box>
  </Box>
);

// ─── Node component ───────────────────────────────────────────────────────────
const Node = ({ value, isHead, isTail, isHighlighted, isFound }) => (
  <Box display="flex" alignItems="center" gap={1}>
    <Box sx={{ position:'relative' }}>
      {isHead && (
        <Box sx={{ position:'absolute', top:-24, left:'50%', transform:'translateX(-50%)', whiteSpace:'nowrap' }}>
          <Typography sx={{ fontSize:10, fontWeight:700, color:'#7c3aed' }}>HEAD</Typography>
        </Box>
      )}
      {isTail && (
        <Box sx={{ position:'absolute', bottom:-24, left:'50%', transform:'translateX(-50%)', whiteSpace:'nowrap' }}>
          <Typography sx={{ fontSize:10, fontWeight:700, color:'#059669' }}>TAIL</Typography>
        </Box>
      )}
      <Box sx={{
        display:'flex', borderRadius:2, overflow:'hidden',
        border:`2px solid ${isFound?'#059669':isHighlighted?'#7c3aed':'#bfdbfe'}`,
        boxShadow: isFound||isHighlighted?`0 4px 12px ${isFound?'rgba(5,150,105,0.25)':'rgba(124,58,237,0.25)'}`:'none',
        transition:'all 0.3s ease',
      }}>
        {/* Data part */}
        <Box sx={{ bgcolor:isFound?'#ecfdf5':isHighlighted?'#f5f3ff':'#eff6ff', px:2, py:1.5, minWidth:50, textAlign:'center', borderRight:`1px solid ${isFound?'#059669':isHighlighted?'#7c3aed':'#bfdbfe'}` }}>
          <Typography fontWeight={700} fontSize={16} color={isFound?'#059669':isHighlighted?'#7c3aed':'#2563eb'}>{value}</Typography>
          <Typography sx={{ fontSize:9, color:'#94a3b8' }}>data</Typography>
        </Box>
        {/* Next pointer */}
        <Box sx={{ bgcolor:'#f8fafc', px:1.5, py:1.5, textAlign:'center', minWidth:36 }}>
          <Typography sx={{ fontSize:11, color:'#94a3b8', fontFamily:'monospace' }}>→</Typography>
          <Typography sx={{ fontSize:9, color:'#94a3b8' }}>next</Typography>
        </Box>
      </Box>
    </Box>
    {!isTail && <FaArrowRightLong color="#7c3aed" size={14} />}
  </Box>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const DSALinkedList = () => {
  const [nodes, setNodes]           = useState(['10', '20', '30']);
  const [inputVal, setInputVal]     = useState('');
  const [searchVal, setSearchVal]   = useState('');
  const [foundNode, setFoundNode]   = useState(null);
  const [highlightNode, setHighlightNode] = useState(null);
  const [steps, setSteps]           = useState([]);
  const [aiText, setAiText]         = useState('');

  const addStep = (msg) => setSteps(p => [...p, msg]);

  const handleInsertHead = () => {
    if (!inputVal.trim()) return;
    setNodes(p => [inputVal, ...p]);
    addStep(`INSERT HEAD(${inputVal}) → New node becomes HEAD. Previous head is now 2nd. O(1) operation.`);
    setAiText(`Inserting at HEAD is O(1) — we just create a new node and point it to the old head. No traversal needed! This is the key advantage of linked lists over arrays for front insertions.`);
    setInputVal('');
    setFoundNode(null);
  };

  const handleInsertTail = () => {
    if (!inputVal.trim()) return;
    setNodes(p => [...p, inputVal]);
    addStep(`INSERT TAIL(${inputVal}) → Traversed ${nodes.length} nodes to reach tail. O(n) operation.`);
    setAiText(`Inserting at TAIL requires traversing the entire list to find the last node — that's O(n). With a tail pointer (which many implementations have), this becomes O(1).`);
    setInputVal('');
    setFoundNode(null);
  };

  const handleDelete = () => {
    if (!inputVal.trim()) return;
    const idx = nodes.indexOf(inputVal);
    if (idx === -1) { addStep(`❌ "${inputVal}" not found in the list.`); return; }
    const isHead = idx === 0;
    setNodes(p => p.filter((_, i) => i !== idx));
    addStep(`DELETE(${inputVal}) → ${isHead ? 'HEAD changed. O(1).' : `Traversed ${idx} nodes to find it. O(n).`}`);
    setAiText(`${isHead ? `Deleting HEAD is O(1) — just move the head pointer to the next node.` : `Deleting "${inputVal}" required traversing ${idx} nodes to find the previous node and update its pointer. This is why linked list deletion is O(n) unless we have a reference to the previous node.`}`);
    setInputVal('');
    setFoundNode(null);
  };

  const handleSearch = () => {
    if (!searchVal.trim()) return;
    const idx = nodes.indexOf(searchVal);
    setFoundNode(null);
    if (idx === -1) {
      addStep(`🔍 Searched for "${searchVal}" — not found after checking all ${nodes.length} nodes.`);
      setAiText(`"${searchVal}" was not found. We had to check all ${nodes.length} nodes one by one — O(n). Unlike arrays, we cannot jump directly to a position in a linked list.`);
    } else {
      setFoundNode(searchVal);
      addStep(`✅ Found "${searchVal}" at position ${idx + 1} after checking ${idx + 1} node(s).`);
      setAiText(`Found "${searchVal}" at position ${idx + 1}. We had to traverse ${idx + 1} node(s) to get there. This is O(n) search — linked lists don't support random access like arrays.`);
    }
    setSearchVal('');
  };

  const handleReset = () => { setNodes(['10','20','30']); setSteps([]); setAiText(''); setFoundNode(null); setHighlightNode(null); setInputVal(''); setSearchVal(''); };

  return (
    <Box sx={{ maxWidth:1200, mx:'auto' }}>

      {/* ── VIDEO ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <SectionHeader icon={<FaYoutube />} title="Watch First — Understanding Linked Lists" color="#dc2626" bg="#fef2f2" />
        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 1fr' }, gap:2 }}>
          {[
            { title:'Linked List Explained (Abdul Bari)', id:'dmb1i-0DkL0', desc:'Singly, doubly linked lists with memory visualization' },
            { title:'Linked List Interview Questions',    id:'Hj_rA0dhr2I', desc:'Top 10 linked list problems asked in FAANG interviews' },
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
            <Typography variant="body2" fontWeight={700} color="#7c3aed" mb={1}>What is a Linked List?</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight:1.8 }}>
              A Linked List is a linear data structure where elements (nodes) are stored at <strong>non-contiguous memory locations</strong>.
              Each node has a data field and a pointer to the next node. Unlike arrays, linked lists can grow and shrink dynamically.
            </Typography>
          </Box>
          <Box sx={{ bgcolor:'#f8fafc', borderRadius:2, p:2 }}>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={1.5}>Array vs Linked List</Typography>
            <Box sx={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1 }}>
              {[
                { label:'Access', arr:'O(1) ✅', ll:'O(n) ❌' },
                { label:'Insert Head', arr:'O(n) ❌', ll:'O(1) ✅' },
                { label:'Insert Tail', arr:'O(1) ✅', ll:'O(n) ❌' },
                { label:'Memory', arr:'Contiguous', ll:'Scattered' },
              ].map(row => (
                <React.Fragment key={row.label}>
                  <Box sx={{ bgcolor:'#eff6ff', borderRadius:1, p:0.8 }}>
                    <Typography sx={{ fontSize:11, fontWeight:700, color:'#1d4ed8' }}>{row.label}</Typography>
                    <Typography sx={{ fontSize:10, color:'#2563eb' }}>Arr: {row.arr}</Typography>
                    <Typography sx={{ fontSize:10, color:'#7c3aed' }}>LL: {row.ll}</Typography>
                  </Box>
                </React.Fragment>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Node structure */}
        <Box sx={{ bgcolor:'#f8fafc', borderRadius:2, p:2.5, mb:3 }}>
          <Typography variant="body2" fontWeight={700} color="text.primary" mb={2}>Node Structure</Typography>
          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
            <Box sx={{ border:'2px solid #7c3aed', borderRadius:2, overflow:'hidden', display:'flex' }}>
              <Box sx={{ bgcolor:'#f5f3ff', px:2.5, py:1.5, borderRight:'1px solid #ddd6fe' }}>
                <Typography fontWeight={700} color="#7c3aed" fontSize={18}>42</Typography>
                <Typography sx={{ fontSize:10, color:'#94a3b8' }}>data</Typography>
              </Box>
              <Box sx={{ bgcolor:'#faf5ff', px:2, py:1.5 }}>
                <Typography sx={{ fontSize:13, color:'#94a3b8', fontFamily:'monospace' }}>0x2A4F</Typography>
                <Typography sx={{ fontSize:10, color:'#94a3b8' }}>next pointer</Typography>
              </Box>
            </Box>
            <FaArrowRightLong color="#7c3aed" size={16} />
            <Box sx={{ border:'2px solid #7c3aed', borderRadius:2, overflow:'hidden', display:'flex' }}>
              <Box sx={{ bgcolor:'#f5f3ff', px:2.5, py:1.5, borderRight:'1px solid #ddd6fe' }}>
                <Typography fontWeight={700} color="#7c3aed" fontSize={18}>15</Typography>
                <Typography sx={{ fontSize:10, color:'#94a3b8' }}>data</Typography>
              </Box>
              <Box sx={{ bgcolor:'#faf5ff', px:2, py:1.5 }}>
                <Typography sx={{ fontSize:13, color:'#94a3b8', fontFamily:'monospace' }}>NULL</Typography>
                <Typography sx={{ fontSize:10, color:'#94a3b8' }}>next pointer</Typography>
              </Box>
            </Box>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt:1, display:'block' }}>
            Each node stores data + address of the next node. Last node's next pointer is NULL.
          </Typography>
        </Box>

        <Box sx={{ borderRadius:2, overflow:'hidden' }}>
          <SyntaxHighlighter language="cpp" style={atomOneDark} customStyle={{ margin:0, fontSize:13, borderRadius:8 }}>
{`struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(NULL) {}
};

class LinkedList {
    Node* head;
public:
    void insertHead(int val) {      // O(1)
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }
    void insertTail(int val) {      // O(n)
        Node* newNode = new Node(val);
        if (!head) { head = newNode; return; }
        Node* curr = head;
        while (curr->next) curr = curr->next;
        curr->next = newNode;
    }
};`}
          </SyntaxHighlighter>
        </Box>
      </Box>

      {/* ── VISUALIZER + AI ── */}
      <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 340px' }, gap:3, mb:3 }}>
        <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, border:'1px solid #e2e8f0' }}>
          <SectionHeader icon={<FaPlay />} title="Interactive Linked List Visualizer" color="#7c3aed" bg="#f5f3ff" />

          {/* Controls */}
          <Box display="flex" gap={1.5} flexWrap="wrap" mb={3}>
            <Box sx={{ border:'1px solid #e2e8f0', borderRadius:2, px:1.5, py:0.8, display:'flex', alignItems:'center' }}>
              <input value={inputVal} onChange={e => setInputVal(e.target.value)} placeholder="Node value"
                style={{ border:'none', outline:'none', fontSize:14, width:90, background:'transparent' }} />
            </Box>
            <Button onClick={handleInsertHead} variant="contained" size="small"
              sx={{ textTransform:'none', bgcolor:'#7c3aed', borderRadius:2, fontSize:12, '&:hover':{ bgcolor:'#6d28d9' } }}>
              <IoMdAdd size={14} /> Insert Head
            </Button>
            <Button onClick={handleInsertTail} variant="contained" size="small"
              sx={{ textTransform:'none', bgcolor:'#2563eb', borderRadius:2, fontSize:12, '&:hover':{ bgcolor:'#1d4ed8' } }}>
              <IoMdAdd size={14} /> Insert Tail
            </Button>
            <Button onClick={handleDelete} variant="contained" size="small"
              sx={{ textTransform:'none', bgcolor:'#dc2626', borderRadius:2, fontSize:12, '&:hover':{ bgcolor:'#b91c1c' } }}>
              <MdDelete size={14} /> Delete
            </Button>
          </Box>

          {/* Search row */}
          <Box display="flex" gap={1.5} mb={3}>
            <Box sx={{ border:'1px solid #e2e8f0', borderRadius:2, px:1.5, py:0.8, display:'flex', alignItems:'center', flex:1 }}>
              <input value={searchVal} onChange={e => setSearchVal(e.target.value)}
                onKeyDown={e => e.key==='Enter' && handleSearch()}
                placeholder="Search node value"
                style={{ border:'none', outline:'none', fontSize:14, width:'100%', background:'transparent' }} />
            </Box>
            <Button onClick={handleSearch} variant="outlined" size="small" startIcon={<FaSearch size={11} />}
              sx={{ textTransform:'none', borderColor:'#d97706', color:'#d97706', borderRadius:2, fontSize:12 }}>
              Search
            </Button>
            <Button onClick={handleReset} variant="outlined" size="small"
              sx={{ textTransform:'none', borderColor:'#e2e8f0', color:'#64748b', borderRadius:2 }}>
              <RiLoopLeftFill />
            </Button>
          </Box>

          {/* Linked list visualization */}
          <Box sx={{ bgcolor:'#f8fafc', borderRadius:2, p:3, mb:2, minHeight:120, overflowX:'auto' }}>
            <Box sx={{ pt:3, pb:3 }}>
              {nodes.length === 0 ? (
                <Box sx={{ textAlign:'center', py:3, border:'2px dashed #e2e8f0', borderRadius:2 }}>
                  <Typography variant="body2" color="text.secondary">Linked list is empty — insert nodes to visualize</Typography>
                </Box>
              ) : (
                <Box display="flex" alignItems="center" gap={0.5} sx={{ minWidth:'max-content' }}>
                  <Box sx={{ bgcolor:'#f1f5f9', borderRadius:1, px:1, py:0.5, mr:1 }}>
                    <Typography sx={{ fontSize:10, color:'#7c3aed', fontWeight:700 }}>HEAD</Typography>
                    <Typography sx={{ fontSize:10, color:'#94a3b8', fontFamily:'monospace' }}>→</Typography>
                  </Box>
                  <AnimatePresence>
                    {nodes.map((node, index) => (
                      <motion.div key={`${node}-${index}`}
                        initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.8 }}
                        transition={{ duration:0.3 }}>
                        <Node
                          value={node}
                          isHead={index === 0}
                          isTail={index === nodes.length - 1}
                          isFound={foundNode === node}
                          isHighlighted={highlightNode === node}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <Box sx={{ bgcolor:'#fef2f2', border:'1px solid #fecaca', borderRadius:1, px:1, py:0.5, ml:1 }}>
                    <Typography sx={{ fontSize:11, color:'#dc2626', fontWeight:700, fontFamily:'monospace' }}>NULL</Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Stats */}
            <Box display="flex" gap={2} mt={1}>
              <Box sx={{ bgcolor:'#ffffff', border:'1px solid #e2e8f0', borderRadius:1.5, px:1.5, py:0.8, flex:1, textAlign:'center' }}>
                <Typography variant="caption" color="text.secondary" display="block">Nodes</Typography>
                <Typography fontWeight={700} color="#7c3aed">{nodes.length}</Typography>
              </Box>
              <Box sx={{ bgcolor:'#ffffff', border:'1px solid #e2e8f0', borderRadius:1.5, px:1.5, py:0.8, flex:1, textAlign:'center' }}>
                <Typography variant="caption" color="text.secondary" display="block">Head</Typography>
                <Typography fontWeight={700} color="#7c3aed">{nodes[0] || '—'}</Typography>
              </Box>
              <Box sx={{ bgcolor:'#ffffff', border:'1px solid #e2e8f0', borderRadius:1.5, px:1.5, py:0.8, flex:1, textAlign:'center' }}>
                <Typography variant="caption" color="text.secondary" display="block">Tail</Typography>
                <Typography fontWeight={700} color="#059669">{nodes[nodes.length-1] || '—'}</Typography>
              </Box>
            </Box>
          </Box>

          {/* Step log */}
          <Box sx={{ bgcolor:'#f0f9ff', border:'1px solid #bae6fd', borderRadius:2, p:2, maxHeight:120, overflowY:'auto' }}>
            {steps.length === 0
              ? <Typography variant="body2" color="text.secondary">Insert, delete or search nodes to see operations logged here.</Typography>
              : steps.map((s, i) => (
                  <Typography key={i} variant="body2" sx={{ mb:0.4 }}>
                    <span style={{ color:'#7c3aed', fontWeight:700 }}>Op {i+1}:</span> {s}
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
                <Typography variant="caption" color="text.secondary">Why pointers matter</Typography>
              </Box>
            </Box>
            <Box sx={{ bgcolor:'#faf5ff', border:'1px solid #ede9fe', borderRadius:2, p:2, minHeight:120 }}>
              <Typography variant="body2" color={aiText?'#4c1d95':'text.secondary'} sx={{ lineHeight:1.7, fontStyle:aiText?'normal':'italic' }}>
                {aiText || 'Perform any operation and I\'ll explain the pointer logic behind it...'}
              </Typography>
            </Box>
            <Box sx={{ mt:2, p:1.5, bgcolor:'#fffbeb', border:'1px solid #fde68a', borderRadius:2 }}>
              <Typography variant="caption" color="#92400e" fontWeight={600}>
                💡 Try: Insert Head is O(1) but Insert Tail is O(n) — can you guess why?
              </Typography>
            </Box>
          </Box>

          <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:2.5, border:'1px solid #e2e8f0' }}>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={1.5}>Complexity Analysis</Typography>
            {[['Insert Head','O(1)','#059669'],['Insert Tail','O(n)','#d97706'],['Delete','O(n)','#d97706'],['Search','O(n)','#d97706'],['Access by index','O(n)','#dc2626']].map(([op,t,c]) => (
              <Box key={op} display="flex" justifyContent="space-between" alignItems="center" py={0.8} sx={{ borderBottom:'1px solid #f1f5f9' }}>
                <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ fontSize:12 }}>{op}</Typography>
                <Box sx={{ bgcolor:`${c}18`, border:`1px solid ${c}44`, borderRadius:1, px:1, py:0.2 }}>
                  <Typography sx={{ fontSize:11, fontWeight:700, color:c }}>{t}</Typography>
                </Box>
              </Box>
            ))}
            <Box sx={{ mt:1.5, bgcolor:'#f0fdf4', borderRadius:1.5, p:1.2 }}>
              <Typography variant="caption" color="#166534" fontWeight={600}>Space: O(n) — extra pointer per node</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── PRACTICE ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <SectionHeader icon={<FaCode />} title="Practice Problems" color="#059669" bg="#ecfdf5" />
          <Box sx={{ bgcolor:'#f5f3ff', border:'1px solid #ddd6fe', borderRadius:99, px:2, py:0.5 }}>
            <Typography sx={{ fontSize:12, fontWeight:700, color:'#7c3aed' }}>3 Free · 3 Pro 🔒</Typography>
          </Box>
        </Box>
        <Box sx={{ display:'flex', flexDirection:'column', gap:1.5 }}>
          {problems.map(p => <ProblemCard key={p.id} p={p} />)}
        </Box>
        <Box sx={{ mt:3, p:2, background:'linear-gradient(135deg, #f5f3ff, #eff6ff)', borderRadius:2, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <Box>
            <Typography variant="body2" fontWeight={700} color="text.primary">Unlock all problems + 200+ DSA questions</Typography>
            <Typography variant="caption" color="text.secondary">Company-wise · AI hints · Progress tracking</Typography>
          </Box>
          <Button variant="contained" sx={{ textTransform:'none', bgcolor:'#7c3aed', borderRadius:2, fontWeight:700, px:2.5, '&:hover':{ bgcolor:'#6d28d9' } }}>
            Upgrade — ₹49/mo
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DSALinkedList;