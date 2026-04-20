import { Box, Button, Typography, Chip, Tabs, Tab, TextField } from '@mui/material';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FaPlay, FaYoutube, FaLightbulb, FaCode, FaRobot } from 'react-icons/fa';
import { RiLoopLeftFill } from 'react-icons/ri';
import { MdDataArray, MdTimer } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import React, { useState, useEffect, useRef } from 'react';

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({ icon, title, color = '#2563eb', bg = '#eff6ff' }) => (
  <Box display="flex" alignItems="center" gap={2} mb={3}>
    <Box sx={{ bgcolor: bg, borderRadius: 2, p: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {React.cloneElement(icon, { size: 20, color })}
    </Box>
    <Typography variant="h6" fontWeight={700} color="text.primary">{title}</Typography>
  </Box>
);

// ─── Complexity Badge ─────────────────────────────────────────────────────────
const ComplexityRow = ({ op, time, space, color }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between" py={1} sx={{ borderBottom: '1px solid #f1f5f9' }}>
    <Typography variant="body2" fontWeight={600} color="text.primary">{op}</Typography>
    <Box display="flex" gap={1}>
      <Box sx={{ bgcolor: `${color}18`, border: `1px solid ${color}44`, borderRadius: 1, px: 1, py: 0.2 }}>
        <Typography sx={{ fontSize: 11, fontWeight: 700, color }}>{time}</Typography>
      </Box>
    </Box>
  </Box>
);

// ─── Practice Problem Card ─────────────────────────────────────────────────────
const problems = [
  { id: 1, title: 'Find Maximum Element',        difficulty: 'Easy',   tag: 'Traversal', locked: false },
  { id: 2, title: 'Reverse an Array',             difficulty: 'Easy',   tag: 'Two Pointer', locked: false },
  { id: 3, title: 'Two Sum',                      difficulty: 'Easy',   tag: 'HashMap', locked: false },
  { id: 4, title: 'Best Time to Buy & Sell Stock',difficulty: 'Medium', tag: 'Sliding Window', locked: true  },
  { id: 5, title: 'Subarray with Given Sum',      difficulty: 'Medium', tag: 'Prefix Sum', locked: true  },
  { id: 6, title: 'Trapping Rain Water',          difficulty: 'Hard',   tag: 'Two Pointer', locked: true  },
];

const diffColor = { Easy: '#059669', Medium: '#d97706', Hard: '#dc2626' };
const diffBg    = { Easy: '#ecfdf5', Medium: '#fffbeb', Hard: '#fef2f2' };

const ProblemCard = ({ p }) => (
  <Box sx={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#ffffff',
    opacity: p.locked ? 0.6 : 1,
    transition: 'all 0.18s ease',
    '&:hover': { borderColor: '#2563eb', boxShadow: '0 2px 12px rgba(37,99,235,0.08)' },
  }}>
    <Box display="flex" alignItems="center" gap={2}>
      <Typography variant="caption" color="text.secondary" sx={{ minWidth: 24, fontWeight: 600 }}>
        {p.id}.
      </Typography>
      <Box>
        <Typography variant="body2" fontWeight={600} color={p.locked ? 'text.secondary' : 'text.primary'}>
          {p.title}
        </Typography>
        <Box sx={{ bgcolor: '#f1f5f9', borderRadius: 1, px: 0.8, py: 0.2, display: 'inline-block', mt: 0.4 }}>
          <Typography sx={{ fontSize: 10, color: '#64748b', fontWeight: 600 }}>{p.tag}</Typography>
        </Box>
      </Box>
    </Box>
    <Box display="flex" alignItems="center" gap={1.5}>
      <Box sx={{ bgcolor: diffBg[p.difficulty], borderRadius: 99, px: 1.2, py: 0.3 }}>
        <Typography sx={{ fontSize: 11, fontWeight: 700, color: diffColor[p.difficulty] }}>{p.difficulty}</Typography>
      </Box>
      {p.locked ? (
        <Box sx={{ bgcolor: '#f1f5f9', borderRadius: 1, px: 1.5, py: 0.6 }}>
          <Typography sx={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>🔒 Pro</Typography>
        </Box>
      ) : (
        <Button size="small" variant="outlined" sx={{ textTransform: 'none', fontSize: 12, borderColor: '#2563eb', color: '#2563eb', borderRadius: 1.5, py: 0.3, px: 1.5, minWidth: 0 }}>
          Solve
        </Button>
      )}
    </Box>
  </Box>
);

// ─── Main Array Component ─────────────────────────────────────────────────────
const DSAArray = () => {
  const [activeTab, setActiveTab]       = useState(0);
  const [array, setArray]               = useState([5, 2, 8, 1, 9]);
  const [inputVal, setInputVal]         = useState('');
  const [insertIndex, setInsertIndex]   = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [steps, setSteps]               = useState([]);
  const [isPlaying, setIsPlaying]       = useState(false);
  const [mode, setMode]                 = useState('traversal'); // traversal | search | insert | delete
  const [searchTarget, setSearchTarget] = useState('');
  const [foundIndex, setFoundIndex]     = useState(-1);
  const [aiText, setAiText]             = useState('');
  const intervalRef = useRef(null);

  const addStep = (msg) => setSteps(p => [...p, msg]);

  // ── Traversal ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying || mode !== 'traversal') return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev < array.length - 1) {
          const next = prev + 1;
          addStep(`Visited index ${next} → value is ${array[next]}`);
          setAiText(`We are at index ${next}. The value stored here is ${array[next]}. In memory, this is at address base + ${next} × size_of_element.`);
          return next;
        } else {
          clearInterval(intervalRef.current);
          setIsPlaying(false);
          addStep('✅ Traversal complete! Visited all elements.');
          setAiText('Traversal is complete. We visited every element exactly once — that is why traversal has O(n) time complexity.');
          return prev;
        }
      });
    }, 900);
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, array, mode]);

  const handlePlay = () => {
    if (isPlaying) return;
    setSteps([]);
    setFoundIndex(-1);
    setCurrentIndex(0);
    setIsPlaying(true);
    setMode('traversal');
    addStep(`Starting traversal at index 0 → value is ${array[0]}`);
    setAiText(`We start at index 0. The value is ${array[0]}. We will visit each element one by one from left to right.`);
  };

  const handleSearch = () => {
    const target = Number(searchTarget);
    setSteps([]);
    setFoundIndex(-1);
    setCurrentIndex(-1);
    setMode('search');
    let found = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === target) {
        setFoundIndex(i);
        addStep(`🔍 Searching for ${target}...`);
        addStep(`✅ Found ${target} at index ${i}!`);
        setAiText(`Linear search found ${target} at index ${i}. In the worst case, we'd check all ${array.length} elements — that's O(n) time.`);
        found = true;
        break;
      }
    }
    if (!found) {
      addStep(`🔍 Searching for ${target}...`);
      addStep(`❌ ${target} not found in the array.`);
      setAiText(`${target} was not found. We checked all ${array.length} elements — a full O(n) traversal.`);
    }
  };

  const handleInsert = () => {
    const val = Number(inputVal);
    const idx = insertIndex === '' ? array.length : Number(insertIndex);
    if (isNaN(val)) return;
    const newArr = [...array];
    newArr.splice(idx, 0, val);
    setArray(newArr);
    addStep(`Inserted ${val} at index ${idx}. Shifted ${array.length - idx} elements right.`);
    setAiText(`Inserting at index ${idx} required shifting all elements after that position. This is why array insertion is O(n) — not O(1).`);
    setInputVal('');
    setInsertIndex('');
  };

  const handleDelete = () => {
    const idx = Number(inputVal);
    if (isNaN(idx) || idx < 0 || idx >= array.length) return;
    const val = array[idx];
    const newArr = [...array];
    newArr.splice(idx, 1);
    setArray(newArr);
    addStep(`Deleted ${val} from index ${idx}. Shifted ${newArr.length - idx} elements left.`);
    setAiText(`Deleting from index ${idx} required shifting all elements after it left. Array deletion is O(n) because of this shifting.`);
    setInputVal('');
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
    setCurrentIndex(-1);
    setFoundIndex(-1);
    setSteps([]);
    setAiText('');
    setArray([5, 2, 8, 1, 9]);
    setMode('traversal');
  };

  const cellColor = (i) => {
    if (foundIndex === i) return '#059669';
    if (currentIndex === i) return '#2563eb';
    return '#f8fafc';
  };
  const textColor = (i) => (foundIndex === i || currentIndex === i) ? '#ffffff' : '#1e293b';

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>

      {/* ── VIDEO SECTION ── */}
      <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, p: 3, mb: 3, border: '1px solid #e2e8f0' }}>
        <SectionHeader icon={<FaYoutube />} title="Watch First — What is an Array?" color="#dc2626" bg="#fef2f2" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          {[
            { title: 'Arrays Explained (Abdul Bari)', id: 'NptnmWvkbTw', desc: 'Deep dive into arrays, memory layout and time complexity' },
            { title: 'Array Problems — Interview Guide', id: 'QJNwK2uJyGs', desc: 'Most asked array interview questions explained visually' },
          ].map(v => (
            <Box key={v.id} sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
              <Box sx={{ position: 'relative', paddingTop: '56.25%', bgcolor: '#000' }}>
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
              <Box sx={{ p: 1.5, bgcolor: '#f8fafc' }}>
                <Typography variant="body2" fontWeight={600} color="text.primary">{v.title}</Typography>
                <Typography variant="caption" color="text.secondary">{v.desc}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── THEORY SECTION ── */}
      <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, p: 3, mb: 3, border: '1px solid #e2e8f0' }}>
        <SectionHeader icon={<FaLightbulb />} title="Theory & Concepts" color="#d97706" bg="#fffbeb" />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
          <Box>
            <Typography variant="body2" fontWeight={700} color="#2563eb" mb={1}>What is an Array?</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              An array is a linear data structure that stores elements of the same type in contiguous memory locations.
              Each element is accessed using an index starting from 0. It is the most fundamental data structure in programming.
            </Typography>
          </Box>
          <Box sx={{ bgcolor: '#f8fafc', borderRadius: 2, p: 2 }}>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={1.5}>Key Characteristics</Typography>
            {[
              '📦 Fixed size — defined at creation time',
              '🔢 Same data type for all elements',
              '💾 Contiguous memory allocation',
              '⚡ O(1) random access by index',
              '0️⃣ Zero-based indexing',
            ].map(c => (
              <Typography key={c} variant="body2" color="text.secondary" sx={{ mb: 0.6, display: 'flex', alignItems: 'center', gap: 1 }}>
                {c}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Memory diagram */}
        <Box sx={{ bgcolor: '#f8fafc', borderRadius: 2, p: 2.5, mb: 3 }}>
          <Typography variant="body2" fontWeight={700} color="text.primary" mb={2}>Memory Layout</Typography>
          <Box display="flex" alignItems="center" gap={0} mb={1}>
            {[5, 2, 8, 1, 9].map((v, i) => (
              <Box key={i} sx={{ flex: 1, textAlign: 'center' }}>
                <Box sx={{ border: '2px solid #2563eb', borderRight: i === 4 ? '2px solid #2563eb' : '1px solid #2563eb', py: 1.5, bgcolor: '#eff6ff' }}>
                  <Typography fontWeight={700} color="#2563eb">{v}</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">arr[{i}]</Typography>
              </Box>
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary">Base address: 1000 | Each int = 4 bytes | arr[i] is at address 1000 + i × 4</Typography>
        </Box>

        {/* Operations */}
        <Typography variant="body2" fontWeight={700} color="text.primary" mb={1.5}>Common Operations</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 1.5, mb: 3 }}>
          {[
            { op: 'Access',    desc: 'Get element by index', complexity: 'O(1)', color: '#059669' },
            { op: 'Search',    desc: 'Find element by value', complexity: 'O(n)', color: '#d97706' },
            { op: 'Insertion', desc: 'Add at specific index', complexity: 'O(n)', color: '#d97706' },
            { op: 'Deletion',  desc: 'Remove by index',      complexity: 'O(n)', color: '#d97706' },
          ].map(o => (
            <Box key={o.op} sx={{ border: '1px solid #e2e8f0', borderRadius: 2, p: 1.5 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                <Typography variant="body2" fontWeight={700} color="text.primary">{o.op}</Typography>
                <Box sx={{ bgcolor: `${o.color}18`, borderRadius: 1, px: 0.8, py: 0.1 }}>
                  <Typography sx={{ fontSize: 11, fontWeight: 700, color: o.color }}>{o.complexity}</Typography>
                </Box>
              </Box>
              <Typography variant="caption" color="text.secondary">{o.desc}</Typography>
            </Box>
          ))}
        </Box>

        {/* Code example */}
        <Typography variant="body2" fontWeight={700} color="text.primary" mb={1}>Code Example</Typography>
        <Box sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <SyntaxHighlighter language="cpp" style={atomOneDark} customStyle={{ margin: 0, fontSize: 14, borderRadius: 8 }}>
{`int arr[] = {5, 2, 8, 1, 9};
int n = 5;

// Access — O(1)
int val = arr[2];        // val = 8

// Search — O(n)
for (int i = 0; i < n; i++) {
    if (arr[i] == 8) return i;  // returns 2
}

// Insert at index 2 — O(n)
// shifts elements: {5,2,10,8,1,9}
for (int i = n; i > 2; i--)
    arr[i] = arr[i-1];
arr[2] = 10;`}
          </SyntaxHighlighter>
        </Box>
      </Box>

      {/* ── VISUALIZER + AI PANEL ── */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 340px' }, gap: 3, mb: 3 }}>

        {/* Visualizer */}
        <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, p: 3, border: '1px solid #e2e8f0' }}>
          <SectionHeader icon={<FaPlay />} title="Interactive Visualizer" color="#2563eb" bg="#eff6ff" />

          {/* Mode tabs */}
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 2, borderBottom: '1px solid #e2e8f0' }} TabIndicatorProps={{ style: { backgroundColor: '#2563eb' } }}>
            {['Traversal', 'Search', 'Insert', 'Delete'].map((t, i) => (
              <Tab key={t} label={t} sx={{ textTransform: 'none', fontSize: 13, fontWeight: 600, color: activeTab === i ? '#2563eb' : '#64748b', minWidth: 80 }} />
            ))}
          </Tabs>

          {/* Controls based on tab */}
          <Box display="flex" gap={1.5} flexWrap="wrap" mb={3}>
            {activeTab === 0 && (
              <>
                <Button onClick={handlePlay} disabled={isPlaying} variant="contained" startIcon={<FaPlay size={12} />}
                  sx={{ textTransform: 'none', bgcolor: '#2563eb', borderRadius: 2, '&:hover': { bgcolor: '#1d4ed8' } }}>
                  {isPlaying ? 'Playing...' : 'Play Traversal'}
                </Button>
                <Button onClick={handleReset} variant="outlined" startIcon={<RiLoopLeftFill />}
                  sx={{ textTransform: 'none', borderColor: '#e2e8f0', color: '#64748b', borderRadius: 2 }}>
                  Reset
                </Button>
              </>
            )}
            {activeTab === 1 && (
              <>
                <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 2, px: 1.5, py: 0.5, display: 'flex', alignItems: 'center' }}>
                  <input value={searchTarget} onChange={e => setSearchTarget(e.target.value)} placeholder="Search value"
                    style={{ border: 'none', outline: 'none', fontSize: 14, width: 110, background: 'transparent' }} />
                </Box>
                <Button onClick={handleSearch} variant="contained" startIcon={<FaSearch size={12} />}
                  sx={{ textTransform: 'none', bgcolor: '#d97706', borderRadius: 2, '&:hover': { bgcolor: '#b45309' } }}>
                  Search
                </Button>
                <Button onClick={handleReset} variant="outlined"
                  sx={{ textTransform: 'none', borderColor: '#e2e8f0', color: '#64748b', borderRadius: 2 }}>
                  Reset
                </Button>
              </>
            )}
            {activeTab === 2 && (
              <>
                <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 2, px: 1.5, py: 0.5, display: 'flex', alignItems: 'center' }}>
                  <input value={inputVal} onChange={e => setInputVal(e.target.value)} placeholder="Value"
                    style={{ border: 'none', outline: 'none', fontSize: 14, width: 70, background: 'transparent' }} />
                </Box>
                <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 2, px: 1.5, py: 0.5, display: 'flex', alignItems: 'center' }}>
                  <input value={insertIndex} onChange={e => setInsertIndex(e.target.value)} placeholder="Index (optional)"
                    style={{ border: 'none', outline: 'none', fontSize: 14, width: 110, background: 'transparent' }} />
                </Box>
                <Button onClick={handleInsert} variant="contained" startIcon={<IoMdAdd size={14} />}
                  sx={{ textTransform: 'none', bgcolor: '#059669', borderRadius: 2, '&:hover': { bgcolor: '#047857' } }}>
                  Insert
                </Button>
                <Button onClick={handleReset} variant="outlined"
                  sx={{ textTransform: 'none', borderColor: '#e2e8f0', color: '#64748b', borderRadius: 2 }}>
                  Reset
                </Button>
              </>
            )}
            {activeTab === 3 && (
              <>
                <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 2, px: 1.5, py: 0.5, display: 'flex', alignItems: 'center' }}>
                  <input value={inputVal} onChange={e => setInputVal(e.target.value)} placeholder="Index to delete"
                    style={{ border: 'none', outline: 'none', fontSize: 14, width: 120, background: 'transparent' }} />
                </Box>
                <Button onClick={handleDelete} variant="contained" startIcon={<MdDelete size={14} />}
                  sx={{ textTransform: 'none', bgcolor: '#dc2626', borderRadius: 2, '&:hover': { bgcolor: '#b91c1c' } }}>
                  Delete
                </Button>
                <Button onClick={handleReset} variant="outlined"
                  sx={{ textTransform: 'none', borderColor: '#e2e8f0', color: '#64748b', borderRadius: 2 }}>
                  Reset
                </Button>
              </>
            )}
          </Box>

          {/* Array visualization */}
          <Box sx={{ bgcolor: '#f8fafc', borderRadius: 2, p: 3, mb: 2 }}>
            <Box display="flex" justifyContent="center" gap={1.5} flexWrap="wrap">
              {array.map((value, index) => (
                <Box key={index} sx={{ textAlign: 'center' }}>
                  <Box sx={{
                    width: 52, height: 52, borderRadius: 2,
                    bgcolor: cellColor(index),
                    color: textColor(index),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, fontWeight: 700,
                    border: currentIndex === index ? '2px solid #1d4ed8' : foundIndex === index ? '2px solid #047857' : '2px solid #e2e8f0',
                    transition: 'all 0.3s ease',
                    boxShadow: currentIndex === index || foundIndex === index ? '0 4px 12px rgba(37,99,235,0.25)' : 'none',
                  }}>
                    {value}
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>
                    [{index}]
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Current state indicators */}
            {currentIndex >= 0 && (
              <Box display="flex" justifyContent="center" gap={4} mt={2.5}>
                <Box textAlign="center">
                  <Typography variant="caption" color="text.secondary">Current Index</Typography>
                  <Typography variant="h6" fontWeight={700} color="#2563eb">{currentIndex}</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="caption" color="text.secondary">Current Value</Typography>
                  <Typography variant="h6" fontWeight={700} color="#2563eb">{array[currentIndex]}</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="caption" color="text.secondary">Array Length</Typography>
                  <Typography variant="h6" fontWeight={700} color="#2563eb">{array.length}</Typography>
                </Box>
              </Box>
            )}
          </Box>

          {/* Step log */}
          <Box sx={{ bgcolor: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 2, p: 2, maxHeight: 140, overflowY: 'auto' }}>
            {steps.length === 0 ? (
              <Typography variant="body2" color="text.secondary">Click Play or perform an operation to see step-by-step execution here.</Typography>
            ) : steps.map((s, i) => (
              <Typography key={i} variant="body2" sx={{ mb: 0.4 }}>
                <span style={{ color: '#2563eb', fontWeight: 700 }}>Step {i + 1}:</span> {s}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* AI Explanation Panel */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

          {/* AI panel */}
          <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, p: 2.5, border: '1px solid #e2e8f0', flex: 1 }}>
            <Box display="flex" alignItems="center" gap={1.5} mb={2}>
              <Box sx={{ bgcolor: '#f5f3ff', borderRadius: 2, p: 1, display: 'flex' }}>
                <FaRobot size={18} color="#7c3aed" />
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={700} color="text.primary">AI Explanation</Typography>
                <Typography variant="caption" color="text.secondary">Explains each step in simple language</Typography>
              </Box>
            </Box>

            <Box sx={{ bgcolor: '#faf5ff', border: '1px solid #ede9fe', borderRadius: 2, p: 2, minHeight: 120 }}>
              {aiText ? (
                <Typography variant="body2" color="#4c1d95" sx={{ lineHeight: 1.7 }}>
                  {aiText}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Perform any operation on the visualizer and I'll explain what's happening and why...
                </Typography>
              )}
            </Box>

            <Box sx={{ mt: 2, p: 1.5, bgcolor: '#fffbeb', border: '1px solid #fde68a', borderRadius: 2 }}>
              <Typography variant="caption" color="#92400e" fontWeight={600}>
                💡 Pro tip: Try inserting at index 0 and watch why it's slower than inserting at the end!
              </Typography>
            </Box>
          </Box>

          {/* Complexity Card */}
          <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, p: 2.5, border: '1px solid #e2e8f0' }}>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={1.5}>Complexity Analysis</Typography>
            <ComplexityRow op="Access"    time="O(1)"  color="#059669" />
            <ComplexityRow op="Search"    time="O(n)"  color="#d97706" />
            <ComplexityRow op="Insertion" time="O(n)"  color="#d97706" />
            <ComplexityRow op="Deletion"  time="O(n)"  color="#d97706" />
            <Box sx={{ mt: 1.5, bgcolor: '#f0fdf4', borderRadius: 1.5, p: 1.2 }}>
              <Typography variant="caption" color="#166534" fontWeight={600}>Space: O(n) — proportional to number of elements</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── PRACTICE PROBLEMS ── */}
      <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, p: 3, mb: 3, border: '1px solid #e2e8f0' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <SectionHeader icon={<FaCode />} title="Practice Problems" color="#059669" bg="#ecfdf5" />
          <Box sx={{ bgcolor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 99, px: 2, py: 0.5 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#2563eb' }}>3 Free · 3 Pro 🔒</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {problems.map(p => <ProblemCard key={p.id} p={p} />)}
        </Box>

        <Box sx={{ mt: 3, p: 2, background: 'linear-gradient(135deg, #eff6ff, #f5f3ff)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" fontWeight={700} color="text.primary">Unlock all 6 problems + 200+ DSA questions</Typography>
            <Typography variant="caption" color="text.secondary">Company-wise sets · AI hints · Progress tracking</Typography>
          </Box>
          <Button variant="contained" sx={{ textTransform: 'none', bgcolor: '#2563eb', borderRadius: 2, fontWeight: 700, px: 2.5, '&:hover': { bgcolor: '#1d4ed8' } }}>
            Upgrade — ₹49/mo
          </Button>
        </Box>
      </Box>

    </Box>
  );
};

export default DSAArray;