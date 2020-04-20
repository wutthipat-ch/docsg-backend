/* eslint-disable @typescript-eslint/unbound-method */
import express, { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import SequenceService from '../services/sequencials/SequenceService';
import EquationService from '../services/equations/EquationService';
import DirectionService from '../services/directions/DirectionService';
import * as Validator from '../decorators/validator';
import SequenceSchema from '../schemas/sequenceSchema';
import EquationSchema from '../schemas/equationSchema';

export default class Router {
  static route(app: express.Express): void {
    app.post('/api/sequences', Router.sequenceHandler);
    app.post('/api/equations', Router.equationHandler);
    app.get('/api/directions', async (req, res) => {
      res.status(HttpStatus.OK).send(await DirectionService.getBestDirection());
    });
  }

  @Validator.validateRequestBody(SequenceSchema)
  static sequenceHandler(req: Request, res: Response): void {
    res.status(HttpStatus.ACCEPTED).send(SequenceService.getResolvedVariables(req));
  }

  @Validator.validateRequestBody(EquationSchema)
  static equationHandler(req: Request, res: Response): void {
    res.status(HttpStatus.ACCEPTED).send(EquationService.getResolvedVariables(req));
  }
}
