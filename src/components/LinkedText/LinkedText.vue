<template>
  <component
    :is="$attrs.to ? 'router-link' : 'a'"
    v-bind="$attrs"
    :class="buttonClasses"
    class="linked-text paragraph"
    v-on="$listeners"
  >
    <i v-if="materialIcon" class="material-icons link__icon" :class="iconClasses">
      {{ materialIcon }}
    </i>
    <slot>
      {{ text }}
    </slot>
  </component>
</template>

<script>
export default {
  props: {
    text: { type: String, default: '' },
    materialIcon: { type: String, default: null },
    category: {
      type: String,
      validator: t => ['primary', 'secondary', 'tertiary', 'dark', 'link'].includes(t),
      default: 'link'
    }
  },
  computed: {
    looksLikeButton() {
      return this.$attrs.role === 'button'
    },
    buttonClasses() {
      return {
        button: this.looksLikeButton,
        'button--padded': this.looksLikeButton,
        'button--primary': this.category === 'primary',
        'button--secondary': this.category === 'secondary',
        'button--tertiary': this.category === 'tertiary',
        'button--dark': this.category === 'dark'
      }
    },
    hasText() {
      return Boolean(this.text || this.$slots.default)
    },
    iconClasses() {
      return {
        button__icon: this.looksLikeButton,
        'has-text': this.hasText
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/components/button';
@import 'src/styles/components/linked_text';
</style>
