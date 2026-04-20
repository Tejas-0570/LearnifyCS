import { Box, Typography, Button, Select, MenuItem } from "@mui/material";
import { FaPlay, FaYoutube, FaLightbulb, FaCode, FaRobot } from "react-icons/fa";
import { RiLoopLeftFill } from "react-icons/ri";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import React, { useState, useEffect, useRef } from "react";

const SectionHeader = ({ icon, title, color = '#2563eb', bg = '#eff6ff' }) => (
  <Box display="flex" alignItems="center" gap={2} mb={3}>
    <Box sx={{ bgcolor: bg, borderRadius: 2, p: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {React.cloneElement(icon, { size: 20, color })}
    </Box>
    <Typography variant="h6" fontWeight={700} color="text.primary">{title}</Typography>
  </Box>
);

const problems = [
  { id:1, title:'Binary Search',               difficulty:'Easy',   tag:'Binary Search', locked:false },
  { id:2, title:'Search in Rotated Array',     difficulty:'Medium', tag:'Binary Search', locked:false },
  { id:3, title:'First and Last Position',     difficulty:'Medium', tag:'Binary Search', locked:false },
  { id:4, title:'Find Peak Element',           difficulty:'Medium', tag:'Binary Search', locked:true  },
  { id:5, title:'Median of Two Sorted Arrays', difficulty:'Hard',   tag:'Binary Search', locked:true  },
  { id:6, title:'Split Array Largest Sum',     difficulty:'Hard',   tag:'Binary Search', locked:true  },
];
const diffColor = { Easy:'#059669', Medium:'#d97706', Hard:'#dc2626' };
const diffBg    = { Easy:'#ecfdf5', Medium:'#fffbeb', Hard:'#fef2f2' };

const ProblemCard = ({ p }) => (
  <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', p:2, border:'1px solid #e2e8f0', borderRadius:2, bgcolor:'#ffffff', opacity:p.locked?0.6:1, transition:'all 0.18s', '&:hover':{ borderColor:'#0891b2', boxShadow:'0 2px 12px rgba(8,145,178,0.08)' } }}>
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
        : <Button size="small" variant="outlined" sx={{ textTransform:'none', fontSize:12, borderColor:'#0891b2', color:'#0891b2', borderRadius:1.5, py:0.3, px:1.5, minWidth:0 }}>Solve</Button>}
    </Box>
  </Box>
);

const DSASearching = () => {
  const [algorithm, setAlgorithm]   = useState("Linear Search");
  const [array, setArray]           = useState([5, 12, 18, 25, 31, 44, 58, 67, 79, 91]);
  const [arrayInput, setArrayInput] = useState("5,12,18,25,31,44,58,67,79,91");
  const [targetInput, setTargetInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [low, setLow]               = useState(-1);
  const [high, setHigh]             = useState(-1);
  const [mid, setMid]               = useState(-1);
  const [isPlaying, setIsPlaying]   = useState(false);
  const [steps, setSteps]           = useState([]);
  const [aiText, setAiText]         = useState('');
  const [statusText, setStatusText] = useState('');
  const timerRef = useRef(null);
  const stepsRef = useRef(null);

  useEffect(() => { if (stepsRef.current) stepsRef.current.scrollTop = stepsRef.current.scrollHeight; }, [steps]);

  const clearTimer = () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };

  const playActions = (actions, interval = 800) => {
    clearTimer(); setIsPlaying(true); let i = 0;
    timerRef.current = setInterval(() => {
      if (i >= actions.length) { clearTimer(); setIsPlaying(false); return; }
      try { actions[i++](); } catch (e) { i++; }
    }, interval);
  };

  const parseArr = (s) => {
    const parts = s.trim().split(/[\s,]+/).filter(Boolean).map(Number);
    return parts.every(n => !isNaN(n)) ? parts : null;
  };

  const handleRandom = () => {
    clearTimer(); setIsPlaying(false);
    const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 90) + 5).sort((a,b) => a-b);
    const unique = [...new Set(arr)].slice(0, 10);
    setArray(unique); setArrayInput(unique.join(',')); resetVisuals();
    setSteps(['Random sorted array generated. Enter a target and click Start Search.']);
  };

  const resetVisuals = () => { setCurrentIndex(-1); setFoundIndex(-1); setLow(-1); setHigh(-1); setMid(-1); setStatusText(''); };

  const handleReset = () => {
    clearTimer(); setIsPlaying(false);
    const def = [5,12,18,25,31,44,58,67,79,91];
    setArray(def); setArrayInput(def.join(',')); setTargetInput('');
    setSteps([]); setAiText(''); resetVisuals();
  };

  const handleStart = () => {
    const parsed = parseArr(arrayInput);
    if (!parsed) { setSteps(['⚠️ Invalid array input.']); return; }
    const target = Number(targetInput);
    if (isNaN(target)) { setSteps(['⚠️ Enter a numeric target value.']); return; }
    clearTimer(); resetVisuals();

    if (algorithm === 'Linear Search') {
      const arr = parsed; setArray(arr);
      setSteps([`Linear Search: Looking for ${target} in [${arr.join(', ')}]`]);
      setAiText(`Linear search checks each element one by one from left to right. Time complexity is O(n) — in the worst case we check all ${arr.length} elements.`);
      const actions = [];
      let foundAt = -1;
      for (let i = 0; i < arr.length; i++) {
        actions.push(((idx) => () => {
          setCurrentIndex(idx);
          setSteps(p => [...p, `Check arr[${idx}] = ${arr[idx]} — ${arr[idx]===target?'✅ Found!':'Not equal, continue.'}`]);
        })(i));
        if (arr[i] === target) { foundAt = i; break; }
      }
      if (foundAt >= 0) {
        actions.push(((fi) => () => { setFoundIndex(fi); setStatusText(`✅ Found ${target} at index ${fi}`); setAiText(`Found ${target} at index ${fi} after checking ${fi+1} element(s). Linear search is O(n) — not efficient for large sorted arrays. Use Binary Search instead!`); })(foundAt));
      } else {
        actions.push(() => { setCurrentIndex(-1); setStatusText(`❌ ${target} not found`); setSteps(p => [...p, `❌ ${target} not in array. Checked all ${arr.length} elements.`]); setAiText(`${target} not found after checking all ${arr.length} elements. Linear search always takes O(n) even if the array is sorted.`); });
      }
      playActions(actions);
    } else {
      const sorted = [...parsed].sort((a,b)=>a-b); setArray(sorted);
      setSteps([`Binary Search: Looking for ${target} in sorted [${sorted.join(', ')}]`]);
      setAiText(`Binary search works by repeatedly halving the search window. We compare the target with the middle element — if smaller, search left half; if larger, search right half. O(log n) time!`);
      const actions = [];
      let lo = 0, hi = sorted.length - 1;
      actions.push(() => { setLow(lo); setHigh(hi); setSteps(p => [...p, `Initial window: low=${lo}, high=${hi}`]); });
      let found = false;
      while (lo <= hi) {
        const m = Math.floor((lo + hi) / 2);
        const curLo = lo, curHi = hi, curMid = m;
        actions.push(((l,h,md,val) => () => {
          setLow(l); setHigh(h); setMid(md);
          setSteps(p => [...p, `mid = ⌊(${l}+${h})/2⌋ = ${md}, arr[${md}] = ${val}`]);
        })(lo, hi, m, sorted[m]));
        if (sorted[m] === target) {
          actions.push(((mi) => () => { setFoundIndex(mi); setStatusText(`✅ Found ${target} at index ${mi}`); setSteps(p => [...p, `✅ Found ${target} at index ${mi}!`]); setAiText(`Found ${target} at index ${mi}! Binary search took only ~${Math.ceil(Math.log2(sorted.length))} steps vs Linear's worst case of ${sorted.length} steps.`); })(m));
          found = true; break;
        } else if (sorted[m] < target) {
          const newLo = m + 1;
          actions.push(((ml,nl) => () => { setLow(nl); setMid(-1); setSteps(p => [...p, `arr[${ml}] < target → discard left half. New low=${nl}`]); })(m, newLo));
          lo = newLo;
        } else {
          const newHi = m - 1;
          actions.push(((mh,nh) => () => { setHigh(nh); setMid(-1); setSteps(p => [...p, `arr[${mh}] > target → discard right half. New high=${nh}`]); })(m, newHi));
          hi = newHi;
        }
      }
      if (!found) {
        actions.push(() => { setLow(-1); setHigh(-1); setMid(-1); setStatusText(`❌ ${target} not found`); setSteps(p => [...p, `❌ Window empty. ${target} not in array.`]); });
      }
      playActions(actions, 900);
    }
  };

  const getCellColor = (i) => {
    if (foundIndex === i) return '#059669';
    if (algorithm === 'Binary Search') {
      if (mid === i) return '#ef4444';
      if (i >= low && i <= high && low >= 0) return '#dbeafe';
      if (low >= 0) return '#f1f5f9';
    }
    if (currentIndex === i) return '#f59e0b';
    return '#ffffff';
  };
  const getCellBorder = (i) => {
    if (foundIndex === i) return '2px solid #059669';
    if (mid === i) return '2px solid #ef4444';
    if (i >= low && i <= high && low >= 0) return '2px solid #2563eb';
    if (currentIndex === i) return '2px solid #f59e0b';
    return '1px solid #e2e8f0';
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>

      {/* ── VIDEO ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <SectionHeader icon={<FaYoutube />} title="Watch First — Searching Algorithms" color="#dc2626" bg="#fef2f2" />
        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 1fr' }, gap:2 }}>
          {[
            { title:'Binary Search Explained',         id:'P3YID7pr48U', desc:'Why binary search is O(log n) and how the window works visually' },
            { title:'Binary Search Interview Patterns', id:'W9QJ5a3OHBk', desc:'Advanced binary search patterns — not just sorted arrays!' },
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

      {/* ── VISUALIZER + AI ── */}
      <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 320px' }, gap:3, mb:3 }}>
        <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, border:'1px solid #e2e8f0' }}>
          <SectionHeader icon={<FaPlay />} title="Interactive Search Visualizer" color="#0891b2" bg="#ecfeff" />

          {/* Controls */}
          <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
            <Select value={algorithm} onChange={e => { setAlgorithm(e.target.value); resetVisuals(); setSteps([]); }}
              variant="standard" disableUnderline
              sx={{ border:'1px solid #e2e8f0', borderRadius:2, px:1.5, py:0.8, minWidth:150, bgcolor:'#f8fafc' }}>
              <MenuItem value="Linear Search">Linear Search</MenuItem>
              <MenuItem value="Binary Search">Binary Search</MenuItem>
            </Select>

            <Box sx={{ border:'1px solid #e2e8f0', borderRadius:2, px:1.5, py:0.5, display:'flex', alignItems:'center', flex:1, maxWidth:250, bgcolor:'#f8fafc' }}>
              <input value={arrayInput} onChange={e => setArrayInput(e.target.value)} placeholder="Array values (comma separated)"
                style={{ border:'none', outline:'none', fontSize:13, width:'100%', background:'transparent' }} />
            </Box>

            <Box sx={{ border:'1px solid #e2e8f0', borderRadius:2, px:1.5, py:0.5, display:'flex', alignItems:'center', width:80, bgcolor:'#f8fafc' }}>
              <input value={targetInput} onChange={e => setTargetInput(e.target.value)} onKeyDown={e => e.key==='Enter'&&handleStart()}
                placeholder="Target" style={{ border:'none', outline:'none', fontSize:13, width:'100%', background:'transparent' }} />
            </Box>
          </Box>

          <Box display="flex" gap={1.5} flexWrap="wrap" mb={3}>
            <Button onClick={handleStart} disabled={isPlaying} variant="contained" startIcon={<FaPlay size={12}/>}
              sx={{ textTransform:'none', bgcolor:'#0891b2', borderRadius:2, '&:hover':{ bgcolor:'#0e7490' }, '&.Mui-disabled':{ bgcolor:'#a5f3fc', color:'#fff' } }}>
              {isPlaying ? 'Searching...' : 'Start Search'}
            </Button>
            <Button onClick={handleRandom} variant="outlined"
              sx={{ textTransform:'none', borderColor:'#e2e8f0', color:'#64748b', borderRadius:2 }}>Random Array</Button>
            <Button onClick={handleReset} variant="outlined" startIcon={<RiLoopLeftFill />}
              sx={{ textTransform:'none', borderColor:'#e2e8f0', color:'#64748b', borderRadius:2 }}>Reset</Button>
          </Box>

          {/* Binary search window legend */}
          {algorithm === 'Binary Search' && (
            <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
              {[
                { color:'#dbeafe', border:'2px solid #2563eb', label:'Search window' },
                { color:'#ef4444', border:'2px solid #ef4444', label:'Mid element' },
                { color:'#059669', border:'2px solid #059669', label:'Found!' },
                { color:'#f1f5f9', border:'1px solid #e2e8f0', label:'Eliminated' },
              ].map(l => (
                <Box key={l.label} display="flex" alignItems="center" gap={0.8}>
                  <Box sx={{ width:16, height:16, borderRadius:1, bgcolor:l.color, border:l.border }} />
                  <Typography variant="caption" color="text.secondary">{l.label}</Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Array visualization */}
          <Box sx={{ bgcolor:'#f8fafc', borderRadius:2, p:2.5, mb:2 }}>
            {/* Low/Mid/High pointers */}
            {algorithm === 'Binary Search' && low >= 0 && (
              <Box display="flex" mb={1} position="relative" sx={{ height:20 }}>
                {array.map((_, i) => (
                  <Box key={i} sx={{ flex:1, textAlign:'center', position:'relative' }}>
                    {low === i && <Typography sx={{ fontSize:9, color:'#059669', fontWeight:700, position:'absolute', top:0, left:'50%', transform:'translateX(-50%)' }}>L</Typography>}
                    {mid === i && <Typography sx={{ fontSize:9, color:'#ef4444', fontWeight:700, position:'absolute', top:0, left:'50%', transform:'translateX(-50%)' }}>M</Typography>}
                    {high === i && <Typography sx={{ fontSize:9, color:'#7c3aed', fontWeight:700, position:'absolute', top:0, left:'50%', transform:'translateX(-50%)' }}>H</Typography>}
                  </Box>
                ))}
              </Box>
            )}

            {/* Array cells */}
            <Box display="flex" gap={0.8} flexWrap="wrap">
              {array.map((val, i) => (
                <Box key={i} sx={{ textAlign:'center', flex:1, minWidth:40 }}>
                  <Box sx={{
                    border: getCellBorder(i),
                    bgcolor: getCellColor(i),
                    borderRadius:2, py:1.2,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    transition:'all 0.3s ease',
                    boxShadow: foundIndex===i ? '0 0 12px rgba(5,150,105,0.4)' : mid===i ? '0 0 12px rgba(239,68,68,0.4)' : 'none',
                  }}>
                    <Typography fontWeight={700} fontSize={15}
                      color={foundIndex===i?'#fff':mid===i?'#fff':currentIndex===i?'#92400e':'#1e293b'}>
                      {val}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize:9 }}>[{i}]</Typography>
                </Box>
              ))}
            </Box>

            {statusText && (
              <Box sx={{ mt:2, p:1.5, bgcolor: statusText.startsWith('✅')?'#ecfdf5':'#fef2f2', borderRadius:2, border:`1px solid ${statusText.startsWith('✅')?'#a7f3d0':'#fecaca'}` }}>
                <Typography variant="body2" fontWeight={700} color={statusText.startsWith('✅')?'#059669':'#dc2626'}>{statusText}</Typography>
              </Box>
            )}
          </Box>

          {/* Steps */}
          <Box ref={stepsRef} sx={{ bgcolor:'#f0f9ff', border:'1px solid #bae6fd', borderRadius:2, p:2, maxHeight:140, overflowY:'auto' }}>
            {steps.length === 0
              ? <Typography variant="body2" color="text.secondary">Enter a target and click Start Search to see steps.</Typography>
              : steps.map((s, i) => (
                <Typography key={i} variant="caption" display="block" sx={{ mb:0.4, color:s.startsWith('✅')?'#059669':s.startsWith('❌')?'#dc2626':'text.secondary' }}>
                  {s}
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
              <Typography variant="body2" fontWeight={700} color="text.primary">AI Explanation</Typography>
            </Box>
            <Box sx={{ bgcolor:'#faf5ff', border:'1px solid #ede9fe', borderRadius:2, p:2, minHeight:120 }}>
              <Typography variant="body2" color={aiText?'#4c1d95':'text.secondary'} sx={{ lineHeight:1.7, fontStyle:aiText?'normal':'italic' }}>
                {aiText || 'Start a search and I\'ll explain the logic behind each step...'}
              </Typography>
            </Box>
            <Box sx={{ mt:2, p:1.5, bgcolor:'#fffbeb', border:'1px solid #fde68a', borderRadius:2 }}>
              <Typography variant="caption" color="#92400e" fontWeight={600}>
                💡 Try Binary Search on sorted array — watch how it eliminates half each step!
              </Typography>
            </Box>
          </Box>

          <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:2.5, border:'1px solid #e2e8f0' }}>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={1.5}>Complexity Comparison</Typography>
            <Box sx={{ bgcolor:'#ecfeff', borderRadius:2, p:1.5, mb:1.5, border:'1px solid #a5f3fc' }}>
              <Typography variant="body2" fontWeight={700} color="#0891b2" mb={0.5}>Linear Search</Typography>
              <Typography variant="caption" color="text.secondary" display="block">Time: O(n) · Space: O(1)</Typography>
              <Typography variant="caption" color="text.secondary">Works on unsorted arrays</Typography>
            </Box>
            <Box sx={{ bgcolor:'#eff6ff', borderRadius:2, p:1.5, border:'1px solid #bfdbfe' }}>
              <Typography variant="body2" fontWeight={700} color="#2563eb" mb={0.5}>Binary Search</Typography>
              <Typography variant="caption" color="text.secondary" display="block">Time: O(log n) · Space: O(1)</Typography>
              <Typography variant="caption" color="text.secondary">Requires sorted array</Typography>
            </Box>
            <Box sx={{ mt:1.5, bgcolor:'#f8fafc', borderRadius:1.5, p:1.2 }}>
              <Typography variant="caption" color="text.secondary">
                For n=1000: Linear needs up to 1000 checks. Binary needs only 10!
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── THEORY ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <SectionHeader icon={<FaCode />} title="Code Examples" color="#0891b2" bg="#ecfeff" />
        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 1fr' }, gap:2 }}>
          <Box>
            <Typography variant="body2" fontWeight={600} color="text.primary" mb={1}>Linear Search — C++</Typography>
            <Box sx={{ borderRadius:2, overflow:'hidden' }}>
              <SyntaxHighlighter language="cpp" style={atomDark} customStyle={{ margin:0, fontSize:12, borderRadius:8 }}>
{`int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++)
        if (arr[i] == target) return i;
    return -1;  // not found
}
// Time: O(n)   Space: O(1)`}
              </SyntaxHighlighter>
            </Box>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={600} color="text.primary" mb={1}>Binary Search — C++</Typography>
            <Box sx={{ borderRadius:2, overflow:'hidden' }}>
              <SyntaxHighlighter language="cpp" style={atomDark} customStyle={{ margin:0, fontSize:12, borderRadius:8 }}>
{`int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
// Time: O(log n)   Space: O(1)`}
              </SyntaxHighlighter>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── PRACTICE ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <SectionHeader icon={<FaCode />} title="Practice Problems" color="#059669" bg="#ecfdf5" />
          <Box sx={{ bgcolor:'#ecfeff', border:'1px solid #a5f3fc', borderRadius:99, px:2, py:0.5 }}>
            <Typography sx={{ fontSize:12, fontWeight:700, color:'#0891b2' }}>3 Free · 3 Pro 🔒</Typography>
          </Box>
        </Box>
        <Box sx={{ display:'flex', flexDirection:'column', gap:1.5 }}>
          {problems.map(p => <ProblemCard key={p.id} p={p} />)}
        </Box>
        <Box sx={{ mt:3, p:2, background:'linear-gradient(135deg, #ecfeff, #eff6ff)', borderRadius:2, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <Box>
            <Typography variant="body2" fontWeight={700} color="text.primary">Unlock all problems + 200+ DSA questions</Typography>
            <Typography variant="caption" color="text.secondary">Company-wise · AI hints · Progress tracking</Typography>
          </Box>
          <Button variant="contained" sx={{ textTransform:'none', bgcolor:'#0891b2', borderRadius:2, fontWeight:700, px:2.5, boxShadow:'none' }}>
            Upgrade — ₹49/mo
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DSASearching;