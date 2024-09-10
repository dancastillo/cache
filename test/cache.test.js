import test from 'node:test'
import cache from '../cache.js'

const data = [{ key: 'one', value: 1 }, { key: 'two', value: 2 }, { key: 'three', value: 3 }]

test('set a value into cache', async (t) => {
  t.plan(1)
  const testCache = cache()
  const value = 'this is a value'
  const und = testCache.set('key', value)
  t.assert.strictEqual(und, undefined)
})

test('set a value into cache and get that value', async (t) => {
  t.plan(2)
  const testCache = cache()
  const value = 'this is a value'
  {
    const und = testCache.set('key', value)
    t.assert.strictEqual(und, undefined)
  }
  {
    const val = testCache.get('key')
    t.assert.strictEqual(val, value)
  }
})

test('set a value into cache with custom ttl', async (t) => {
  t.plan(1)
  const testCache = cache()
  const value = 'this is a value'
  const time = { minutes: 1 }
  {
    testCache.set('key_ttl', value, time)
    const val = testCache.get('key_ttl')
    t.assert.strictEqual(val, value)
  }
})

test('set a value into cache with custom (expired) ttl', async (t) => {
  t.plan(2)
  const testCache = cache()
  const value = 'this is a value'
  const time = { seconds: 0 }
  {
    const und = testCache.set('key', value, time)
    t.assert.strictEqual(und, undefined)
  }
  {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const val = testCache.get('key')
    t.assert.strictEqual(val, undefined)
  }
})

test('set/get/del then get undefined from deleted value', async (t) => {
  t.plan(3)
  const testCache = cache()
  const value = 'this is a value'
  {
    const und = testCache.set('key', value)
    t.assert.strictEqual(und, undefined)
  }
  {
    const val = testCache.get('key')
    t.assert.strictEqual(val, value)
  }
  {
    testCache.del('key')
    const val = testCache.get('key')
    t.assert.strictEqual(val, undefined)
  }
})

test('clear all keys from cache', async (t) => {
  t.plan(1)
  const testCache = cache()
  for (const { key, value } of data) {
    testCache.set(key, value)
  }

  testCache.clear()
  const keysLen = testCache.keys().length
  t.assert.strictEqual(keysLen, 0)
})

test('use least recently used strategy as default', async (t) => {
  t.plan(2)
  const lruCache = cache({ max: 2 })
  for (const { key, value } of data) {
    lruCache.set(key, value)
  }

  t.assert.strictEqual(lruCache.get('one'), undefined)
  t.assert.strictEqual(lruCache.size(), 2)
})

test('use least recently used strategy', async (t) => {
  t.plan(2)
  const lruCache = cache({ max: 2, strategy: 'lru' })
  for (const { key, value } of data) {
    lruCache.set(key, value)
  }

  t.assert.strictEqual(lruCache.get('one'), undefined)
  t.assert.strictEqual(lruCache.size(), 2)
})

test('use most recently used strategy', { only: true }, async (t) => {
  t.plan(2)
  const mruCache = cache({ max: 2, strategy: 'mru' })
  for (const { key, value } of data) {
    mruCache.set(key, value)
  }

  t.assert.strictEqual(mruCache.get('two'), undefined)
  t.assert.strictEqual(mruCache.size(), 2)
})

test('get keys from cache', async (t) => {
  t.plan(4)
  const testCache = cache()
  for (const { key, value } of data) {
    testCache.set(key, value)
  }

  const keys = testCache.keys()
  t.assert.strictEqual(keys.length, 3)
  t.assert.strictEqual(keys[0], 'one')
  t.assert.strictEqual(keys[1], 'two')
  t.assert.strictEqual(keys[2], 'three')
})
