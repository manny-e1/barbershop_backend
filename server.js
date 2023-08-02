import http from 'http';
import { app } from './src/app.js';

const PORT = 5000;

http
  .createServer(app)
  .listen(PORT, () => console.log(`server started listening on port ${PORT}`));
