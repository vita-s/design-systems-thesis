module.exports = components => `\
// THIS FILE IS AUTOMATICALLY GENERATED IN:
//
//   ./templateComponents.js
//
// YOU SHOULD NEVER UPDATE THIS FILE DIRECTLY

${components
  .map(component => `export { default as ${component.name} } from '${component.path}'`)
  .join('\n')}
`
