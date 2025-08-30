import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler } from './middlewares/error';

const app = express();
app.use( cors() );
app.use( helmet() );
app.use( express.json({ limit: '1mb' }) );
app.use( morgan('dev') );

app.use('/api', routes);
app.use(errorHandler);

export default app;
