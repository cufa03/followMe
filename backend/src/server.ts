import express from 'express';
import cors from 'cors';
import router from './router';
import { connectDB } from './config/db';
import { corsConfirg } from './config/cors';

//Conect to database
connectDB();

const app = express();

// Cors
app.use(cors(corsConfirg));
app.use(express.json());
app.use('/', router);

export default app;
