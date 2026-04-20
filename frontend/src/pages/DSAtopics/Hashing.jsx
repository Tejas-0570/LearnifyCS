import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Select, MenuItem } from "@mui/material";
import { FaPlay, FaYoutube, FaLightbulb, FaCode, FaRobot, FaSearch } from "react-icons/fa";
import { RiLoopLeftFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaRandom, FaCalculator } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const SectionHeader = ({ icon, title, color = '#2563eb', bg = '#eff6ff' }) => (
  <Box display="flex" alignItems="center" gap={2} mb={3}>
    <Box sx={{ bgcolor: bg, borderRadius: 2, p: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {React.cloneElement(icon, { size: 20, color })}
    </Box>
    <Typography variant="h6" fontWeight={700} color="text.primary">{title}</Typography>
  </Box>
);

const TABLE_SIZE = 11;

const problems = [
  { id:1, title:'Two Sum',                       difficulty:'Easy',   tag:'HashMap',   locked:false },
  { id:2, title:'Group Anagrams',                difficulty:'Medium', tag:'HashMap',   locked:false },
  { id:3, title:'Longest Consecutive Sequence',  difficulty:'Medium', tag:'HashSet',   locked:false },
  { id:4, title:'Subarray Sum Equals K',         difficulty:'Medium', tag:'Prefix Sum',locked:true  },
  { id:5, title:'Top K Frequent Elements',       difficulty:'Medium', tag:'Bucket Sort',locked:true },
  { id:6, title:'LRU Cache',                     difficulty:'Medium', tag:'HashMap',   locked:true  },
];
const diffColor = { Easy:'#059669', Medium:'#d97706', Hard:'#dc2626' };
const diffBg    = { Easy:'#ecfdf5', Medium:'#fffbeb', Hard:'#fef2f2' };

const ProblemCard = ({ p }) => (
  <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', p:2, border:'1px solid #e2e8f0', borderRadius:2, bgcolor:'#ffffff', opacity:p.locked?0.6:1, transition:'all 0.18s', '&:hover':{ borderColor:'#4f46e5', boxShadow:'0 2px 12px rgba(79,70,229,0.08)' } }}>
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
        : <Button size="small" variant="outlined" sx={{ textTransform:'none', fontSize:12, borderColor:'#4f46e5', color:'#4f46e5', borderRadius:1.5, py:0.3, px:1.5, minWidth:0 }}>Solve</Button>}
    </Box>
  </Box>
);

// ─── Hash Table Slot ──────────────────────────────────────────────────────────
const Slot = ({ idx, value, isHighlighted, algorithm }) => {
  const isDeleted = value && value.deleted;
  const isEmpty = value === null || value === undefined || (Array.isArray(value) && value.length === 0);
  const displayVal = () => {
    if (isEmpty) return '';
    if (isDeleted) return 'DEL';
    if (Array.isArray(value)) return value.join('→');
    return String(value);
  };

  return (
    <Box sx={{
      display:'flex', flexDirection:'column', alignItems:'center',
      minWidth: algorithm === 'Chaining' ? 68 : 52,
    }}>
      {/* Index label */}
      <Typography variant="caption" color="text.secondary" sx={{ fontSize:9, mb:0.3, fontWeight:600 }}>[{idx}]</Typography>

      {/* Slot box */}
      <Box sx={{
        width:'100%', minHeight:48,
        border: isHighlighted ? '2px solid #f59e0b' : '1.5px solid #e2e8f0',
        bgcolor: isHighlighted ? '#fffbeb' : isEmpty ? '#f8fafc' : isDeleted ? '#fef2f2' : '#eff6ff',
        borderRadius:2,
        display:'flex', alignItems:'center', justifyContent:'center',
        transition:'all 0.3s ease',
        boxShadow: isHighlighted ? '0 0 12px rgba(245,158,11,0.4)' : 'none',
        px:0.5,
      }}>
        <Typography
          variant="caption"
          fontWeight={isEmpty?400:700}
          sx={{
            color: isHighlighted?'#92400e' : isDeleted?'#dc2626' : isEmpty?'#cbd5e1' : '#4f46e5',
            fontSize: 12, textAlign:'center', wordBreak:'break-all',
          }}
        >
          {isEmpty ? '∅' : displayVal()}
        </Typography>
      </Box>
    </Box>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const DSAHashing = () => {
  const [algorithm, setAlgorithm]   = useState('Chaining');
  const [keyInput, setKeyInput]     = useState('');
  const [table, setTable]           = useState(() => Array(TABLE_SIZE).fill(null));
  const [elements, setElements]     = useState(0);
  const [collisions, setCollisions] = useState(0);
  const [steps, setSteps]           = useState([]);
  const [aiText, setAiText]         = useState('');
  const [highlighted, setHighlighted] = useState(null);
  const [isPlaying, setIsPlaying]   = useState(false);
  const [hashCalc, setHashCalc]     = useState('Enter a key to see hash calculation');
  const timersRef = useRef([]);
  const stepsRef  = useRef(null);

  useEffect(() => { if (stepsRef.current) stepsRef.current.scrollTop = stepsRef.current.scrollHeight; }, [steps]);
  useEffect(() => { resetTable(false); }, [algorithm]);

  useEffect(() => {
    const k = keyInput.trim();
    if (!k) { setHashCalc('Enter a key to see hash calculation'); return; }
    const n = Number(k);
    if (isNaN(n)) { setHashCalc('Invalid key (must be a number)'); return; }
    const idx = Math.abs(n) % TABLE_SIZE;
    setHashCalc(`hash(${n}) = |${n}| % ${TABLE_SIZE} = ${Math.abs(n)} % ${TABLE_SIZE} = ${idx}`);
  }, [keyInput]);

  const hashFn = (k) => Math.abs(Number(k)) % TABLE_SIZE;

  const clearTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; setIsPlaying(false); };

  const runActions = (actions, delay = 600) => {
    clearTimers(); setIsPlaying(true);
    let i = 0;
    const next = () => {
      if (i >= actions.length) { setIsPlaying(false); setHighlighted(null); return; }
      try { actions[i++](); } catch(e) { i++; }
      timersRef.current.push(setTimeout(next, delay));
    };
    next();
  };

  const addStep = (msg) => setSteps(p => [...p, msg]);

  const resetTable = (clearLog = true) => {
    clearTimers(); setHighlighted(null); setElements(0); setCollisions(0);
    setTable(Array(TABLE_SIZE).fill(null));
    if (clearLog) { setSteps([]); setAiText(''); }
  };

  // ── INSERT ────────────────────────────────────────────────────────────────
  const handleInsert = () => {
    if (isPlaying || !keyInput.trim()) return;
    const k = Number(keyInput);
    if (isNaN(k)) { addStep('⚠️ Please enter a valid number.'); return; }
    const idx = hashFn(k);
    const actions = [];

    actions.push(() => { addStep(`INSERT(${k}): hash(${k}) = ${idx}`); setHighlighted(idx); });

    if (algorithm === 'Chaining') {
      actions.push(() => {
        setTable(prev => {
          const t = [...prev];
          const slot = t[idx] ? [...t[idx]] : [];
          const isCollision = slot.length > 0;
          slot.push(k);
          t[idx] = slot;
          if (isCollision) {
            setCollisions(c => c + 1);
            addStep(`💥 Collision at slot ${idx}! Chaining: appended ${k} → [${slot.join(', ')}]`);
            setAiText(`Collision occurred at index ${idx}. With Separate Chaining, we simply append the new key to the linked list at that slot. This is why the average search time is O(1 + α) where α is the load factor.`);
          } else {
            addStep(`✅ Slot ${idx} was empty. Placed ${k}.`);
            setAiText(`No collision at index ${idx}. The key ${k} is placed directly. With a good hash function and low load factor, most insertions are O(1).`);
          }
          return t;
        });
        setElements(e => e + 1);
      });
    } else {
      // probing
      let placed = false;
      for (let i = 0; i < TABLE_SIZE; i++) {
        const pos = algorithm === 'Linear Probing'
          ? (idx + i) % TABLE_SIZE
          : (idx + i * i) % TABLE_SIZE;
        const probeNum = i;
        actions.push(((p, pn) => () => {
          setHighlighted(p);
          setTable(prev => {
            const t = [...prev];
            const cell = t[p];
            if (!placed && (cell === null || (cell && cell.deleted))) {
              t[p] = k;
              placed = true;
              setElements(e => e + 1);
              addStep(`✅ Probe ${pn}: Slot ${p} empty → placed ${k}.`);
              setAiText(`After ${pn} probe(s), found empty slot ${p} for key ${k}. ${pn > 0 ? `The ${pn} collision(s) add extra work — this is why we want load factor < 0.7 for open addressing.` : 'No collision — O(1) insertion!'}`);
            } else if (!placed) {
              if (pn === 0) setCollisions(c => c + 1);
              addStep(`💥 Probe ${pn}: Slot ${p} occupied (${cell}) → probe next.`);
            }
            return t;
          });
        })(pos, i));
        if (placed) break;
      }
    }
    setKeyInput('');
    runActions(actions);
  };

  // ── SEARCH ────────────────────────────────────────────────────────────────
  const handleSearch = () => {
    if (isPlaying || !keyInput.trim()) return;
    const k = Number(keyInput);
    if (isNaN(k)) { addStep('⚠️ Please enter a valid number.'); return; }
    const idx = hashFn(k);
    const actions = [];
    actions.push(() => { addStep(`SEARCH(${k}): hash(${k}) = ${idx}`); setHighlighted(idx); });

    if (algorithm === 'Chaining') {
      actions.push(() => {
        const slot = table[idx];
        if (!slot || slot.length === 0) {
          addStep(`❌ Slot ${idx} is empty. ${k} not in table.`);
          setAiText(`Key ${k} not found. Slot ${idx} is empty, so ${k} was never inserted here.`);
        } else if (slot.includes(k)) {
          addStep(`✅ Found ${k} in slot ${idx}: [${slot.join(', ')}]`);
          setAiText(`Found ${k}! It's at slot ${idx} in the chain [${slot.join(', ')}]. Search took O(1 + chain_length) time.`);
        } else {
          addStep(`❌ ${k} not in chain at slot ${idx}: [${slot.join(', ')}]`);
          setAiText(`Key ${k} not found. Slot ${idx} has [${slot.join(', ')}] but ${k} is not among them.`);
        }
      });
    } else {
      for (let i = 0; i < TABLE_SIZE; i++) {
        const pos = algorithm === 'Linear Probing' ? (idx + i) % TABLE_SIZE : (idx + i * i) % TABLE_SIZE;
        actions.push(((p, pn) => () => {
          setHighlighted(p);
          const cell = table[p];
          if (cell === null) addStep(`❌ Probe ${pn}: Slot ${p} empty → ${k} not in table.`);
          else if (cell && cell.deleted) addStep(`⏭️ Probe ${pn}: Slot ${p} has DELETED marker → continue.`);
          else if (cell === k) { addStep(`✅ Probe ${pn}: Found ${k} at slot ${p}!`); setAiText(`Found ${k} at slot ${p} after ${pn+1} probe(s). The DELETED markers ensure we don't stop early during search.`); }
          else addStep(`Probe ${pn}: Slot ${p} = ${cell} ≠ ${k} → continue.`);
        })(pos, i));
      }
    }
    setKeyInput('');
    runActions(actions);
  };

  // ── DELETE ────────────────────────────────────────────────────────────────
  const handleDelete = () => {
    if (isPlaying || !keyInput.trim()) return;
    const k = Number(keyInput);
    if (isNaN(k)) return;
    const idx = hashFn(k);
    const actions = [];
    actions.push(() => { addStep(`DELETE(${k}): hash(${k}) = ${idx}`); setHighlighted(idx); });

    if (algorithm === 'Chaining') {
      actions.push(() => {
        setTable(prev => {
          const t = [...prev]; const slot = t[idx];
          if (!slot || !slot.includes(k)) { addStep(`❌ ${k} not found in slot ${idx}.`); return t; }
          t[idx] = slot.filter(v => v !== k); if (t[idx].length === 0) t[idx] = null;
          setElements(e => Math.max(0, e-1));
          addStep(`✅ Deleted ${k} from slot ${idx}.`);
          setAiText(`Deleted ${k} from the chain at slot ${idx}. Chaining deletion is straightforward — just remove from the linked list.`);
          return t;
        });
      });
    } else {
      for (let i = 0; i < TABLE_SIZE; i++) {
        const pos = algorithm === 'Linear Probing' ? (idx + i) % TABLE_SIZE : (idx + i * i) % TABLE_SIZE;
        actions.push(((p) => () => {
          setHighlighted(p);
          setTable(prev => {
            const t = [...prev]; const cell = t[p];
            if (cell === null) { addStep(`❌ Slot ${p} empty → ${k} not present.`); return t; }
            if (cell && cell.deleted) { addStep(`Skip DELETED slot ${p}.`); return t; }
            if (cell === k) { t[p] = { deleted: true }; setElements(e => Math.max(0,e-1)); addStep(`✅ Marked slot ${p} as DELETED (lazy deletion).`); setAiText(`In open addressing, we use "lazy deletion" — marking slots as DELETED instead of null. This prevents breaking the probe chain for future searches.`); return t; }
            addStep(`Slot ${p} = ${cell} ≠ ${k} → continue.`);
            return t;
          });
        })(pos));
      }
    }
    setKeyInput('');
    runActions(actions);
  };

  // ── RANDOM ────────────────────────────────────────────────────────────────
  const handleRandom = () => {
    if (isPlaying) return;
    resetTable(true);
    const keys = [];
    while (keys.length < 6) { const k = Math.floor(Math.random()*80)+5; if (!keys.includes(k)) keys.push(k); }
    addStep(`Auto-inserting: [${keys.join(', ')}]`);
    setAiText(`Watch how keys are distributed across the table. The hash function determines where each key goes, and collisions are handled based on the selected strategy.`);
    const allActions = [];
    keys.forEach(k => {
      const idx = hashFn(k);
      if (algorithm === 'Chaining') {
        allActions.push(() => setHighlighted(idx));
        allActions.push(() => {
          setTable(prev => {
            const t = [...prev]; const slot = t[idx] ? [...t[idx]] : [];
            if (slot.length > 0) setCollisions(c => c+1);
            slot.push(k); t[idx] = slot;
            setElements(e => e+1);
            addStep(`Insert ${k} → slot ${idx} [${slot.join(',')}]`);
            return t;
          });
        });
        allActions.push(() => setHighlighted(null));
      } else {
        let placed = false;
        for (let i = 0; i < TABLE_SIZE; i++) {
          const pos = algorithm === 'Linear Probing' ? (idx+i)%TABLE_SIZE : (idx+i*i)%TABLE_SIZE;
          allActions.push(((p,pn,kk) => () => {
            setHighlighted(p);
            setTable(prev => {
              const t = [...prev]; const cell = t[p];
              if (!placed && (cell===null||(cell&&cell.deleted))) {
                t[p] = kk; placed=true; setElements(e=>e+1);
                if (pn>0) setCollisions(c=>c+1);
                addStep(`Insert ${kk} → slot ${p} (${pn} probe${pn===1?'':'s'})`);
              }
              return t;
            });
          })(pos,i,k));
          if (placed) break;
        }
        allActions.push(() => setHighlighted(null));
      }
    });
    runActions(allActions, 400);
  };

  const loadFactor = (elements / TABLE_SIZE).toFixed(2);
  const loadColor  = loadFactor > 0.7 ? '#dc2626' : loadFactor > 0.5 ? '#d97706' : '#059669';

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>

      {/* ── VIDEO ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <SectionHeader icon={<FaYoutube />} title="Watch First — Hashing Explained" color="#dc2626" bg="#fef2f2" />
        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 1fr' }, gap:2 }}>
          {[
            { title:'Hashing & Hash Tables (Abdul Bari)', id:'KyUTuwz_b7Q', desc:'Hash functions, collision handling, chaining vs open addressing' },
            { title:'HashMap Interview Questions',        id:'shs0KM3wKv8', desc:'Top 10 HashMap problems — patterns and solutions explained' },
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
          <SectionHeader icon={<FaPlay />} title="Interactive Hash Table" color="#4f46e5" bg="#eef2ff" />

          {/* Controls */}
          <Box display="flex" gap={1.5} flexWrap="wrap" mb={2}>
            <Box sx={{ border:'1px solid #e2e8f0', borderRadius:2, px:1.5, py:0.8, display:'flex', alignItems:'center', bgcolor:'#f8fafc' }}>
              <input value={keyInput} onChange={e => setKeyInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleInsert()}
                placeholder="Enter key (number)"
                style={{ border:'none', outline:'none', fontSize:14, width:130, background:'transparent' }} />
            </Box>

            <Select value={algorithm} onChange={e => setAlgorithm(e.target.value)}
              variant="standard" disableUnderline
              sx={{ border:'1px solid #e2e8f0', borderRadius:2, px:1.5, py:0.5, minWidth:160, bgcolor:'#f8fafc' }}>
              <MenuItem value="Chaining">Separate Chaining</MenuItem>
              <MenuItem value="Linear Probing">Linear Probing</MenuItem>
              <MenuItem value="Quadratic Probing">Quadratic Probing</MenuItem>
            </Select>
          </Box>

          <Box display="flex" gap={1.5} flexWrap="wrap" mb={3}>
            <Button onClick={handleInsert} disabled={isPlaying} variant="contained" size="small" startIcon={<IoMdAdd size={13}/>}
              sx={{ textTransform:'none', bgcolor:'#4f46e5', borderRadius:2, '&:hover':{ bgcolor:'#4338ca' } }}>Insert</Button>
            <Button onClick={handleSearch} disabled={isPlaying} variant="contained" size="small" startIcon={<FaSearch size={11}/>}
              sx={{ textTransform:'none', bgcolor:'#059669', borderRadius:2, '&:hover':{ bgcolor:'#047857' } }}>Search</Button>
            <Button onClick={handleDelete} disabled={isPlaying} variant="contained" size="small" startIcon={<MdDelete size={13}/>}
              sx={{ textTransform:'none', bgcolor:'#dc2626', borderRadius:2, '&:hover':{ bgcolor:'#b91c1c' } }}>Delete</Button>
            <Button onClick={handleRandom} disabled={isPlaying} variant="outlined" size="small" startIcon={<FaRandom size={11}/>}
              sx={{ textTransform:'none', borderColor:'#d97706', color:'#d97706', borderRadius:2 }}>Random</Button>
            <Button onClick={() => resetTable(true)} disabled={isPlaying} variant="outlined" size="small" startIcon={<RiLoopLeftFill />}
              sx={{ textTransform:'none', borderColor:'#e2e8f0', color:'#64748b', borderRadius:2 }}>Reset</Button>
          </Box>

          {/* Hash function calculator */}
          <Box sx={{ bgcolor:'#fef2f2', border:'1px solid #fecaca', borderRadius:2, p:2, mb:2.5 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <FaCalculator size={14} color="#dc2626" />
              <Typography variant="body2" fontWeight={700} color="#dc2626">Hash Function</Typography>
            </Box>
            <Box sx={{ bgcolor:'#ffffff', borderRadius:1.5, p:1.5, border:'1px solid #fecaca' }}>
              <Typography variant="body2" sx={{ fontFamily:'monospace', color:'#1e293b' }}>{hashCalc}</Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt:0.5, display:'block' }}>
              Formula: index = |key| % TABLE_SIZE ({TABLE_SIZE})
            </Typography>
          </Box>

          {/* Hash table visualization */}
          <Box sx={{ bgcolor:'#f8fafc', borderRadius:2, border:'1px solid #e2e8f0', p:2, mb:2 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={1.5}>
              HASH TABLE — SIZE {TABLE_SIZE}
            </Typography>
            <Box sx={{ overflowX:'auto', pb:1 }}>
              <Box display="flex" gap={0.8} sx={{ minWidth:'max-content' }}>
                {table.map((slot, idx) => (
                  <Slot key={idx} idx={idx} value={slot} isHighlighted={highlighted===idx} algorithm={algorithm} />
                ))}
              </Box>
            </Box>

            {/* Chaining explanation for non-empty slots */}
            {algorithm === 'Chaining' && table.some(s => s && s.length > 1) && (
              <Box sx={{ mt:1.5, p:1, bgcolor:'#fffbeb', borderRadius:1.5, border:'1px solid #fde68a' }}>
                <Typography variant="caption" color="#92400e">
                  💡 Slots showing multiple values (e.g., "15→26") are chains — linked lists at that index
                </Typography>
              </Box>
            )}
          </Box>

          {/* Stats */}
          <Box display="flex" gap={2} mb={2}>
            {[
              { label:'Load Factor', value:loadFactor, sub:`${elements}/${TABLE_SIZE}`, color:loadColor, bg:`${loadColor}10` },
              { label:'Collisions',  value:collisions,  sub:'total events',             color:'#d97706', bg:'#fffbeb' },
              { label:'Elements',    value:elements,    sub:'stored keys',              color:'#4f46e5', bg:'#eef2ff' },
            ].map(s => (
              <Box key={s.label} sx={{ flex:1, bgcolor:s.bg, borderRadius:2, p:1.5, textAlign:'center', border:`1px solid ${s.color}22` }}>
                <Typography variant="caption" color="text.secondary" display="block">{s.label}</Typography>
                <Typography variant="h6" fontWeight={700} sx={{ color:s.color }}>{s.value}</Typography>
                <Typography variant="caption" color="text.secondary">{s.sub}</Typography>
              </Box>
            ))}
          </Box>

          {/* Load factor warning */}
          {parseFloat(loadFactor) > 0.7 && (
            <Box sx={{ p:1.5, bgcolor:'#fef2f2', border:'1px solid #fecaca', borderRadius:2, mb:2 }}>
              <Typography variant="caption" color="#dc2626" fontWeight={600}>
                ⚠️ High load factor ({loadFactor})! Performance degrades. In real systems, the table would resize (rehash) now.
              </Typography>
            </Box>
          )}

          {/* Step log */}
          <Box ref={stepsRef} sx={{ bgcolor:'#f0f9ff', border:'1px solid #bae6fd', borderRadius:2, p:2, maxHeight:130, overflowY:'auto' }}>
            {steps.length === 0
              ? <Typography variant="body2" color="text.secondary">Insert, search or delete a key to see operations logged here.</Typography>
              : steps.map((s, i) => (
                <Typography key={i} variant="caption" display="block" sx={{ mb:0.4, color:s.startsWith('✅')?'#059669':s.startsWith('❌')?'#dc2626':s.startsWith('💥')?'#d97706':'text.secondary' }}>
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
                {aiText || 'Perform any hash table operation and I\'ll explain the collision handling strategy...'}
              </Typography>
            </Box>
            <Box sx={{ mt:2, p:1.5, bgcolor:'#fffbeb', border:'1px solid #fde68a', borderRadius:2 }}>
              <Typography variant="caption" color="#92400e" fontWeight={600}>
                💡 Try: Insert 11, 22, 33 with Chaining — they all hash to same slot!
              </Typography>
            </Box>
          </Box>

          <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:2.5, border:'1px solid #e2e8f0' }}>
            <Typography variant="body2" fontWeight={700} color="text.primary" mb={1.5}>Complexity Analysis</Typography>
            <Box sx={{ mb:1.5 }}>
              <Typography variant="caption" color="#4f46e5" fontWeight={700} display="block" mb={1}>Separate Chaining</Typography>
              {[['Average',   'O(1 + α)','#059669'],['Worst Case','O(n)','#dc2626']].map(([op,t,c]) => (
                <Box key={op} display="flex" justifyContent="space-between" py={0.5} sx={{ borderBottom:'1px solid #f1f5f9' }}>
                  <Typography variant="caption" color="text.secondary">{op}</Typography>
                  <Box sx={{ bgcolor:`${c}18`, borderRadius:1, px:0.8, py:0.1 }}><Typography sx={{ fontSize:10, fontWeight:700, color:c }}>{t}</Typography></Box>
                </Box>
              ))}
            </Box>
            <Box>
              <Typography variant="caption" color="#4f46e5" fontWeight={700} display="block" mb={1}>Open Addressing</Typography>
              {[['Average',   'O(1/(1-α))','#059669'],['Worst Case','O(n)','#dc2626'],['Requires','α < 1','#d97706']].map(([op,t,c]) => (
                <Box key={op} display="flex" justifyContent="space-between" py={0.5} sx={{ borderBottom:'1px solid #f1f5f9' }}>
                  <Typography variant="caption" color="text.secondary">{op}</Typography>
                  <Box sx={{ bgcolor:`${c}18`, borderRadius:1, px:0.8, py:0.1 }}><Typography sx={{ fontSize:10, fontWeight:700, color:c }}>{t}</Typography></Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ mt:1.5, bgcolor:'#eef2ff', borderRadius:1.5, p:1.2 }}>
              <Typography variant="caption" color="#4338ca" fontWeight={600}>α = load factor = n/m (elements/table size)</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── THEORY ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <SectionHeader icon={<FaLightbulb />} title="Theory — Collision Handling" color="#d97706" bg="#fffbeb" />
        <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', md:'1fr 1fr 1fr' }, gap:2, mb:3 }}>
          {[
            { title:'Separate Chaining', color:'#4f46e5', bg:'#eef2ff', border:'#c7d2fe', desc:'Each slot stores a linked list. On collision, append to the list. Load factor can exceed 1. Cache-unfriendly due to pointer chasing.' },
            { title:'Linear Probing',    color:'#059669', bg:'#ecfdf5', border:'#a7f3d0', desc:'On collision, probe next slot: (h(k) + i) % m. Simple and cache-friendly. Suffers from primary clustering — long runs form.' },
            { title:'Quadratic Probing', color:'#d97706', bg:'#fffbeb', border:'#fde68a', desc:'Probe: (h(k) + i²) % m. Reduces primary clustering. But secondary clustering can occur. Requires α < 0.5 for guaranteed insertion.' },
          ].map(c => (
            <Box key={c.title} sx={{ border:`1px solid ${c.border}`, borderRadius:2, p:2, bgcolor:c.bg }}>
              <Typography variant="body2" fontWeight={700} sx={{ color:c.color, mb:1 }}>{c.title}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight:1.6 }}>{c.desc}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ borderRadius:2, overflow:'hidden' }}>
          <SyntaxHighlighter language="cpp" style={atomDark} customStyle={{ margin:0, fontSize:12, borderRadius:8 }}>
{`// Hash function
int hash(int key, int tableSize) {
    return abs(key) % tableSize;
}

// Separate Chaining — using unordered_map (C++ STL)
#include <unordered_map>
unordered_map<int, string> hashMap;
hashMap[42] = "Alice";       // insert/update — O(1) avg
string val = hashMap[42];    // lookup — O(1) avg
hashMap.erase(42);           // delete — O(1) avg
bool found = hashMap.count(42); // search — O(1) avg`}
          </SyntaxHighlighter>
        </Box>
      </Box>

      {/* ── PRACTICE ── */}
      <Box sx={{ bgcolor:'#ffffff', borderRadius:3, p:3, mb:3, border:'1px solid #e2e8f0' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <SectionHeader icon={<FaCode />} title="Practice Problems" color="#059669" bg="#ecfdf5" />
          <Box sx={{ bgcolor:'#eef2ff', border:'1px solid #c7d2fe', borderRadius:99, px:2, py:0.5 }}>
            <Typography sx={{ fontSize:12, fontWeight:700, color:'#4f46e5' }}>3 Free · 3 Pro 🔒</Typography>
          </Box>
        </Box>
        <Box sx={{ display:'flex', flexDirection:'column', gap:1.5 }}>
          {problems.map(p => <ProblemCard key={p.id} p={p} />)}
        </Box>
        <Box sx={{ mt:3, p:2, background:'linear-gradient(135deg, #eef2ff, #f5f3ff)', borderRadius:2, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <Box>
            <Typography variant="body2" fontWeight={700} color="text.primary">Unlock all problems + 200+ DSA questions</Typography>
            <Typography variant="caption" color="text.secondary">Company-wise · AI hints · Progress tracking</Typography>
          </Box>
          <Button variant="contained" sx={{ textTransform:'none', bgcolor:'#4f46e5', borderRadius:2, fontWeight:700, px:2.5, boxShadow:'none' }}>
            Upgrade — ₹49/mo
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DSAHashing;