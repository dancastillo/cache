export type CacheItem<T> = {
  value: T
  expires: number
}

export type DurationOptions = {
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}

export interface CacheOptions {
  duration?: DurationOptions;
  max?: number;
  strategy?: 'lru' | 'mru';
}

export interface CacheInstance {
  ttl: number | undefined;
  getTime(): number;
  get<T>(key: string): T | undefined;
  set<T>(key: string, value: T, time?: DurationOptions): void;
  del(key: string): void;
  clear(): void;
  keys(): string[];
  size(): number;
  lru<T = unknown>(): CacheItem<T> | undefined;
  mru<T = unknown>(): CacheItem<T> | undefined;
}

declare function cache(opts?: CacheOptions): CacheInstance;

export { cache };
export default cache;
