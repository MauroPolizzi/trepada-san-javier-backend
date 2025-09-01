import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import registrationRouter from './routes/registration.route';


dotenv.config();
const app = express();
app.use( cors() );
app.use( express.json({ limit: '1mb' }) );

app.use('/api/registration', registrationRouter);
//app.use(errorHandler);

export default app;
