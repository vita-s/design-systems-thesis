import RadioSet from '../RadioSet.vue'
import { mount } from '@vue/test-utils'
import { RadioSetWrapper } from '@/test-utils/jest/wrappers'

describe('RadioSet', () => {
  let options: RadioSetWrapper
  it("displays options' labels", () => {
    const label = 'Option 1'
    options = new RadioSetWrapper(
      mount(RadioSet, {
        propsData: { name: 'test', options: [{ label, value: 'a value' }] }
      })
    )

    expect(options.getRadioButtonByLabel(label)?.exists()).toBeTrue()
  })

  it('applies inline css class if inline parameter is true', () => {
    options = new RadioSetWrapper(
      mount(RadioSet, {
        propsData: {
          name: 'test',
          options: [{ label: 'Option 1', value: 'a value' }],
          inline: true
        }
      })
    )

    expect(options.root.classes()).toContain('radio-group--horizontal')
  })

  it('executes a function call when clicked, if a change handler is attached', async () => {
    const someFunction = jest.fn()

    options = new RadioSetWrapper(
      mount(RadioSet, {
        propsData: {
          name: 'test',
          options: [
            { label: 'a', value: true },
            { label: 'b', value: false }
          ]
        },
        listeners: {
          input: someFunction
        }
      })
    )

    await options.getRadioButtonByLabel('a')?.click()
    expect(someFunction).toBeCalledWith(true)

    await options.getRadioButtonByLabel('b')?.click()
    expect(someFunction).toBeCalledWith(false)
  })
})
