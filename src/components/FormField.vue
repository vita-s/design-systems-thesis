<template>
  <div :class="getClass">
    <label
      v-if="titleElementIsVisible"
      :for="id"
      class="s-label label-text"
      :class="[
        labelClass,
        {
          's-label--accessibility': accessibilityStandards,
          'label-text-accessibility': accessibilityStandards
        }
      ]"
    >
      {{ title }}
    </label>
    <div class="s-input-group" :class="{ 's-input-group--vertical': vertical }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String, default: null },
    title: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false },
    noLabel: { type: Boolean, default: false },
    accessibilityStandards: { type: Boolean, default: false },
    labelClass: { type: String, default: '' }
  },
  computed: {
    getClass() {
      return this.disabled ? '' : 's-order-field'
    },
    titleElementIsVisible() {
      return !this.disabled && !this.noLabel
    }
  }
}
</script>

<style lang="scss" scoped>
.s-order-field {
  margin: -3px 0 7px;
  flex: 1;
}

.s-label {
  margin: -5px 0 0;
  color: $color-neutral-main;

  &--accessibility {
    color: $color-neutral-darkest;
  }
}

.s-input-group {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;

  &--vertical {
    flex-direction: column;
  }
}
</style>

<style lang="scss">
//TODO: must be removed after REF-57 release

.s-input-group {
  .s-btn:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
