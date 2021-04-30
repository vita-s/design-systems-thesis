<template>
  <div v-close-popover class="context-menu-item paragraph" v-on="listeners">
    <span class="context-menu-item__icon">
      <Icon v-bind="iconProps" />
    </span>
    <span class="context-menu-item__text">{{ text }}</span>
  </div>
</template>
<script>
import Icon, { availableIcons } from '@/components/icons/Icon.vue'
export default {
  components: {
    Icon
  },
  props: {
    icon: { type: String, required: true },
    text: { type: String, required: true }
  },
  computed: {
    listeners() {
      return { ...this.$listeners }
    },
    iconProps() {
      const props = {}
      if (availableIcons.includes(this.icon)) props.name = this.icon
      else props.materialIcon = this.icon
      return props
    }
  }
}
</script>
