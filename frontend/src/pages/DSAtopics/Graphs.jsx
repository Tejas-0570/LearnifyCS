import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { RiLoopLeftFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { FaRandom } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import PracticeProblem from "../../components/PracticeProblem";

const DSAGraphs = () => {
  const [algorithm, setAlgorithm] = useState("BFS Traversal");
  const [mode, setMode] = useState(null); // "node" or "edge"
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  // weight dialog
  const [openWeightDialog, setOpenWeightDialog] = useState(false);
  const [pendingEdge, setPendingEdge] = useState(null);
  const [weight, setWeight] = useState("");

  // traversal states
  const [openSourceDialog, setOpenSourceDialog] = useState(false);
  const [sourceNode, setSourceNode] = useState("");
  const [visitedNodes, setVisitedNodes] = useState([]);

  // panels: queue/stack/priority queue visual, processed (scratched), description steps
  const [panelQueue, setPanelQueue] = useState([]); // elements shown in the queue panel
  const [processedSet, setProcessedSet] = useState(new Set()); // elements scratched in queue
  const [visitedPanel, setVisitedPanel] = useState([]); // order in bottom panel
  const [descriptions, setDescriptions] = useState([]); // list of step strings
  const [currentStepIndex, setCurrentStepIndex] = useState(-1); // highlight

  // animation control
  const timersRef = useRef([]);

  // ---- helpers to clean animation
  const clearTimers = () => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    // clear timers on unmount or when algo changes
    return () => clearTimers();
  }, []);

  const handleAddNodeClick = () => {
    setMode("node");
  };

  const handleAddEdgeClick = () => {
    setMode("edge");
    setSelectedNode(null);
  };

  const handleCanvasClick = (e) => {
    if (mode !== "node") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newNode = {
      id: nodes.length + 1,
      x,
      y,
    };
    setNodes([...nodes, newNode]);
  };

  const handleNodeClick = (node) => {
    if (mode !== "edge") return;

    if (!selectedNode) {
      setSelectedNode(node);
    } else if (selectedNode.id !== node.id) {
      if (algorithm === "Dijkstra's Algorithm") {
        setPendingEdge({ from: selectedNode, to: node });
        setOpenWeightDialog(true);
      } else {
        setEdges([...edges, { from: selectedNode, to: node }]);
      }
      setSelectedNode(null);
    }
  };

  const handleSaveWeight = () => {
    if (pendingEdge) {
      setEdges([...edges, { ...pendingEdge, weight }]);
      setPendingEdge(null);
      setWeight("");
    }
    setOpenWeightDialog(false);
  };

  const handleReset = () => {
    clearTimers();
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setVisitedNodes([]);
    setPanelQueue([]);
    setProcessedSet(new Set());
    setVisitedPanel([]);
    setDescriptions([]);
    setCurrentStepIndex(-1);
    setSourceNode("");
  };

  const handleRandomGraph = () => {
    const numNodes = Math.floor(Math.random() * 6) + 5; // 5–10 nodes
    const newNodes = [];
    const newEdges = [];
    const canvasWidth = 800;
    const canvasHeight = 350;
    const minDistance = 80;

    const isTooClose = (x, y, nodesArr) => {
      return nodesArr.some((node) => {
        const dx = node.x - x;
        const dy = node.y - y;
        return Math.sqrt(dx * dx + dy * dy) < minDistance;
      });
    };

    for (let i = 1; i <= numNodes; i++) {
      let x,
        y,
        attempts = 0;
      do {
        x = Math.floor(Math.random() * (canvasWidth - 60)) + 30;
        y = Math.floor(Math.random() * (canvasHeight - 60)) + 30;
        attempts++;
      } while (isTooClose(x, y, newNodes) && attempts < 200);

      newNodes.push({ id: i, x, y });
    }

    for (let i = 0; i < numNodes; i++) {
      const connections = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < connections; j++) {
        const target = Math.floor(Math.random() * numNodes);
        if (
          target !== i &&
          !newEdges.find(
            (e) =>
              (e.from.id === newNodes[i].id &&
                e.to.id === newNodes[target].id) ||
              (e.from.id === newNodes[target].id &&
                e.to.id === newNodes[i].id)
          )
        ) {
          if (algorithm === "Dijkstra's Algorithm") {
            newEdges.push({
              from: newNodes[i],
              to: newNodes[target],
              weight: Math.floor(Math.random() * 20) + 1,
            });
          } else {
            newEdges.push({
              from: newNodes[i],
              to: newNodes[target],
            });
          }
        }
      }
    }

    setNodes(newNodes);
    setEdges(newEdges);
  };

  // ---------- Adj Lists ----------
  const buildAdjList = () => {
    const adj = {};
    nodes.forEach((n) => (adj[n.id] = []));
    edges.forEach((e) => {
      adj[e.from.id].push(e.to.id);
      adj[e.to.id].push(e.from.id);
    });
    return adj;
  };

  const buildWeightedAdjList = () => {
    const adj = {};
    nodes.forEach((n) => (adj[n.id] = []));
    edges.forEach((e) => {
      const w = Number(e.weight) || 1; // ensure number
      adj[e.from.id].push({ node: e.to.id, weight: w });
      adj[e.to.id].push({ node: e.from.id, weight: w });
    });
    return adj;
  };

  // ---------- Step Generators (BFS / DFS) ----------
  // Each step has: {queue, processed: Set, visitedOrder, current, text}
  // ---------- BFS ----------
