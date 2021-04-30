import { mount } from '@vue/test-utils'
import fieldFormDisabledMixin from '@/mixins/field-form-disabled-mixin'
import Form from '@/components/Form.vue'
import { ComponentWrapper, InputFieldWrapper } from '@/test-utils/jest/wrappers'

describe('Field form disabled mixin', () => {
  it('disables component from field prop', () => {
    const wrapper = renderMixin({ inputDisabled: true })
    const input = new InputFieldWrapper(wrapper.findByDataTest('input'))
    expect(input.isDisabled()).toBeTrue()
  })

  it('disables component from Form prop', () => {
    const wrapper = renderMixin({ formDisabled: true })
    const input = new InputFieldWrapper(wrapper.findByDataTest('input'))
    expect(input.isDisabled()).toBeTrue()
  })

  function renderMixin(propsData = {}) {
    const InputWithMixin = {
      mixins: [fieldFormDisabledMixin],
      template: `<input type="text" data-test="input" :disabled="fieldFormDisabled" />`
    }
    const componentWithMixin = {
      components: { Form, InputWithMixin },
      props: {
        inputDisabled: { type: Boolean, default: false },
        formDisabled: { type: Boolean, default: false }
      },
      template: `<Form :disabled="formDisabled">
            <InputWithMixin :disabled="inputDisabled" />
          </Form>
        `
    }
    return new ComponentWrapper(mount(componentWithMixin, { propsData }))
  }
})
