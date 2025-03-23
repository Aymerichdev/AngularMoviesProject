import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

const connectDB = async () => {
  try {
    const dbURI = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.cazjlgw.mongodb.net/peliculasdb?retryWrites=true&w=majority`;
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

const closeDB = async () => {
    try {
      await mongoose.connection.close();
      console.log('MongoDB Connection Closed');
      process.exit(0); // Salir del proceso sin errores
    } catch (error) {
      console.error('Error closing MongoDB connection:', error.message);
      process.exit(1); // Salir con un fallo
    }
  };

// Exporta las funciones individualmente:
export { connectDB, closeDB };
