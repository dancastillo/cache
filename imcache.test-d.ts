import { expectType } from 'tsd';
import imcache,  { ClearFn, DelFn, GetFn, GetTimeFn, KeysFn, PutFn } from '../imcache'
import { imcacheInstance } from '../imcache'

const cache = imcache()

expectType<imcacheInstance>(cache)
expectType<GetTimeFn>(cache.getTime)
expectType<GetFn>(cache.get)
expectType<PutFn>(cache.put)
expectType<DelFn>(cache.del)
expectType<ClearFn>(cache.clear)
expectType<KeysFn>(cache.keys)

