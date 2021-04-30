import { mount } from '@vue/test-utils'
import { ComponentWrapper, ProgressBarWrapper } from '@/test-utils/jest/wrappers'
import ProgressBar from '@/components/ProgressBar.vue'

describe('ProgressBar', () => {
  it('displays bar with progress value', () => {
    const propsData = { value: 25 }

    const wrapper = new ProgressBarWrapper(mount(ProgressBar, { propsData }))

    expect(wrapper.progressEl.style.width).toBe(`${propsData.value}%`)
  })
})
