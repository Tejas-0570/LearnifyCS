import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, TextField, Button,
  Tab, Tabs, Divider, Alert, CircularProgress,
} from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../context/Authcontext';
// import Navbar from '../components/Navbar';
import Navbar from '../../components/Navbar'
import loginImage from '../../assets/illustrate/login.png';

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [tab, setTab]         = useState(0); // 0 = login, 1 = register
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  // Login fields
  const [loginEmail, setLoginEmail]       = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register fields
  const [regName, setRegName]           = useState('');
  const [regEmail, setRegEmail]         = useState('');
  const [regPassword, setRegPassword]   = useState('');
  const [regConfirm, setRegConfirm]     = useState('');

  const handleTabChange = (_, newVal) => {
    setTab(newVal);
    setError('');
  };

  // ── Login submit ────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!loginEmail || !loginPassword) {
      return setError('Please fill in all fields');
    }
    setLoading(true);
    try {
      await login(loginEmail, loginPassword);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Register submit ─────────────────────────────────────────────────────────
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!regName || !regEmail || !regPassword || !regConfirm) {
      return setError('Please fill in all fields');
    }
    if (regPassword !== regConfirm) {
      return setError('Passwords do not match');
    }
    if (regPassword.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    setLoading(true);
    try {
      await register(regName, regEmail, regPassword);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        minHeight="100vh"
        sx={{ background: 'linear-gradient(135deg, #e9f5fd 0%, #ffffff 100%)', px: 3 }}
      >
        {/* Left — illustration */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Typography variant="h4" fontWeight={800} color="#174BCD" mb={2} sx={{ lineHeight: 1.2 }}>
            Join Our Learning <br /> Community
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth={480} mb={4} sx={{ lineHeight: 1.7 }}>
            Access interactive labs, practice coding, and master computer science concepts
            with our comprehensive platform.
          </Typography>
          <Box
            component="img"
            src={loginImage}
            alt="Learning illustration"
            sx={{ width: '100%', maxWidth: 480, height: 'auto', borderRadius: 3, boxShadow: 3 }}
          />
        </Box>

        {/* Right — form card */}
        <Box sx={{ width: '100%', maxWidth: 420, mx: 'auto' }}>
          <Box sx={{ bgcolor: '#fff', borderRadius: 4, boxShadow: 3, px: 4, py: 5 }}>

            {/* Error alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {/* Tabs */}
            <Tabs
              value={tab}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ mb: 3, borderRadius: 4, bgcolor: '#f3f4f6', minHeight: 'auto' }}
              TabIndicatorProps={{ style: { display: 'none' } }}
            >
              {['Login', 'Create Account'].map((label, i) => (
                <Tab
                  key={label}
                  label={label}
                  sx={{
                    fontWeight: 600, borderRadius: 2, m: 0.7,
                    bgcolor: tab === i ? '#ffffff' : 'transparent',
                    color: tab === i ? '#000' : 'gray',
                    minHeight: 'auto', py: 1.2,
                    textTransform: 'none',
                  }}
                />
              ))}
            </Tabs>

            {/* ── LOGIN FORM ── */}
            {tab === 0 && (
              <Box component="form" onSubmit={handleLogin}>
                <TextField
                  fullWidth margin="normal" label="Email Address" type="email"
                  value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                  disabled={loading}
                />
                <TextField
                  fullWidth margin="normal" label="Password" type="password"
                  value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
                  disabled={loading}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    mt: 2, py: 1.3, borderRadius: 3,
                    textTransform: 'none', fontWeight: 700, fontSize: 15,
                    bgcolor: '#2563eb',
                    '&:hover': { bgcolor: '#1d4ed8' },
                  }}
                >
                  {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Sign In'}
                </Button>

                <Divider sx={{ my: 2.5 }}>or</Divider>

                <Button
                  variant="outlined" fullWidth startIcon={<FcGoogle />}
                  sx={{ textTransform: 'none', borderRadius: 3, borderColor: '#e2e8f0', color: '#374151', '&:hover': { bgcolor: '#f8fafc' } }}
                >
                  Continue with Google
                </Button>
              </Box>
            )}

            {/* ── REGISTER FORM ── */}
            {tab === 1 && (
              <Box component="form" onSubmit={handleRegister}>
                <TextField
                  fullWidth margin="normal" label="Full Name"
                  value={regName} onChange={e => setRegName(e.target.value)}
                  disabled={loading}
                />
                <TextField
                  fullWidth margin="normal" label="Email Address" type="email"
                  value={regEmail} onChange={e => setRegEmail(e.target.value)}
                  disabled={loading}
                />
                <TextField
                  fullWidth margin="normal" label="Password" type="password"
                  value={regPassword} onChange={e => setRegPassword(e.target.value)}
                  disabled={loading}
                />
                <TextField
                  fullWidth margin="normal" label="Confirm Password" type="password"
                  value={regConfirm} onChange={e => setRegConfirm(e.target.value)}
                  disabled={loading}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    mt: 2, py: 1.3, borderRadius: 3,
                    textTransform: 'none', fontWeight: 700, fontSize: 15,
                    bgcolor: '#2563eb',
                    '&:hover': { bgcolor: '#1d4ed8' },
                  }}
                >
                  {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Create Account'}
                </Button>

                <Divider sx={{ my: 2.5 }}>or</Divider>

                <Button
                  variant="outlined" fullWidth startIcon={<FcGoogle />}
                  sx={{ textTransform: 'none', borderRadius: 3, borderColor: '#e2e8f0', color: '#374151', '&:hover': { bgcolor: '#f8fafc' } }}
                >
                  Continue with Google
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;