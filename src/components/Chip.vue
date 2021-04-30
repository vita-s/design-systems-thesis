<template>
  <div class="chip" :class="chipClasses">
    <span v-if="text" data-plankton-test="chip-text">
      {{ text }}
    </span>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, default: '' },
    truncated: { type: Boolean, default: false },
    category: { type: String, default: 'gray' }
  },
  computed: {
    chipClasses() {
      return {
        'chip--primary': this.category === 'primary',
        'chip--secondary': this.category === 'secondary',
        'chip--tertiary': this.category === 'tertiary',
        'chip--red': this.category === 'red',
        'chip--green': this.category === 'green',
        'chip--truncated': this.truncated
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chip {
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  border-radius: 4px;
  white-space: nowrap;
  border-width: 1px;
  border-style: solid;
  font-size: 12px;
  line-height: 1;

  &--truncated span {
    max-width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &--primary {
    color: $color-primary-main;
    border-color: transparentize($color-primary-main, 0.5);
    background: $color-primary-lightest;
  }

  &--secondary {
    color: $color-secondary-main;
    border-color: transparentize($color-secondary-main, 0.5);
    background: $color-secondary-lightest;
  }

  &--tertiary {
    color: $color-neutral-darkest;
    border-color: $color-neutral-lighter;
    background: $color-layout-card-background;
  }

  &--green {
    color: $color-success-main;
    border-color: transparentize($color-success-main, 0.5);
    background: $color-success-lightest;
  }

  &--red {
    color: $color-error-main;
    border-color: transparentize($color-error-main, 0.5);
    background: $color-error-lightest;
  }
}
</style>
