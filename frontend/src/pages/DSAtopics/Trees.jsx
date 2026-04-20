import { Box, Typography, Button, Tabs, Tab } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaPlay, FaYoutube, FaLightbulb, FaCode, FaRobot, FaSearch } from 'react-icons/fa';
import { RiLoopLeftFill } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';
import { FaMinus, FaRandom } from 'react-icons/fa';
import React, { useState, useRef, useEffect } from 'react';

const SectionHeader = ({ icon, title, color = '#2563eb', bg = '#eff6ff' }) => (
  <Box display="flex" alignItems="center" gap={2} mb={3}>
    <Box sx={{ bgcolor: bg, borderRadius: 2, p: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {React.cloneElement(icon, { size: 20, color })}
    </Box>
    <Typography variant="h6" fontWeight={700} color="text.primary">{title}</Typography>
  </Box>
);

// ─── BST Logic ────────────────────────────────────────────────────────────────
class TreeNode { constructor(v) { this.value = v; this.left = null; this.right = null; } }

const insertNode = (root, v) => {
  if (!root) return new TreeNode(v);
  if (v < root.value) root.left = insertNode(root.left, v);
  else if (v > root.value) root.right = insertNode(root.right, v);
  return root;
};

const deleteNode = (root, v) => {
  if (!root) return null;
  if (v < root.value) root.left = deleteNode(root.left, v);
  else if (v > root.value) root.right = deleteNode(root.right, v);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    let min = root.right; while (min.left) min = min.left;
    root.value = min.value; root.right = deleteNode(root.right, min.value);
  }
  return root;
};

const getHeight = (n) => !n ? 0 : 1 + Math.max(getHeight(n.left), getHeight(n.right));
const countNodes = (n) => !n ? 0 : 1 + countNodes(n.left) + countNodes(n.right);

// traversal generators (return array of values in order)
const inorder   = (n, r=[]) => { if(!n) return r; inorder(n.left,r); r.push(n.value); inorder(n.right,r); return r; };
const preorder  = (n, r=[]) => { if(!n) return r; r.push(n.value); preorder(n.left,r); preorder(n.right,r); return r; };
const postorder = (n, r=[]) => { if(!n) return r; postorder(n.left,r); postorder(n.right,r); r.push(n.value); return r; };
const levelorder = (n) => {
  if (!n) return [];
  const q = [n], r = [];
  while (q.length) { const cur = q.shift(); r.push(cur.value); if (cur.left) q.push(cur.left); if (cur.right) q.push(cur.right); }
  return r;
};

// search path
const searchPath = (root, v) => {
  const path = [];
  let cur = root;
  while (cur) {
    path.push(cur.value);
    if (v === cur.value) return { path, found: true };
    cur = v < cur.value ? cur.left : cur.right;
  }
  return { path, found: false };
};

// layout
const getLayout = (root, x=500, y=60, gap=200) => {
  if (!root) return { nodes:[], links:[] };
  const node = { id: root.value, value: root.value, x, y };
  let nodes = [node], links = [];
  if (root.left)  { const l = getLayout(root.left,  x-gap, y+90, gap/1.6); nodes=[...nodes,...l.nodes]; links=[{from:node,to:l.nodes[0]},...links,...l.links]; }
  if (root.right) { const r = getLayout(root.right, x+gap, y+90, gap/1.6); nodes=[...nodes,...r.nodes]; links=[{from:node,to:r.nodes[0]},...links,...r.links]; }
  return { nodes, links };
};

// Problems
const problems = [
  { id:1, title:'Maximum Depth of Binary Tree',  difficulty:'Easy',   tag:'DFS',     locked:false },
  { id:2, title:'Symmetric Tree',                difficulty:'Easy',   tag:'BFS',     locked:false },
  { id:3, title:'Validate BST',                  difficulty:'Medium', tag:'Inorder', locked:false },
  { id:4, title:'Lowest Common Ancestor',        difficulty:'Medium', tag:'BST',     locked:true  },
  { id:5, title:'Binary Tree Level Order',       difficulty:'Medium', tag:'BFS',     locked:true  },
  { id:6, title:'Serialize & Deserialize Tree',  difficulty:'Hard',   tag:'DFS',     locked:true  },
];
const diffColor = { Easy:'#059669', Medium:'#d97706', Hard:'#dc2626' };
const diffBg    = { Easy:'#ecfdf5', Medium:'#fffbeb', Hard:'#fef2f2' };

const ProblemCard = ({ p }) => (
  <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', p:2, border:'1px solid #e2e8f0', borderRadius:2, bgcolor:'#ffffff', opacity:p.locked?0.6:1, transition:'all 0.18s', '&:hover':{ borderColor:'#dc2626', boxShadow:'0 2px 12px rgba(220,38,38,0.08)' } }}>
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
      {p.locked ? <Box sx={{ bgcolor:'#f1f5f9', borderRadius:1, px:1.5, py:0.6 }}><Typography sx={{ fontSize:11, color:'#94a3b8', fontWeight:600 }}>🔒 Pro</Typography></Box>
        : <Button size="small" variant="outlined" sx={{ textTransform:'none', fontSize:12, borderColor:'#dc2626', color:'#dc2626', borderRadius:1.5, py:0.3, px:1.5, minWidth:0 }}>Solve</Button>}
    </Box>
  </Box>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const DSATrees = () => {
  const [root, setRoot]             = useState(null);
  const [input, setInput]           = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [activeTab, setActiveTab]   = useState(0); // 0=build, 1=traverse, 2=search
  const [traversalMode, setTraversalMode] = useState('Inorder');
  const [highlighted, setHighlighted] = useState(new Set()); // currently lit nodes
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [currentTraversalIdx, setCurrentTraversalIdx] = useState(-1);
  const [searchPath_, setSearchPath_] = useState([]);
  const [searchFound, setSearchFound] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [aiText, setAiText]         = useState('');
  const [steps, setSteps]           = useState([]);
  const timersRef = useRef([]);

  const clearTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };

  // Build tab
  const handleInsert = () => {
    if (!input.trim()) return;
    const v = parseInt(input);
    if (isNaN(v)) return;
    setRoot(prev => {
      const newRoot = prev ? JSON.parse(JSON.stringify(prev)) : null;
      return insertNode(newRoot, v);
    });
    setSteps(p => [...p, `Inserted ${v} into BST. ${v} goes ${root ? (v < root.value ? 'left' : 'right') : 'as root'}.`]);
    setAiText(`Inserting ${v}: We compare with each node starting at root. If ${v} is smaller, go left; if larger, go right. We repeat until we find an empty spot. This is O(log n) on average for a balanced BST.`);
    setInput('');
  };

  const handleDelete = () => {
    if (!input.trim()) return;
    const v = parseInt(input);
    if (isNaN(v)) return;
    setRoot(prev => { const c = prev ? JSON.parse(JSON.stringify(prev)) : null; return deleteNode(c, v); });
    setSteps(p => [...p, `Deleted ${v} from BST.`]);
    setAiText(`Deleting ${v}: We first search for it. If it's a leaf, just remove. If it has one child, replace with that child. If two children, replace with inorder successor (smallest node in right subtree).`);
    setInput('');
  };

  const handleRandom = () => {
    clearTimers(); setHighlighted(new Set()); setTraversalOrder([]); setCurrentTraversalIdx(-1); setSearchPath_([]); setSearchFound(null);
    const vals = Array.from({ length: 7 }, () => Math.floor(Math.random() * 80) + 10);
    let r = null; vals.forEach(v => { r = insertNode(r, v); });
    setRoot(r);
    setSteps([`Random BST created with values: ${vals.join(', ')}`]);
    setAiText('A random BST has been created. Notice how the structure depends on insertion order — the same set of numbers inserted in a different order would create a different tree shape.');
  };

  const handleReset = () => {
    clearTimers(); setRoot(null); setHighlighted(new Set()); setTraversalOrder([]);
    setCurrentTraversalIdx(-1); setSearchPath_([]); setSearchFound(null); setSteps([]); setAiText(''); setInput(''); setSearchInput('');
  };

  // Traversal animation
  const handleTraverse = () => {
    if (!root || isAnimating) return;
    clearTimers(); setHighlighted(new Set()); setCurrentTraversalIdx(-1);
    let order = [];
    if (traversalMode === 'Inorder')    order = inorder(root);
    if (traversalMode === 'Preorder')   order = preorder(root);
    if (traversalMode === 'Postorder')  order = postorder(root);
    if (traversalMode === 'Level Order') order = levelorder(root);
    setTraversalOrder(order);
    setSteps([`Starting ${traversalMode} traversal...`]);

    const modeDesc = {
      'Inorder':    'visits Left → Root → Right. For BST this gives sorted order!',
      'Preorder':   'visits Root → Left → Right. Used for tree copying.',
      'Postorder':  'visits Left → Right → Root. Used for tree deletion.',
      'Level Order':'visits level by level using a queue (BFS).',
    };
    setAiText(`${traversalMode} traversal ${modeDesc[traversalMode]} We visit ${order.length} nodes in order: ${order.join(' → ')}`);
    setIsAnimating(true);
    order.forEach((val, i) => {
      const t = setTimeout(() => {
        setHighlighted(new Set(order.slice(0, i + 1)));
        setCurrentTraversalIdx(i);
        setSteps(p => [...p, `Step ${i+1}: Visit node ${val}`]);
        if (i === order.length - 1) {
          setIsAnimating(false);
          setSteps(p => [...p, `✅ ${traversalMode} complete: ${order.join(' → ')}`]);
        }
      }, i * 700);
      timersRef.current.push(t);
    });
  };

  // Search animation
  const handleSearch = () => {
    if (!root || !searchInput.trim()) return;
    clearTimers(); setHighlighted(new Set()); setSearchPath_([]); setSearchFound(null);
    const v = parseInt(searchInput);
    if (isNaN(v)) return;
    const { path, found } = searchPath(root, v);
    setSteps([`Searching for ${v}...`]);
    setIsAnimating(true);
    path.forEach((node, i) => {
      const t = setTimeout(() => {
        setSearchPath_(path.slice(0, i + 1));
        if (i < path.length - 1) {
          setSteps(p => [...p, `Visit ${node}: ${v < node ? 'go left' : v > node ? 'go right' : 'found!'}`]);
        }
        if (i === path.length - 1) {
          setSearchFound(found ? v : null);
          setIsAnimating(false);
          setSteps(p => [...p, found ? `✅ Found ${v} after checking ${path.length} node(s)!` : `❌ ${v} not in BST. Checked ${path.length} node(s).`]);
          setAiText(found
            ? `Found ${v}! BST search took ${path.length} comparisons. A balanced BST search is O(log n) — much faster than linear search O(n).`
            : `${v} not found. We stopped when we couldn't go further. BST search eliminates half the remaining nodes at each step.`);
        }
      }, i * 800);
      timersRef.current.push(t);
    });
    setAiText(`Searching for ${v} in BST. At each node we compare: if equal → found; if smaller → go left; if larger → go right. This is binary search on a tree!`);
    setSearchInput('');
  };

  const { nodes, links } = getLayout(root);
  const minX = nodes.length > 0 ? Math.min(...nodes.map(n => n.x)) : 0;
  const maxX = nodes.length > 0 ? Math.max(...nodes.map(n => n.x)) : 0;
  const treeH = getHeight(root);
  const svgW  = nodes.length > 0 ? maxX - minX + 200 : 600;
  const svgH  = Math.max(200, treeH * 100);

  const getNodeColor = (val) => {
    if (activeTab === 2) {
      if (searchFound === val) return '#059669';
      if (searchPath_.includes(val)) return '#f59e0b';
      return '#2563eb';
    }
    if (activeTab === 1 && highlighted.has(val)) {
      const idx = traversalOrder.indexOf(val);
      if (idx === currentTraversalIdx) return '#dc2626'; // current
      return '#059669'; // visited
    }
    return '#2563eb';
  };

  const getNodeStroke = (val) => {
    if (activeTab === 2 && searchPath_.at(-1) === val && searchFound === null && !isAnimating) return '#ef4444';
    return 'white';
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>

      {/* ── VIDEO ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <SectionHeader icon={<FaYoutube />} title="Watch First — Binary Trees & BST" color="#dc2626" bg="#fef2f2" />
        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 1fr' }, gap:2 }}>
          {[
            { title:'Binary Search Tree (Abdul Bari)', id:'h_9vOTcpB0I', desc:'BST operations, traversals and height balance explained visually' },
            { title:'Tree Traversal Techniques',        id:'9RHO6jU--Xw', desc:'Inorder, Preorder, Postorder and Level Order with animations' },
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

      {/* ── VISUALIZER ── */}
      <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 320px' }, gap:3, mb:3 }}>
        <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, border:'1px solid #e2e8f0' }}>
          <SectionHeader icon={<FaPlay />} title="Interactive BST Visualizer" color="#dc2626" bg="#fef2f2" />

          {/* Mode tabs */}
          <Tabs value={activeTab} onChange={(_, v) => { setActiveTab(v); clearTimers(); setHighlighted(new Set()); setSearchPath_([]); setSearchFound(null); }}
            sx={{ mb:2, borderBottom:'1px solid #e2e8f0' }}
            TabIndicatorProps={{ style:{ backgroundColor:'#dc2626' } }}>
            {['Build Tree','Traverse','Search'].map((t, i) => (
              <Tab key={t} label={t} sx={{ textTransform:'none', fontSize:13, fontWeight:600, color:activeTab===i?'#dc2626':'#64748b' }} />
            ))}
          </Tabs>

          {/* Tab 0: Build */}
          {activeTab === 0 && (
            <Box display="flex" gap={1.5} flexWrap="wrap" mb={2}>
              <Box sx={{ border:'1px solid #e2e8f0', borderRadius:2, px:1.5, py:0.8, display:'flex', alignItems:'center', bgcolor:'#f8fafc' }}>
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter'&&handleInsert()}
                  placeholder="Enter value" style={{ border:'none', outline:'none', fontSize:14, width:100, background:'transparent' }} />
              </Box>
              <Button onClick={handleInsert} variant="contained" size="small" startIcon={<IoMdAdd size={14}/>}
                sx={{ textTransform:'none', bgcolor:'#2563eb', borderRadius:2, '&:hover':{ bgcolor:'#1d4ed8' } }}>Insert</Button>
              <Button onClick={handleDelete} variant="contained" size="small" startIcon={<FaMinus size={12}/>}
                sx={{ textTransform:'none', bgcolor:'#dc2626', borderRadius:2, '&:hover':{ bgcolor:'#b91c1c' } }}>Delete</Button>
              <Button onClick={handleRandom} variant="outlined" size="small" startIcon={<FaRandom size={12}/>}
                sx={{ textTransform:'none', borderColor:'#059669', color:'#059669', borderRadius:2 }}>Random</Button>
              <Button onClick={handleReset} variant="outlined" size="small" startIcon={<RiLoopLeftFill />}
                sx={{ textTransform:'none', borderColor:'#e2e8f0', color:'#64748b', borderRadius:2 }}>Reset</Button>
            </Box>
          )}

          {/* Tab 1: Traverse */}
          {activeTab === 1 && (
            <Box display="flex" gap={1.5} flexWrap="wrap" mb={2} alignItems="center">
              {['Inorder','Preorder','Postorder','Level Order'].map(m => (
                <Button key={m} onClick={() => setTraversalMode(m)} variant={traversalMode===m?'contained':'outlined'}
                  size="small" sx={{ textTransform:'none', borderRadius:2, fontSize:12,
                    ...(traversalMode===m ? { bgcolor:'#dc2626', '&:hover':{ bgcolor:'#b91c1c' } } : { borderColor:'#e2e8f0', color:'#64748b' }) }}>
                  {m}
                </Button>
              ))}
              <Button onClick={handleTraverse} disabled={!root||isAnimating} variant="contained" size="small"
                startIcon={<FaPlay size={11}/>}
                sx={{ textTransform:'none', bgcolor:'#059669', borderRadius:2, '&:hover':{ bgcolor:'#047857' } }}>
                {isAnimating ? 'Animating...' : 'Animate'}
              </Button>
              <Button onClick={() => { clearTimers(); setHighlighted(new Set()); setCurrentTraversalIdx(-1); setIsAnimating(false); }}
                variant="outlined" size="small"
                sx={{ textTransform:'none', borderColor:'#e2e8f0', color:'#64748b', borderRadius:2 }}>
                <RiLoopLeftFill />
              </Button>
            </Box>
          )}

          {/* Tab 2: Search */}
          {activeTab === 2 && (
            <Box display="flex" gap={1.5} flexWrap="wrap" mb={2} alignItems="center">
              <Box sx={{ border:'1px solid #e2e8f0', borderRadius:2, px:1.5, py:0.8, display:'flex', alignItems:'center', bgcolor:'#f8fafc' }}>
                <input value={searchInput} onChange={e => setSearchInput(e.target.value)} onKeyDown={e => e.key==='Enter'&&handleSearch()}
                  placeholder="Search value" style={{ border:'none', outline:'none', fontSize:14, width:100, background:'transparent' }} />
              </Box>
              <Button onClick={handleSearch} disabled={!root||isAnimating} variant="contained" size="small"
                startIcon={<FaSearch size={12}/>}
                sx={{ textTransform:'none', bgcolor:'#d97706', borderRadius:2, '&:hover':{ bgcolor:'#b45309' } }}>
                Search
              </Button>
              <Button onClick={() => { clearTimers(); setSearchPath_([]); setSearchFound(null); setIsAnimating(false); }}
                variant="outlined" size="small"
                sx={{ textTransform:'none', borderColor:'#e2e8f0', color:'#64748b', borderRadius:2 }}>
                <RiLoopLeftFill />
              </Button>

              {/* Color legend for search */}
              <Box display="flex" gap={1.5}>
                {[{ color:'#f59e0b', label:'Path taken' },{ color:'#059669', label:'Found' }].map(l => (
                  <Box key={l.label} display="flex" alignItems="center" gap={0.5}>
                    <Box sx={{ width:10, height:10, borderRadius:'50%', bgcolor:l.color }} />
                    <Typography variant="caption" color="text.secondary">{l.label}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Tree SVG */}
          <Box sx={{ bgcolor:'#f8fafc', borderRadius:2, border:'1px solid #e2e8f0', overflowX:'auto', overflowY:'auto', maxHeight:'50vh', minHeight:220, mb:2 }}>
            {!root ? (
              <Box sx={{ height:220, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Typography variant="body2" color="text.secondary">Insert nodes to build your BST</Typography>
              </Box>
            ) : (
              <div style={{ display:'inline-block', minWidth:'100%' }}>
                <svg width={svgW} height={svgH} style={{ display:'block' }}>
                  {/* Edges */}
                  {links.map((link, i) => (
                    <line key={i}
                      x1={link.from.x - minX + 100} y1={link.from.y}
                      x2={link.to.x - minX + 100}   y2={link.to.y}
                      stroke={
                        (activeTab===1 && highlighted.has(link.to.id)) ? '#059669' :
                        (activeTab===2 && searchPath_.includes(link.to.id)) ? '#f59e0b' : '#cbd5e1'
                      }
                      strokeWidth={
                        (activeTab===1 && highlighted.has(link.to.id)) ||
                        (activeTab===2 && searchPath_.includes(link.to.id)) ? 2.5 : 1.5
                      }
                      style={{ transition:'all 0.4s ease' }}
                    />
                  ))}
                  {/* Nodes */}
                  {nodes.map(node => {
                    const cx = node.x - minX + 100, cy = node.y;
                    const color = getNodeColor(node.value);
                    const isCurrentTraversal = activeTab===1 && traversalOrder[currentTraversalIdx]===node.value;
                    return (
                      <g key={node.id} style={{ transition:'all 0.4s ease' }}>
                        <circle cx={cx} cy={cy} r={isCurrentTraversal ? 26 : 22}
                          fill={color} stroke={getNodeStroke(node.value)} strokeWidth={isCurrentTraversal?3:2}
                          style={{ transition:'all 0.3s ease', filter: isCurrentTraversal?`drop-shadow(0 0 8px ${color}88)`:'none' }} />
                        <text x={cx} y={cy+5} textAnchor="middle" fill="white" fontWeight="bold" fontSize={13}>{node.value}</text>
                        {/* traversal order badge */}
                        {activeTab===1 && highlighted.has(node.value) && (
                          <g>
                            <circle cx={cx+18} cy={cy-18} r={10} fill="#1e293b" />
                            <text x={cx+18} y={cy-14} textAnchor="middle" fill="white" fontSize={9} fontWeight="bold">
                              {traversalOrder.indexOf(node.value)+1}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}
          </Box>

          {/* Stats + traversal result */}
          <Box display="flex" gap={2} mb={2}>
            {[
              { label:'Nodes',  value:countNodes(root), color:'#dc2626' },
              { label:'Height', value:getHeight(root),  color:'#dc2626' },
              { label:'Type',   value:'BST',            color:'#dc2626' },
            ].map(s => (
              <Box key={s.label} sx={{ flex:1, bgcolor:'#fef2f2', borderRadius:2, p:1.5, textAlign:'center', border:'1px solid #fecaca' }}>
                <Typography variant="caption" color="text.secondary" display="block">{s.label}</Typography>
                <Typography fontWeight={700} sx={{ color:s.color }}>{s.value}</Typography>
              </Box>
            ))}
          </Box>

          {/* Traversal order display */}
          {activeTab===1 && traversalOrder.length > 0 && (
            <Box sx={{ bgcolor:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:2, p:2 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={1}>{traversalMode} Order:</Typography>
              <Box display="flex" gap={0.8} flexWrap="wrap">
                {traversalOrder.map((v, i) => (
                  <Box key={i} sx={{
                    width:36, height:36, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13,
                    bgcolor: i<=currentTraversalIdx ? (i===currentTraversalIdx?'#dc2626':'#059669') : '#e2e8f0',
                    color: i<=currentTraversalIdx ? 'white' : '#94a3b8',
                    border:`2px solid ${i<=currentTraversalIdx?(i===currentTraversalIdx?'#b91c1c':'#047857'):'#e2e8f0'}`,
                    transition:'all 0.3s ease',
                  }}>
                    {v}
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Step log */}
          {steps.length > 0 && (
            <Box sx={{ bgcolor:'#f0f9ff', border:'1px solid #bae6fd', borderRadius:2, p:2, maxHeight:100, overflowY:'auto', mt:2 }}>
              {steps.map((s, i) => (
                <Typography key={i} variant="caption" display="block" sx={{ mb:0.3, color: s.startsWith('✅')?'#059669':s.startsWith('❌')?'#dc2626':'text.secondary' }}>
                  {s}
                </Typography>
              ))}
            </Box>
          )}
        </Box>

        {/* Right */}
        <Box sx={{ display:'flex', flexDirection:'column', gap:2 }}>
          <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:2.5, border:'1px solid #e2e8f0', flex:1 }}>
            <Box display="flex" alignItems="center" gap={1.5} mb={2}>
              <Box sx={{ bgcolor:'#f5f3ff', borderRadius:2, p:1, display:'flex' }}><FaRobot size={18} color="#7c3aed" /></Box>
              <Typography variant="body2" fontWeight={700} color="text.primary">AI Explanation</Typography>
            </Box>
            <Box sx={{ bgcolor:'#faf5ff', border:'1px solid #ede9fe', borderRadius:2, p:2, minHeight:120 }}>
              <Typography variant="body2" color={aiText?'#4c1d95':'text.secondary'} sx={{ lineHeight:1.7, fontStyle:aiText?'normal':'italic' }}>
                {aiText || 'Build a tree or run a traversal — I\'ll explain what\'s happening step by step...'}
              </Typography>
            </Box>
            <Box sx={{ mt:2, p:1.5, bgcolor:'#fffbeb', border:'1px solid #fde68a', borderRadius:2 }}>
              <Typography variant="caption" color="#92400e" fontWeight={600}>
                💡 Try: Insert 50,30,70,20,40 then run Inorder — you'll get sorted order!
              </Typography>
            </Box>
          </Box>

          <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:2.5, border:'1px solid #e2e8f0' }}>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={1.5}>BST Complexity</Typography>
            {[
              ['Search',       'O(log n) avg', 'O(n) worst', '#d97706'],
              ['Insert',       'O(log n) avg', 'O(n) worst', '#d97706'],
              ['Delete',       'O(log n) avg', 'O(n) worst', '#d97706'],
              ['Inorder',      'O(n)',          '',           '#059669'],
              ['Space',        'O(n)',          '',           '#7c3aed'],
            ].map(([op,t,w,c]) => (
              <Box key={op} display="flex" justifyContent="space-between" alignItems="center" py={0.8} sx={{ borderBottom:'1px solid #f1f5f9' }}>
                <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ fontSize:12 }}>{op}</Typography>
                <Box>
                  <Box sx={{ bgcolor:`${c}18`, border:`1px solid ${c}44`, borderRadius:1, px:1, py:0.2 }}>
                    <Typography sx={{ fontSize:11, fontWeight:700, color:c }}>{t}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
            <Box sx={{ mt:2, bgcolor:'#fef2f2', borderRadius:1.5, p:1.2 }}>
              <Typography variant="caption" color="#dc2626" fontWeight={600}>
                Worst case is O(n) for skewed trees (like inserting sorted data)
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── THEORY ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <SectionHeader icon={<FaLightbulb />} title="BST Theory" color="#d97706" bg="#fffbeb" />
        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 1fr' }, gap:3, mb:3 }}>
          <Box>
            <Typography variant="body2" fontWeight={700} color="#dc2626" mb={1}>BST Property</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight:1.8 }}>
              In a BST, for every node: all values in the <strong>left subtree are smaller</strong> and all values in the <strong>right subtree are larger</strong>.
              This property enables O(log n) search, insert and delete on balanced trees.
            </Typography>
          </Box>
          <Box sx={{ bgcolor:'#f8fafc', borderRadius:2, p:2 }}>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={1.5}>Traversal Types</Typography>
            {[
              { type:'Inorder',    result:'Sorted ascending order', color:'#059669' },
              { type:'Preorder',   result:'Root before children',   color:'#2563eb' },
              { type:'Postorder',  result:'Root after children',    color:'#7c3aed' },
              { type:'Level Order',result:'BFS — level by level',   color:'#d97706' },
            ].map(t => (
              <Box key={t.type} display="flex" alignItems="center" gap={1.5} mb={0.8}>
                <Box sx={{ bgcolor:`${t.color}18`, borderRadius:1, px:1, py:0.3, minWidth:90 }}>
                  <Typography sx={{ fontSize:11, fontWeight:700, color:t.color }}>{t.type}</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">{t.result}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ borderRadius:2, overflow:'hidden' }}>
          <SyntaxHighlighter language="cpp" style={atomDark} customStyle={{ margin:0, fontSize:13, borderRadius:8 }}>
{`// BST Search — O(log n) average
TreeNode* search(TreeNode* root, int val) {
    if (!root || root->val == val) return root;
    if (val < root->val) return search(root->left, val);
    return search(root->right, val);
}

// Inorder Traversal — gives sorted output
void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";  // process node
    inorder(root->right);
}`}
          </SyntaxHighlighter>
        </Box>
      </Box>

      {/* ── PRACTICE ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <SectionHeader icon={<FaCode />} title="Practice Problems" color="#059669" bg="#ecfdf5" />
          <Box sx={{ bgcolor:'#fef2f2', border:'1px solid #fecaca', borderRadius:99, px:2, py:0.5 }}>
            <Typography sx={{ fontSize:12, fontWeight:700, color:'#dc2626' }}>3 Free · 3 Pro 🔒</Typography>
          </Box>
        </Box>
        <Box sx={{ display:'flex', flexDirection:'column', gap:1.5 }}>
          {problems.map(p => <ProblemCard key={p.id} p={p} />)}
        </Box>
        <Box sx={{ mt:3, p:2, background:'linear-gradient(135deg, #fef2f2, #fffbeb)', borderRadius:2, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <Box>
            <Typography variant="body2" fontWeight={700} color="text.primary">Unlock all problems + 200+ DSA questions</Typography>
            <Typography variant="caption" color="text.secondary">Company-wise · AI hints · Progress tracking</Typography>
          </Box>
          <Button variant="contained" sx={{ textTransform:'none', bgcolor:'#dc2626', borderRadius:2, fontWeight:700, px:2.5, boxShadow:'none' }}>
            Upgrade — ₹49/mo
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DSATrees;