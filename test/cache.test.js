import { test } from 'tap'
import { cache } from '../cache.js'

const data = [{ key: 'one', value: 1 }, { key: 'two', value: 2 }, { key: 'three', value: 3 }]

test('set a value into cache', async ({ equal }) => {
  const testCache = cache()
  const value = 'this is a value'
  const und = testCache.set('key', value)
  equal(und, undefined)
})

test('set a value into cache and get that value', async ({ equal }) => {
  const testCache = cache()
  const value = 'this is a value'
  {
    const und = testCache.set('key', value)
    equal(und, undefined)
  }
  {
    const val = testCache.get('key')
    equal(val, value)
  }
})

test('set a value into cache with custom ttl', async ({ equal }) => {
  const testCache = cache()
  const value = 'this is a value'
  const time = { minutes: 1 }
  {
    testCache.set('key_ttl', value, time)
    const val = testCache.get('key_ttl')
    equal(val, value)
  }
})

test('set a value into cache with custom (expired) ttl', async ({ equal }) => {
  const testCache = cache()
  const value = 'this is a value'
  const time = { seconds: 0 }
  {
    const und = testCache.set('key', value, time)
    equal(und, undefined)
  }
  {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const val = testCache.get('key')
    equal(val, undefined)
  }
})

test('set/get/del then get undefined from deleted value', async ({ equal }) => {
  const testCache = cache()
  const value = 'this is a value'
  {
    const und = testCache.set('key', value)
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
  const testCache = cache()
  for (const { key, value } of data) {
    testCache.set(key, value)
  }

  testCache.clear()
  const keysLen = testCache.keys().length
  equal(keysLen, 0)
})

test('use least recently used strategy as default', async ({ equal }) => {
  const lruCache = cache({ max: 2 })
  for (const { key, value } of data) {
    lruCache.set(key, value)
  }

  equal(lruCache.get('one'), undefined)
  equal(lruCache.size(), 2)
})

test('use least recently used strategy', async ({ equal }) => {
  const lruCache = cache({ max: 2, strategy: 'lru' })
  for (const { key, value } of data) {
    lruCache.set(key, value)
  }

  equal(lruCache.get('one'), undefined)
  equal(lruCache.size(), 2)
})

test('use most recently used strategy', { only: true }, async ({ equal }) => {
  const mruCache = cache({ max: 2, strategy: 'mru' })
  for (const { key, value } of data) {
    mruCache.set(key, value)
  }

  equal(mruCache.get('two'), undefined)
  equal(mruCache.size(), 2)
})

test('get keys from cache', async ({ equal }) => {
  const testCache = cache()
  for (const { key, value } of data) {
    testCache.set(key, value)
  }

  const keys = testCache.keys()
  equal(keys.length, 3)
  equal(keys[0], 'one')
  equal(keys[1], 'two')
  equal(keys[2], 'three')
})
