import { constants } from './constants.js'
import { validate } from './validate.js'

const DURATION_SCHEMA = {
  type: 'object',
  properties: {
    days: { type: 'number' },
    hours: { type: 'number' },
    minutes: { type: 'number' },
    seconds: { type: 'number' }
  },
  additionalProperties: false
}

export const duration = (opts) => {
  if (!opts || Object.keys(opts).length === 0) {
    return constants.duration
  }

  validate(opts, DURATION_SCHEMA)

  let { days, hours, minutes, seconds } = opts

  days = days || 0
  hours = hours || 0
  minutes = minutes || 0
  seconds = seconds || 0

  const duration = (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds

  return duration
}
