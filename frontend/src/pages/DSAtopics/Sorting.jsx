import { Box, Typography, Button, Input, Select, MenuItem, Slider } from "@mui/material";
import { FaPause, FaPlay as FaResume, FaYoutube, FaLightbulb, FaCode, FaRobot } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { RiLoopLeftFill } from "react-icons/ri";
import React, { useState, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// ─── Shared ───────────────────────────────────────────────────────────────────
const SectionHeader = ({ icon, title, color = '#2563eb', bg = '#eff6ff' }) => (
  <Box display="flex" alignItems="center" gap={2} mb={3}>
    <Box sx={{ bgcolor: bg, borderRadius: 2, p: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {React.cloneElement(icon, { size: 20, color })}
    </Box>
    <Typography variant="h6" fontWeight={700} color="text.primary">{title}</Typography>
  </Box>
);

// ─── Sort step builders (unchanged logic) ────────────────────────────────────
const bubbleSortSteps = (src) => {
  const arr = [...src]; const steps = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      const a = arr[j], b = arr[j + 1];
      steps.push({ array: [...arr], compare: [j, j + 1], text: `Compare ${a} and ${b}. ${a <= b ? 'No swap needed.' : 'Swap — smaller element goes first.'}` });
      if (a > b) { [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; steps.push({ array: [...arr], swap: [j, j + 1], text: `Swapped ${a} and ${b}. Array: [${arr.join(', ')}].` }); }
    }
  }
  return { steps };
};
const selectionSortSteps = (src) => {
  const arr = [...src]; const steps = [];
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      steps.push({ array: [...arr], compare: [minIdx, j], text: `Compare min(${arr[minIdx]}) with ${arr[j]}. ${arr[j] < arr[minIdx] ? `${arr[j]} is smaller, new min.` : `${arr[minIdx]} stays min.`}` });
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) { const a = arr[i], b = arr[minIdx]; [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]; steps.push({ array: [...arr], swap: [i, minIdx], text: `Swap ${a} with ${b} — place minimum at position ${i}. Array: [${arr.join(', ')}].` }); }
    else steps.push({ array: [...arr], text: `${arr[i]} is already in correct position ${i}.` });
  }
  return { steps };
};
const insertionSortSteps = (src) => {
  const arr = [...src]; const steps = [];
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1; const key = arr[i];
    steps.push({ array: [...arr], text: `Pick key=${key} at index ${i}. Insert it into the sorted left part.` });
    while (j >= 0 && arr[j] > key) {
      steps.push({ array: [...arr], compare: [j, j + 1], text: `${arr[j]} > ${key}, shift ${arr[j]} right.` });
      arr[j + 1] = arr[j]; j--;
    }
    arr[j + 1] = key;
    steps.push({ array: [...arr], text: `Insert ${key} at position ${j + 1}. Array: [${arr.join(', ')}].` });
  }
  return { steps };
};
const mergeSortSteps = (src) => {
  const arr = [...src]; const steps = [];
  const merge = (l, m, r) => {
    const left = arr.slice(l, m + 1), right = arr.slice(m + 1, r + 1);
    steps.push({ array: [...arr], text: `Merge [${left.join(',')}] and [${right.join(',')}].` });
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      steps.push({ array: [...arr], compare: [l + i, m + 1 + j], text: `Compare ${left[i]} vs ${right[j]}. ${left[i] <= right[j] ? `${left[i]} smaller → place at [${k}].` : `${right[j]} smaller → place at [${k}].`}` });
      if (left[i] <= right[j]) arr[k++] = left[i++]; else arr[k++] = right[j++];
    }
    while (i < left.length) { arr[k] = left[i]; steps.push({ array: [...arr], text: `Place remaining ${left[i]} at [${k}].` }); i++; k++; }
    while (j < right.length) { arr[k] = right[j]; steps.push({ array: [...arr], text: `Place remaining ${right[j]} at [${k}].` }); j++; k++; }
  };
  const sort = (l, r) => { if (l >= r) return; const m = Math.floor((l + r) / 2); sort(l, m); sort(m + 1, r); merge(l, m, r); };
  sort(0, arr.length - 1);
  return { steps };
};
const quickSortSteps = (src) => {
  const arr = [...src]; const steps = [];
  const partition = (lo, hi) => {
    const pivot = arr[hi];
    steps.push({ array: [...arr], pivot: hi, text: `Pivot = ${pivot} at index ${hi}.` });
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      steps.push({ array: [...arr], compare: [j, hi], text: `${arr[j]} vs pivot ${pivot}. ${arr[j] <= pivot ? 'Keep left.' : 'Keep right.'}` });
      if (arr[j] <= pivot) { i++; [arr[i], arr[j]] = [arr[j], arr[i]]; steps.push({ array: [...arr], swap: [i, j], text: `Swap — left side smaller. Array: [${arr.join(', ')}].` }); }
    }
    [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
    steps.push({ array: [...arr], swap: [i + 1, hi], text: `Pivot ${pivot} in correct position ${i + 1}. Array: [${arr.join(', ')}].` });
    return i + 1;
  };
  const sort = (lo, hi) => { if (lo < hi) { const p = partition(lo, hi); sort(lo, p - 1); sort(p + 1, hi); } };
  sort(0, arr.length - 1);
  return { steps };
};
const heapSortSteps = (src) => {
  const arr = [...src]; const steps = [];
  const heapify = (n, i) => {
    let largest = i; const l = 2 * i + 1, r = 2 * i + 2;
    if (l < n) { steps.push({ array: [...arr], compare: [l, largest], text: `Compare ${arr[l]} with parent ${arr[largest]}. ${arr[l] > arr[largest] ? 'New largest.' : 'Parent stays.'}` }); if (arr[l] > arr[largest]) largest = l; }
    if (r < n) { steps.push({ array: [...arr], compare: [r, largest], text: `Compare ${arr[r]} with parent ${arr[largest]}. ${arr[r] > arr[largest] ? 'New largest.' : 'Parent stays.'}` }); if (arr[r] > arr[largest]) largest = r; }
    if (largest !== i) { [arr[i], arr[largest]] = [arr[largest], arr[i]]; steps.push({ array: [...arr], swap: [i, largest], text: `Swap to maintain max-heap. Array: [${arr.join(', ')}].` }); heapify(n, largest); }
  };
  const n = arr.length;
  steps.push({ array: [...arr], text: `Build max-heap from array.` });
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
  for (let i = n - 1; i > 0; i--) { [arr[0], arr[i]] = [arr[i], arr[0]]; steps.push({ array: [...arr], swap: [0, i], text: `Extract max ${arr[i]} → place at index ${i}. Array: [${arr.join(', ')}].` }); heapify(i, 0); }
  return { steps };
};

