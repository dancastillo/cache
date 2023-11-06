'use strict';

var Ajv = require('ajv');

const constants = {
  max: 1000,
  // Default strategy is LRU
  strategy: 'lru',
  // Default is 1 day
  duration: 86400
};

const validate = (toValidate, schema) => {
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(schema);
  const valid = validate(toValidate);
  if (!valid) {
    let text = '';
    const separator = ', ';
    for (const err of validate.errors) {
      text += `${err.instancePath.replace(/^\//, '.')} ${err.message}${separator}`;
    }
    throw new Error(text.slice(0, -separator.length))
  }
  return valid
};

const DURATION_SCHEMA = {
  type: 'object',
  properties: {
    days: { type: 'number' },
    hours: { type: 'number' },
    minutes: { type: 'number' },
    seconds: { type: 'number' }
  },
  additionalProperties: false
};

const duration = (opts) => {
  if (!opts || Object.keys(opts).length === 0) {
    return constants.duration
  }

  validate(opts, DURATION_SCHEMA);

  let { days, hours, minutes, seconds } = opts;

  days = days || 0;
  hours = hours || 0;
  minutes = minutes || 0;
  seconds = seconds || 0;

  const duration = (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds;

  return duration
};

const ARGS_SCHEMA = {
  type: 'object',
  properties: {
    duration: { type: 'object' },
    max: { type: 'number' },
    strategy: { type: 'string' }
  }
};

function cache (opts) {
  opts = opts || {};

  validate(opts, ARGS_SCHEMA);

  const max = opts.max || constants.max;

  const strategy = opts.strategy || constants.strategy;

  const ttl = duration(opts.duration);

  const _cache = new Map();

  const getTime = function _getTime () {
    return new Date().getTime()
  };

  const get = function _get (key) {
    const data = _cache.has(key) ? _cache.get(key) : null;
    if (!data || !data.value || data.expires < this.getTime()) {
      return
    }
    // Update hit count
    return data.value
  };

  const set = function (key, value, time) {
    if (max <= this.size()) {
      const entry = this[strategy]()[0];
      this.del(entry);
    }

    _cache.delete(key);

    const expireTime = time && Object.keys(time) ? duration(time) : ttl;
    const expires = this.getTime() + expireTime;

    _cache.set(
      key,
      {
        value,
        expires
      }
    );
  };

  const del = function (key) {
    _cache.delete(key);
  };

  const clear = function () {
    _cache.clear();
  };

  const keys = function () {
    const cacheKeys = [];
    const iterator = _cache.keys();
    let result = iterator.next();
    while (!result.done) {
      cacheKeys.push(result.value);
      result = iterator.next();
    }
    return cacheKeys
  };

  const size = function () {
    return _cache.size
  };

  const lru = function () {
    return Array.from(_cache)[0]
  };

  const mru = function () {
    return Array.from(_cache)[_cache.size - 1]
  };

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
  };

  return instance
}

module.exports = cache;
