<template>
  <div :class="{ 'radio-group--horizontal': inline }">
    <RadioButton
      v-for="(option, index) in options"
      :id="randomOptionID(index)"
      :key="randomOptionID(index)"
      :option="option"
      :value="value"
      v-bind="$attrs"
      @change="emitInput(option.value)"
    >
      <slot :name="option.value" />
    </RadioButton>
  </div>
</template>

<script>
import RadioButton from './RadioButton.vue'
import { randomID } from '@/utilities/randomizer'

export default {
  components: {
    RadioButton
  },
  props: {
    inline: { type: Boolean, default: false },
    options: { type: Array, required: true },
    value: {
      default: null,
      validator: prop =>
        ['string', 'number', 'boolean'].includes(typeof prop) || prop === null
    }
  },
  data() {
    return {
      optionsIDs: this.randomIDsForOptions()
    }
  },
  methods: {
    randomOptionID(index) {
      return this.optionsIDs[index]
    },
    randomIDsForOptions() {
      const ids = []
      this.options.forEach(() => ids.push(randomID()))
      return ids
    },
    emitInput(value) {
      this.$emit('input', value)
    }
  }
}
</script>
