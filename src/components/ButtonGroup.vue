<template>
  <div class="button-group">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.button-group {
  display: flex;
  flex-wrap: nowrap;

  .button {
    border-radius: 0;

    &.button--tertiary {
      $additional-padding: $button-border-width / 2;

      margin-left: -$button-border-width;
      z-index: 1;
      padding-left: $button-padding-default + $additional-padding;
      padding-right: $button-padding-default + $additional-padding;

      &.button--inline {
        padding-left: $button-padding-inline + $additional-padding;
        padding-right: $button-padding-inline + $additional-padding;
      }

      &.button--padded {
        padding-left: $button-padding-padded + $additional-padding;
        padding-right: $button-padding-padded + $additional-padding;
      }

      &:hover {
        z-index: 2;
      }

      &:disabled {
        z-index: 0;
      }
    }

    &:first-child,
    &:first-of-type {
      border-top-left-radius: $button-border-radius;
      border-bottom-left-radius: $button-border-radius;
    }

    &:last-child {
      border-top-right-radius: $button-border-radius;
      border-bottom-right-radius: $button-border-radius;
    }
  }
}
</style>
