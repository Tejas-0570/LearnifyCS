// DSASorting.jsx
import { Box, Typography, Input, Button, Select, MenuItem, Slider } from "@mui/material";
import { FaStop } from "react-icons/fa";
import { FaPause, FaPlay as FaResume } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { RiLoopLeftFill } from "react-icons/ri";
import React, { useState, useRef } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import PracticeProblem from "../../components/PracticeProblem";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Step shape:
 * { array: number[], compare?: [i,j], swap?: [i,j], writeIndex?: number, pivot?: number, text?: string }
 */

// ---------------- SORT STEP BUILDERS (with narration text) ---------------- //
const bubbleSortSteps = (src) => {
  const arr = [...src];
  const steps = [];

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      const a = arr[j],
        b = arr[j + 1];

      // Step: Compare
      steps.push({
        array: [...arr],
        compare: [j, j + 1],
        text: `Compare ${a} and ${b}. Since ${a} ${a <= b ? "is less than or equal to" : "is greater than"} ${b}, ${a <= b ? "no swap is needed." : "swap them so that the smaller element comes first."
          }`,
      });

      // Step: Swap (if needed)
      if (a > b) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          array: [...arr],
          swap: [j, j + 1],
          text: `Swapped ${a} and ${b}. Array becomes [${arr.join(", ")}].`,
        });
      }
    }
  }

  return { steps };
};


const selectionSortSteps = (src) => {
  const arr = [...src];
  const steps = [];

  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      steps.push({
        array: [...arr],
        compare: [minIdx, j],
        text: `Compare current minimum ${arr[minIdx]} with ${arr[j]}. ${arr[j] < arr[minIdx]
            ? `${arr[j]} is smaller, update minimum index to ${j}.`
            : `${arr[minIdx]} remains the minimum.`
          }`,
      });
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      const a = arr[i], b = arr[minIdx];
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        array: [...arr],
        swap: [i, minIdx],
        text: `Swap ${a} with ${b} to place the smallest element at position ${i}. Array becomes [${arr.join(", ")}].`,
      });
    } else {
      steps.push({
        array: [...arr],
        text: `Minimum element is already in the correct place at index ${i}.`,
      });
    }
  }
  return { steps };
};


const insertionSortSteps = (src) => {
  const arr = [...src];
  const steps = [];

  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    const key = arr[i];
    steps.push({
      array: [...arr],
      text: `Take element ${key} at index ${i} and insert it into the sorted part of the array.`,
    });

    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        compare: [j, j + 1],
        text: `Compare ${arr[j]} with ${key}. Since ${arr[j]} is greater, shift ${arr[j]} one position to the right.`,
      });
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
    steps.push({
      array: [...arr],
      text: `Insert ${key} at position ${j + 1}. Array becomes [${arr.join(", ")}].`,
    });
  }
  return { steps };
};

const mergeSortSteps = (src) => {
  const arr = [...src];
  const steps = [];

  const merge = (l, m, r) => {
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);

    steps.push({
      array: [...arr],
      text: `Merging subarrays [${left.join(", ")}] and [${right.join(", ")}].`,
    });

    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      steps.push({
        array: [...arr],
        compare: [l + i, m + 1 + j],
        text: `Compare ${left[i]} (left) and ${right[j]} (right). ${left[i] <= right[j]
            ? `${left[i]} is smaller, place it into array at index ${k}.`
            : `${right[j]} is smaller, place it into array at index ${k}.`
          }`,
      });
      if (left[i] <= right[j]) arr[k++] = left[i++];
      else arr[k++] = right[j++];
    }
    while (i < left.length) {
      arr[k] = left[i];
      steps.push({
        array: [...arr],
        text: `Place remaining ${left[i]} from left subarray at index ${k}.`,
      });
      i++; k++;
    }
    while (j < right.length) {
      arr[k] = right[j];
      steps.push({
        array: [...arr],
        text: `Place remaining ${right[j]} from right subarray at index ${k}.`,
      });
      j++; k++;
    }
  };

  const sort = (l, r) => {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    sort(l, m);
    sort(m + 1, r);
    merge(l, m, r);
  };

  sort(0, arr.length - 1);
  return { steps };
};


