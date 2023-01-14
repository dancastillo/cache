'use strict'

const { test } = require('tap')
const { duration } = require('../lib/duration')

test('duration undefined is returned with empty object as args', async ({ equal }) => {
  equal(duration(), undefined)
})

test('duration undefined is returned with undefined as args', async ({ equal }) => {
  equal(duration(), undefined)
})

test('duration 1 second is returned with all args', async ({ equal }) => {
  const opts = { days: 0, hours: 0, minutes: 0, seconds: 1 }
  equal(duration(opts), 1)
})

test('duration 1 hour is returned with all args', async ({ equal }) => {
  const opts = { days: 0, hours: 0, minutes: 1, seconds: 0 }
  equal(duration(opts), 60)
})

test('duration 1 hour is returned with all args', async ({ equal }) => {
  const opts = { days: 0, hours: 1, minutes: 0, seconds: 0 }
  equal(duration(opts), 3600)
})

test('duration 1 day is returned with all args', async ({ equal }) => {
  const opts = { days: 1, hours: 0, minutes: 0, seconds: 0 }
  equal(duration(opts), 86400)
})

test('duration 1 second is returned with no other args', async ({ equal }) => {
  const opts = { seconds: 1 }
  equal(duration(opts), 1)
})

test('duration 1 hour is returned with no other args', async ({ equal }) => {
  const opts = { minutes: 1 }
  equal(duration(opts), 60)
})

test('duration 1 hour is returned with no other args', async ({ equal }) => {
  const opts = { hours: 1 }
  equal(duration(opts), 3600)
})

test('duration 1 day is returned with no other args', async ({ equal }) => {
  const opts = { days: 1 }
  equal(duration(opts), 86400)
})

test('duration throw error with invalid args', async ({ throws }) => {
  throws(() => {
    duration({ invalid: 1 })
  }, new Error('must NOT have additional properties'))
})
