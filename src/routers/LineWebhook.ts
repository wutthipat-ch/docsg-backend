/* eslint-disable no-console */
import express from 'express';
import { middleware, Client } from '@line/bot-sdk';
import HttpStatus from 'http-status-codes';

export default class LineWebhook {
  static route(app: express.Express): void {
    const config = {
      channelAccessToken: process.env.LINE_ACCESS_TOKEN || '',
      channelSecret: process.env.LINE_CHANNEL_SECRET || '',
    };
    const userId = process.env.LINE_USER_ID || '';
    const client = new Client(config);
    app.post('/webhook', middleware(config), (req, res) => {
      const reqBody = req.body;
      const { events, destination } = reqBody;
      const { message } = events[0];
      const msgString = message.text || '';
      setTimeout(
        () => { this.sendPushNotification(client, destination, userId, msgString); },
        10000,
      );
      res.status(HttpStatus.OK).send();
    });
    app.post('/linebot/messages', express.json(), async (req, res) => {
      const reqBody = req.body;
      const { message } = reqBody;
      await LineWebhook.sendPushNotification(client, userId, userId, message);
      res.status(HttpStatus.OK).send();
    });
  }

  static async sendPushNotification(
    client: Client,
    fromUserID: string,
    toUserId: string,
    msg: string,
  ): Promise<void> {
    await client.pushMessage(toUserId, { type: 'text', text: `You have got a message from user id: ${fromUserID}, message: ${msg}` })
      .catch((error) => console.log(error));
  }
}
