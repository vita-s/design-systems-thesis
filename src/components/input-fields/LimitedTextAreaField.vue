<template>
  <TextAreaField
    v-bind="$attrs"
    :value="value"
    :legend="legend"
    :validators="allValidators"
    v-on="$listeners"
    @focus="focused = true"
    @blur="focused = false"
  />
</template>

<script>
import TextAreaField from './TextAreaField.vue'
import { legend } from './limited-text-field'

export default {
  components: {
    TextAreaField
  },
  props: {
    value: { type: String, default: '' },
    maxLength: { type: Number, default: 50 },
    minLength: { type: Number, default: 0 },
    validators: { type: Array, default: () => [] }
  },
  data() {
    const maxLengthValidator = {
      isInvalid: value => value && value.length > this.maxLength
    }
    const minLengthValidator = {
      isInvalid: value => value && value.length < this.minLength
    }

    return {
      focused: false,
      minLengthValidator,
      maxLengthValidator
    }
  },
  computed: {
    remainingChars() {
      return this.maxLength - (this.value ? this.value.length : 0)
    },
    legend() {
      if (this.minLength > 0)
        return `Entered text should have a length between ${this.minLength} and ${
          this.maxLength
        } characters. ${legend(this.focused, this.remainingChars)}`
      else return legend(this.focused, this.remainingChars)
    },
    allValidators() {
      return [...this.validators, this.maxLengthValidator, this.minLengthValidator]
    }
  },
  watch: {
    value: {
      handler() {
        const remaining = Math.abs(this.remainingChars)
        this.maxLengthValidator.errorMessage = `You’ve exceeded the limit by ${remaining} characters.`
        this.minLengthValidator.errorMessage = `Entered text should have a length between ${this.minLength} and ${this.maxLength} characters.`
      },
      immediate: true
    }
  }
}
</script>
