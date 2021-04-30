import { StepperWrapper } from '@/test-utils/jest/wrappers'
import { shallowMount } from '@vue/test-utils'
import VerticalStepper from '../VerticalStepper.vue'

describe('VerticalStepper', () => {
  const pointLabel = 'A'
  const stepper = new StepperWrapper(shallowMount(VerticalStepper))

  it('displays a step that contains a label and content', async () => {
    await stepper.root.setProps({ pointLabel })
    expect(stepper.label).toBe(pointLabel)
    expect(stepper.assertContentExist()).toBeTruthy()
  })
  it('displays a a step without showing the line under the label', async () => {
    await stepper.root.setProps({ pointLabel, showLine: false })
    expect(stepper.label).toBe(pointLabel)
    expect(stepper.assertLineExist()).toBeFalsy()
  })
  it('displays a step with the pointLabel aligned to the input field', async () => {
    await stepper.root.setProps({ pointLabel, alignInput: true })
    expect(stepper.label).toBe(pointLabel)
    expect(stepper.assertInputAligned()).toBeTruthy()
  })
})
