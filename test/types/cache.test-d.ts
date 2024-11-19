import { expectType, expectError } from 'tsd';
import cache, { CacheInstance, CacheOptions, CacheItem, DurationOptions } from '../../cache.js';

// Test cache initialization
expectType<CacheInstance>(cache());
expectType<CacheInstance>(cache({ max: 10, strategy: 'lru' }));
expectError(cache({ strategy: 'unknown' })); // Invalid strategy

// Test CacheInstance methods and properties
const myCache = cache({ duration: { hours: 1 }, max: 50 });
expectType<number | undefined>(myCache.ttl);
expectType<number>(myCache.getTime());

// Test set and get with generic types
myCache.set<string>('key1', 'value1');
expectType<string | undefined>(myCache.get<string>('key1'));

// Test set and get without generics
myCache.set('key2', 42);
expectType<unknown | undefined>(myCache.get('key2'));

// Test setting expiration
myCache.set('key3', 'value3', { days: 1 });
expectError(myCache.set('key4', 'value4', { invalid: 1 })); // Invalid DurationOptions

// Test deleting and clearing cache
expectType<void>(myCache.del('key1'));
expectType<void>(myCache.clear());

// Test cache metadata methods
expectType<string[]>(myCache.keys());
expectType<number>(myCache.size());
expectType<CacheItem<unknown> | undefined>(myCache.lru());
expectType<CacheItem<unknown> | undefined>(myCache.mru());

// Test invalid cache options
expectError(cache({ max: 'invalid' })); // `max` should be a number
expectError(cache({ duration: 'invalid' })); // `duration` should be a DurationOptions object
let invalidOptions: CacheOptions;
expectError(invalidOptions = { invalid: 1 }); // Invalid CacheOptions property
expectError(invalidOptions = { strategy: 'lru', invalid: 1 }); // Invalid CacheOptions property

// Test CacheItem type
const item: CacheItem<string> = { value: 'test', expires: Date.now() };
expectType<string>(item.value);
expectType<number>(item.expires);

// Test DurationOptions type
const duration: DurationOptions = { days: 1, hours: 5, minutes: 30, seconds: 10 };
expectType<number | undefined>(duration.days);
expectType<number | undefined>(duration.hours);
expectType<number | undefined>(duration.minutes);
expectType<number | undefined>(duration.seconds);
let invalidDuration: DurationOptions;
expectError(invalidDuration = { invalid: 1 }); // Invalid DurationOptions property
