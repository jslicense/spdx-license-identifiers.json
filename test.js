const assert = require('assert')
const fs = require('fs')

fs.readFile('index.json', (error, buffer) => {
  assert(!error, 'read error')
  const parsed = JSON.parse(buffer)
  assert(Array.isArray(parsed), 'array')
  assert(parsed.length > 0, 'length > 0')
  assert(parsed.every(e => typeof e === 'object'), 'objects')
  assert(parsed.every(e => typeof e.id === 'string'), 'id strings')
  assert(parsed.every(e => typeof e.deprecated === 'boolean'), 'deprecated booleans')
  assert(parsed.some(e => e.id === 'MIT'), 'MIT')
  assert(parsed.some(e => e.id === 'AGPL-3.0' && e.deprecated), 'AGPL-3.0 deprecated')
})
