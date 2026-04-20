import {
  Box, Typography, Button, Select, MenuItem,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField,
} from "@mui/material";
import { RiLoopLeftFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { FaRandom, FaYoutube, FaLightbulb, FaCode, FaRobot } from "react-icons/fa";
import { FaPlay, FaLink } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// ─── Shared ───────────────────────────────────────────────────────────────────
const SectionHeader = ({ icon, title, color = '#2563eb', bg = '#eff6ff' }) => (
  <Box display="flex" alignItems="center" gap={2} mb={3}>
    <Box sx={{ bgcolor: bg, borderRadius: 2, p: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {React.cloneElement(icon, { size: 20, color })}
    </Box>
    <Typography variant="h6" fontWeight={700} color="text.primary">{title}</Typography>
  </Box>
);

// ─── Practice problems ────────────────────────────────────────────────────────
const problems = [
  { id:1, title:'Number of Islands',           difficulty:'Medium', tag:'BFS/DFS',  locked:false },
  { id:2, title:'Clone Graph',                 difficulty:'Medium', tag:'BFS',      locked:false },
  { id:3, title:'Course Schedule',             difficulty:'Medium', tag:'Topo Sort',locked:false },
  { id:4, title:'Shortest Path in Binary Matrix',difficulty:'Medium',tag:'BFS',     locked:true  },
  { id:5, title:'Word Ladder',                 difficulty:'Hard',   tag:'BFS',      locked:true  },
  { id:6, title:'Network Delay Time',          difficulty:'Medium', tag:'Dijkstra', locked:true  },
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

// ─── Step generators (kept exactly from original) ─────────────────────────────
const buildAdjList = (nodes, edges) => {
  const adj = {}; nodes.forEach(n => (adj[n.id] = []));
  edges.forEach(e => { adj[e.from.id].push(e.to.id); adj[e.to.id].push(e.from.id); });
  return adj;
};
const buildWeightedAdjList = (nodes, edges) => {
  const adj = {}; nodes.forEach(n => (adj[n.id] = []));
  edges.forEach(e => {
    const w = Number(e.weight) || 1;
    adj[e.from.id].push({ node: e.to.id, weight: w });
    adj[e.to.id].push({ node: e.from.id, weight: w });
  });
  return adj;
};

const generateBfsSteps = (nodes, edges, source) => {
  const adj = buildAdjList(nodes, edges);
  const steps = []; const discovered = new Set([source]); const q = [source]; const visitedOrder = [];
  steps.push({ queue:[...q], processed:new Set(), visitedOrder:[...visitedOrder], current:null, highlighted:new Set([source]), text:`Begin BFS from vertex ${source}. Mark ${source} as discovered and add to queue.` });
  while (q.length) {
    const u = q[0]; visitedOrder.push(u);
    steps.push({ queue:[...q], processed:new Set([...(steps.at(-1)?.processed||[]),u]), visitedOrder:[...visitedOrder], current:u, highlighted:new Set([...discovered]), text:`Dequeue ${u} and visit it. Now explore all neighbors of ${u}.` });
    for (const v of adj[u] || []) {
      if (!discovered.has(v)) {
        discovered.add(v); q.push(v);
        steps.push({ queue:[...q], processed:new Set([...(steps.at(-1)?.processed||[])]), visitedOrder:[...visitedOrder], current:u, highlighted:new Set([...discovered]), text:`Neighbor ${v} is unvisited → mark discovered and enqueue it.` });
      } else {
        steps.push({ queue:[...q], processed:new Set([...(steps.at(-1)?.processed||[])]), visitedOrder:[...visitedOrder], current:u, highlighted:new Set([...discovered]), text:`Neighbor ${v} already discovered — skip it.` });
      }
    }
    q.shift();
    steps.push({ queue:[...q], processed:new Set([...(steps.at(-1)?.processed||[])]), visitedOrder:[...visitedOrder], current:null, highlighted:new Set([...discovered]), text:`Finished exploring ${u}. Remove from queue.` });
  }
  steps.push({ queue:[], processed:new Set([...(steps.at(-1)?.processed||[])]), visitedOrder:[...visitedOrder], current:null, highlighted:new Set([...discovered]), text:`✅ BFS complete! Visited order: ${visitedOrder.join(' → ')}` });
  return steps;
};

const generateDfsSteps = (nodes, edges, source) => {
  const adj = buildAdjList(nodes, edges);
  const steps = []; const discovered = new Set([source]); const st = [source]; const visitedOrder = [];
  steps.push({ queue:[...st], processed:new Set(), visitedOrder:[], current:null, highlighted:new Set([source]), text:`Begin DFS from vertex ${source}. Push ${source} onto the stack.` });
  while (st.length) {
    const u = st.pop();
    steps.push({ queue:[...st, u], processed:new Set([...(steps.at(-1)?.processed||[]),u]), visitedOrder:[...visitedOrder], current:u, highlighted:new Set([...discovered]), text:`Pop ${u} from stack and visit it. Explore its unvisited neighbors.` });
    if (!visitedOrder.includes(u)) visitedOrder.push(u);
    const neigh = [...(adj[u]||[])].reverse();
    for (const v of neigh) {
      if (!discovered.has(v)) {
        discovered.add(v); st.push(v);
        steps.push({ queue:[...st], processed:new Set([...(steps.at(-1)?.processed||[])]), visitedOrder:[...visitedOrder], current:u, highlighted:new Set([...discovered]), text:`Neighbor ${v} unvisited → push onto stack for future exploration.` });
      } else {
        steps.push({ queue:[...st], processed:new Set([...(steps.at(-1)?.processed||[])]), visitedOrder:[...visitedOrder], current:u, highlighted:new Set([...discovered]), text:`Neighbor ${v} already visited — skip.` });
      }
    }
  }
  steps.push({ queue:[], processed:new Set([...(steps.at(-1)?.processed||[])]), visitedOrder:[...visitedOrder], current:null, highlighted:new Set([...discovered]), text:`✅ DFS complete! Visited order: ${visitedOrder.join(' → ')}` });
  return steps;
};

const generateDijkstraSteps = (nodes, edges, source) => {
  const adj = buildWeightedAdjList(nodes, edges);
  const dist = {}; nodes.forEach(n => (dist[n.id] = Infinity)); dist[source] = 0;
  const visited = new Set(); const steps = []; const visitedOrder = []; const pq = [{ node:source, dist:0 }];
  steps.push({ queue:pq.map(x=>`${x.node}(${x.dist})`), processed:new Set(), visitedOrder:[], current:null, highlighted:new Set([source]), text:`Begin Dijkstra from ${source}. All distances = ∞ except source = 0.` });
  while (pq.length) {
    pq.sort((a,b) => a.dist - b.dist);
    const { node:u, dist:du } = pq.shift();
    if (visited.has(u)) continue;
    visited.add(u); visitedOrder.push(u);
    steps.push({ queue:pq.map(x=>`${x.node}(${x.dist})`), processed:new Set([...(steps.at(-1)?.processed||[]),`${u}(${du})`]), visitedOrder:[...visitedOrder], current:u, highlighted:new Set([...visited]), text:`Pick ${u} (dist=${du}) — shortest path to ${u} is finalized.` });
    for (const { node:v, weight:w } of adj[u]||[]) {
      if (!visited.has(v) && du+w < dist[v]) {
        dist[v] = du+w; pq.push({ node:v, dist:dist[v] });
        steps.push({ queue:pq.map(x=>`${x.node}(${x.dist})`), processed:new Set([...(steps.at(-1)?.processed||[])]), visitedOrder:[...visitedOrder], current:u, highlighted:new Set([...visited]), text:`Relax edge ${u}→${v}: new dist ${du}+${w}=${dist[v]} < old dist. Update!` });
      } else {
        steps.push({ queue:pq.map(x=>`${x.node}(${x.dist})`), processed:new Set([...(steps.at(-1)?.processed||[])]), visitedOrder:[...visitedOrder], current:u, highlighted:new Set([...visited]), text:`Edge ${u}→${v}: path through ${u} not shorter. Keep existing dist ${dist[v]}.` });
      }
    }
  }
  steps.push({ queue:[], processed:new Set([...(steps.at(-1)?.processed||[])]), visitedOrder:[...visitedOrder], current:null, highlighted:new Set([...visited]), text:`✅ Dijkstra complete! Distances: ${Object.entries(dist).map(([k,v])=>`${k}:${v===Infinity?'∞':v}`).join(', ')}` });
  return steps;
};

// ─── Main Component ───────────────────────────────────────────────────────────
const DSAGraphs = () => {
  const [algorithm, setAlgorithm]   = useState("BFS Traversal");
  const [mode, setMode]             = useState(null);
  const [nodes, setNodes]           = useState([]);
  const [edges, setEdges]           = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [currentNode, setCurrentNode]   = useState(null);
  const [highlightedNodes, setHighlightedNodes] = useState(new Set());

  const [openWeightDialog, setOpenWeightDialog] = useState(false);
  const [pendingEdge, setPendingEdge] = useState(null);
  const [weight, setWeight]           = useState("");

  const [openSourceDialog, setOpenSourceDialog] = useState(false);
  const [sourceNode, setSourceNode]   = useState("");

  const [panelQueue, setPanelQueue]   = useState([]);
  const [processedSet, setProcessedSet] = useState(new Set());
  const [visitedPanel, setVisitedPanel] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [aiText, setAiText]           = useState('');
  const [isRunning, setIsRunning]     = useState(false);

  const timersRef = useRef([]);
  const descRef   = useRef(null);

  useEffect(() => { return () => clearTimers(); }, []);
  useEffect(() => { if (descRef.current) descRef.current.scrollTop = descRef.current.scrollHeight; }, [currentStepIndex]);

  const clearTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };

  // ── Canvas interaction ────────────────────────────────────────────────────
  const handleCanvasClick = (e) => {
    if (mode !== 'node') return;
    const rect = e.currentTarget.getBoundingClientRect();
    setNodes(prev => [...prev, { id: prev.length + 1, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
  };

  const handleNodeClick = (node) => {
    if (mode !== 'edge') return;
    if (!selectedNode) { setSelectedNode(node); return; }
    if (selectedNode.id === node.id) { setSelectedNode(null); return; }
    if (algorithm === "Dijkstra's Algorithm") {
      setPendingEdge({ from: selectedNode, to: node }); setOpenWeightDialog(true);
    } else {
      setEdges(prev => [...prev, { from: selectedNode, to: node }]);
    }
    setSelectedNode(null);
  };

  const handleSaveWeight = () => {
    if (pendingEdge) { setEdges(prev => [...prev, { ...pendingEdge, weight }]); setPendingEdge(null); setWeight(""); }
    setOpenWeightDialog(false);
  };

  const handleReset = () => {
    clearTimers(); setNodes([]); setEdges([]); setSelectedNode(null);
    setVisitedNodes([]); setCurrentNode(null); setHighlightedNodes(new Set());
    setPanelQueue([]); setProcessedSet(new Set()); setVisitedPanel([]);
    setDescriptions([]); setCurrentStepIndex(-1); setSourceNode(""); setIsRunning(false); setAiText('');
  };

  const handleRandomGraph = () => {
    const numNodes = Math.floor(Math.random() * 4) + 5;
    const newNodes = []; const newEdges = []; const W = 780; const H = 320;
    for (let i = 1; i <= numNodes; i++) {
      let x, y, attempts = 0;
      do { x = Math.floor(Math.random()*(W-80))+40; y = Math.floor(Math.random()*(H-80))+40; attempts++; }
      while (newNodes.some(n => Math.hypot(n.x-x, n.y-y) < 80) && attempts < 200);
      newNodes.push({ id:i, x, y });
    }
    for (let i = 0; i < numNodes; i++) {
      const conns = Math.floor(Math.random()*2)+1;
      for (let j = 0; j < conns; j++) {
        const t = Math.floor(Math.random()*numNodes);
        if (t !== i && !newEdges.find(e => (e.from.id===newNodes[i].id&&e.to.id===newNodes[t].id)||(e.from.id===newNodes[t].id&&e.to.id===newNodes[i].id))) {
          newEdges.push(algorithm==="Dijkstra's Algorithm"
            ? { from:newNodes[i], to:newNodes[t], weight:Math.floor(Math.random()*15)+1 }
            : { from:newNodes[i], to:newNodes[t] });
        }
      }
    }
    setNodes(newNodes); setEdges(newEdges);
    clearTimers(); setVisitedNodes([]); setCurrentNode(null); setHighlightedNodes(new Set());
    setPanelQueue([]); setProcessedSet(new Set()); setVisitedPanel([]); setDescriptions([]); setCurrentStepIndex(-1);
  };

  // ── Animation ─────────────────────────────────────────────────────────────
  const playSteps = (steps, speed = 900) => {
    clearTimers(); setIsRunning(true);
    setVisitedNodes([]); setPanelQueue([]); setProcessedSet(new Set()); setVisitedPanel([]);
    setDescriptions(steps.map(s => s.text)); setCurrentStepIndex(-1); setHighlightedNodes(new Set());

    const algoDescriptions = {
      'BFS Traversal':      'BFS uses a queue (FIFO). It explores all neighbors at the current depth before moving to the next level — like ripples in water.',
      'DFS Traversal':      'DFS uses a stack (LIFO). It goes as deep as possible along one path before backtracking — like exploring a maze.',
      "Dijkstra's Algorithm": "Dijkstra's uses a priority queue (min-heap). It always processes the node with the smallest known distance first — greedy approach.",
    };
    setAiText(algoDescriptions[algorithm] || '');

    steps.forEach((step, idx) => {
      const id = setTimeout(() => {
        setCurrentStepIndex(idx);
        setPanelQueue(step.queue);
        setProcessedSet(step.processed);
        setVisitedPanel(step.visitedOrder);
        setVisitedNodes(step.visitedOrder);
        setCurrentNode(step.current);
        setHighlightedNodes(step.highlighted || new Set());
        if (idx === steps.length - 1) setIsRunning(false);
      }, idx * speed);
      timersRef.current.push(id);
    });
  };

  const handleStart = () => { if (nodes.length === 0) return; setOpenSourceDialog(true); };

  const handleConfirmSource = () => {
    setOpenSourceDialog(false); if (!sourceNode) return;
    const src = Number(sourceNode);
    if (algorithm === 'BFS Traversal') playSteps(generateBfsSteps(nodes, edges, src));
    else if (algorithm === 'DFS Traversal') playSteps(generateDfsSteps(nodes, edges, src));
    else if (algorithm === "Dijkstra's Algorithm") playSteps(generateDijkstraSteps(nodes, edges, src), 1000);
  };

  const getNodeColor = (node) => {
    if (currentNode === node.id) return '#f59e0b';
    if (visitedNodes.includes(node.id)) return '#059669';
    if (highlightedNodes.has(node.id)) return '#7c3aed';
    if (selectedNode?.id === node.id) return '#f97316';
    return '#2563eb';
  };

  const getNodeGlow = (node) => {
    if (currentNode === node.id) return '0 0 16px rgba(245,158,11,0.7)';
    if (selectedNode?.id === node.id) return '0 0 12px rgba(249,115,22,0.5)';
    return 'none';
  };

  const queueTitle = algorithm === 'BFS Traversal' ? 'Queue (FIFO)' : algorithm === 'DFS Traversal' ? 'Stack (LIFO)' : 'Priority Queue';
  const algoColor  = algorithm === 'BFS Traversal' ? '#2563eb' : algorithm === 'DFS Traversal' ? '#7c3aed' : '#059669';

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>

      {/* ── VIDEO ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <SectionHeader icon={<FaYoutube />} title="Watch First — Graph Algorithms Explained" color="#dc2626" bg="#fef2f2" />
        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 1fr' }, gap:2 }}>
          {[
            { title:'BFS & DFS Explained (Abdul Bari)', id:'pcKY4hjDrxk', desc:'Graph traversal step-by-step — BFS queue vs DFS stack with animations' },
            { title:"Dijkstra's Shortest Path Algorithm", id:'XB4MIexjvY0', desc:"Dijkstra's with priority queue — how shortest paths are calculated" },
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

      {/* ── GRAPH BUILDER + AI ── */}
      <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 300px' }, gap:3, mb:3 }}>

        {/* Graph builder */}
        <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, border:'1px solid #e2e8f0' }}>
          <SectionHeader icon={<FaPlay />} title="Interactive Graph Builder" color="#7c3aed" bg="#f5f3ff" />

          {/* Controls row 1 */}
          <Box display="flex" gap={1.5} flexWrap="wrap" mb={1.5}>
            <Button onClick={() => setMode('node')} variant={mode==='node'?'contained':'outlined'} size="small"
              startIcon={<IoMdAdd size={13} />}
              sx={{ textTransform:'none', borderRadius:2, fontSize:12,
                ...(mode==='node' ? { bgcolor:'#2563eb', '&:hover':{ bgcolor:'#1d4ed8' } } : { borderColor:'#2563eb', color:'#2563eb' }) }}>
              Add Node
            </Button>
            <Button onClick={() => setMode('edge')} variant={mode==='edge'?'contained':'outlined'} size="small"
              startIcon={<FaLink size={11} />}
              sx={{ textTransform:'none', borderRadius:2, fontSize:12,
                ...(mode==='edge' ? { bgcolor:'#059669', '&:hover':{ bgcolor:'#047857' } } : { borderColor:'#059669', color:'#059669' }) }}>
              Add Edge
            </Button>
            <Button onClick={handleRandomGraph} variant="outlined" size="small" startIcon={<FaRandom size={11} />}
              sx={{ textTransform:'none', borderRadius:2, fontSize:12, borderColor:'#7c3aed', color:'#7c3aed' }}>
              Random Graph
            </Button>
            <Button onClick={handleReset} variant="outlined" size="small" startIcon={<RiLoopLeftFill />}
              sx={{ textTransform:'none', borderColor:'#e2e8f0', color:'#64748b', borderRadius:2 }}>
              Reset
            </Button>

            <Select value={algorithm} onChange={e => { setAlgorithm(e.target.value); handleReset(); }}
              variant="standard" disableUnderline
              sx={{ border:'1px solid #e2e8f0', borderRadius:2, px:1.5, py:0.4, fontSize:13, minWidth:160, bgcolor:'#f8fafc', ml:'auto' }}>
              <MenuItem value="BFS Traversal">BFS Traversal</MenuItem>
              <MenuItem value="DFS Traversal">DFS Traversal</MenuItem>
              <MenuItem value="Dijkstra's Algorithm">Dijkstra's Algorithm</MenuItem>
            </Select>

            <Button onClick={handleStart} disabled={nodes.length===0||isRunning} variant="contained" size="small"
              startIcon={<FaPlay size={11} />}
              sx={{ textTransform:'none', bgcolor: algoColor, borderRadius:2, fontSize:12, '&:hover':{ opacity:0.88 }, '&.Mui-disabled':{ bgcolor:'#e2e8f0', color:'#94a3b8' } }}>
              {isRunning ? 'Running...' : 'Run Algorithm'}
            </Button>
          </Box>

          {/* Mode indicator */}
          {mode && (
            <Box sx={{ bgcolor: mode==='node'?'#eff6ff':'#ecfdf5', border:`1px solid ${mode==='node'?'#bfdbfe':'#a7f3d0'}`, borderRadius:2, px:2, py:0.8, mb:1.5 }}>
              <Typography variant="caption" fontWeight={600} color={mode==='node'?'#1d4ed8':'#047857'}>
                {mode==='node' ? '🖱️ Click anywhere on the canvas to add a node' : '🔗 Click two nodes to connect them with an edge'}
              </Typography>
            </Box>
          )}

          {/* Canvas */}
          <Box
            onClick={handleCanvasClick}
            sx={{
              position:'relative', width:'100%', height:340,
              border:'1.5px solid #e2e8f0', borderRadius:2, bgcolor:'#fafafa',
              cursor: mode==='node' ? 'crosshair' : 'default',
              overflow:'hidden', mb:2,
              backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          >
            {nodes.length === 0 && (
              <Box sx={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center' }}>
                <Typography variant="body2" color="text.secondary">Click "Add Node" then click on the canvas to build your graph</Typography>
              </Box>
            )}

            {/* SVG edges */}
            <svg style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', pointerEvents:'none' }}>
              {edges.map((edge, i) => {
                const bothVisited = visitedNodes.includes(edge.from.id) && visitedNodes.includes(edge.to.id);
                return (
                  <g key={i}>
                    <line
                      x1={edge.from.x} y1={edge.from.y} x2={edge.to.x} y2={edge.to.y}
                      stroke={bothVisited ? '#059669' : '#cbd5e1'} strokeWidth={bothVisited ? 2.5 : 1.5}
                      style={{ transition:'all 0.5s ease' }}
                    />
                    {edge.weight && (
                      <text x={(edge.from.x+edge.to.x)/2} y={(edge.from.y+edge.to.y)/2-6}
                        textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="700">
                        {edge.weight}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map(node => (
              <Box key={node.id}
                onClick={e => { e.stopPropagation(); handleNodeClick(node); }}
                sx={{
                  position:'absolute', top: node.y-22, left: node.x-22,
                  width:44, height:44, borderRadius:'50%',
                  bgcolor: getNodeColor(node), color:'white',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  border: selectedNode?.id===node.id ? '3px solid #f97316' : '2.5px solid white',
                  cursor: mode==='edge' ? 'pointer' : 'default',
                  userSelect:'none', fontWeight:700, fontSize:14,
                  boxShadow: getNodeGlow(node),
                  transition:'all 0.4s ease',
                  zIndex:1,
                }}
              >
                {node.id}
              </Box>
            ))}
          </Box>

          {/* Color legend */}
          <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
            {[
              { color:'#2563eb', label:'Unvisited' },
              { color:'#f59e0b', label:'Current' },
              { color:'#059669', label:'Visited' },
              { color:'#7c3aed', label:'Discovered' },
              { color:'#f97316', label:'Selected' },
            ].map(l => (
              <Box key={l.label} display="flex" alignItems="center" gap={0.6}>
                <Box sx={{ width:12, height:12, borderRadius:'50%', bgcolor:l.color }} />
                <Typography variant="caption" color="text.secondary">{l.label}</Typography>
              </Box>
            ))}
          </Box>

          {/* Queue/Stack panel + Visited panel */}
          <Box sx={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }}>
            <Box sx={{ bgcolor:'#f8fafc', borderRadius:2, p:2, border:'1px solid #e2e8f0' }}>
              <Typography variant="caption" fontWeight={700} color="text.primary" display="block" mb={1}>{queueTitle}</Typography>
              <Box display="flex" flexWrap="wrap" gap={0.8} minHeight={40}>
                {panelQueue.length === 0
                  ? <Typography variant="caption" color="text.secondary">(empty)</Typography>
                  : panelQueue.map((val, i) => {
                    const key = String(val);
                    const scratched = processedSet.has(val) || processedSet.has(key);
                    return (
                      <Box key={`${key}-${i}`} sx={{
                        width:36, height:36, border:'1.5px solid #cbd5e1', borderRadius:1.5,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        bgcolor: scratched?'#f1f5f9':'#ffffff', position:'relative', fontWeight:700, fontSize:13,
                        textDecoration: scratched?'line-through':'none', opacity: scratched?0.5:1,
                        color: algoColor,
                      }}>
                        {key}
                      </Box>
                    );
                  })
                }
              </Box>
            </Box>

            <Box sx={{ bgcolor:'#f0fdf4', borderRadius:2, p:2, border:'1px solid #a7f3d0' }}>
              <Typography variant="caption" fontWeight={700} color="#059669" display="block" mb={1}>Visited Order</Typography>
              <Box display="flex" flexWrap="wrap" gap={0.8} minHeight={40}>
                {visitedPanel.length === 0
                  ? <Typography variant="caption" color="text.secondary">(none yet)</Typography>
                  : visitedPanel.map((v, i) => (
                    <Box key={`${v}-${i}`} sx={{ width:36, height:36, border:'1.5px solid #a7f3d0', borderRadius:1.5, display:'flex', alignItems:'center', justifyContent:'center', bgcolor:'#ecfdf5', fontWeight:700, fontSize:13, color:'#047857' }}>
                      {v}
                    </Box>
                  ))
                }
              </Box>
            </Box>
          </Box>

          {/* Step narration */}
          <Box ref={descRef} sx={{ bgcolor:'#f0f9ff', border:'1px solid #bae6fd', borderRadius:2, p:2, maxHeight:140, overflowY:'auto', mt:2 }}>
            {descriptions.length === 0
              ? <Typography variant="body2" color="text.secondary">Build a graph and click Run Algorithm to see step-by-step narration.</Typography>
              : descriptions.map((line, i) => (
                <Box key={i} sx={{ bgcolor:i===currentStepIndex?'rgba(37,99,235,0.08)':'transparent', borderLeft:i===currentStepIndex?'3px solid #2563eb':'3px solid transparent', pl:1, py:0.3, borderRadius:'0 4px 4px 0' }}>
                  <Typography variant="caption" color={i===currentStepIndex?'#1d4ed8':'text.secondary'} fontWeight={i===currentStepIndex?700:400}>
                    {i+1}. {line}
                  </Typography>
                </Box>
              ))
            }
          </Box>
        </Box>

        {/* Right: AI + Complexity */}
        <Box sx={{ display:'flex', flexDirection:'column', gap:2 }}>

          <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:2.5, border:'1px solid #e2e8f0', flex:1 }}>
            <Box display="flex" alignItems="center" gap={1.5} mb={2}>
              <Box sx={{ bgcolor:'#f5f3ff', borderRadius:2, p:1, display:'flex' }}><FaRobot size={18} color="#7c3aed" /></Box>
              <Typography variant="body2" fontWeight={700} color="text.primary">AI Explanation</Typography>
            </Box>
            <Box sx={{ bgcolor:'#faf5ff', border:'1px solid #ede9fe', borderRadius:2, p:2, minHeight:120 }}>
              <Typography variant="body2" color={aiText?'#4c1d95':'text.secondary'} sx={{ lineHeight:1.7, fontStyle:aiText?'normal':'italic' }}>
                {aiText || 'Select an algorithm and run it to see the AI explanation...'}
              </Typography>
            </Box>
            <Box sx={{ mt:2, p:1.5, bgcolor:'#fffbeb', border:'1px solid #fde68a', borderRadius:2 }}>
              <Typography variant="caption" color="#92400e" fontWeight={600}>
                💡 Try: Build a graph with 5 nodes, run BFS then DFS — see the different visit orders!
              </Typography>
            </Box>
          </Box>

          <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:2.5, border:'1px solid #e2e8f0' }}>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={1.5}>Complexity Analysis</Typography>
            {[
              { algo:'BFS', time:'O(V + E)', space:'O(V)', color:'#2563eb' },
              { algo:'DFS', time:'O(V + E)', space:'O(V)', color:'#7c3aed' },
              { algo:"Dijkstra's", time:'O((V+E) log V)', space:'O(V)', color:'#059669' },
            ].map(a => (
              <Box key={a.algo} sx={{ mb:1.5, bgcolor:'#f8fafc', borderRadius:1.5, p:1.5, border:`1px solid ${a.color}22` }}>
                <Typography variant="caption" fontWeight={700} sx={{ color:a.color }}>{a.algo}</Typography>
                <Box display="flex" gap={1} mt={0.5}>
                  <Box sx={{ bgcolor:`${a.color}18`, borderRadius:1, px:0.8, py:0.2 }}>
                    <Typography sx={{ fontSize:10, fontWeight:700, color:a.color }}>Time: {a.time}</Typography>
                  </Box>
                  <Box sx={{ bgcolor:'#f1f5f9', borderRadius:1, px:0.8, py:0.2 }}>
                    <Typography sx={{ fontSize:10, fontWeight:700, color:'#64748b' }}>Space: {a.space}</Typography>
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize:10 }}>V = Vertices, E = Edges</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ── THEORY ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <SectionHeader icon={<FaLightbulb />} title="Theory — BFS vs DFS vs Dijkstra" color="#d97706" bg="#fffbeb" />
        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 1fr 1fr' }, gap:2, mb:3 }}>
          {[
            { title:'BFS — Breadth First Search', color:'#2563eb', bg:'#eff6ff', border:'#bfdbfe', uses:'Shortest path (unweighted), Level-order traversal, Finding connected components', how:'Uses a Queue. Explores all neighbors at current depth before going deeper.' },
            { title:'DFS — Depth First Search',   color:'#7c3aed', bg:'#f5f3ff', border:'#ddd6fe', uses:'Cycle detection, Topological sort, Finding strongly connected components', how:'Uses a Stack (or recursion). Goes as deep as possible, then backtracks.' },
            { title:"Dijkstra's Algorithm",       color:'#059669', bg:'#ecfdf5', border:'#a7f3d0', uses:'Shortest path in weighted graphs — GPS, network routing, game pathfinding', how:'Uses a Priority Queue (min-heap). Greedily picks the closest unvisited node.' },
          ].map(a => (
            <Box key={a.title} sx={{ border:`1px solid ${a.border}`, borderRadius:2, p:2.5, bgcolor:a.bg }}>
              <Typography variant="body2" fontWeight={700} sx={{ color:a.color, mb:1 }}>{a.title}</Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={0.5}>How it works:</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight:1.6 }} display="block" mb={1}>{a.how}</Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={0.5}>Real-world uses:</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight:1.6 }}>{a.uses}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ borderRadius:2, overflow:'hidden' }}>
          <SyntaxHighlighter language="cpp" style={atomDark} customStyle={{ margin:0, fontSize:12, borderRadius:8 }}>
{`// BFS — using queue
void bfs(int src, vector<vector<int>>& adj) {
    vector<bool> visited(n, false);
    queue<int> q;
    q.push(src); visited[src] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        cout << u << " ";
        for (int v : adj[u])
            if (!visited[v]) { visited[v]=true; q.push(v); }
    }
}

// DFS — using recursion
void dfs(int u, vector<bool>& visited, vector<vector<int>>& adj) {
    visited[u] = true;
    cout << u << " ";
    for (int v : adj[u])
        if (!visited[v]) dfs(v, visited, adj);
}`}
          </SyntaxHighlighter>
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
          <Button variant="contained" sx={{ textTransform:'none', bgcolor:'#7c3aed', borderRadius:2, fontWeight:700, px:2.5, boxShadow:'none' }}>
            Upgrade — ₹49/mo
          </Button>
        </Box>
      </Box>

      {/* Dialogs */}
      <Dialog open={openWeightDialog} onClose={() => setOpenWeightDialog(false)}>
        <DialogTitle>Enter Edge Weight</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Weight" type="number" fullWidth value={weight} onChange={e => setWeight(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWeightDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveWeight} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openSourceDialog} onClose={() => setOpenSourceDialog(false)}>
        <DialogTitle>Select Source Node</DialogTitle>
        <DialogContent>
          <Select fullWidth value={sourceNode} onChange={e => setSourceNode(e.target.value)}>
            {nodes.map(n => <MenuItem key={n.id} value={n.id}>Node {n.id}</MenuItem>)}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSourceDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmSource} disabled={!sourceNode} variant="contained">Run</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DSAGraphs;