const generateBfsSteps = (source) => {
  const adj = buildAdjList();
  const steps = [];
  const discovered = new Set([source]);
  const q = [source];
  const visitedOrder = [];

  steps.push({
    queue: [...q],
    processed: new Set(),
    visitedOrder: [...visitedOrder],
    current: null,
    text: `Let's begin Breadth First Search (BFS) from vertex ${source}. We first mark ${source} as discovered and place it in the queue.`,
  });

  while (q.length) {
    const u = q[0];
    visitedOrder.push(u);

    steps.push({
      queue: [...q],
      processed: new Set([...(steps.at(-1)?.processed || []), u]),
      visitedOrder: [...visitedOrder],
      current: u,
      text: `Now we take ${u} from the front of the queue and visit it. Let's explore all its connected neighbors one by one.`,
    });

    for (const v of adj[u] || []) {
      if (!discovered.has(v)) {
        discovered.add(v);
        q.push(v);
        steps.push({
          queue: [...q],
          processed: new Set([...(steps.at(-1)?.processed || [])]),
          visitedOrder: [...visitedOrder],
          current: u,
          text: `Vertex ${v} is not discovered yet, so we mark it as discovered and add it to the queue for future exploration.`,
        });
      } else {
        steps.push({
          queue: [...q],
          processed: new Set([...(steps.at(-1)?.processed || [])]),
          visitedOrder: [...visitedOrder],
          current: u,
          text: `Vertex ${v} is already discovered earlier, so we skip it and move to the next neighbor.`,
        });
      }
    }

    q.shift();
    steps.push({
      queue: [...q],
      processed: new Set([...(steps.at(-1)?.processed || [])]),
      visitedOrder: [...visitedOrder],
      current: null,
      text: `We have now finished exploring all neighbors of ${u}. So we remove ${u} from the queue and continue to the next vertex.`,
    });
  }

  steps.push({
    queue: [],
    processed: new Set([...(steps.at(-1)?.processed || [])]),
    visitedOrder: [...visitedOrder],
    current: null,
    text: `BFS traversal is now complete! The final visiting order is: ${visitedOrder.join(" → ")}.`,
  });

  return steps;
};

