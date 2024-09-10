import test from 'node:test'
import { duration } from '../lib/duration.js'

test('default duration of one day is returned with empty object as args', async (t) => {
  t.plan(1)
  t.assert.strictEqual(duration(), 86400)
})

test('default duration of one day is returned with undefined as args', async (t) => {
  t.plan(1)
  t.assert.strictEqual(duration(), 86400)
})

test('duration 0is returned with all args', async (t) => {
  t.plan(1)
  const opts = { days: 0, hours: 0, minutes: 0, seconds: 0 }
  t.assert.strictEqual(duration(opts), 0)
})

test('duration 1 second is returned with all args', async (t) => {
  t.plan(1)
  const opts = { days: 0, hours: 0, minutes: 0, seconds: 1 }
  t.assert.strictEqual(duration(opts), 1)
})

test('duration 1 hour is returned with all args', async (t) => {
  t.plan(1)
  const opts = { days: 0, hours: 0, minutes: 1, seconds: 0 }
  t.assert.strictEqual(duration(opts), 60)
})

test('duration 1 hour is returned with all args', async (t) => {
  t.plan(1)
  const opts = { days: 0, hours: 1, minutes: 0, seconds: 0 }
  t.assert.strictEqual(duration(opts), 3600)
})

test('duration 1 day is returned with all args', async (t) => {
  t.plan(1)
  const opts = { days: 1, hours: 0, minutes: 0, seconds: 0 }
  t.assert.strictEqual(duration(opts), 86400)
})

test('duration 1 second is returned with no other args', async (t) => {
  t.plan(1)
  const opts = { seconds: 1 }
  t.assert.strictEqual(duration(opts), 1)
})

test('duration 1 hour is returned with no other args', async (t) => {
  t.plan(1)
  const opts = { minutes: 1 }
  t.assert.strictEqual(duration(opts), 60)
})

test('duration 1 hour is returned with no other args', async (t) => {
  t.plan(1)
  const opts = { hours: 1 }
  t.assert.strictEqual(duration(opts), 3600)
})

test('duration 1 day is returned with no other args', async (t) => {
  t.plan(1)
  const opts = { days: 1 }
  t.assert.strictEqual(duration(opts), 86400)
})

test('duration throw error with invalid args', async (t) => {
  t.assert.throws(
    () => { duration({ invalid: 1 }) },
    (err) => {
      t.assert.strictEqual(err.message, ' must NOT have additional properties')
      return true
    }
  )
})
