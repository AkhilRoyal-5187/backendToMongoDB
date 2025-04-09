import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import studentRoutes from './routes/studentRoutes.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());

app.use('/api/students', studentRoutes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`The server is Running at the port ${port}`);
});