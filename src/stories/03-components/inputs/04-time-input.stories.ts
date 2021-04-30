import TimeInputField from '@/components/input-fields/TimeInputField.vue'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Inputs/TimeInputField`,
  component: TimeInputField
}

export const Default = () => ({
  template: `<TimeInputField v-model="time"/>`,
  data: () => ({ time: '' })
})

export const Disabled = () => ({
  template: `<TimeInputField v-model="time" :disabled="true"/>`,
  data: () => ({ time: '' })
})

export const WithDefaultValue = () => ({
  template: `<TimeInputField v-model="time"/>`,
  data: () => ({ time: '12:34' })
})

export const WithTitle = () => ({
  template: `<TimeInputField title="Time input field" v-model="time"/>`,
  data: () => ({ time: '' })
})

export const WithCustomPlaceholder = () => ({
  template: `<TimeInputField v-model="time" placeholder="SS:Mm"/>`,
  data: () => ({ time: '' })
})

export const WithCustomValidation = () => ({
  template: `<TimeInputField v-model="time" :inputValidators="validator" title="ante meridiem (a.m.) time"/>`,
  data: () => ({
    ...{ time: '' },
    validator: [
      {
        isInvalid: (input: string) => {
          const inputHour = Number.parseInt(input.substring(0, 2))
          return inputHour > 12
        }
      }
    ]
  })
})

export const WithCustomValidationAndErrorMessage = () => ({
  template: `<TimeInputField v-model="time" :inputValidators="validator" title="After office hours, please"/>`,
  data: () => ({
    ...{ time: '' },
    validator: [
      {
        isInvalid: (input: string) => {
          const inputHour = Number.parseInt(input.substring(0, 2))
          return inputHour < 18
        },
        errorMessage: 'This hour is too early'
      }
    ]
  })
})
