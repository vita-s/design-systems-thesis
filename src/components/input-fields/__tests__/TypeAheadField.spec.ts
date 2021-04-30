import { mount } from '@vue/test-utils'
import TypeAheadField from '../TypeAheadField.vue'
import { TypeAheadFieldWrapper } from '@/test-utils/jest/wrappers'

describe('TypeAheadField.vue', () => {
  let wrapper: TypeAheadFieldWrapper, selectEventHandlerStub: jest.Mock
  const title = 'enter a value'
  const fieldName = 'my-field'
  const testData = 'custom-test-data'

  beforeEach(() => {
    const propsData = {
      title,
      options: [123, 234, 345, 456, 567],
      name: fieldName,
      value: 234,
      validators: [
        { errorMessage: 'error', isInvalid: (value: number) => value % 2 === 1 }
      ],
      searchable: true
    }
    selectEventHandlerStub = jest.fn(value => wrapper.setProps({ value }))

    wrapper = new TypeAheadFieldWrapper(
      mount(TypeAheadField, {
        propsData,
        attrs: { 'data-test': testData },
        listeners: {
          select: selectEventHandlerStub
        }
      })
    )
  })

  it('renders DropdownField', () => {
    expect(wrapper.findByDataTest(testData).exists()).toBeTrue()
  })

  describe('Props passing', () => {
    it('should pass right props to DropdownField by default', () => {
      expect(wrapper.findByDataTest(testData).props().allowDeselectOption).toBeFalse()
      expect(wrapper.findByDataTest(testData).props().clearLabel).toBeNull()
    })

    it('should pass right props to DropdownField when given', () => {
      wrapper.setProps({
        allowDeselectOption: true,
        clearLabel: 'custom clear label'
      })

      expect(wrapper.findByDataTest(testData).props().allowDeselectOption).toBeTrue()
      expect(wrapper.findByDataTest(testData).props().clearLabel).toBe(
        'custom clear label'
      )
    })
  })

  it('renders label', () => {
    expect(wrapper.text()).toContain(title)
  })

  it('triggers select event', async () => {
    await wrapper.selectOption('123')
    expect(selectEventHandlerStub).toHaveBeenCalled()
  })

  it('shows validation errors', async () => {
    await wrapper.selectOption('123')
    expect(wrapper.errors).toContain('error')
  })

  it('clear options before doing query', async () => {
    await wrapper.search('test')
    expect(wrapper.emitted('clearFilterOptions')).toBeTruthy()
  })

  it('triggers query event input has required length', async () => {
    const searchQuery = 'test'
    await wrapper.search(searchQuery)
    expect(wrapper.emitted('fetchFilterOptions')?.[0]).toEqual([searchQuery])
  })

  it('doest not trigger query event when input does not have required length', async () => {
    await wrapper.search('tt')
    expect(wrapper.emitted('fetchFilterOptions')).toBeFalsy()
  })

  it('debouces query calls', async () => {
    const searchQuery = 'test-hola'
    for (let i = 1; i < searchQuery.length; i++) {
      wrapper.search(searchQuery.substring(0, i))
    }
    expect(wrapper.emitted('fetchFilterOptions')).toBeFalsy()

    await wrapper.search(searchQuery)
    expect(wrapper.emitted('fetchFilterOptions')?.length).toBe(1)
  })

  it('sets data-test attribute to root element', () => {
    expect(wrapper.root.attributes('data-test')).toBe(testData)
  })

  it('displays selected option in options list', () => {
    const selectedOption = wrapper.options.at(0)
    expect(selectedOption.text()).toBe('234')
  })
})
