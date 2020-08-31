#!/usr/bin/env node
const https = require('https')
const meta = require('./package.json')
const spawn = require('child_process').spawn

// Get the lastest version of the package.
const npm = spawn('npm', ['info', meta.name, '--json'])
const chunks = []
npm.stdout
  .on('data', chunk => { chunks.push(chunk) })
  .once('end', () => {
    const buffer = Buffer.concat(chunks)
    const packageInfo = JSON.parse(buffer)
    const packageVersion = packageInfo['dist-tags'].latest
    console.log(`Latest Package Version: ${packageVersion}`)
    https.request('https://spdx.org/licenses/licenses.json')
      .once('response', response => {
        const chunks = []
        response
          .on('data', chunk => { chunks.push(chunk) })
          .once('end', () => {
            const buffer = Buffer.concat(chunks)
            const licenseList = JSON.parse(buffer)
            const listVersion = licenseList.licenseListVersion
            console.log(`License List Version:   ${listVersion}`)
            if (packageVersion.startsWith(listVersion)) {
              process.exit(0)
            } else {
              process.exit(1)
            }
          })
      })
      .end()
  })
