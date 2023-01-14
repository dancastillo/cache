import { expectType } from 'tsd';
import cache,  { ClearFn, DelFn, GetFn, GetTimeFn, KeysFn, PutFn } from './cache'
import { cacheInstance } from './cache'

const testCache = cache()

expectType<cacheInstance>(testCache)
expectType<GetTimeFn>(testCache.getTime)
expectType<GetFn>(testCache.get)
expectType<PutFn>(testCache.put)
expectType<DelFn>(testCache.del)
expectType<ClearFn>(testCache.clear)
expectType<KeysFn>(testCache.keys)

