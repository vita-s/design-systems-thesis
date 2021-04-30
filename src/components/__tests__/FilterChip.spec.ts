import { mount } from '@vue/test-utils'
import FilterChip from '../FilterChip.vue'
import { ChipWrapper } from '@/test-utils/jest/wrappers'

describe('FilterChip.vue', () => {
  let wrapper: ChipWrapper
  const text = 'chip text example'

  beforeEach(() => {
    wrapper = new ChipWrapper(
      mount(FilterChip, {
        propsData: {
          text,
          truncated: true
        }
      })
    )
  })

  it('has text from prop', () => {
    expect(wrapper.text()).toBe(text)
  })

  it('should emit close event', async () => {
    await wrapper.close()
    expect(wrapper.emitted('remove-filter-chip')).toHaveLength(1)
  })

  it('should has class truncated', () => {
    expect(wrapper.isTruncated()).toBeTrue()
  })
})
