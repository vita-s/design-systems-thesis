import { loadStyles } from './components/global-styles-setup'
import install from './install'

// Import Specific Directive
// ex. import { vTooltip } from 'plankton'
// { directives: { tooltip: vTooltip(Vue) } }
export * from './directives'

// Import Specific Component
// ex. import { Button } from 'plankton'
export * from './components'

// Import Global Components (cf. https://github.com/chrisvfritz/hello-vue-components)
// ex. import { components } from 'plankton'
// const { Button } = components
export * as components from './components'

export default { install }

// Import Individual Functions
// ex. import { today, toIsoDatetime } from 'plankton'
export * from './utilities/date-formatting'
export * from './utilities/number-formatting'
export * from './test-utils/cypress/date-diff'
export { loadStyles }
export { alertModalMixin } from './components/alert-modal'
export { breakoutDropdownFieldMixin } from './components/input-fields/dropdown-field/breakout-dropdown-field'
export { Timestamp } from './utilities/Timestamp'
export { AlertModal } from './components/alert-modal'
