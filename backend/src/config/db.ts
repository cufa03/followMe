import mongoose from 'mongoose';
import colors from 'colors';

// Using dotenv to read data from .env file
// import { config } from 'dotenv';
// config();

//Using the new update on Node.js to read the .env file
process.loadEnvFile();

export const connectDB = async () => {
  try {
    const url = `${process.env.URI}`;
    const { connection } = await mongoose.connect(url);
    const url2 = `${connection.host}:${connection.port}`;
    console.log(colors.cyan.bold(`MongoDb Conectado en ${url2}`));
  } catch (error) {
    console.log(colors.bgRed.bold(error.message));
    process.exit(1);
  }
};
