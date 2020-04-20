import express from 'express';
import dotenv from 'dotenv';

export default function server(): express.Express {
  dotenv.config();
  const app = express();
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  return app;
}
