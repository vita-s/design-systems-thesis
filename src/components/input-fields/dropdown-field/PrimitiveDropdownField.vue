<template>
  <DropdownField v-bind="attrs" v-on="listeners" />
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'
import isNil from 'lodash/isNil'
import DropdownField from './DropdownField.vue'

type PrimitiveValue = string | number | boolean
type DropdownFieldValue = PrimitiveValue | Array<PrimitiveValue>

export default defineComponent({
  model: { prop: 'value', event: 'select' },
  components: { DropdownField },
  props: {
    options: { type: Array, required: true },
    value: {
      type: [String, Number, Array, Boolean] as PropType<DropdownFieldValue>,
      default: null
    },
    optionKey: { type: String, required: true }
  },
  setup(props, context) {
    const attrs = computed(() => ({
      ...context.attrs,
      ...props,
      value: getOptionValue(props.value, props.optionKey, props.options)
    }))

    const listeners = computed(() => ({
      ...context.listeners,
      select: ($event: any) =>
        context.emit('select', getPrimitiveValue($event, props.optionKey))
    }))

    const getPrimitiveValue = (optionValue: [], optionKey: string) => {
      if (isNil(optionValue)) return optionValue
      if (optionValue instanceof Array) {
        return (optionValue as Array<PrimitiveValue>).map((item: any) => item[optionKey])
      }
      return optionValue[props.optionKey]
    }

    const getOptionValue = (
      value: DropdownFieldValue,
      optionKey: string,
      options: Array<any>
    ) => {
      if (isNil(value)) return value
      if (value instanceof Array) {
        const multiValue = value as Array<DropdownFieldValue>
        return options.filter(item => multiValue.includes(item[optionKey]))
      }
      return options.find(item => item[optionKey] === value)
    }

    return { attrs, listeners }
  }
})
</script>
