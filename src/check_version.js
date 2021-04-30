// This script must be used in clients applications to prevent developers
// from deploying beta plankton releases to production
// usage example: "node ./node_modules/plankton/dist/check_version.js"

const chalk = require('chalk')
const currentFolder = process.cwd()
const OFFICIAL_VERSION_REGEX = /\d+\.\d+\.\d+$/
const planktonDependency = require(`${currentFolder}/package.json`).dependencies[
  '@sennder/plankton'
]
const hasOfficialVersion = OFFICIAL_VERSION_REGEX.test(planktonDependency)

if (hasOfficialVersion) {
  process.exit(0)
}

/* eslint-disable-next-line no-console */
console.log(
  chalk.red(
    `${planktonDependency} is the beta release of plankton, please use minor or major release to deploy to production`
  )
)

process.exit(1)
