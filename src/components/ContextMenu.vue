<template>
  <v-popover v-bind="newAttrs" v-on="$listeners">
    <slot></slot>
    <template slot="popover">
      <slot name="menu-items"></slot>
    </template>
  </v-popover>
</template>

<script>
import { VPopover } from 'v-tooltip'

export default {
  components: { VPopover },
  data: () => ({
    attributes: {
      trigger: 'click',
      class: 'context-menu',
      popoverClass: 'context-menu__options paragraph',
      offset: '0'
    }
  }),
  computed: {
    newAttrs() {
      return { ...this.attributes, ...this.$attrs }
    }
  }
}
</script>
