import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import departmentRouter from './routes/department.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/FULLSTACKED')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error("MongoDB connection error:", err));

app.use('/api/auth', authRoutes);
app.use('/api/department', departmentRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
