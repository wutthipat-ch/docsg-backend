import _ from 'lodash';
import { Request } from 'express';
import Matrix from '../../models/equations/Matrix';
import CacheUtil from '../../utils/caches/CacheUtil';

type Equation = { x: number; y: number; z: number; c: number };
export default class EquationService {
  static getResolvedVariables(req: Request): number[] {
    const { equations } = req.body;
    const cacheValue = CacheUtil.getCacheValueByKey<number[]>(JSON.stringify(equations));
    if (cacheValue) {
      return cacheValue;
    }
    const result = new Matrix(EquationService.extractCoefficientsFromReqData(equations))
      .getEquationResultMatrix(EquationService.extractConstantsFromReqData(equations));
    const resResult = _.flatten(result);
    CacheUtil.setCacheValue<number[]>(JSON.stringify(equations), resResult);
    return resResult;
  }

  static extractConstantsFromReqData(equations: Equation[]): number[][] {
    return equations.map((equation) => {
      const { c } = equation;
      return [c];
    });
  }

  static extractCoefficientsFromReqData(equations: Equation[]): number[][] {
    return equations.map((equation) => {
      const { x, y, z } = equation;
      return [x, y, z];
    });
  }
}