const quickSortSteps = (src) => {
  const arr = [...src];
  const steps = [];

  const partition = (lo, hi) => {
    const pivot = arr[hi];
    steps.push({
      array: [...arr],
      pivot: hi,
      text: `Choose pivot = ${pivot} at index ${hi}.`,
    });

    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      steps.push({
        array: [...arr],
        compare: [j, hi],
        text: `Compare ${arr[j]} with pivot ${pivot}. ${arr[j] <= pivot ? `${arr[j]} is less than or equal to pivot, so keep it on the left.` : `${arr[j]} is greater than pivot, so it stays on the right.`
          }`,
      });
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          array: [...arr],
          swap: [i, j],
          text: `Swap ${arr[i]} and ${arr[j]} to ensure left side has smaller elements. Array becomes [${arr.join(", ")}].`,
        });
      }
    }
    [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
    steps.push({
      array: [...arr],
      swap: [i + 1, hi],
      text: `Place pivot ${pivot} at correct position index ${i + 1}. Array becomes [${arr.join(", ")}].`,
    });
    return i + 1;
  };

  const sort = (lo, hi) => {
    if (lo < hi) {
      const p = partition(lo, hi);
      sort(lo, p - 1);
      sort(p + 1, hi);
    }
  };

  sort(0, arr.length - 1);
  return { steps };
};


const heapSortSteps = (src) => {
  const arr = [...src];
  const steps = [];

  const heapify = (n, i) => {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < n) {
      steps.push({
        array: [...arr],
        compare: [l, largest],
        text: `Compare ${arr[l]} with parent ${arr[largest]}. ${arr[l] > arr[largest] ? `${arr[l]} is larger, update largest.` : `Parent ${arr[largest]} remains larger.`
          }`,
      });
      if (arr[l] > arr[largest]) largest = l;
    }

    if (r < n) {
      steps.push({
        array: [...arr],
        compare: [r, largest],
        text: `Compare ${arr[r]} with parent ${arr[largest]}. ${arr[r] > arr[largest] ? `${arr[r]} is larger, update largest.` : `Parent ${arr[largest]} remains larger.`
          }`,
      });
      if (arr[r] > arr[largest]) largest = r;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      steps.push({
        array: [...arr],
        swap: [i, largest],
        text: `Swap ${arr[i]} and ${arr[largest]} to maintain max-heap property. Array becomes [${arr.join(", ")}].`,
      });
      heapify(n, largest);
    }
  };

  const n = arr.length;
  steps.push({ array: [...arr], text: `Build a max heap from the array.` });
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    steps.push({
      array: [...arr],
      swap: [0, i],
      text: `Extract max element ${arr[i]} and place it at index ${i}. Array becomes [${arr.join(", ")}].`,
    });
    heapify(i, 0);
  }

  return { steps };
};


// --------------------------------------------------------------------------- //

