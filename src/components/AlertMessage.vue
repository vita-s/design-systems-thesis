<template>
  <div class="alert-message paragraph" :class="`alert-message--${type}`">
    <component
      :is="iconComponent"
      class="alert-message__icon"
      data-plankton-test="alert-icon"
    />
    <div class="alert-message__content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import CheckIcon from '../assets/images/alert-message-check-icon.svg'
import WarningIcon from '../assets/images/alert-message-warning-icon.svg'
import ErrorIcon from '../assets/images/alert-message-error-icon.svg'

const ALERT_TYPES = ['success', 'error', 'warning', 'info']
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator: value => ALERT_TYPES.includes(value)
    }
  },
  computed: {
    iconComponent() {
      if (this.type === 'success') return CheckIcon
      if (this.type === 'error') return ErrorIcon
      return WarningIcon
    }
  }
}
</script>

<style lang="scss" scoped>
.alert-message {
  padding: 8px;
  display: flex;
  border-width: 1px;
  border-radius: 4px;
  border-style: solid;
  align-items: center;

  &__icon {
    margin-right: 8px;
    font-size: 20px;
    overflow: visible;

    &--inverted {
      transform: scaleY(-1);
    }
  }

  &--success {
    background-color: $color-success-lightest;
    border-color: rgba($color-success-main, 0.5);
    color: $color-success-main;
    fill: $color-success-main;
  }

  &--error {
    background-color: $color-error-lightest;
    border-color: rgba($color-error-main, 0.33);
    color: $color-error-main;
    fill: $color-error-lighter;
  }

  &--warning {
    background-color: $color-primary-lightest;
    border-color: rgba($color-primary-main, 0.4);
    color: $color-primary-main;
    fill: $color-primary-main;
  }

  &--info {
    background-color: $color-secondary-lightest;
    border-color: $color-secondary-main;
    color: $color-secondary-main;
    fill: $color-secondary-main;
  }
}
</style>
