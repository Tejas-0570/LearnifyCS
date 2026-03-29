const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const chatRoutes = require('./routes/chatRoute');
const authRoutes = require('./routes/authRoute');

const app = express();
const PORT = process.env.PORT || 5000;

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://learnifycs-webapp.vercel.app"
// ];


// // ── Middleware ────────────────────────────────────────────────────────────────
// app.use(cors({
//   origin: function(origin, callback){
//     if(!origin || allowedOrigins.includes(origin)){
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true
// }));

app.use(cors({
  origin: "https://learnifycs-webapp.vercel.app",
  credentials: true
}));


app.use(express.json());

// ── MongoDB ───────────────────────────────────────────────────────────────────
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',  authRoutes);
app.use('/api/chats', chatRoutes);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.json({ status: 'LearnifyCS API running 🚀' }));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});