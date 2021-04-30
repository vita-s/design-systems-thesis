// @ts-nocheck
import { mount } from '@vue/test-utils'
import DropdownField from '../DropdownField.vue'
import { provider as formProvider } from '@/components/form-provider'
import {
  DropdownFieldWrapper,
  MultipleDropdownFieldWrapper,
  ComponentWrapper
} from '@/test-utils/jest/wrappers'

describe('DropdownField', () => {
  let wrapper: MultipleDropdownFieldWrapper | DropdownFieldWrapper,
    selectEventHandlerStub: jest.Mock,
    registerField: jest.Mock,
    setFieldValidationErrors: jest.Mock

  const title = 'enter a value'
  const fieldName = 'my-field'
  const options = ['1', '2', '3', '4', '5']

  const defaultPropsData = {
    options,
    name: fieldName,
    value: 2,
    title,
    validators: [{ errorMessage: 'error', isInvalid: (value: number) => value % 2 === 1 }]
  }

  beforeEach(() => {
    selectEventHandlerStub = jest.fn(value => wrapper.root.setProps({ value }))
    registerField = jest.fn()
    setFieldValidationErrors = jest.fn()
    wrapper = renderComponent()
  })

  it('renders', () => {
    expect(wrapper.multiselect.exists()).toBeTrue()
  })

  it('renders label', () => {
    expect(wrapper.label).toEqual(title)
  })

  it('registers itself in form provider', () => {
    expect(registerField).toHaveBeenCalled()
  })

  it('triggers select event', async () => {
    await wrapper.selectOption('1')
    expect(selectEventHandlerStub).toHaveBeenCalled()
  })

  it('shows validation errors', async () => {
    await wrapper.selectOption('1')
    expect(wrapper.errors).toContain('error')
  })

  it('set errors in form provider when changing value', async () => {
    expect(setFieldValidationErrors).not.toHaveBeenCalled()
    await wrapper.selectOption('1')
    expect(setFieldValidationErrors).toHaveBeenCalledWith(fieldName, [
      { errorMessage: 'error', inline: true }
    ])
  })

  it('should render default noResult message', () => {
    expect(wrapper.text()).toContain(
      'No elements found. Consider changing the search query'
    )
  })

  it('should render custom noResult message', () => {
    const noResultMessage = 'custom no result message'
    const wrapper = renderComponent({ noResultMessage })

    expect(wrapper.text()).toContain(noResultMessage)
  })

  it('should render default noOptions message', () => {
    expect(wrapper.text()).toContain('List is empty')
  })

  it('should render custom noOptions message', () => {
    const noOptionsMessage = 'custom no options message'
    const wrapper = renderComponent({ noOptionsMessage })

    expect(wrapper.text()).toContain(noOptionsMessage)
  })

  describe('deselecting feature', () => {
    describe('with allowDeselectOption: true prop', () => {
      it('deselect the value on deselect option click', async () => {
        await wrapper.selectOption('Clear selection')
        expect(selectEventHandlerStub).toHaveBeenCalledWith(null)
      })

      it("doesn't display the deselect option if searchQuery is not empty", async () => {
        await wrapper.setProps({ searchable: true })
        await wrapper.search('c')
        const deselectOption = wrapper.getOption('Clear selection')
        expect(deselectOption).toBeFalsy()
      })

      it('can deselect already selected option', async () => {
        await wrapper.setProps({ value: ['2'] })
        await wrapper.selectOption('2')
        expect(selectEventHandlerStub).toHaveBeenCalledWith(null)
      })
    })

    describe('with allowDeselectOption: false prop', () => {
      it("doesn't display the deselect option", async () => {
        await wrapper.setProps({ allowDeselectOption: false })
        const deselectOption = wrapper.getOption('Clear selection')
        expect(deselectOption).toBeFalsy()
      })
    })

    describe('with allowEmpty: false prop', () => {
      it("can't deselect already selected option", async () => {
        await wrapper.setProps({ allowEmpty: false, value: ['2'] })
        await wrapper.selectOption('2')
        expect(selectEventHandlerStub).not.toHaveBeenCalled()
      })
    })
  })

  describe('multiple', () => {
    beforeEach(() => {
      selectEventHandlerStub = jest.fn(
        async value => await wrapper.root.setProps({ value: [...value] })
      )
      wrapper = renderComponent({ multiple: true, value: [] })
    })
    it('renders multi-select options', () => {
      expect(wrapper.options.length).toBe(options.length + 1) // 'Clear selection' option should count
    })

    it('allows selecting multiple options', async () => {
      await wrapper.selectOption('1')
      expect(selectEventHandlerStub).toHaveBeenCalledWith([options[0]])
      await wrapper.selectOption('3')
      expect(selectEventHandlerStub).toHaveBeenCalledWith([options[0], options[2]])
      if (!(wrapper instanceof DropdownFieldWrapper)) {
        expect(wrapper.visibleValues.length).toBe(2)
      }
    })

    it('allows removing selected options', async () => {
      await wrapper.selectOption('1')
      expect(selectEventHandlerStub).toHaveBeenCalledWith([options[0]])
      await wrapper.selectOption('1')
      expect(selectEventHandlerStub).toHaveBeenCalledWith([])
      if (!(wrapper instanceof DropdownFieldWrapper)) {
        expect(wrapper.visibleValues.length).toBe(0)
      }
    })

    it('allow adding new tag for taggable dropdown', async () => {
      await wrapper.setProps({ searchable: true, taggable: true })
      expect(wrapper.options.length).toBe(options.length + 1) // 'Clear selection' option should count
      await wrapper.addOption('6')
      expect(wrapper.options.length).toBe(options.length + 2) // 'Clear selection' option should count
    })

    it('allow adding multiple new tags at once for taggable dropdown', async () => {
      await wrapper.setProps({ searchable: true, taggable: true })
      expect(wrapper.options.length).toBe(options.length + 1) // 'Clear selection' option should count
      await wrapper.addOption('6,7,8,9,10')
      expect(wrapper.options.length).toBe(options.length + 6) // 'Clear selection' option should count
    })
    it('limit the numbers of new tags if maxElements specified', async () => {
      await wrapper.setProps({
        searchable: true,
        taggable: true,
        maxSelection: 7
      })
      expect(wrapper.options.length).toBe(options.length + 1)
      await wrapper.selectOption('1')
      await wrapper.selectOption('2')
      await wrapper.selectOption('3')
      await wrapper.selectOption('4')
      await wrapper.selectOption('5')
      await wrapper.addOption('6,7,8,9,10')
      expect(wrapper.options.length).toBe(8) // 'Clear selection' option should count
    })

    it('limits displayed selected options', async () => {
      await wrapper.selectOption('1')
      await wrapper.selectOption('2')
      await wrapper.selectOption('3')
      await wrapper.selectOption('4')
      if (!(wrapper instanceof DropdownFieldWrapper)) {
        expect(wrapper.visibleValues.length).toBe(2)
        expect(wrapper.invisibleValuesAmount).toBe(2)
      }
    })

    it('sorts options by selected state', async () => {
      await wrapper.selectOption('2')
      await wrapper.selectOption('4')
      await wrapper.rerenderOptions()
      expect(wrapper.getOptionTextByPosition(1)).toContain('2')
      expect(wrapper.getOptionTextByPosition(2)).toContain('4')
    })

    describe('deselecting feature', () => {
      describe('with allowDeselectOption: true prop', () => {
        it('deselect all values on deselect option click', async () => {
          await wrapper.selectOption('Clear selection')
          expect(selectEventHandlerStub).toHaveBeenCalledWith([])
        })

        it("doesn't display the deselect option if searchQuery is not empty", async () => {
          await wrapper.setProps({ searchable: true })
          await wrapper.search('c')
          const deselectOption = wrapper.getOption('Clear selection')
          expect(deselectOption).toBeFalsy()
        })

        it('can deselect the only selected option', async () => {
          await wrapper.setProps({ value: ['2'] })
          await wrapper.selectOption('2')
          expect(selectEventHandlerStub).toHaveBeenCalledWith([])
        })
      })

      describe('with allowDeselectOption: false prop', () => {
        it("doesn't display the deselect option", async () => {
          await wrapper.setProps({ allowDeselectOption: false })
          const deselectOption = wrapper.getOption('Clear selection')
          expect(deselectOption).toBeFalsy()
        })
      })

      describe('with allowEmpty: false prop', () => {
        it("can't deselect the only selected option", async () => {
          await wrapper.setProps({ allowEmpty: false, value: ['2'] })
          await wrapper.selectOption('2')
          expect(selectEventHandlerStub).not.toHaveBeenCalled()
        })
      })
    })
  })

  describe('custom field', () => {
    beforeEach(() => {
      const label = (dataTestValue: string) => `
        <div>
          <div style="display: inline-block; width: 40px; text-align: center;margin-right: 9px;">
            <img :src="props.option.img" alt="Truck visualization" data-test="${dataTestValue}-image" />
          </div>
          <span data-test="${dataTestValue}-text">{{ props.option.title }}</span>
        </div>
      `
      selectEventHandlerStub = jest.fn(value =>
        wrapper.root.setProps({ value: [...value] })
      )
      wrapper = renderComponent(
        {
          options: [{ title: '40T', img: 'images/truck.png' }],
          value: [{ title: '40T', img: 'images/truck.png' }]
        },
        {
          option: label('option'),
          singleLabel: label('singleLabel')
        }
      )
    })

    it('renders a custom field', () => {
      expect(wrapper.findAllByDataTest('option-image').length).toBe(2)
      expect(wrapper.findAllByDataTest('option-text').length).toBe(2)
    })

    it('renders a custom selection', () => {
      expect(wrapper.findAllByDataTest('singleLabel-image').length).toBe(1)
      expect(wrapper.findAllByDataTest('singleLabel-text').length).toBe(1)
    })

    it("won't allow data-test attribute fall to input element", async () => {
      const dropdownContainer = new ComponentWrapper(
        mount({
          components: { DropdownField },
          template: '<DropdownField :value="value" data-test="test-dropdown" />',
          data() {
            return { value: '' }
          }
        })
      )
      const dropdownWrapper = new DropdownFieldWrapper(
        dropdownContainer.findByDataTest('test-dropdown')
      )

      expect(dropdownWrapper.attributes()['data-test']).toBe('test-dropdown')
      expect(dropdownWrapper.multiselect.attributes()['data-test']).toBeUndefined()
    })
  })

  function renderComponent(customProps: any = {}, scopedSlots = {}) {
    const wrapper = customProps.multiple
      ? MultipleDropdownFieldWrapper
      : DropdownFieldWrapper

    return new wrapper(
      mount(DropdownField, {
        propsData: {
          ...defaultPropsData,
          ...customProps
        },
        listeners: { select: selectEventHandlerStub },
        provide: {
          [formProvider.from]: {
            registerField,
            setFieldValidationErrors,
            isFormDisabled: () => false
          }
        },
        scopedSlots
      })
    )
  }
})
