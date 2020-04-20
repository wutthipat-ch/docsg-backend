import { Request } from 'express';
import SequenceUtil from '../../utils/sequencials/SequenceUtil';
import CacheUtil from '../../utils/caches/CacheUtil';

export default class SequenceService {
  static getResolvedVariables(req: Request): number[] | undefined {
    const inputStr = req.body.seq;
    const cacheValue = CacheUtil.getCacheValueByKey<number[] | undefined>(inputStr);
    if (cacheValue) {
      return cacheValue;
    }
    const resResult = SequenceUtil.getSequenceInstanceFromString(inputStr as string)
      ?.getMissingVariables();
    CacheUtil.setCacheValue<number[] | undefined>(inputStr, resResult);
    return resResult;
  }
}
