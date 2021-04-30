<template>
  <div class="date-field">
    <InputField
      v-bind="$attrs"
      :placeholder="placeholder"
      :input-validators="allValidators"
      :input-mask="dateMask"
      :material-icon="icon"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import InputField from './InputField.vue'
import { DATE_MASK, DATE_MASK_WITH_DOTS } from '@/components/input-fields/mask-regex'
import { isValidDate, isValidDateWithDots } from '@/utilities/date-formatting'

export default {
  components: { InputField },
  inheritAttrs: false,
  props: {
    placeholder: { type: String, default: 'dd-mm-yyyy' },
    inputValidators: { type: Array, default: () => [] },
    useDotAsSeparator: { type: Boolean, default: false }, //allow making a gradual migration to the new date format.
    gpsReceived: { type: Boolean, default: false }
  },
  computed: {
    allValidators() {
      return this.defaultValidators.concat(this.inputValidators)
    },
    icon() {
      return this.gpsReceived ? 'gps_fixed' : 'date_range'
    }
  },
  created() {
    let dateValidator
    if (this.useDotAsSeparator) {
      dateValidator = isValidDateWithDots
      this.dateMask = DATE_MASK_WITH_DOTS
    } else {
      dateValidator = isValidDate
      this.dateMask = DATE_MASK
    }

    this.defaultValidators = [
      {
        isInvalid: input => !dateValidator(input),
        errorMessage: 'Not a valid date'
      }
    ]
  }
}
</script>

<style scoped>
.date-field {
  position: relative;
}
</style>
