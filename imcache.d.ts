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
export type PutFn = (key: string, value: any, time?: DurationOptions) => void

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

export type imcacheInstance = {
  ttl: number | undefined
  getTime: GetTimeFn
  get: GetFn
  put: PutFn
  del: DelFn
  clear: ClearFn
  keys: KeysFn
}

export type Options = {
  duration?: DurationOptions
}

declare namespace imcache {


  export interface Options {
    duration?: DurationOptions
  }

  export const Options: Options
  export const imcache: imcacheInstance
  export { imcache as default }
}

declare function imcache(): imcacheInstance

declare function imcache(options: imcache.Options): imcacheInstance

export default imcache
