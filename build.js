#!/usr/bin/env node
const assert = require('assert')
const fs = require('fs')
const https = require('https')

// Download JSON file from spdx.org.
https.request('https://spdx.org/licenses/licenses.json')
  .once('response', response => {
    assert.strictEqual(response.statusCode, 200)
    const chunks = []
    response
      .on('data', chunk => { chunks.push(chunk) })
      .once('error', error => { assert.ifError(error) })
      .once('end', () => {
        const buffer = Buffer.concat(chunks)
        let parsed
        try {
          parsed = JSON.parse(buffer)
        } catch (error) {
          assert.ifError(error)
        }

        // Read list version from JSON.
        const version = parsed.licenseListVersion
        assert.strictEqual(typeof version, 'string')

        // Read identifiers from JSON.
        const licenses = parsed.licenses
        assert.strictEqual(Array.isArray(licenses), true)
        const index = []
        const deprecated = []
        licenses.forEach(object => {
          const id = object.licenseId
          assert.strictEqual(typeof id, 'string')
          if (object.isDeprecatedLicenseId) {
            deprecated.push(id)
          } else {
            index.push(id)
          }
        })

        // Sort identifier lists.
        index.sort()
        deprecated.sort()

        // Write JSON files.
        let todo = 3
        function finishTask (error) {
          assert.ifError(error)
          if (--todo === 0) process.exit(0)
        }
        function writeFile (path, data) {
          fs.writeFile(
            path, JSON.stringify(data, null, 2) + '\n',
            finishTask
          )
        }
        writeFile('index.json', index)
        writeFile('deprecated.json', deprecated)
        fs.readFile('package.json', (error, buffer) => {
          assert.ifError(error)
          let parsed
          try {
            parsed = JSON.parse(buffer)
          } catch (error) {
            assert.ifError(error)
          }
          const patch = process.env.PATCH || '0'
          parsed.version = version + '.' + patch
          writeFile('package.json', parsed)
        })
      })
  })
  .end()
