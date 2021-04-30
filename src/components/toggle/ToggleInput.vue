<template>
  <toggle-button
    class="toggle-input"
    :color="color"
    :switch-color="switchColor"
    :width="32"
    :height="16"
    :margin="1"
    v-bind="$attrs"
    data-plankton-test="toggle-button"
    v-on="listeners"
  />
</template>

<script>
import { ToggleButton } from 'vue-js-toggle-button'
import {
  colorNeutralLighter,
  colorSecondaryMain,
  colorLayoutWhite
} from '@/styles/helpers/js-variables.scss'

export default {
  name: 'ToggleInput',
  components: {
    ToggleButton
  },
  data: () => ({
    color: {
      checked: colorSecondaryMain || '#1890ff',
      unchecked: colorNeutralLighter || '#bfbfbf'
    },
    switchColor: colorLayoutWhite || '#ffffff'
  }),
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event)
      }
    }
  }
}
// TODO: Style disabled state properly
</script>
