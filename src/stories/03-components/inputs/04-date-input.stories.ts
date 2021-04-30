import DateInputField from '@/components/input-fields/DateInputField.vue'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Inputs/DateInputField`,
  component: DateInputField
}

export const Default = () => ({
  components: { DateInputField },
  template: `<DateInputField v-model="date"/>`,
  data() {
    return {
      date: ''
    }
  }
})

export const Disabled = () => ({
  components: { DateInputField },
  template: `<DateInputField :disabled="yes"/>`,
  data() {
    return {
      yes: true
    }
  }
})

export const WithTitle = () => ({
  components: { DateInputField },
  template: `<DateInputField v-model="date" title="Back to the future"/>`,
  data() {
    return {
      date: ''
    }
  }
})

export const WithDefaultValue = () => ({
  components: { DateInputField },
  template: `<DateInputField v-model="date"/>`,
  data() {
    return {
      date: '31-12-2019'
    }
  }
})
export const WithCustomPlaceholder = () => ({
  components: { DateInputField },
  template: `<DateInputField placeholder="TT.MM.JJJJ" v-model="date" />`,
  data() {
    return {
      date: ''
    }
  }
})

export const WithValidation = () => ({
  components: { DateInputField },
  template: `<DateInputField title="The only day is christmas day" v-model="date" :inputValidators="inputValidators"/>`,
  data() {
    return {
      date: '',
      inputValidators: [
        {
          isInvalid: (input: string) => {
            const christmas = '24.12'
            const inputDayAndMonth = input !== null && input.substring(0, 5)
            return input && inputDayAndMonth !== christmas
          }
        }
      ]
    }
  }
})

export const WithValidationAndCustomErrorMessage = () => ({
  components: { DateInputField },
  template: `<DateInputField title="Only months starting with a 'J'" v-model="value" :inputValidators="inputValidators" />`,
  data() {
    return {
      value: '',
      inputValidators: [
        {
          isInvalid: (input: string) => {
            const inputMonth = (input !== null && input.substring(3, 5)) || ''
            return (
              input && inputMonth !== '01' && inputMonth !== '06' && inputMonth !== '07'
            )
          },
          errorMessage: 'Not a good month!'
        }
      ]
    }
  }
})

export const WithDotSeparator = () => ({
  components: { DateInputField },
  template: `<DateInputField v-model="value" useDotAsSeparator placeholder="mm.dd.yyyy" />`,
  data() {
    return { value: '' }
  }
})
