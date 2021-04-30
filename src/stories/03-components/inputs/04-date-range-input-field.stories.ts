import DateRangeInputField from '@/components/input-fields/DateRangeInputField.vue'
import sections from '../../story-sections'

export default {
  title: `${sections.components}/Inputs/DateRangeInputField`,
  component: DateRangeInputField
}

const today = new Date()
today.setHours(0, 0, 0, 0)

const tomorrow = new Date()
tomorrow.setDate(today.getDate() + 1)
tomorrow.setHours(0, 0, 0, 0)

const ranges = {
  ['Today only']: [today.toISOString(), today.toISOString()],
  ['Tomorrow only']: [tomorrow.toISOString(), tomorrow.toISOString()]
}

export const Default = () => ({
  components: { DateRangeInputField },
  template: `<DateRangeInputField v-model="pickupRange" culture="en-US" title="Date Picker" input-date-filter="DD.MM.YYYY" open-direction="right" placeholder="Please select a date" data-test="select-pickup-date"/>`,
  data() {
    return {
      pickupRange: {
        startDate: null,
        endDate: null
      }
    }
  }
})

export const WithSingleDatePicker = () => ({
  components: { DateRangeInputField },
  template: `<DateRangeInputField v-model="pickupRange" culture="en-US" title="Date Picker" singleDatePicker input-date-filter="DD.MM.YYYY" open-direction="right" placeholder="Please select a date" data-test="select-pickup-date"/>`,
  data() {
    return {
      pickupRange: {
        startDate: null,
        endDate: null
      }
    }
  }
})

export const WithSingleDateTimePicker = () => ({
  components: { DateRangeInputField },
  template: `<DateRangeInputField v-model="pickupRange" culture="en-US" title="Date time Picker" singleDatePicker timePicker input-date-filter="DD.MM.YYYY HH:mm" open-direction="right" clearSelectionLabel="Clear date & time" />`,
  data() {
    return {
      pickupRange: {
        startDate: null,
        endDate: null
      }
    }
  }
})

export const WithTimePicker = () => ({
  components: { DateRangeInputField },
  template: `<DateRangeInputField v-model="pickupRange" culture="en-US" title="Date Picker" timePicker input-date-filter="DD.MM.YYYY HH:mm" open-direction="right" placeholder="Please select a date" data-test="select-pickup-date"/>`,
  data() {
    return {
      pickupRange: {
        startDate: null,
        endDate: null
      }
    }
  }
})

export const WithRanges = () => ({
  components: { DateRangeInputField },
  template: `<DateRangeInputField v-model="pickupRange" culture="en-US" title="Date Picker" :ranges="ranges" input-date-filter="DD.MM.YYYY" open-direction="right" placeholder="Please select a date" data-test="select-pickup-date"/>`,
  data() {
    return {
      ranges,
      pickupRange: {
        startDate: null,
        endDate: null
      }
    }
  }
})

export const WithRangesAndTimePicker = () => ({
  components: { DateRangeInputField },
  template: `<DateRangeInputField v-model="pickupRange" culture="en-US" :ranges="ranges" title="Date Picker" timePicker  input-date-filter="DD.MM.YYYY HH:mm" open-direction="right" placeholder="Please select a date" data-test="select-pickup-date"/>`,
  data() {
    return {
      ranges,
      pickupRange: {
        startDate: null,
        endDate: null
      }
    }
  }
})

export const WithDisabledDates = () => ({
  components: { DateRangeInputField },
  template: `<DateRangeInputField v-model="pickupRange"  :dateFormat="dateFormat" culture="en-US" title="Date Picker" input-date-filter="DD.MM.YYYY" open-direction="right" placeholder="Please select a date" data-test="select-pickup-date"/>`,
  data() {
    return {
      pickupRange: {
        startDate: null,
        endDate: null
      }
    }
  },
  methods: {
    dateFormat<T extends { disabled?: boolean }>(classes: T, date: Date) {
      date.setHours(0, 0, 0, 0)
      const currentDate = new Date()
      currentDate.setHours(0, 0, 0, 0)
      if (!classes.disabled) {
        classes.disabled = date.getTime() < currentDate.getTime()
      }
      return classes
    }
  }
})
