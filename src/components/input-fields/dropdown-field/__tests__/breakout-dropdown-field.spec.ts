import { mount } from '@vue/test-utils'
import { breakoutDropdownFieldMixin } from '../breakout-dropdown-field'
import DropdownField from '../DropdownField.vue'

describe('BreakoutDropdownFieldMixin', () => {
  const dropdownHelperName = 'breakout'
  const containerClass = 'container-class'
  const MockComponent = {
    components: {
      DropdownField
    },
    template: `
      <div class="${containerClass}">
        <DropdownField ref="${dropdownHelperName}"></DropdownField>
      </div>
      `,
    mixins: [breakoutDropdownFieldMixin]
  }

  describe('Breakout Dropdown Mixin', () => {
    it('sets style of dropdown list to fixed', async () => {
      const wrapper = await mount(MockComponent)
      const dropdownList = (((wrapper as any).vm.$refs[dropdownHelperName] as Vue).$refs[
        'dropdown-search-select'
      ] as Vue).$refs.list as HTMLElement

      expect(dropdownList.style.position).not.toEqual('fixed')
      ;(wrapper as any).vm.initDropdownBreakoutHelper(dropdownHelperName)

      expect(dropdownList.style.position).toEqual('fixed')
    })
  })
})
