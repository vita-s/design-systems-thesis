const fs = require('fs')
const glob = require('glob')
const path = require('path')

const templateComponents = require('./templateComponents')

function getComponents(callback) {
  glob('src/components/**/*.vue', callback)
}

function handleResult(err, res) {
  if (err) {
    console.error('Error', err)
    process.exit(1)
  } else {
    const re = /.*\/+(.*).vue$/

    const components = res.reduce((result, element) => {
      if (!element.includes('__tests__'))
        result.push({
          name: element.replace(re, '$1'),
          path: element.replace(/src\//, '@/')
        })
      return result
    }, [])

    const outputPath = path.resolve(__dirname, './components.ts')

    fs.writeFileSync(outputPath, templateComponents(components))
  }
}

getComponents(handleResult)
