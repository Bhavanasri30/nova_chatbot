import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.js';
import connectDB from './config/db.js';
import chatRoutes from './routes/chatRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import chatHistoryRoutes from "./routes/chatHistoryRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/history", chatHistoryRoutes);

console.log("Calling connectDB...");
connectDB();
console.log("connectDB called");

app.get('/', (req, res) => {
  res.json({ message: 'Nova AI backend is running' });
});

app.use('/api', chatRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});