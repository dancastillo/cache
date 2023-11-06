export type CacheItem = {
  value: any
  expires: number
}

export type DurationOptions = {
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}

/**
 * @return [number] the current time in milliseconds
 */
export type GetTimeFn = () => number

/**
 * @param [string] key to get value from
 * @return [any]
 */
export type GetFn = (key: string) => any

/**
 * @param [string] key to store value under
 * @param [any] value stored under key
 * @param [DurationOptions] time duration to store value under key
 * @returns [void]
 */
export type SetFn = (key: string, value: any, time?: DurationOptions) => void

/**
 * @param [string] key to delete value from
 * @returns [void]
 */
export type DelFn = (key: string) => void

/**
 * @return [void] clear all keys from cache
 */
export type ClearFn = () => void

/**
 * @return [string[]] all keys in cache
 */
export type KeysFn = () => string[]

export type SizeFn = () => number

export type LRUFn = () =>  CacheItem | undefined

export type MRUFn = () => CacheItem | undefined

export interface cacheInstance {
  ttl: number | undefined
  getTime: GetTimeFn
  get: GetFn
  set: SetFn
  del: DelFn
  clear: ClearFn
  keys: KeysFn
  size: SizeFn
  lru: LRUFn
  mru: MRUFn
}

export type CacheOptions = {
  duration?: DurationOptions
  max?: number
  strategy?: 'lru' | 'mru'
}

declare class Cache {
  constructor(options?: CacheOptions)
  ttl: number | undefined
  getTime: GetTimeFn
  get: GetFn
  set: SetFn
  del: DelFn
  clear: ClearFn
  keys: KeysFn
  size: SizeFn
  lru: LRUFn
  mru: MRUFn
}

declare function Cache(): cacheInstance

declare function Cache(options: CacheOptions): cacheInstance

export default Cache

// @ts-ignore
export = Cache
