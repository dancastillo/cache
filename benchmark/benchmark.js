'use strict'

const { randomUUID } = require('node:crypto')
const { hrtime } = require('node:process')
const c = require('../cache')

const getSetValue = (type) => {
  if (type === 'string') {
    return randomUUID()
  }

  if (type === 'object') {
    return { value: randomUUID(), test: true, benchmark: true }
  }

  if (type === 'object-stringify') {
    return JSON.stringify({ value: randomUUID(), test: true, benchmark: true })
  }
}

const runBenchmarkString = (cache, iterations, type) => {
  const start = hrtime.bigint()

  // Benchmark set operation
  for (let i = 0; i < iterations; i++) {
    const value = getSetValue(type)
    cache.set(`key_${i}`, value)
  }

  const setDuration = hrtime.bigint() - start

  // Benchmark get operation
  const getStart = hrtime.bigint()
  for (let i = 0; i < iterations; i++) {
    cache.get(`key_${i}`)
  }

  const getDuration = hrtime.bigint() - getStart

  // Benchmark delete operation
  const deleteStart = hrtime.bigint()
  for (let i = 0; i < iterations; i++) {
    cache.del(`key_${i}`)
  }

  const deleteDuration = hrtime.bigint() - deleteStart

  console.log(`Benchmarked ${iterations} iterations of ${type} values`)
  console.log(`Set operation took ${setDuration} nanoseconds`)
  console.log(`Get operation took ${getDuration} nanoseconds`)
  console.log(`Delete operation took ${deleteDuration} nanoseconds\n`)
}

// Run the benchmark with 1 million iterations
runBenchmarkString(c({ max: 1000000 }), 1000000, 'string')
runBenchmarkString(c({ max: 1000000 }), 1000000, 'object')
runBenchmarkString(c({ max: 1000000 }), 1000000, 'object-stringify')
