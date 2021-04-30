<template>
  <ChipsTextAreaField
    :chips="chips"
    :validators="allValidators"
    v-bind="$attrs"
    :maxLength="maxLength"
    v-on="$listeners"
  />
</template>

<script>
import ChipsTextAreaField from './ChipsTextAreaField.vue'

export default {
  components: {
    ChipsTextAreaField
  },
  inheritAttrs: false,
  model: {
    prop: 'chips',
    event: 'chips-input'
  },
  props: {
    maxLength: { type: Number, default: 20 },
    validators: { type: Array, default: () => [] },
    chips: { type: Array, default: () => [] }
  },
  data() {
    const maxLengthValidator = {
      isInvalid: chips => chips && chips.length === this.maxLength
    }

    return {
      maxLengthValidator
    }
  },
  computed: {
    allValidators() {
      return [...this.validators, maxLengthValidator]
    }
  },
  watch: {
    chips: {
      handler() {
        this.maxLengthValidator.errorMessage = `You’ve reached the limit of allowed chips.`
      },
      immediate: true
    }
  }
}
</script>