// ---------- DFS ----------
const generateDfsSteps = (source) => {
  const adj = buildAdjList();
  const steps = [];
  const discovered = new Set([source]);
  const st = [source];
  const visitedOrder = [];

  steps.push({
    queue: [...st],
    processed: new Set(),
    visitedOrder: [],
    current: null,
    text: `Let's start Depth First Search (DFS) from vertex ${source}. We begin by pushing ${source} onto the stack.`,
  });

  while (st.length) {
    const u = st.pop();

    steps.push({
      queue: [...st, u],
      processed: new Set([...(steps.at(-1)?.processed || []), u]),
      visitedOrder: [...visitedOrder],
      current: u,
      text: `We pop ${u} from the top of the stack to visit it. Now we will check all its neighbors.`,
    });

    if (!visitedOrder.includes(u)) visitedOrder.push(u);

    const neigh = [...(adj[u] || [])].reverse();
    for (const v of neigh) {
      if (!discovered.has(v)) {
        discovered.add(v);
        st.push(v);
        steps.push({
          queue: [...st],
          processed: new Set([...(steps.at(-1)?.processed || [])]),
          visitedOrder: [...visitedOrder],
          current: u,
          text: `Vertex ${v} is unvisited, so we push it onto the stack. We'll explore it after finishing with ${u}.`,
        });
      } else {
        steps.push({
          queue: [...st],
          processed: new Set([...(steps.at(-1)?.processed || [])]),
          visitedOrder: [...visitedOrder],
          current: u,
          text: `Vertex ${v} was already visited earlier, so we skip it and continue.`,
        });
      }
    }
  }

  steps.push({
    queue: [],
    processed: new Set([...(steps.at(-1)?.processed || [])]),
    visitedOrder: [...visitedOrder],
    current: null,
    text: `DFS traversal is now complete! The visiting order is: ${visitedOrder.join(" → ")}.`,
  });

  return steps;
};

