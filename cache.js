'use strict'

const constants = require('./lib/constants')
const { duration } = require('./lib/duration')
const { validate } = require('./lib/validate')

const ARGS_SCHEMA = {
  type: 'object',
  properties: {
    duration: { type: 'object' },
    max: { type: 'number' },
    strategy: { type: 'string' }
  }
}

function cache (opts) {
  opts = opts || {}

  validate(opts, ARGS_SCHEMA)

  const max = opts.max || constants.max

  const strategy = opts.strategy || constants.strategy

  const ttl = duration(opts.duration)

  const _cache = new Map()

  const getTime = function _getTime () {
    return new Date().getTime()
  }

  const get = function _get (key) {
    const data = _cache.has(key) ? _cache.get(key) : null
    if (!data || !data.value || data.expires < this.getTime()) {
      return
    }
    // Update hit count
    return data.value
  }

  const set = function (key, value, time) {
    if (max <= this.size()) {
      const entry = this[strategy]()[0]
      this.del(entry)
    }

    _cache.delete(key)

    const expireTime = time && Object.keys(time) ? duration(time) : ttl
    const expires = this.getTime() + expireTime

    _cache.set(
      key,
      {
        value,
        expires
      }
    )
  }

  const del = function (key) {
    _cache.delete(key)
  }

  const clear = function () {
    _cache.clear()
  }

  const keys = function () {
    const cacheKeys = []
    const iterator = _cache.keys()
    let result = iterator.next()
    while (!result.done) {
      cacheKeys.push(result.value)
      result = iterator.next()
    }
    return cacheKeys
  }

  const size = function () {
    return _cache.size
  }

  const lru = function () {
    return Array.from(_cache)[0]
  }

  const mru = function () {
    return Array.from(_cache)[_cache.size - 1]
  }

  const instance = {
    ttl,
    getTime,
    get,
    set,
    del,
    clear,
    keys,
    size,
    lru,
    mru
  }

  return instance
}

cache.default = cache
cache.cache = cache
module.exports = cache