const DSASorting = () => {
  const [algorithm, setAlgorithm] = useState("Bubble Sort");
  const [array, setArray] = useState([34, 67, 25, 75, 23, 12, 59]);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // NEW state for Pause/Resume      
  const [input, setInput] = useState(array.join(", "));
  const stopRef = useRef(false);
  const pauseRef = useRef(false); // NEW REF
  const [speed, setSpeed] = useState(2000); // default 2s


  // Visual highlight state
  const [comparePair, setComparePair] = useState(null);
  const [swapPair, setSwapPair] = useState(null);
  const [writeIndex, setWriteIndex] = useState(null);
  const [pivotIndex, setPivotIndex] = useState(null);

  // Description states
  const [descriptions, setDescriptions] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);

  // Generate random array
  const generateRandomArray = () => {
    const arr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 99));
    setArray(arr);
    setInput(arr.join(", "));
    resetStats(false);
  };

  // Reset stats
  const resetStats = (clearArray = false) => {
    if (clearArray) setArray([]);
    setComparisons(0);
    setSwaps(0);
    setIsSorting(false);
    setIsPaused(false);
    stopRef.current = true;
    setComparePair(null);
    setSwapPair(null);
    setWriteIndex(null);
    setPivotIndex(null);
    setDescriptions([]);
    setCurrentStepIndex(-1);
  };

  // Parse input string
  const handleSetArray = () => {
    const arr = input
      .split(",")
      .map((n) => parseInt(n.trim(), 10))
      .filter((n) => !isNaN(n));
    if (arr.length > 0) {
      setArray(arr);
      resetStats(false);
    }
  };

  const pickSorter = () => {
    switch (algorithm) {
      case "Bubble Sort": return bubbleSortSteps;
      case "Selection Sort": return selectionSortSteps;
      case "Insertion Sort": return insertionSortSteps;
      case "Merge Sort": return mergeSortSteps;
      case "Quick Sort": return quickSortSteps;
      case "Heap Sort": return heapSortSteps;
      default: return bubbleSortSteps;
    }
  };

  // Sorting loop
  // Sorting loop
  const startSorting = async () => {
    if (isSorting) return;
    setComparisons(0);
    setSwaps(0);
    setIsSorting(true);
    setIsPaused(false);
    stopRef.current = false;
    pauseRef.current = false;

    const { steps } = pickSorter()(array);
    if (!steps || steps.length === 0) {
      setIsSorting(false);
      return;
    }

    setDescriptions(steps.map((s) => s.text || ""));
    setCurrentStepIndex(-1);

    let comp = 0;
    let swp = 0;

    for (let idx = 0; idx < steps.length; idx++) {
      if (stopRef.current) break;

      // ✅ Correct pause handling
      while (pauseRef.current && !stopRef.current) {
        await sleep(200);
      }
      if (stopRef.current) break;

      const s = steps[idx];
      setArray(s.array);
      setComparePair(s.compare || null);
      setSwapPair(s.swap || null);
      setWriteIndex(typeof s.writeIndex === "number" ? s.writeIndex : null);
      setPivotIndex(typeof s.pivot === "number" ? s.pivot : null);

      setCurrentStepIndex(idx);

      if (s.compare) {
        comp++;
        setComparisons(comp);
      }
      if (s.swap) {
        swp++;
        setSwaps(swp);
      }

      await sleep(speed);
    }

    setComparePair(null);
    setSwapPair(null);
    setWriteIndex(null);
    setPivotIndex(null);
    setIsSorting(false);
    setIsPaused(false);
    pauseRef.current = false;
  };


  // Pause/Resume
  const togglePauseResume = () => {
    pauseRef.current = !pauseRef.current;
    setIsPaused(pauseRef.current);
  };

  const barColor = (idx) => {
    if (swapPair && (idx === swapPair[0] || idx === swapPair[1])) return "#ef4444";
    if (comparePair && (idx === comparePair[0] || idx === comparePair[1])) return "#f59e0b";
    if (writeIndex === idx) return "#22c55e";
    if (pivotIndex === idx) return "#a78bfa";
    return "#9ca3af";
  };

  return (
    <>
      <Box width={"100%"} gap={2} display={"flex"} flexDirection={"column"}>
        {/* Controls */}
        <Box
          display={"flex"}
          flexDirection={"column"}
          bgcolor={"#ffffff"}
          height={"130px"}
          borderRadius={2}
          p={3}
        >
          <Box display={"flex"} justifyContent={"left"} gap={37} mb={1}>
            <Typography>Algorithm</Typography>
            <Typography>Array Input</Typography>
          </Box>

          <Box display={"flex"} gap={2}>
            <Select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              variant="standard"
              disableUnderline
              sx={{
                border: "1px solid gray",
                borderRadius: 2,
                px: 1,
                py: 0.5,
                width: "30%",
                "&.Mui-focused": { border: "2px solid black" },
                backgroundColor: "white",
              }}
            >
              <MenuItem value="Bubble Sort">Bubble Sort</MenuItem>
              <MenuItem value="Selection Sort">Selection Sort</MenuItem>
              <MenuItem value="Insertion Sort">Insertion Sort</MenuItem>
              <MenuItem value="Merge Sort">Merge Sort</MenuItem>
              <MenuItem value="Quick Sort">Quick Sort</MenuItem>
              <MenuItem value="Heap Sort">Heap Sort</MenuItem>
            </Select>

            <Input
              placeholder="e.g. 34,67,25,75,23"
              disableUnderline
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{
                border: "2px solid gray",
                borderRadius: 2,
                p: 0.5,
                width: "30%",
                "&.Mui-focused": { border: "2px solid black" },
                backgroundColor: "white",
              }}
            />

            <Button
              onClick={handleSetArray}
              sx={{
                textTransform: "none",
                p: 1,
                bgcolor: "#3b82f6",
                color: "#ffffff",
                width: "20%",
                borderRadius: 2.5,
                "&:hover": { bgcolor: "#2265d4" },
              }}
            >
              Set Array
            </Button>
            <Button
              onClick={generateRandomArray}
              sx={{
                textTransform: "none",
                p: 1,
                bgcolor: "#6b7280",
                color: "#ffffff",
                width: "15%",
                borderRadius: 2.5,
                "&:hover": { bgcolor: "#5a606e" },
              }}
            >
              Random
            </Button>
          </Box>

          <Box display={"flex"} gap={2} mt={1.5}>
            <Button
              disabled={isSorting}
              onClick={startSorting}
              sx={{
                textTransform: "none",
                p: 1,
                width: "12%",
                bgcolor: "#22c55e",
                color: "#ffffff",
                borderRadius: 2.5,
                "&:hover": { bgcolor: "#0da143" },
              }}
            >
              <FaPlay style={{ marginRight: 5 }} />
              Start
            </Button>
            <Button
              disabled={!isSorting}
              onClick={togglePauseResume}
              sx={{
                textTransform: "none",
                p: 1,
                width: "12%",
                bgcolor: "#f97316",
                color: "#ffffff",
                borderRadius: 2.5,
                "&:hover": { bgcolor: "#ea580c" },
              }}
            >
              {isPaused ? (
                <>
                  <FaResume style={{ marginRight: 5 }} />
                  Resume
                </>
              ) : (
                <>
                  <FaPause style={{ marginRight: 5 }} />
                  Pause
                </>
              )}
            </Button>
            <Button
              onClick={() => resetStats(false)}
              sx={{
                textTransform: "none",
                p: 1,
                width: "12%",
                bgcolor: "#6b7280",
                color: "#ffffff",
                borderRadius: 2.5,
                "&:hover": { bgcolor: "#5a606e" },
              }}
            >
              <RiLoopLeftFill style={{ marginRight: 5 }} />
              Reset
            </Button>
            <Box display="flex" alignItems="center" gap={2} ml={2} width="30%">
              <Typography variant="body2">Speed</Typography>
              <Slider
                value={speed}
                onChange={(e, val) => setSpeed(val)}
                step={500}
                min={500}
                max={3000}
                valueLabelDisplay="auto"
                valueLabelFormat={(val) => `${(val / 1000).toFixed(1)}s`}
              />
            </Box>

          </Box>
        </Box>

        <Box display={"flex"} justifyContent={"center"} width={"100%"} gap={2}>
          {/* Visualization */}
          <Box bgcolor={"#ffffff"} height={"450px"} borderRadius={2} p={3} width={"75%"}>
            <Typography variant="h6" fontWeight={600}>
              Sorting Visualization
            </Typography>

            <Box
              height={"70%"}
              width={"96%"}
              border={"2px solid #dedfe0"}
              borderRadius={2}
              mt={3}
              p={2}
              display="flex"
              alignItems="end"
              justifyContent="center"
              gap={1}
              sx={{ overflow: "hidden" }}
            >
              {array.map((val, idx) => (
                <Box
                  key={idx}
                  height={`${val * 3}px`}
                  width="30px"
                  bgcolor={barColor(idx)}
                  borderRadius={1}
                  display="flex"
                  alignItems="flex-end"
                  justifyContent="center"
                  sx={{
                    transition: "all 1.5s ease",
                  }}
                >
                  <Typography variant="caption" sx={{ color: "white", fontWeight: 600 }}>
                    {val}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Stats */}
            <Box display={"flex"} justifyContent={"center"} mt={1} gap={3}>
              <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Typography variant="body1" color="text.secondary">
                  Comparisons
                </Typography>
                <Typography variant="h5" color="#2563eb" fontWeight={600}>
                  {comparisons}
                </Typography>
              </Box>
              <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Typography variant="body1" color="text.secondary">
                  Swaps
                </Typography>
                <Typography variant="h5" color="#2563eb" fontWeight={600}>
                  {swaps}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* RIGHT SIDE (25%) - Step-by-step Description */}
          <Box height={"475px"} width={"25%"} borderRadius={2} bgcolor={"#ffffff"} p={1.5} display="flex" flexDirection="column">
            <Typography variant="h6" fontWeight={600}>
              Step-by-step Description
            </Typography>

            <Box mt={2} sx={{ overflowY: "auto", flex: 1 }}>
              {descriptions.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Click <strong>Start</strong> to see step-by-step narration here.
                </Typography>
              ) : (
                descriptions.map((line, i) => (
                  <Typography
                    key={i}
                    variant="body2"
                    sx={{
                      mb: 0.5,
                      background: i === currentStepIndex ? "rgba(67,138,247,0.10)" : "none",
                      borderLeft: i === currentStepIndex ? "3px solid #438af7" : "none",
                      pl: i === currentStepIndex ? 1 : 0,
                    }}
                  >
                    {i + 1}. {line}
                  </Typography>
                ))
              )}
            </Box>
          </Box>
        </Box>

        {/* Theory accordion */}
        <Box bgcolor={"#f0f8ff"} width={"100%"} mb={2}>
          <Accordion sx={{ borderRadius: 2, boxShadow: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: "bold" }}>
              <Typography fontWeight={"bold"}>Theory & Examples</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography variant="h6" mb={1}>
                Sorting Algorithms
              </Typography>
              <Typography mb={2}>
                Sorting algorithms are used to arrange elements in a list or array in a particular order.
              </Typography>

              <SyntaxHighlighter language="cpp" style={darcula} customStyle={{ borderRadius: 10 }}>
                {`// Example (pseudo):
// Bubble sort: repeatedly step through the list,
// compare adjacent elements and swap if they are in the wrong order.`}
              </SyntaxHighlighter>
            </AccordionDetails>
          </Accordion>
        </Box>

        <PracticeProblem />
      </Box>
    </>
  );
};

export default DSASorting;
