import { mount } from '@vue/test-utils'
import Form from '@/components/Form.vue'
import InputField from '@/components/input-fields/InputField.vue'
import DropdownField from '@/components/input-fields/dropdown-field/DropdownField.vue'
import DropdownFieldWrapper from '@/test-utils/jest/wrappers/DropdownFieldWrapper'
import { FormWrapper, ButtonWrapper, InputFieldWrapper } from '@/test-utils/jest/wrappers'

describe('Form', () => {
  let wrapper: FormWrapper, submitEventHandler: jest.Mock
  beforeEach(() => {
    submitEventHandler = jest.fn()
    const element = document.createElement('div')
    document.body.appendChild(element)
    wrapper = new FormWrapper(
      mount(Form, {
        listeners: { 'validated-submit': submitEventHandler },
        stubs: { DropdownField },
        slots: {
          default: `
        <div>
          <DropdownField
            name="first-field"
            :options="[1, 2, 3, 4]"
            :validators="[{ errorMessage: 'invalid number', isInvalid: value => !value }]"
            data-test="dropdown-field"
          />
          <Button type="submit" data-test="submit-button">submit</Button>
        </div>
        `
        },
        attachTo: element
      })
    )
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('emits submit event with form errors', async () => {
    const submitButton = new ButtonWrapper(wrapper.findByDataTest('submit-button'))
    await submitButton.click()
    expect(submitEventHandler).toHaveBeenCalledWith({ hasErrors: true })
  })

  it('shows field errors after submitting form', async () => {
    const dropdownField = new DropdownFieldWrapper(
      wrapper.findByDataTest('dropdown-field')
    )
    const submitButton = new ButtonWrapper(wrapper.findByDataTest('submit-button'))
    expect(dropdownField.errors).toHaveLength(0)
    await submitButton.click()
    expect(dropdownField.errors).toHaveLength(1)
  })

  describe('When it includes field with validators that uses external reactive data', () => {
    beforeEach(() => {
      const element = document.createElement('div')
      document.body.appendChild(element)
      wrapper = new FormWrapper(
        mount(Form, {
          stubs: { InputField },
          slots: {
            default: `
          <InputField data-test="name-field" />
          <InputField
            data-test="confirmed-name-field"
            :inputValidators="[
              {
                errorMessage: 'it is required',
                isInvalid: value => !value
              },
              {
                errorMessage: 'it is different',
                isInvalid: value => this.name && value && this.name !== value
              }
            ]"
          />
          <Button type="submit" data-test="submit-button">submit</Button>`
          },
          attachTo: element
        })
      )
    })
    it('shows field errors after submitting form', async () => {
      const submitButton = new ButtonWrapper(wrapper.findByDataTest('submit-button'))
      const nameFieldWrapper = new InputFieldWrapper(wrapper.findByDataTest('name-field'))

      // changing the value of first field will trigger validation functions
      // in second field because of 'errorMessage' computed prop.
      // But errors are not showed because InputField is not dirty.
      await nameFieldWrapper.write('james')

      // submit event should enforce a revalidation on all fields.
      await submitButton.click()

      expect(wrapper.text()).toContain('it is required')
    })
  })

  it('shows general errors when form is submitted', async () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    wrapper = new FormWrapper(
      mount(Form, {
        stubs: { InputField },
        slots: {
          default: `
        <InputField
          data-test="form-input"
          :inputValidators="[
            {
              errorMessage: 'it is an inline error',
              isInvalid: value => true
            },
            {
              errorMessage: 'it is a general error',
              isInvalid: value => true,
              inline: false
            }
          ]"
        />
        <Button type="submit" data-test="submit-button">submit</Button>`
        },
        attachTo: element
      })
    )

    const submitButton = new ButtonWrapper(wrapper.findByDataTest('submit-button'))

    const inputFieldWrapper = new InputFieldWrapper(wrapper.findByDataTest('form-input'))
    await inputFieldWrapper.write('test')
    expect(wrapper.errors.exists()).toBe(false)

    await submitButton.click()

    expect(wrapper.errors.exists()).toBe(true)
    expect(wrapper.errors.html()).toContain('it is a general error')
  })
})
