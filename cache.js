'use strict'

const { duration } = require('./lib/duration')
const { validate } = require('./lib/validate')

const ARGS_SCHEMA = {
  type: 'object',
  properties: {
    duration: { type: 'object' }
  }
}

function cache (opts) {
  opts = opts || {}

  validate(opts, ARGS_SCHEMA)

  const ttl = duration(opts.duration)

  const _cache = {}

  const getTime = function _getTime () {
    return new Date().getTime()
  }

  const get = function _get (key) {
    const data = _cache[key]
    if (!data || !data.value || data.expires < this.getTime()) {
      return
    }

    return data.value
  }
  const put = function (key, value, time) {
    let expires = this.getTime() + ttl
    if (time) {
      // let user define ttl duration for custom keys
      expires = this.getTime() + duration(time)
    }

    _cache[key] = {
      value,
      expires
    }
  }

  const del = function (key) {
    delete _cache[key]
  }

  const clear = function () {
    for (const key in _cache) {
      delete _cache[key]
    }
  }

  const keys = function () {
    return Object.keys(_cache)
  }
  const cache = {
    ttl,
    getTime,
    get,
    put,
    del,
    clear,
    keys
  }

  return cache
}

cache.default = cache
cache.cache = cache
module.exports = cache
