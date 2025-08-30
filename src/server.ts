import app from './app';
import { connectMongo } from './db/mongoose';

const PORT = process.env.PORT || 4000;

(async () => {
  await connectMongo();
  app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
})();