// ---------- Dijkstra ----------
const generateDijkstraSteps = (source) => {
  const adj = buildWeightedAdjList();
  const dist = {};
  nodes.forEach((n) => (dist[n.id] = Infinity));
  dist[source] = 0;

  const visited = new Set();
  const steps = [];
  const visitedOrder = [];
  const pq = [{ node: source, dist: 0 }];

  steps.push({
    queue: pq.map((x) => `${x.node}(${x.dist})`),
    processed: new Set(),
    visitedOrder: [],
    current: null,
    text: `We begin Dijkstra’s algorithm from vertex ${source}. Initially, we set all distances to infinity except for ${source}, which is 0.`,
  });

  while (pq.length) {
    pq.sort((a, b) => a.dist - b.dist);
    const { node: u, dist: du } = pq.shift();
    if (visited.has(u)) continue;

    visited.add(u);
    visitedOrder.push(u);

    steps.push({
      queue: pq.map((x) => `${x.node}(${x.dist})`),
      processed: new Set([...(steps.at(-1)?.processed || []), `${u}(${du})`]),
      visitedOrder: [...visitedOrder],
      current: u,
      text: `Now we pick vertex ${u} with the smallest distance value (${du}). This means ${u} now has its shortest path finalized.`,
    });

    for (const { node: v, weight: w } of adj[u] || []) {
      if (!visited.has(v) && du + w < dist[v]) {
        dist[v] = du + w;
        pq.push({ node: v, dist: dist[v] });
        steps.push({
          queue: pq.map((x) => `${x.node}(${x.dist})`),
          processed: new Set([...(steps.at(-1)?.processed || [])]),
          visitedOrder: [...visitedOrder],
          current: u,
          text: `Checking neighbor ${v} from ${u}. The new distance (${du}+${w}=${dist[v]}) is smaller, so we update it and add ${v} back into the priority queue.`,
        });
      } else {
        steps.push({
          queue: pq.map((x) => `${x.node}(${x.dist})`),
          processed: new Set([...(steps.at(-1)?.processed || [])]),
          visitedOrder: [...visitedOrder],
          current: u,
          text: `Checking neighbor ${v}. The new path through ${u} is not shorter, so we keep the existing distance ${dist[v]}.`,
        });
      }
    }
  }

  steps.push({
    queue: [],
    processed: new Set([...(steps.at(-1)?.processed || [])]),
    visitedOrder: [...visitedOrder],
    current: null,
    text:
      `Dijkstra’s algorithm completed! The shortest distance from ${source} to every vertex is:\n` +
      Object.entries(dist)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ") +
      `.`,
  });

  return steps;
};


  // ---------- Animation Runner ----------
  const playSteps = (steps, speed = 1000) => {
    clearTimers();

    // reset panels
    setVisitedNodes([]);
    setPanelQueue([]);
    setProcessedSet(new Set());
    setVisitedPanel([]);
    setDescriptions(steps.map((s) => s.text));
    setCurrentStepIndex(-1);

    steps.forEach((step, idx) => {
      const id = setTimeout(() => {
        setCurrentStepIndex(idx);
        // queue/panel
        setPanelQueue(step.queue);
        setProcessedSet(step.processed);
        // visited in panel & canvas
        setVisitedPanel(step.visitedOrder);
        setVisitedNodes(step.visitedOrder);
      }, idx * speed);
      timersRef.current.push(id);
    });
  };

  // ---------- Start / Confirm ----------
  const handleStart = () => {
    if (nodes.length === 0) return;
    setOpenSourceDialog(true);
  };

  const handleConfirmSource = () => {
    setOpenSourceDialog(false);
    if (!sourceNode) return;

    const src = Number(sourceNode);

    if (algorithm === "BFS Traversal") {
      const steps = generateBfsSteps(src);
      playSteps(steps, 800);
    } else if (algorithm === "DFS Traversal") {
      const steps = generateDfsSteps(src);
      playSteps(steps, 800);
    } else if (algorithm === "Dijkstra's Algorithm") {
      const steps = generateDijkstraSteps(src);
      playSteps(steps, 900);
    }
  };

  // ---------- UI ----------
  const queueTitle =
    algorithm === "BFS Traversal"
      ? "Queue"
      : algorithm === "DFS Traversal"
      ? "Stack"
      : "Priority Queue";

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} width={"100%"} gap={2}>
        <Box width={"80%"} gap={2} display={"flex"} flexDirection={"column"}>
          <Box bgcolor={"#ffffff"} height={"480px"} borderRadius={2} p={2}>
            <Typography variant="h6" fontWeight={600}>
              Interactive Graph Builder
            </Typography>
            <Box display={"flex"} gap={2} mt={0.5}>
              <Button
                onClick={handleAddNodeClick}
                sx={{
                  textTransform: "none",
                  p: 1,
                  width: "18%",
                  bgcolor: "#3b82f6",
                  color: "#ffffff",
                  borderRadius: 2.5,
                  "&:hover": { bgcolor: "#1b66e0" },
                }}
              >
                <IoMdAdd style={{ marginRight: 5 }} /> Add Node
              </Button>
              <Button
                onClick={handleAddEdgeClick}
                sx={{
                  textTransform: "none",
                  p: 1,
                  width: "18%",
                  bgcolor: "#22c55e",
                  color: "#ffffff",
                  borderRadius: 2.5,
                  "&:hover": { bgcolor: "#0da143" },
                }}
              >
                <FaLink style={{ marginRight: 5 }} /> Add Edge
              </Button>
              <Button
                onClick={handleRandomGraph}
                sx={{
                  textTransform: "none",
                  p: 1,
                  width: "23%",
                  bgcolor: "#b13bf6",
                  color: "#ffffff",
                  borderRadius: 2.5,
                  "&:hover": { bgcolor: "#921cd6" },
                }}
              >
                <FaRandom style={{ marginRight: 5 }} /> Random Graph
              </Button>
              <Button
                onClick={handleReset}
                sx={{
                  textTransform: "none",
                  p: 1,
                  width: "18%",
                  bgcolor: "#6b7280",
                  color: "#ffffff",
                  borderRadius: 2.5,
                  "&:hover": { bgcolor: "#5a606e" },
                }}
              >
                <RiLoopLeftFill style={{ marginRight: 5 }} /> Reset
              </Button>
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
                  "&.Mui-focused": {
                    border: "2px solid black",
                  },
                  backgroundColor: "white",
                }}
              >
                <MenuItem value="BFS Traversal">BFS Traversal</MenuItem>
                <MenuItem value="DFS Traversal">DFS Traversal</MenuItem>
                <MenuItem value="Dijkstra's Algorithm">
                  Dijkstra's Algorithm
                </MenuItem>
              </Select>
              <Button
                onClick={handleStart}
                sx={{
                  textTransform: "none",
                  p: 1,
                  width: "18%",
                  bgcolor: "#f6803b",
                  color: "#ffffff",
                  borderRadius: 2.5,
                  "&:hover": { bgcolor: "#d4611e" },
                }}
              >
                <FaPlay style={{ marginRight: 5 }} /> Start
              </Button>
            </Box>

            {/* Visualization area */}
            <Box
              height={"75%"}
              width={"100%"}
              border={"2px solid #dedfe0"}
              borderRadius={2}
              mt={2}
              position="relative"
              onClick={handleCanvasClick}
              sx={{ cursor: mode === "node" ? "crosshair" : "default" }}
            >
              {/* Draw edges */}
              <svg
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }}
              >
                {edges.map((edge, idx) => (
                  <g key={idx}>
                    <line
                      x1={edge.from.x}
                      y1={edge.from.y}
                      x2={edge.to.x}
                      y2={edge.to.y}
                      stroke="#555"
                      strokeWidth={2}
                    />
                    {edge.weight && (
                      <text
                        x={(edge.from.x + edge.to.x) / 2}
                        y={(edge.from.y + edge.to.y) / 2 - 5}
                        textAnchor="middle"
                        fill="red"
                        fontSize="12"
                      >
                        {edge.weight}
                      </text>
                    )}
                  </g>
                ))}
              </svg>

              {/* Draw nodes */}
              {nodes.map((node) => (
                <Box
                  key={node.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNodeClick(node);
                  }}
                  sx={{
                    position: "absolute",
                    top: node.y - 20,
                    left: node.x - 20,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: visitedNodes.includes(node.id)
                      ? "#16a34a"
                      : "#2563eb",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border:
                      selectedNode?.id === node.id
                        ? "3px solid orange"
                        : "2px solid white",
                    cursor: mode === "edge" ? "pointer" : "default",
                    userSelect: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  {node.id}
                </Box>
              ))}
            </Box>
          </Box>

          {/* ---------- NEW: Description + Queue Panels (fixed height) ---------- */}
          <Box
            width={"100%"}
            display="flex"
            gap={2}
            alignItems="stretch"
            // keep layout compact; does not expand height uncontrollably
          >
            {/* Description (scrollable, fixed height) */}
            <Box
              flex={1}
              bgcolor="#fff"
              border="1px solid #e5e7eb"
              borderRadius={8}
              p={2}
              sx={{ maxHeight: 140, overflowY: "auto" }}
            >
              <Typography fontWeight={700} mb={1}>
                Step-by-step Description
              </Typography>
              {descriptions.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Click <strong>Start</strong> to see step-by-step narration
                  here.
                </Typography>
              ) : (
                descriptions.map((line, i) => (
                  <Typography
                    key={i}
                    variant="body2"
                    sx={{
                      mb: 0.5,
                      background:
                        i === currentStepIndex ? "rgba(67,138,247,0.10)" : "none",
                      borderLeft:
                        i === currentStepIndex ? "3px solid #438af7" : "none",
                      pl: i === currentStepIndex ? 1 : 0,
                    }}
                  >
                    {i + 1}. {line}
                  </Typography>
                ))
              )}
            </Box>

            {/* Queue/Stack/PQ panel */}
            <Box
              minWidth={320}
              bgcolor="#fff"
              border="1px solid #e5e7eb"
              borderRadius={8}
              p={2}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              {/* Queue row */}
              <Box>
                <Typography fontWeight={700} mb={1}>
                  {queueTitle}
                </Typography>
                <Box display="flex" alignItems="center" gap={0.5}>
                  {panelQueue.length === 0 ? (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ py: 1 }}
                    >
                      (empty)
                    </Typography>
                  ) : (
                    panelQueue.map((val, idx) => {
                      const key = typeof val === "string" ? val : String(val);
                      const scratched =
                        processedSet.has(val) || processedSet.has(key);
                      return (
                        <Box
                          key={`${key}-${idx}`}
                          sx={{
                            width: 42,
                            height: 42,
                            border: "2px solid #cbd5e1",
                            borderRadius: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            fontWeight: 700,
                            backgroundColor: "#f8fafc",
                            textDecoration: scratched ? "line-through" : "none",
                            opacity: scratched ? 0.6 : 1,
                          }}
                        >
                          {key}
                          {scratched && (
                            <Box
                              sx={{
                                position: "absolute",
                                width: "120%",
                                height: 2,
                                bgcolor: "#ef4444",
                                transform: "rotate(-20deg)",
                              }}
                            />
                          )}
                        </Box>
                      );
                    })
                  )}
                </Box>
              </Box>

              {/* Visited row */}
              <Box mt={2}>
                <Typography fontWeight={700} mb={1}>
                  Visited Nodes
                </Typography>
                <Box display="flex" alignItems="center" gap={0.5}>
                  {visitedPanel.length === 0 ? (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ py: 1 }}
                    >
                      (none)
                    </Typography>
                  ) : (
                    visitedPanel.map((v, i) => (
                      <Box
                        key={`${v}-${i}`}
                        sx={{
                          width: 42,
                          height: 42,
                          border: "2px solid #bbf7d0",
                          borderRadius: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          backgroundColor: "#ecfdf5",
                        }}
                      >
                        {v}
                      </Box>
                    ))
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* --- Existing Theory accordion --- */}
          <Box bgcolor={"#f0f8ff"} width={"100%"} mb={2}>
            <Accordion sx={{ borderRadius: 2, boxShadow: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ fontWeight: "bold" }}
              >
                <Typography fontWeight={"bold"}>Theory & Examples</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography variant="h6" mb={1}>
                  Binary Search Tree
                </Typography>
                <Typography mb={2}>
                  BST repeatedly steps through the list, compares adjacent
                  elements and swaps them if they're in the wrong order.
                </Typography>

                <SyntaxHighlighter
                  language="cpp"
                  style={darcula}
                  customStyle={{ borderRadius: 10 }}
                ></SyntaxHighlighter>
              </AccordionDetails>
            </Accordion>
          </Box>

          <PracticeProblem />
        </Box>

        {/* Right side unchanged */}
        <Box
          height={"600px"}
          width={"20%"}
          borderRadius={2}
          bgcolor={"#ffffff"}
          p={1.5}
        >
          <Typography variant="h6" fontWeight={600}>
            Complexity Analysis
          </Typography>
          <Box bgcolor={"#ebf4ff"} p={1.5} m={1} borderRadius={2}>
            <Typography color="#438af7" fontWeight={600}>
              BFS Complexity
            </Typography>
            <Box mt={1}>
              <Typography variant="body1" color="text.primary" mb={0.1}>
                Time Complexity: O(V + E)
              </Typography>
              <Typography variant="body1" color="text.primary" mb={0.1}>
                Space Complexity: O(V)
              </Typography>
              <Typography variant="body1" color="text.secondary" mt={1} mb={0.1}>
                V = Vertices, E = Edges. Uses queue for level-by-level
                exploration.
              </Typography>
            </Box>
          </Box>

          <Box bgcolor={"#f0fdf4"} p={1.5} m={1} borderRadius={2}>
            <Typography color="#1c8972" fontWeight={600} mb={1.5}>
              DFS Complexity
            </Typography>
            <Typography variant="body1" color="text.primary">
              Time Complexity: O(V + E)
            </Typography>
            <Typography variant="body1" color="text.primary" mb={0.1}>
              Space Complexity: O(V)
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={1} mb={0.1}>
              Uses stack (recursion) for deep exploration before backtracking.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Dialog for weight input */}
      <Dialog
        open={openWeightDialog}
        onClose={() => setOpenWeightDialog(false)}
      >
        <DialogTitle>Enter Edge Weight</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Weight"
            type="number"
            fullWidth
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWeightDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveWeight}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for selecting source node */}
      <Dialog
        open={openSourceDialog}
        onClose={() => setOpenSourceDialog(false)}
      >
        <DialogTitle>Select Source Node</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            value={sourceNode}
            onChange={(e) => setSourceNode(e.target.value)}
          >
            {nodes.map((node) => (
              <MenuItem key={node.id} value={node.id}>
                Node {node.id}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSourceDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmSource} disabled={!sourceNode}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DSAGraphs;