// ─── Problem cards ────────────────────────────────────────────────────────────
const problems = [
  { id:1, title:'Sort Colors (Dutch Flag)',    difficulty:'Medium', tag:'Two Pointer', locked:false },
  { id:2, title:'Merge Sorted Arrays',         difficulty:'Easy',   tag:'Merge Sort',  locked:false },
  { id:3, title:'Kth Largest Element',         difficulty:'Medium', tag:'Quick Select',locked:false },
  { id:4, title:'Meeting Rooms II',            difficulty:'Medium', tag:'Interval',    locked:true  },
  { id:5, title:'Sort List (Linked List)',     difficulty:'Medium', tag:'Merge Sort',  locked:true  },
  { id:6, title:'Count Inversions in Array',  difficulty:'Hard',   tag:'Merge Sort',  locked:true  },
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
      {p.locked ? <Box sx={{ bgcolor:'#f1f5f9', borderRadius:1, px:1.5, py:0.6 }}><Typography sx={{ fontSize:11, color:'#94a3b8', fontWeight:600 }}>🔒 Pro</Typography></Box>
        : <Button size="small" variant="outlined" sx={{ textTransform:'none', fontSize:12, borderColor:'#2563eb', color:'#2563eb', borderRadius:1.5, py:0.3, px:1.5, minWidth:0 }}>Solve</Button>}
    </Box>
  </Box>
);

