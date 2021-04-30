import Button from '../Button.vue'
import { mount } from '@vue/test-utils'
import { ButtonWrapper } from '@/test-utils/jest/wrappers'

interface ButtonVm extends Vue {
  category: string
  inline: boolean
}

describe('Button', () => {
  let button: ButtonWrapper

  beforeEach(() => {
    button = new ButtonWrapper(mount(Button))
  })

  it('displays icon and text when both are given', async () => {
    await button.setProps({ text: 'BUTTON', materialIcon: 'favorite' })

    expect(button.text()).toEqual(expect.stringMatching(/favorite\s+BUTTON/))
  })

  it('is primary and not inline by default', () => {
    const button = mount<ButtonVm>(Button, {})

    expect(button.vm.category).toBe('primary')
    expect(button.vm.inline).toBeFalsy()
  })

  it('applies inline css class if inline parameter is true', async () => {
    await button.setProps({ inline: true })

    expect(button.root.classes()).toContain(buttonClassPrefix('inline'))
  })

  it('applies correct css classes if category is primary', async () => {
    await button.setProps({ category: 'primary' })

    expect(button.root.classes()).toContain(buttonClassPrefix('primary'))
    expect(button.root.classes()).not.toContain(buttonClassPrefix('secondary'))
    expect(button.root.classes()).not.toContain(buttonClassPrefix('tertiary'))
    expect(button.root.classes()).not.toContain(buttonClassPrefix('dark'))
  })

  it('applies correct css classes if category is secondary', async () => {
    await button.setProps({ category: 'secondary' })

    expect(button.root.classes()).toContain(buttonClassPrefix('secondary'))
    expect(button.root.classes()).not.toContain(buttonClassPrefix('primary'))
    expect(button.root.classes()).not.toContain(buttonClassPrefix('tertiary'))
    expect(button.root.classes()).not.toContain(buttonClassPrefix('dark'))
  })

  it('applies correct css classes if category is tertiary', async () => {
    await button.setProps({ category: 'tertiary' })

    expect(button.root.classes()).toContain(buttonClassPrefix('tertiary'))
    expect(button.root.classes()).not.toContain(buttonClassPrefix('primary'))
    expect(button.root.classes()).not.toContain(buttonClassPrefix('secondary'))
    expect(button.root.classes()).not.toContain(buttonClassPrefix('dark'))
  })

  it('applies correct css classes if category is dark', async () => {
    await button.setProps({ category: 'dark' })

    expect(button.root.classes()).toContain(buttonClassPrefix('dark'))
    expect(button.root.classes()).not.toContain(buttonClassPrefix('primary'))
    expect(button.root.classes()).not.toContain(buttonClassPrefix('secondary'))
    expect(button.root.classes()).not.toContain(buttonClassPrefix('tertiary'))
  })

  it('applies correct css classes if category is link', async () => {
    await button.setProps({ category: 'link' })

    expect(button.root.classes()).toContain('linked-text')
    expect(button.root.classes()).not.toContain(buttonClassPrefix('tertiary'))
    expect(button.root.classes()).not.toContain(buttonClassPrefix('primary'))
    expect(button.root.classes()).not.toContain(buttonClassPrefix('secondary'))
  })

  it('applies correct css classes if reversed', async () => {
    await button.setProps({ reversed: true })

    expect(button.root.classes()).toContain('button--reversed')
  })

  it('should render custom icon element', () => {
    const wrapper = new ButtonWrapper(
      mount(Button, {
        slots: {
          icon: `<span data-test="custom-icon">icon-custom</span>`
        }
      })
    )

    expect(wrapper.findByDataTest('custom-icon').exists()).toBeTrue()
  })

  function buttonClassPrefix(category: string) {
    return `button--${category}`
  }
})
