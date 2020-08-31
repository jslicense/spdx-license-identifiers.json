#!/usr/bin/env node

// Get the lastest version of the package.
const npm = require('child_process')
  .spawn('npm', ['info', require('./package.json').name, '--json'])
const chunks = []
npm.stdout
  .on('data', chunk => { chunks.push(chunk) })
  .once('end', () => {
    const buffer = Buffer.concat(chunks)
    const packageInfo = JSON.parse(buffer)
    const packageVersion = packageInfo['dist-tags'].latest
    console.log(`Latest Package Version: ${packageVersion}`)

    // Get the latest version of the SPDX license list.
    require('https').request('https://spdx.org/licenses/licenses.json')
      .once('response', response => {
        const chunks = []
        response
          .on('data', chunk => { chunks.push(chunk) })
          .once('end', () => {
            const buffer = Buffer.concat(chunks)
            const licenseList = JSON.parse(buffer)
            const listVersion = licenseList.licenseListVersion
            console.log(`License List Version:   ${listVersion}`)

            // Check that package and list versions match.
            if (packageVersion.startsWith(listVersion)) {
              process.exit(0)
            } else {
              process.exit(1)
            }
          })
      })
      .end()
  })
