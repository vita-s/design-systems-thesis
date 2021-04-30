<template>
  <div class="checkbox-content">
    <input
      :id="id"
      :value="value"
      type="checkbox"
      class="checkbox-content__input-field"
      :disabled="fieldFormDisabled"
      :checked="isChecked"
      data-plankton-test="input"
      @input="updateInput"
    />
    <label :for="id" :class="checkboxClasses" class="checkbox-content__label paragraph">
      {{ label }}
      <slot></slot>
    </label>
  </div>
</template>

<script>
import { randomID } from '@/utilities/randomizer'
import fieldFormDisabledMixin from '@/mixins/field-form-disabled-mixin'

export default {
  mixins: [fieldFormDisabledMixin],
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    label: { type: String, default: '' },
    checked: { type: [Boolean, Array], required: true },
    value: { type: String, default: '' },
    size: { type: String, default: 'small' }
  },
  data() {
    return {
      id: randomID()
    }
  },

  computed: {
    isChecked() {
      if (Array.isArray(this.checked)) {
        return this.checked.includes(this.value)
      } else {
        return this.checked
      }
    },
    isLabelEmpty() {
      return !this.label && !this.$slots.default
    },
    checkboxClasses() {
      return {
        'checkbox-content__label--small': this.size === 'small',
        'checkbox-content__label--medium': this.size === 'medium',
        'checkbox-content__label--large': this.size === 'large',
        'checkbox-content__label--empty': this.isLabelEmpty
      }
    }
  },
  methods: {
    updateInput(event) {
      const isChecked = event.target.checked

      if (Array.isArray(this.checked)) {
        let newValue = [...this.checked]

        if (isChecked) newValue.push(this.value)
        else newValue.splice(newValue.indexOf(this.value), 1)

        this.$emit('input', newValue)
      } else {
        this.$emit('input', !this.checked)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox-content {
  color: $color-neutral-darkest;

  &__input-field {
    opacity: 0;
    display: none;

    &:checked {
      &:disabled {
        + .checkbox-content__label::before {
          background-color: $color-layout-divider;
          border-color: $color-layout-divider;
        }

        + .checkbox-content__label::before {
          color: $color-layout-white;
        }
      }

      + .checkbox-content__label::before {
        background-color: $color-secondary-main;
        border-color: $color-secondary-main;
      }

      + .checkbox-content__label::after {
        content: '';
        height: 4px;
        width: 8px;
        border-left: 2px solid;
        border-bottom: 2px solid;
        transform: rotate(-45deg);
        left: 2px;
        top: 5px;
        color: $color-layout-white;
      }
    }

    &:hover:enabled {
      + .checkbox-content__label::before {
        border-color: $color-secondary-main;
      }
    }

    &:disabled {
      + .checkbox-content__label::before {
        background-color: $color-neutral-lightest;
      }
    }
  }

  &__label {
    position: relative;
    display: inline-block;
    padding-left: 20px;
    margin: 0;

    &::before,
    &::after {
      position: absolute;
    }

    &::before {
      border: 1px solid $color-layout-divider;
      border-radius: 2px;
      content: '';
      background-color: $color-layout-white;
      color: $color-layout-white;
    }

    &--empty {
      margin-bottom: 12px;
    }

    &--small {
      &::before {
        height: 12px;
        width: 12px;
        left: 0;
        top: 2px;
      }
    }

    &--medium {
      &::before {
        height: 16px;
        width: 16px;
        left: -2px;
        top: 0;
      }
    }

    &--large {
      &::before {
        height: 20px;
        width: 20px;
        left: -4px;
        top: -2px;
      }
    }
  }
}
</style>
