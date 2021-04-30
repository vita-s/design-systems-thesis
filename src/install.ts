import { vTooltip, vPopover, vClosePopover } from './directives'
import * as components from './components'
import { VueConstructor } from 'vue'

export default (Vue: VueConstructor) => {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component)
  })

  vTooltip(Vue)
  vPopover(Vue)
  vClosePopover(Vue)
}
