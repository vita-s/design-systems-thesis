import Icon from '../Icon.vue'
import { mount, Wrapper } from '@vue/test-utils'
import { VueRelaxed } from '@/test-utils/jest/wrappers/VueRelaxed'

describe('Icon', () => {
  let icon: Wrapper<VueRelaxed>

  beforeEach(() => {
    icon = mount(Icon)
  })
  afterEach(() => {
    icon.destroy()
  })

  it('displays icon with name prop', async () => {
    await icon.setProps({ name: 'edit' })

    expect(icon.find('svg')).toBeDefined()
  })

  it('displays material icon with materialIcon prop', async () => {
    await icon.setProps({ materialIcon: 'comment' })

    expect(icon.text()).toContain('comment')
  })
})
