
import express from 'express';
import { connectDB, closeDB } from './config/db.js';  // Import connectDB
import movieRoutes from './routes/movies.js';
import actorRoutes from './routes/actors.js';
import userRoutes from './routes/users.js';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
// Connect to MongoDB (Once)
connectDB();

//When the app is closed, close the connection to MongoDB
process.on('SIGINT', async () => {
    console.log('SIGINT received. Closing MongoDB connection...');
    await closeDB();
    process.exit(0); // Exit the process gracefully
  });

// Set up routes
app.use('/movies', movieRoutes);
app.use('/actors', actorRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
