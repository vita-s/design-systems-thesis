import { resolvePromises } from './test-utils'
import { Wrapper } from '@vue/test-utils'
import { VueRelaxed } from './jest/wrappers/VueRelaxed'

const dataTestId = (id: string) => `[data-test="${id}"]`

export const clickButton = async (wrapper: Wrapper<VueRelaxed>, id: string) => {
  await wrapper.find(dataTestId(id)).trigger('click')
  await resolvePromises()
}

export const click = clickButton

export const findAll = (wrapper: Wrapper<VueRelaxed>, id: string) =>
  wrapper.findAll(dataTestId(id))

export const find = (wrapper: Wrapper<VueRelaxed>, id: string) =>
  wrapper.find(dataTestId(id))

// Deprecated, please use component test wrappers instead
export const getInputValue = (wrapper: Wrapper<VueRelaxed>, id: string) => {
  const inputElement = wrapper
    .find(dataTestId(id))
    .find("[data-plankton-test='input-field']").element as HTMLInputElement
  return inputElement.value
}

export const writeInputValue = (
  wrapper: Wrapper<VueRelaxed>,
  id: string,
  value: string
) => {
  if (isDisabled(wrapper, id))
    console.warn(`You are trying to write in a disabled input (${id})`)
  wrapper.find(dataTestId(id)).find("[data-plankton-test='input-field']").setValue(value)
}

export const isDisabled = (wrapper: Wrapper<VueRelaxed>, id: string) =>
  wrapper.find(dataTestId(id)).html().includes(`disabled="disabled"`)

export const selectOptionByText = async (
  wrapper: Wrapper<VueRelaxed>,
  dataTest: string,
  text: string
) => {
  await wrapper
    .findAll(`[data-test="${dataTest}"] .multiselect__option`)
    .filter(el => el.text().includes(text))
    .at(0)
    .trigger('click')
  await resolvePromises()
}

export const checkCheckbox = async (wrapper: Wrapper<VueRelaxed>, id: string) => {
  if (isDisabled(wrapper, id)) {
    console.warn(`You are trying to check a disabled checkbox (${id})`)
  }

  if (!isCheckboxChecked(wrapper, id)) {
    await find(wrapper, id).find('input').trigger('click')
    await find(wrapper, id).find('input').trigger('change')
    await resolvePromises()
  }
}

export const uncheckCheckbox = async (wrapper: Wrapper<VueRelaxed>, id: string) => {
  if (isDisabled(wrapper, id)) {
    console.warn(`You are trying to check a disabled checkbox (${id})`)
  }

  if (isCheckboxChecked(wrapper, id)) {
    await find(wrapper, id).find('input').trigger('click')
    await find(wrapper, id).find('input').trigger('change')
    await resolvePromises()
  }
}

export const isCheckboxChecked = (wrapper: Wrapper<VueRelaxed>, dataTest: string) => {
  const inputElement = find(wrapper, dataTest).find('input').element as HTMLInputElement
  return inputElement.checked
}
