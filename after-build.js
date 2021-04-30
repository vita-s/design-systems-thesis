const fs = require('fs')

// This script will publish the needed scss artifacts to be imported by our clients (octopus, orcas...)
// That way we will avoid re-declaring common scss variables or mixins in those clients
// Destination will be created or overwritten by default.
fs.copyFile('./src/styles/helpers/_variables.scss', './dist/_variables.scss', err => {
  if (err) throw err
  /* eslint-disable-next-line no-console */
  console.log('Scss variables successfully copied to dist')
})

fs.copyFile('./src/styles/helpers/_typography.scss', './dist/_typography.scss', err => {
  if (err) throw err
  /* eslint-disable-next-line no-console */
  console.log('Scss typography successfully copied to dist')
})

// We also need to publish the check_version script to make it usable for our clients
fs.copyFile('./src/check_version.js', './dist/check_version.js', err => {
  if (err) throw err
  /* eslint-disable-next-line no-console */
  console.log('check_version script copied to dist')
})
