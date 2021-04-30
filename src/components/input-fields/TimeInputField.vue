<template>
  <div class="time-field">
    <InputField
      v-bind="$attrs"
      placeholder="hh:mm"
      :input-validators="allValidators"
      :input-mask="timeMask"
      :material-icon="icon"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import InputField from './InputField.vue'
import { TIME_MASK } from '@/components/input-fields/mask-regex'
import { isValidHour } from '@/utilities/date-formatting'

export default {
  components: { InputField },
  inheritAttrs: false,
  props: {
    inputValidators: { type: Array, default: () => [] },
    gpsReceived: { type: Boolean, default: false }
  },
  computed: {
    allValidators() {
      return this.defaultValidators.concat(this.inputValidators)
    },
    icon() {
      return this.gpsReceived ? 'gps_fixed' : 'access_time'
    }
  },
  created() {
    this.timeMask = TIME_MASK
    this.defaultValidators = [
      {
        isInvalid: input => input && !isValidHour(input),
        errorMessage: 'Not a valid time'
      }
    ]
  }
}
</script>

<style scoped>
.time-field {
  position: relative;
}
</style>
