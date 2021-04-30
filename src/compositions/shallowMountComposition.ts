// Composables can't be used outside Vue components
// this funcion will return a dummy component
// using the function argument as a composable

import { defineComponent } from '@vue/composition-api'
import { shallowMount } from '@vue/test-utils'
import { VueRelaxed } from '@/test-utils/jest/wrappers/VueRelaxed'

export default async (cb: () => void) => {
  const component = shallowMount<VueRelaxed>(
    defineComponent({
      setup() {
        return cb()
      },
      render(h) {
        return h('div')
      }
    })
  )
  await component.vm.$nextTick
  return component
}
