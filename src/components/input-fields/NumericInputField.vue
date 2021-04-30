<template>
  <InputField v-bind="attrs" v-on="listeners" />
</template>

<script>
import InputField from './InputField.vue'
import { buildDecimalMask, buildIntegerMask } from '@/components/input-fields/mask-regex'
import isNil from 'lodash/isNil'
import { isNumber } from '@/utilities/number-formatting'

const A_LOT_OF_DIGITS = 32
const DEFAULT_NUMBER_OF_DECIMALS = 2

export default {
  components: { InputField },
  inheritAttrs: false,
  props: {
    value: { type: Number, default: null },
    allowNegative: { type: Boolean, default: false },
    allowDecimal: { type: [Boolean, Number], default: DEFAULT_NUMBER_OF_DECIMALS },
    allowInteger: { type: [Boolean, Number], default: A_LOT_OF_DIGITS }
  },
  computed: {
    getInputMask() {
      const result = this.allowDecimal
        ? buildDecimalMask(this.allowNegative, this.allowInteger, this.allowDecimal)
        : buildIntegerMask(this.allowNegative, this.allowInteger)

      return result
    },
    attrs() {
      return {
        ...this.$attrs,
        value: !isNil(this.value) ? this.value.toString() : '',
        inputMask: this.getInputMask
      }
    },
    listeners() {
      return {
        ...this.$listeners,
        input: value => {
          const parseFunction = this.allowDecimal ? parseFloat : parseInt
          if (value.length === 0) this.$emit('input', null)
          else if (isNumber(value)) this.$emit('input', parseFunction(value))
        }
      }
    }
  }
}
</script>
