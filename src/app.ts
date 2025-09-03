import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import registrationRouter from './routes/registration.route';


const app = express();
app.use( cors() );
app.use( express.json({ limit: '1mb' }) );

app.use('/api/registration', registrationRouter);
//app.use(errorHandler);

export default app;
