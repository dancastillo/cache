'use strict'

import Ajv from 'ajv'

export const validate = (toValidate, schema) => {
  const ajv = new Ajv({ allErrors: true })
  const validate = ajv.compile(schema)
  const valid = validate(toValidate)
  if (!valid) {
    let text = ''
    const separator = ', '
    for (const err of validate.errors) {
      text += `${err.instancePath.replace(/^\//, '.')} ${err.message}${separator}`
    }
    throw new Error(text.slice(0, -separator.length))
  }
  return valid
}
