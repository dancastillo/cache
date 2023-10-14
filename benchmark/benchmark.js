'use strict'

const c = require('../cache')

const runBenchmark = (cache, iterations) => {
  const start = Date.now()

  // Benchmark set operation
  for (let i = 0; i < iterations; i++) {
    cache.set(`key_${i}`, i)
  }

  const setDuration = Date.now() - start

  // Benchmark get operation
  const getStart = Date.now()
  for (let i = 0; i < iterations; i++) {
    cache.get(`key_${i}`)
  }

  const getDuration = Date.now() - getStart

  // Benchmark delete operation
  const deleteStart = Date.now()
  for (let i = 0; i < iterations; i++) {
    cache.del(`key_${i}`)
  }

  const deleteDuration = Date.now() - deleteStart

  console.log(`Benchmarked ${iterations} iterations}`)
  console.log(`Set operation took ${setDuration}ms`)
  console.log(`Get operation took ${getDuration}ms`)
  console.log(`Delete operation took ${deleteDuration}ms`)
}

// Run the benchmark with 1 million iterations
runBenchmark(c({ max: 1000000 }), 1000000)
