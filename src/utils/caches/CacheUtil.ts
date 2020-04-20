/* eslint-disable no-console */
import NodeCache from 'node-cache';

export default class CacheUtil {
  static ttl = process.env.CACHE_TTL || '30';

  static cache = new NodeCache();

  static setCacheValue<T>(key: string, value: T): void {
    CacheUtil.cache.set<T>(key, value, parseInt(CacheUtil.ttl, 10));
  }

  static getCacheValueByKey<T>(key: string): T | null {
    const cacheValue = CacheUtil.cache.get<T>(key);
    if (cacheValue) {
      console.log('Get value from cache');
      return cacheValue;
    }
    return null;
  }
}
