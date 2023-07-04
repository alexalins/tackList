import express from 'express';
import cors from 'cors';
import router from './routes';

import './database';

require('dotenv/config');

class App {
  constructor() {
    this.server = express();
    //
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(router);
  }
}

export default new App().server;