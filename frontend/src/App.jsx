import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './pages/context/Authcontext';
import ProtectedRoute from './components/Protectedroute';

// Public pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Auth/login';

// Protected pages
import Dashboard from './pages/Dashboard';
import DSAIntro from './pages/DSAtopics/Intro'; 

// DSA
import DSALayout from './pages/DSAtopics/DSALayout';
import DSAArray from './pages/DSAtopics/Array';
import DSALinkedList from './pages/DSAtopics/LinkedList';
import DSAStack from './pages/DSAtopics/Stack';
import DSAQueue from './pages/DSAtopics/Queue';
import DSASorting from './pages/DSAtopics/Sorting';
import DSATrees from './pages/DSAtopics/Trees';
import DSAGraphs from './pages/DSAtopics/Graphs';
import DSASearching from './pages/DSAtopics/Searching';
import DSAHashing from './pages/DSAtopics/Hashing';

// OS
import OSLayout from './pages/OStopics/OSLayout';
import OSIntro from './pages/OStopics/OSIntro';
import CPUScheduling from './pages/OStopics/CPUScheduling';
import MemoryManagement from './pages/OStopics/MemoryManagement';
import DiskScheduling from './pages/OStopics/DiskScheduling';
import Deadlocks from './pages/OStopics/Deadlocks';
import Synchronization from './pages/OStopics/Synchronization';
import FileSystem from './pages/OStopics/FileSystem';
import BankersAlgo from './pages/OStopics/BankersAlgo';

// DBMS
import DBMSLayout from './pages/DBMStopics/DBMSLauout';
import DBMSIntro from './pages/DBMStopics/DBMSIntro';
import ERModel from './pages/DBMStopics/ERModel';
import RelationalModel from './pages/DBMStopics/RelationalModel';
import SQLqueries from './pages/DBMStopics/SQLqueries';
import Transactions from './pages/DBMStopics/Transactions';
import ACIDproperties from './pages/DBMStopics/ACIDproperties';
import CommitRollback from './pages/DBMStopics/CommitRollback';

// CN
import CNLayout from './pages/CNtopics/CNLayout';
import CNIntro from './pages/CNtopics/CNIntro';
import OSITCPIPModel from './pages/CNtopics/OSITCPIPModel';
import TransmissionModel from './pages/CNtopics/TransmissionModel';
import Protocals from './pages/CNtopics/Protocols';
import ErrorDetection from './pages/CNtopics/ErrorDetection';
import RoutingCongestion from './pages/CNtopics/RoutingCongestion';
import WirelessNetworks from './pages/CNtopics/WirelessNetworks';

function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* ── Public routes ─────────────────────────────────────────────── */}
        <Route path="/"           element={<LandingPage />} />
        <Route path="/auth/login" element={<Login />} />

        {/* ── Protected: Dashboard ──────────────────────────────────────── */}
        <Route path="/home" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        {/* ── DSA Intro — standalone, NO sidebar/labnavbar ────────────────── */}
        <Route path="/dsa" element={
          <ProtectedRoute><DSAIntro /></ProtectedRoute>
        } />

        {/* ── Protected: DSA ────────────────────────────────────────────── */}
        <Route path="/dsa" element={
          <ProtectedRoute><DSALayout /></ProtectedRoute>
        }>
          <Route path="array"           element={<DSAArray />} />
          <Route path="linked-list"     element={<DSALinkedList />} />
          <Route path="stack"           element={<DSAStack />} />
          <Route path="queue"           element={<DSAQueue />} />
          <Route path="sorting"         element={<DSASorting />} />
          <Route path="trees"           element={<DSATrees />} />
          <Route path="graphs"          element={<DSAGraphs />} />
          <Route path="searching"       element={<DSASearching />} />
          <Route path="hashing"         element={<DSAHashing />} />
        </Route>

        {/* ── Protected: OS ─────────────────────────────────────────────── */}
        <Route path="/os" element={
          <ProtectedRoute><OSLayout /></ProtectedRoute>
        }>
          <Route index                      element={<OSIntro />} />
          <Route path="cpu-scheduling"      element={<CPUScheduling />} />
          <Route path="memory-management"   element={<MemoryManagement />} />
          <Route path="disk-scheduling"     element={<DiskScheduling />} />
          <Route path="deadlocks"           element={<Deadlocks />} />
          <Route path="synchronization"     element={<Synchronization />} />
          <Route path="file-system"         element={<FileSystem />} />
          <Route path="bankers-algo"        element={<BankersAlgo />} />
        </Route>

        {/* ── Protected: DBMS ───────────────────────────────────────────── */}
        <Route path="/dbms" element={
          <ProtectedRoute><DBMSLayout /></ProtectedRoute>
        }>
          <Route index                      element={<DBMSIntro />} />
          <Route path="er-model"            element={<ERModel />} />
          <Route path="relational-model"    element={<RelationalModel />} />
          <Route path="sql-queries"         element={<SQLqueries />} />
          <Route path="transactions"        element={<Transactions />} />
          <Route path="acid-properties"     element={<ACIDproperties />} />
          <Route path="commit-rollback"     element={<CommitRollback />} />
        </Route>

        {/* ── Protected: CN ─────────────────────────────────────────────── */}
        <Route path="/cn" element={
          <ProtectedRoute><CNLayout /></ProtectedRoute>
        }>
          <Route index                      element={<CNIntro />} />
          <Route path="osi-tcpip-model"     element={<OSITCPIPModel />} />
          <Route path="transmission-model"  element={<TransmissionModel />} />
          <Route path="protocols"           element={<Protocals />} />
          <Route path="error-detection"     element={<ErrorDetection />} />
          <Route path="routing-congestion"  element={<RoutingCongestion />} />
          <Route path="wireless-networks"   element={<WirelessNetworks />} />
        </Route>

      </Routes>
    </AuthProvider>
  );
}

export default App;