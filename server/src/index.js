import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { Server as SocketIOServer } from 'socket.io';
import authRouter from './routes/auth.js';
import meetingRouter from './routes/meetings.js';
import translateRouter from './routes/translate.js';
import twilioRouter from './routes/twilio.js';
import waitlistRouter from './routes/waitlist.js';
import { registerSocketHandlers } from './socket/signaling.js';
import { requireSocketAuth } from './socket/socketAuth.js';
import { registerConversationRelayHandler } from './websocket/conversationRelay.js';
import cron from 'node-cron';

dotenv.config({ silent: true });

const app = express();
const server = http.createServer(app);

// Allow multiple client origins for development
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://192.168.1.3:5173',
  'https://www.linzo.in',
  process.env.CLIENT_ORIGIN
].filter(Boolean);

const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const io = new SocketIOServer(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Attach IO to request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// DB
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/linzo_meet';
mongoose
  .connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRouter);
app.use('/api/meetings', meetingRouter);
app.use('/api/translate', translateRouter);
app.use('/api/twilio', twilioRouter);
app.use('/api/waitlist', waitlistRouter);

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    timestamp: new Date().toISOString(),
    server: 'Linzo Meet Server',
    version: '1.0.0'
  });
});

app.get('/status', (req, res) => {
  res.json({
    status: 'running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/connection-test', (req, res) => {
  res.json({
    message: 'Connection test successful',
    timestamp: new Date().toISOString(),
    socketIO: 'available',
    cors: 'enabled',
    allowedOrigins
  });
});

// Socket
io.use(requireSocketAuth);
registerSocketHandlers(io);

// Twilio ConversationRelay WebSocket registration
registerConversationRelayHandler(server);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server listening on :${port}`);
  console.log(`Allowed CORS origins: ${allowedOrigins.join(', ')}`);

  // Keep-alive cron job for Render
  // Render free tier sleeps after 15 minutes of inactivity.
  // Pinging it every 14 minutes keeps the service awake.
  const selfUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`;

  cron.schedule('*/14 * * * *', async () => {
    try {
      console.log(`[Keep-Alive] Pinging ${selfUrl}/api/health ...`);
      const response = await fetch(`${selfUrl}/api/health`);
      if (response.ok) {
        console.log('[Keep-Alive] Ping successful.');
      } else {
        console.warn(`[Keep-Alive] Ping failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('[Keep-Alive] Error pinging service:', error.message);
    }
  });
});


