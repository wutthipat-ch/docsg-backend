import 'reflect-metadata';
import express from 'express';
import server from './server';
import Router from './routers/Router';
import LineWebhook from './routers/LineWebhook';

export default class Application {
  private app = server();

  startServer(): void {
    LineWebhook.route(this.app);
    this.app.use(express.json());
    Router.route(this.app);
    // eslint-disable-next-line no-console
    this.app.listen(3000, () => console.log('Starting ExpressJS server on Port 3000'));
  }
}

const application = new Application();
application.startServer();
