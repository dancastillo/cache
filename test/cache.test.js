'use strict'

const { test } = require('tap')
const cache = require('../cache')

test('put a value into cache', async ({ equal }) => {
  const testCache = cache()
  const value = 'this is a value'
  const und = testCache.put('key', value)
  equal(und, undefined)
})

test('put a value into cache and get that value', async ({ equal }) => {
  const testCache = cache()
  const value = 'this is a value'
  {
    const und = testCache.put('key', value)
    equal(und, undefined)
  }
  {
    const val = testCache.get('key')
    equal(val, value)
  }
})

test('put a value into cache with custom ttl', async ({ equal }) => {
  const testCache = cache()
  const value = 'this is a value'
  const time = { minutes: 1 }
  {
    testCache.put('key_ttl', value, time)
    const val = testCache.get('key_ttl')
    equal(val, value)
  }
})

test('put a value into cache with custom (expired) ttl', async ({ equal }) => {
  const testCache = cache()
  const value = 'this is a value'
  const time = { seconds: 0 }
  {
    const und = testCache.put('key', value, time)
    equal(und, undefined)
  }
  {
    const val = testCache.get('key')
    equal(val, undefined)
  }
})

test('put/get/del then get undefined from deleted value', async ({ equal }) => {
  const testCache = cache()
  const value = 'this is a value'
  {
    const und = testCache.put('key', value)
    equal(und, undefined)
  }
  {
    const val = testCache.get('key')
    equal(val, value)
  }
  {
    testCache.del('key')
    const val = testCache.get('key')
    equal(val, undefined)
  }
})

test('clear all keys from cache', async ({ equal }) => {
  const data = [{ key: 'one', value: 1 }, { key: 'two', value: 2 }, { key: 'three', value: 3 }]
  const testCache = cache()
  for (const { key, value } of data) {
    testCache.put(key, value)
  }

  testCache.clear()
  const keysLen = testCache.keys().length
  equal(keysLen, 0)
})
