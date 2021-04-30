import ToggleInput from '@/components/toggle/ToggleInput.vue'
import { mount } from '@vue/test-utils'
import { ToggleInputWrapper } from '@/test-utils/jest/wrappers'

describe('ToggleButton.vue', () => {
  let toggleWrapper: ToggleInputWrapper, onInputMock: jest.Mock
  const labels = { checked: 'custom text on', unchecked: 'custom text off' }

  beforeEach(() => {
    toggleWrapper = new ToggleInputWrapper(
      mount(ToggleInput, {
        propsData: { labels, value: true },
        listeners: { input: onInputMock = jest.fn() }
      })
    )
  })

  it('changes from on to off', async () => {
    expect(toggleWrapper.text()).toContain(labels.checked)
    await toggleWrapper.toggleButton.click()
    expect(toggleWrapper.text()).toContain(labels.unchecked)
    await toggleWrapper.toggleButton.click()
    expect(toggleWrapper.text()).toContain(labels.checked)
  })

  it('triggers an input event when clicked', async () => {
    await toggleWrapper.toggleButton.click()
    expect(onInputMock).toHaveBeenCalledWith(false)
    await toggleWrapper.toggleButton.click()
    expect(onInputMock).toHaveBeenCalledWith(true)
  })
})