// ─── Algorithm info ───────────────────────────────────────────────────────────
const algoInfo = {
  'Bubble Sort':    { best:'O(n)', avg:'O(n²)', worst:'O(n²)', space:'O(1)', stable:true,  desc:'Repeatedly compares adjacent elements and swaps if in wrong order. Simple but slow for large data.' },
  'Selection Sort': { best:'O(n²)',avg:'O(n²)', worst:'O(n²)', space:'O(1)', stable:false, desc:'Finds the minimum element and places it at the beginning each pass. Always O(n²) regardless of input.' },
  'Insertion Sort': { best:'O(n)', avg:'O(n²)', worst:'O(n²)', space:'O(1)', stable:true,  desc:'Builds sorted array one element at a time. Efficient for small or nearly sorted arrays.' },
  'Merge Sort':     { best:'O(n log n)',avg:'O(n log n)',worst:'O(n log n)',space:'O(n)',stable:true,  desc:'Divides array in half, sorts each half, merges. Guaranteed O(n log n) but needs extra space.' },
  'Quick Sort':     { best:'O(n log n)',avg:'O(n log n)',worst:'O(n²)',     space:'O(log n)',stable:false,desc:'Picks a pivot, partitions array. Fast in practice — most used sorting algorithm.' },
  'Heap Sort':      { best:'O(n log n)',avg:'O(n log n)',worst:'O(n log n)',space:'O(1)',stable:false,desc:'Builds a max-heap then extracts elements. Guaranteed O(n log n) with O(1) space.' },
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const DSASorting = () => {
  const [algorithm, setAlgorithm] = useState("Bubble Sort");
  const [array, setArray]         = useState([34, 67, 25, 75, 23, 12, 59]);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps]         = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused]   = useState(false);
  const [input, setInput]         = useState("34, 67, 25, 75, 23, 12, 59");
  const [speed, setSpeed]         = useState(800);
  const [comparePair, setComparePair] = useState(null);
  const [swapPair, setSwapPair]   = useState(null);
  const [pivotIndex, setPivotIndex] = useState(null);
  const [descriptions, setDescriptions] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [sortedIndices, setSortedIndices] = useState([]);
  const stopRef  = useRef(false);
  const pauseRef = useRef(false);
  const descRef  = useRef(null);

  const info = algoInfo[algorithm];

  const generateRandom = () => {
    const arr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 5);
    setArray(arr); setInput(arr.join(', ')); resetStats();
  };

  const resetStats = () => {
    stopRef.current = true;
    setComparisons(0); setSwaps(0); setIsSorting(false); setIsPaused(false);
    setComparePair(null); setSwapPair(null); setPivotIndex(null);
    setDescriptions([]); setCurrentStepIndex(-1); setSortedIndices([]);
    pauseRef.current = false;
  };

  const handleSetArray = () => {
    const arr = input.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n));
    if (arr.length > 0) { setArray(arr); resetStats(); }
  };

  const pickSorter = () => {
    switch (algorithm) {
      case 'Bubble Sort':    return bubbleSortSteps;
      case 'Selection Sort': return selectionSortSteps;
      case 'Insertion Sort': return insertionSortSteps;
      case 'Merge Sort':     return mergeSortSteps;
      case 'Quick Sort':     return quickSortSteps;
      case 'Heap Sort':      return heapSortSteps;
      default: return bubbleSortSteps;
    }
  };

  const startSorting = async () => {
    if (isSorting) return;
    setComparisons(0); setSwaps(0); setSortedIndices([]);
    setIsSorting(true); setIsPaused(false);
    stopRef.current = false; pauseRef.current = false;
    const { steps } = pickSorter()(array);
    if (!steps?.length) { setIsSorting(false); return; }
    setDescriptions(steps.map(s => s.text || ''));
    setCurrentStepIndex(-1);
    let comp = 0, swp = 0;
    for (let idx = 0; idx < steps.length; idx++) {
      if (stopRef.current) break;
      while (pauseRef.current && !stopRef.current) await sleep(150);
      if (stopRef.current) break;
      const s = steps[idx];
      setArray(s.array);
      setComparePair(s.compare || null);
      setSwapPair(s.swap || null);
      setPivotIndex(typeof s.pivot === 'number' ? s.pivot : null);
      setCurrentStepIndex(idx);
      if (s.compare) { comp++; setComparisons(comp); }
      if (s.swap) { swp++; setSwaps(swp); }
      if (descRef.current) descRef.current.scrollTop = descRef.current.scrollHeight;
      await sleep(speed);
    }
    setComparePair(null); setSwapPair(null); setPivotIndex(null);
    setIsSorting(false); setIsPaused(false); pauseRef.current = false;
    if (!stopRef.current) {
      const finalArr = [...array].sort((a, b) => a - b);
      setSortedIndices(finalArr.map((_, i) => i));
    }
  };

  const togglePause = () => { pauseRef.current = !pauseRef.current; setIsPaused(pauseRef.current); };

  const barColor = (idx) => {
    if (sortedIndices.includes(idx)) return '#059669';
    if (swapPair && (idx === swapPair[0] || idx === swapPair[1])) return '#ef4444';
    if (comparePair && (idx === comparePair[0] || idx === comparePair[1])) return '#f59e0b';
    if (pivotIndex === idx) return '#a78bfa';
    return '#3b82f6';
  };

  const maxVal = Math.max(...array);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>

      {/* ── VIDEO ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <SectionHeader icon={<FaYoutube />} title="Watch First — Sorting Algorithms Explained" color="#dc2626" bg="#fef2f2" />
        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 1fr' }, gap:2 }}>
          {[
            { title:'Sorting Algorithms (Abdul Bari)', id:'pkkFqlG0Ci4', desc:'All major sorting algorithms explained with time complexity analysis' },
            { title:'Sorting Interview Questions',     id:'JU767SDMDvA', desc:'Top sorting problems asked in FAANG — strategies and patterns' },
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

      {/* ── CONTROLS ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <SectionHeader icon={<FaPlay />} title="Interactive Sorting Visualizer" color="#2563eb" bg="#eff6ff" />

        <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
          <Select value={algorithm} onChange={e => { setAlgorithm(e.target.value); resetStats(); }}
            variant="standard" disableUnderline
            sx={{ border:'1px solid #e2e8f0', borderRadius:2, px:1.5, py:0.8, minWidth:160, bgcolor:'#f8fafc' }}>
            {['Bubble Sort','Selection Sort','Insertion Sort','Merge Sort','Quick Sort','Heap Sort'].map(a => (
              <MenuItem key={a} value={a}>{a}</MenuItem>
            ))}
          </Select>

          <Box sx={{ border:'1px solid #e2e8f0', borderRadius:2, px:1.5, py:0.5, display:'flex', alignItems:'center', flex:1, maxWidth:280, bgcolor:'#f8fafc' }}>
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="e.g. 34,67,25,75,23"
              style={{ border:'none', outline:'none', fontSize:14, width:'100%', background:'transparent' }} />
          </Box>

          <Button onClick={handleSetArray} variant="contained"
            sx={{ textTransform:'none', bgcolor:'#2563eb', borderRadius:2, px:2.5, boxShadow:'none' }}>
            Set Array
          </Button>
          <Button onClick={generateRandom} variant="outlined"
            sx={{ textTransform:'none', borderColor:'#e2e8f0', color:'#64748b', borderRadius:2 }}>
            Random
          </Button>
        </Box>

        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
          <Button onClick={startSorting} disabled={isSorting} variant="contained" startIcon={<FaPlay size={12} />}
            sx={{ textTransform:'none', bgcolor:'#059669', borderRadius:2, '&:hover':{ bgcolor:'#047857' }, '&.Mui-disabled':{ bgcolor:'#6ee7b7', color:'#fff' } }}>
            Start Sort
          </Button>
          <Button onClick={togglePause} disabled={!isSorting} variant="contained"
            startIcon={isPaused ? <FaResume size={12} /> : <FaPause size={12} />}
            sx={{ textTransform:'none', bgcolor:'#f59e0b', borderRadius:2, '&:hover':{ bgcolor:'#d97706' }, '&.Mui-disabled':{ bgcolor:'#fde68a', color:'#fff' } }}>
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
          <Button onClick={resetStats} variant="outlined" startIcon={<RiLoopLeftFill />}
            sx={{ textTransform:'none', borderColor:'#e2e8f0', color:'#64748b', borderRadius:2 }}>
            Reset
          </Button>

          <Box display="flex" alignItems="center" gap={2} flex={1} maxWidth={280}>
            <Typography variant="caption" color="text.secondary" sx={{ whiteSpace:'nowrap' }}>Speed</Typography>
            <Slider value={speed} onChange={(_, v) => setSpeed(v)} step={100} min={200} max={2000}
              valueLabelDisplay="auto" valueLabelFormat={v => `${(v/1000).toFixed(1)}s`}
              sx={{ color:'#2563eb' }} />
          </Box>

          {/* Legend */}
          <Box display="flex" gap={1.5} flexWrap="wrap">
            {[
              { color:'#f59e0b', label:'Comparing' },
              { color:'#ef4444', label:'Swapping' },
              { color:'#a78bfa', label:'Pivot' },
              { color:'#059669', label:'Sorted' },
            ].map(l => (
              <Box key={l.label} display="flex" alignItems="center" gap={0.5}>
                <Box sx={{ width:10, height:10, borderRadius:'50%', bgcolor:l.color }} />
                <Typography variant="caption" color="text.secondary">{l.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ── VISUALIZER + AI + STEPS ── */}
      <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 320px' }, gap:3, mb:3 }}>

        {/* Bar chart + stats */}
        <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, border:'1px solid #e2e8f0' }}>

          {/* Algorithm info bar */}
          <Box sx={{ bgcolor:'#f8fafc', borderRadius:2, p:2, mb:2.5, display:'flex', gap:3, flexWrap:'wrap' }}>
            <Box>
              <Typography variant="caption" color="text.secondary">Best</Typography>
              <Typography variant="body2" fontWeight={700} color="#059669">{info.best}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Average</Typography>
              <Typography variant="body2" fontWeight={700} color="#d97706">{info.avg}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Worst</Typography>
              <Typography variant="body2" fontWeight={700} color="#dc2626">{info.worst}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Space</Typography>
              <Typography variant="body2" fontWeight={700} color="#7c3aed">{info.space}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Stable</Typography>
              <Typography variant="body2" fontWeight={700} color={info.stable?'#059669':'#dc2626'}>{info.stable?'Yes':'No'}</Typography>
            </Box>
          </Box>

          {/* Bars */}
          <Box sx={{ height:260, border:'1px solid #e2e8f0', borderRadius:2, p:2, display:'flex', alignItems:'flex-end', justifyContent:'center', gap:1, bgcolor:'#fafafa', mb:2 }}>
            {array.map((val, idx) => {
              const h = Math.max(20, (val / maxVal) * 210);
              return (
                <Box key={idx} sx={{ display:'flex', flexDirection:'column', alignItems:'center', flex:1, maxWidth:60 }}>
                  <Typography variant="caption" fontWeight={700} color="#1e293b" sx={{ fontSize:11, mb:0.5 }}>{val}</Typography>
                  <Box sx={{
                    width:'100%', height:`${h}px`,
                    bgcolor: barColor(idx),
                    borderRadius:'4px 4px 0 0',
                    transition:'all 0.3s ease',
                    boxShadow: (comparePair?.includes(idx) || swapPair?.includes(idx) || pivotIndex===idx) ? `0 0 12px ${barColor(idx)}88` : 'none',
                  }} />
                </Box>
              );
            })}
          </Box>

          {/* Stats */}
          <Box display="flex" gap={2}>
            {[
              { label:'Comparisons', value:comparisons, color:'#f59e0b', bg:'#fffbeb' },
              { label:'Swaps',       value:swaps,       color:'#ef4444', bg:'#fef2f2' },
              { label:'Array Size',  value:array.length,color:'#2563eb', bg:'#eff6ff' },
            ].map(s => (
              <Box key={s.label} sx={{ flex:1, bgcolor:s.bg, borderRadius:2, p:1.5, textAlign:'center' }}>
                <Typography variant="caption" color="text.secondary" display="block">{s.label}</Typography>
                <Typography variant="h6" fontWeight={700} sx={{ color:s.color }}>{s.value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right panels */}
        <Box sx={{ display:'flex', flexDirection:'column', gap:2 }}>

          {/* AI panel */}
          <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:2.5, border:'1px solid #e2e8f0' }}>
            <Box display="flex" alignItems="center" gap={1.5} mb={2}>
              <Box sx={{ bgcolor:'#f5f3ff', borderRadius:2, p:1, display:'flex' }}><FaRobot size={16} color="#7c3aed" /></Box>
              <Typography variant="body2" fontWeight={700} color="text.primary">About {algorithm}</Typography>
            </Box>
            <Box sx={{ bgcolor:'#faf5ff', border:'1px solid #ede9fe', borderRadius:2, p:2 }}>
              <Typography variant="body2" color="#4c1d95" sx={{ lineHeight:1.7 }}>{info.desc}</Typography>
            </Box>
          </Box>

          {/* Step-by-step */}
          <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:2.5, border:'1px solid #e2e8f0', flex:1 }}>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={1.5}>Step-by-step Narration</Typography>
            <Box ref={descRef} sx={{ maxHeight:280, overflowY:'auto', display:'flex', flexDirection:'column', gap:0.5 }}>
              {descriptions.length === 0
                ? <Typography variant="body2" color="text.secondary" sx={{ fontStyle:'italic' }}>Click Start Sort to see narration...</Typography>
                : descriptions.map((line, i) => (
                  <Box key={i} sx={{ bgcolor: i===currentStepIndex?'rgba(37,99,235,0.08)':'transparent', borderLeft: i===currentStepIndex?'3px solid #2563eb':'3px solid transparent', pl:1, py:0.3, borderRadius:'0 4px 4px 0', transition:'all 0.2s' }}>
                    <Typography variant="caption" color={i===currentStepIndex?'#1d4ed8':'text.secondary'} sx={{ fontWeight:i===currentStepIndex?700:400 }}>
                      {i+1}. {line}
                    </Typography>
                  </Box>
                ))
              }
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── CODE EXAMPLES ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <SectionHeader icon={<FaCode />} title="Code Examples" color="#059669" bg="#ecfdf5" />
        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 1fr' }, gap:2 }}>
          <Box>
            <Typography variant="body2" fontWeight={600} color="text.primary" mb={1}>Bubble Sort — C++</Typography>
            <Box sx={{ borderRadius:2, overflow:'hidden' }}>
              <SyntaxHighlighter language="cpp" style={atomDark} customStyle={{ margin:0, fontSize:12, borderRadius:8 }}>
{`void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++)
        for (int j = 0; j < n-i-1; j++)
            if (arr[j] > arr[j+1])
                swap(arr[j], arr[j+1]);
}`}
              </SyntaxHighlighter>
            </Box>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={600} color="text.primary" mb={1}>Quick Sort — C++</Typography>
            <Box sx={{ borderRadius:2, overflow:'hidden' }}>
              <SyntaxHighlighter language="cpp" style={atomDark} customStyle={{ margin:0, fontSize:12, borderRadius:8 }}>
{`int partition(int arr[], int lo, int hi) {
    int pivot = arr[hi], i = lo - 1;
    for (int j = lo; j < hi; j++)
        if (arr[j] <= pivot)
            swap(arr[++i], arr[j]);
    swap(arr[i+1], arr[hi]);
    return i + 1;
}`}
              </SyntaxHighlighter>
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
          <Button variant="contained" sx={{ textTransform:'none', bgcolor:'#2563eb', borderRadius:2, fontWeight:700, px:2.5, boxShadow:'none' }}>
            Upgrade — ₹49/mo
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DSASorting;