import { VueConstructor } from 'vue'
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip'

export const vTooltip = (Vue: VueConstructor) => Vue.directive('tooltip', VTooltip)
export const vPopover = (Vue: VueConstructor) => Vue.component('v-popover', VPopover)
export const vClosePopover = (Vue: VueConstructor) =>
  Vue.directive('close-popover', VClosePopover)
