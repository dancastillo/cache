import { expectAssignable, expectType } from 'tsd';
import cache,  { ClearFn, DelFn, GetFn, GetTimeFn, KeysFn, LRUFn, MRUFn, CacheOptions, SetFn, SizeFn, CacheItem, DurationOptions } from './cache.js'
import { cacheInstance } from './cache.js'

const testCache = cache()

expectType<cacheInstance>(testCache)

expectAssignable<CacheOptions>({})
expectAssignable<CacheOptions>({ duration: {} })
expectAssignable<CacheOptions>({ duration: { days: 1 } })
expectAssignable<CacheOptions>({ duration: { hours: 1 } })
expectAssignable<CacheOptions>({ duration: { minutes: 1 } })
expectAssignable<CacheOptions>({ duration: { seconds: 1 } })
expectAssignable<CacheOptions>({ duration: { days: 1, hours: 1, minutes: 1, seconds: 1 } })
expectAssignable<CacheOptions>({ max: 1 })
expectAssignable<CacheOptions>({ strategy: 'lru' })

// Functions on instance
expectType<GetTimeFn>(testCache.getTime)
expectType<GetFn>(testCache.get)
expectType<SetFn>(testCache.set)
expectType<DelFn>(testCache.del)
expectType<ClearFn>(testCache.clear)
expectType<KeysFn>(testCache.keys)
expectType<SizeFn>(testCache.size)
expectType<LRUFn>(testCache.lru)
expectType<MRUFn>(testCache.mru)

const exampleItem: CacheItem = {
  value: 'test',
  expires: 123456789
}
const key = 'lookupKey'
const { value, expires } = exampleItem
const durationOptions: DurationOptions = { days: 1, hours: 1, minutes: 1, seconds: 1 }

expectAssignable<CacheItem>(exampleItem)
expectAssignable<GetTimeFn>(() => exampleItem.expires)
expectAssignable<GetFn>(() => exampleItem)
expectAssignable<SetFn>((key, value) => undefined)
expectAssignable<SetFn>((key, value, durationOptions) => undefined)
expectAssignable<DelFn>((key) => undefined)
expectAssignable<ClearFn>(() => undefined)
expectAssignable<SizeFn>(() => 10)
expectAssignable<LRUFn>(() => exampleItem)
expectAssignable<MRUFn>(() => exampleItem)
