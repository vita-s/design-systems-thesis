<template>
  <div>
    <div class="radio">
      <input
        :id="id"
        class="radio__input"
        type="radio"
        :disabled="option.disabled"
        :checked="isChecked"
        @change="$emit('change', value)"
      />
      <label :for="id" class="radio__label paragraph">{{ option.label }}</label>
    </div>
    <div class="radio-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      required: true,
      validator: opt => opt.label !== undefined && opt.value !== undefined
    },
    id: { type: String, required: true },
    value: {
      required: true,
      validator: prop =>
        ['string', 'number', 'boolean'].includes(typeof prop) || prop === null
    }
  },
  computed: {
    isChecked() {
      return this.value === this.option.value
    }
  }
}
</script>
