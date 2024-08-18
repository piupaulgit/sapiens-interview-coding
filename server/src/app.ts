import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

const dbUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/default';
mongoose.connect(dbUrl)
  .then(() => console.log('MongoDB connected'))
  .catch((err: Error) => console.log(err));

app.use('/user', userRoutes);
app.use(errorHandler);

const shutdown = async () => {
  console.log('Shutting down gracefully...');
  await mongoose.disconnect();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default app;
