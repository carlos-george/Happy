import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import 'express-async-errors';
import cors from 'cors';

import './database/connection';
import routes from './routes';
import errorHandler from './errors/handle';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);


const PORT = process.env.API_SERVER_PORT || 3001;

app.listen(PORT, () => {
    console.log(`### Server is running on port ${PORT} ###`)
})