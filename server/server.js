require('dotenv').config();
const express      = require('express');
const cors         = require('cors');
const helmet       = require('helmet');
const rateLimit    = require('express-rate-limit');
const connectDB    = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

const app = express();
connectDB();

// Security headers
app.use(helmet());

// Allowlist of trusted origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://mini-linked-nzxh1wvfq-sudarshans-projects-203c931f.vercel.app',
  'https://mini-linked-in.vercel.app'
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.warn(`CORS Block – Untrusted Origin: ${origin}`);
    return callback(null, false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],   // ✅ Must include Authorization
  credentials: true,
  optionsSuccessStatus: 204
};

// Apply CORS middleware with full options
app.use(cors(corsOptions));

// ⚠️ Ensures Authorization gets allowed in preflight responses
app.options('*', cors(corsOptions));

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
}));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));

// Health-check endpoint
app.get('/api/health', (req, res) => res.json({ message: 'ConnectHub API is running!' }));

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


