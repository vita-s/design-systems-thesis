<template>
  <NumericInputField v-bind="$attrs" material-icon="euro_symbol" v-on="$listeners" />
</template>

<script>
import NumericInputField from './NumericInputField.vue'

export default {
  components: { NumericInputField },
  inheritAttrs: false
}
</script>
