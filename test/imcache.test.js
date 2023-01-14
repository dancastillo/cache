'use strict'

const { test } = require('tap')
const imcache = require('../imcache')

test('put a value into imcache', async ({ equal }) => {
  const cache = imcache()
  const value = 'this is a value'
  const und = cache.put('key', value)
  equal(und, undefined)
})

test('put a value into imcache and get that value', async ({ equal }) => {
  const cache = imcache()
  const value = 'this is a value'
  {
    const und = cache.put('key', value)
    equal(und, undefined)
  }
  {
    const val = cache.get('key')
    equal(val, value)
  }
})

test('put a value into imcache with custom ttl', async ({ equal }) => {
  const cache = imcache()
  const value = 'this is a value'
  const time = { minutes: 1 }
  {
    cache.put('key_ttl', value, time)
    const val = cache.get('key_ttl')
    equal(val, value)
  }
})

test('put a value into imcache with custom (expired) ttl', async ({ equal }) => {
  const cache = imcache()
  const value = 'this is a value'
  const time = { seconds: 0 }
  {
    const und = cache.put('key', value, time)
    equal(und, undefined)
  }
  {
    const val = cache.get('key')
    equal(val, undefined)
  }
})

test('put/get/del then get undefined from deleted value', async ({ equal }) => {
  const cache = imcache()
  const value = 'this is a value'
  {
    const und = cache.put('key', value)
    equal(und, undefined)
  }
  {
    const val = cache.get('key')
    equal(val, value)
  }
  {
    cache.del('key')
    const val = cache.get('key')
    equal(val, undefined)
  }
})

test('clear all keys from cache', async ({ equal }) => {
  const data = [{ key: 'one', value: 1 }, { key: 'two', value: 2 }, { key: 'three', value: 3 }]
  const cache = imcache()
  for (const { key, value } of data) {
    cache.put(key, value)
  }

  cache.clear()
  const keysLen = cache.keys().length
  equal(keysLen, 0)
})
